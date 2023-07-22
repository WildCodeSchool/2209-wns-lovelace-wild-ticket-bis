/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client';
import AddFluxModal from 'components/Modals/AddFluxModal';
import DeleteFLuxModal from 'components/Modals/DeleteFLuxModal';
import { AppContext } from 'context/AppContext';
import { ADD_FLOW, DELETE_FLOW } from 'gql-store';
import {
  AddFlowMutation,
  AddFlowMutationVariables,
  DeleteFlowMutation,
  DeleteFlowMutationVariables,
} from 'gql/graphql';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { GoTrashcan } from 'react-icons/go';
import { toast } from 'react-toastify';
import { convertDateFormat, getErrorMessage } from 'utils';
import {
  AddText,
  AiOutlinePlusCircleIcon,
  AllStatusContainer,
  ArrayContainer,
  ButtonAdd,
  ContainerButton,
  ContainerInputItem,
  DeleteText,
  HeaderList,
  InputItem,
  ItemList,
  ListContainer,
  MainContainer,
  SecondaryButton,
  StatusContainer,
  StatusError,
  StatusNoScan,
  StatusValidate,
  StatusWaiting,
  TextElement,
  TextElementHeader,
} from './MesFlux.styled';

type Flow = {
  __typename?: 'Flow';
  flowName: string;
  id: string;
  date: string;
  calculateTicketCounts: {
    __typename?: 'NumberOfTickets';
    incident?: number | null;
    nonScanned?: number | null;
    validate?: number | null;
    waiting?: number | null;
  };
};

const MesFlux = () => {
  const appContext = useContext(AppContext);
  const [id, setId] = useState('');
  const [flowName, setFlowName] = useState('');
  const [flows, setFlows] = useState<Flow[]>();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [allFlowSelected, setAllFlowSelected] = useState<Array<string>>([]);
  const [isButtonDeleteDisable, setIsButtonDeleteDisable] = useState(true);
  const [isChecked, setIsChecked] = useState<boolean[]>([]);

  const [addFlow] = useMutation<AddFlowMutation, AddFlowMutationVariables>(
    ADD_FLOW
  );

  const [deleteFlow] = useMutation<
    DeleteFlowMutation,
    DeleteFlowMutationVariables
  >(DELETE_FLOW);

  useEffect(() => {
    if (appContext?.userProfile) {
      setFlows(appContext.userProfile.myProfile.flows);
      setId(appContext.userProfile.myProfile.id);
      appContext.refetch();
    }
  }, [appContext?.userProfile]);

  const toggleModal = () => {
    setIsAddModalOpen(!isAddModalOpen);
  };
  const toggleModalDelete = () => {
    setIsModalDeleteOpen(!isModalDeleteOpen);
  };

  const afterCloseModal = () => {
    setFlowName('');
  };

  const afterCloseModalDelete = () => {
    setIsChecked([]);
    let allCheckbox = document.querySelectorAll('checkbox');
    allCheckbox.forEach((checkbox) => {
      (checkbox as HTMLInputElement).checked = false;
    });
    setIsButtonDeleteDisable(true);
  };

  const flowSelected = (
    id: string,
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedChecked = { ...isChecked };

    if (e.target.checked) {
      updatedChecked[index] = true;
      setAllFlowSelected([...allFlowSelected, id]);
      setIsButtonDeleteDisable(false);
    } else {
      delete updatedChecked[index];
      setAllFlowSelected(allFlowSelected.filter((item) => item !== id));
      setIsButtonDeleteDisable(Object.keys(updatedChecked).length === 0);
    }

    setIsChecked(updatedChecked);
  };

  const addNewFlow = async () => {
    try {
      await addFlow({
        variables: { id, flowName },
      });
      toggleModal();
      appContext?.refetch();
      toast.success(`Creation reussi.`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  //Check if current selected flow is deleted and automaticaly set a new selected flow
  const controlOnDeleteSelectedFlow = (): void => {
    if (appContext?.selectedFlow && flows) {
      if (allFlowSelected.includes(appContext?.selectedFlow?.value)) {
        const remainingFlows = appContext.userProfile?.myProfile.flows.filter(
          (flow: Flow) => !allFlowSelected.includes(flow.id)
        );
        if (remainingFlows && remainingFlows?.length > 0) {
          const firstRemainingFlow: Flow = remainingFlows[0];
          appContext.setSelectedFlow({
            value: firstRemainingFlow.id,
            label: firstRemainingFlow.flowName,
          });
        } else {
          toast.warning('Veuilez ajouter un flux.');
          appContext.setSelectedFlow({ value: '', label: '' });
        }
      }
    }
  };

  const deletedSelectedFlow = async () => {
    try {
      controlOnDeleteSelectedFlow();
      await deleteFlow({
        variables: { arrayId: allFlowSelected },
      });
      toast.success(`Suppresion reussi.`);
      setAllFlowSelected([]);
      appContext?.refetch();
      toggleModalDelete();
      afterCloseModalDelete();
      setIsButtonDeleteDisable(true);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <MainContainer>
      <ContainerButton>
        <SecondaryButton
          onClick={toggleModalDelete}
          disabled={isButtonDeleteDisable}
        >
          <GoTrashcan size={25} opacity={0.7} />
          <DeleteText>&ensp;Supprimer</DeleteText>
        </SecondaryButton>
        <ButtonAdd onClick={toggleModal}>
          <AiOutlinePlusCircleIcon size={27} opacity={0.7} />
          <AddText>Ajouter un flux</AddText>
        </ButtonAdd>
      </ContainerButton>
      <ArrayContainer>
        <HeaderList>
          <TextElementHeader></TextElementHeader>
          <TextElementHeader>Date</TextElementHeader>
          <TextElementHeader>Nom de flux</TextElementHeader>
          <TextElementHeader>Nombre de tickets</TextElementHeader>
          <TextElementHeader></TextElementHeader>
        </HeaderList>
        <ListContainer>
          {flows
            ? flows.map((flow: Flow, index) => {
                const isFlowSelected =
                  flow.id === appContext?.selectedFlow?.value;
                return (
                  <ItemList key={index} hidden={isFlowSelected}>
                    <ContainerInputItem>
                      <InputItem
                        type="checkbox"
                        data-testid={flow.flowName}
                        checked={isChecked[index] || false}
                        onChange={(e) => flowSelected(flow.id, e, index)}
                      ></InputItem>
                    </ContainerInputItem>
                    <TextElement>{convertDateFormat(flow.date)}</TextElement>
                    <TextElement>{flow.flowName}</TextElement>
                    <AllStatusContainer>
                      <StatusContainer>
                        <StatusNoScan></StatusNoScan>
                        {flow.calculateTicketCounts.nonScanned}
                      </StatusContainer>
                      <StatusContainer>
                        <StatusWaiting></StatusWaiting>{' '}
                        {flow.calculateTicketCounts.waiting}
                      </StatusContainer>
                      <StatusContainer>
                        <StatusValidate></StatusValidate>{' '}
                        {flow.calculateTicketCounts.validate}
                      </StatusContainer>
                      <StatusContainer>
                        <StatusError></StatusError>{' '}
                        {flow.calculateTicketCounts.incident}
                      </StatusContainer>
                    </AllStatusContainer>
                  </ItemList>
                );
              })
            : null}
        </ListContainer>
      </ArrayContainer>
      <AddFluxModal
        isAddModalOpen={isAddModalOpen}
        afterCloseModal={afterCloseModal}
        addNewFlow={addNewFlow}
        toggleModal={toggleModal}
        setFlowName={setFlowName}
        flowName={flowName}
      />
      <DeleteFLuxModal
        isModalDeleteOpen={isModalDeleteOpen}
        toggleModalDelete={toggleModalDelete}
        afterCloseModalDelete={afterCloseModalDelete}
        deletedSelectedFlow={deletedSelectedFlow}
        setIsModalDeleteOpen={setIsModalDeleteOpen}
      />
    </MainContainer>
  );
};

export default MesFlux;
