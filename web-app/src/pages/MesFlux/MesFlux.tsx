/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import {
  AllStatusContainer,
  ArrayContainer,
  ButtonAdd,
  ButtonCancelDelete,
  ButtonClose,
  ButtonDelete,
  ButtonValidate,
  ButtonValidateDelete,
  ContainerAskDelete,
  ContainerButton,
  ContainerButtonDeleteFlu,
  ContainerInputItem,
  ContainerLogo,
  Divider,
  FormContainer,
  HeaderList,
  InputElement,
  InputItem,
  ItemList,
  LabelElement,
  ListContainer,
  LogotTitle,
  MainContainer,
  ModalContainer,
  QuestionElement,
  StatusContainer,
  StatusError,
  StatusNoScan,
  StatusValidate,
  StatusWaiting,
  TextElement,
  TextElementHeader,
  TitleContainer,
  TitleElement,
} from './MesFlux.styled';
import Modal from 'react-modal';
import logo from '../../assets/Flu-icone_4.png';
import { gql, useMutation } from '@apollo/client';
import {
  AddFlowMutation,
  AddFlowMutationVariables,
  DeleteFlowMutation,
  DeleteFlowMutationVariables,
} from 'gql/graphql';
import { toast } from 'react-toastify';
import { getErrorMessage } from 'utils';
import { AppContext } from 'context/AppContext';
import { GoTrashcan } from 'react-icons/go';

export const ADD_FLOW = gql`
  mutation addFlow($id: String!, $flowName: String!) {
    addFlow(id: $id, flowName: $flowName) {
      id
      flowName
    }
  }
`;

export const DELETE_FLOW = gql`
  mutation deleteFlow($arrayId: [String!]!) {
    deleteFlow(arrayId: $arrayId)
  }
`;

const MesFlux = () => {
  const appContext = useContext(AppContext);
  const [id, setId] = useState('');
  const [flowName, setFlowName] = useState('');
  const [flows, setFlows] = useState([{}]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [allFlowSelected, setAllFlowSelected] = useState<Array<string>>([]);

  useEffect(() => {
    if (appContext?.userProfile) {
      setFlows(appContext.userProfile.myProfile.flows);
      setId(appContext.userProfile.myProfile.id);
    }
  }, [appContext]);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  function toggleModal() {
    setIsOpen(!modalIsOpen);
  }
  function toggleModalDelete() {
    setModalDeleteIsOpen(!modalDeleteIsOpen);
  }

  const afterCloseModal = () => {
    setFlowName('');
  };
  const afterCloseModalDelete = () => {
    let allCheckbox = document.getElementsByClassName('checkbox');
    for (var i = 0; i < allCheckbox.length; i++) {
      let input = allCheckbox[i] as HTMLInputElement;
      input.checked = false;
    }
  };
  const flowSelected = (id: string, e: any) => {
    if (e.target.checked) {
      if (!allFlowSelected.includes(id)) {
        setAllFlowSelected([...allFlowSelected, id]);
      }
    } else {
      if (allFlowSelected.includes(id)) {
        setAllFlowSelected(
          allFlowSelected.filter((item) => {
            return item !== id;
          })
        );
      }
    }
  };

  const [addFlow] = useMutation<AddFlowMutation, AddFlowMutationVariables>(
    ADD_FLOW
  );

  const [deleteFlow] = useMutation<
    DeleteFlowMutation,
    DeleteFlowMutationVariables
  >(DELETE_FLOW);

  const submit = async () => {
    try {
      await addFlow({
        variables: { id, flowName },
      });
      toast.success(`Creation reussi.`);
      toggleModal();
      appContext?.refetch();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const submitDelete = async () => {
    try {
      await deleteFlow({
        variables: { arrayId: allFlowSelected },
      });
      toast.success(`Suppresion reussi.`);
      appContext?.refetch();
      toggleModalDelete();
      afterCloseModalDelete();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <MainContainer>
      <ContainerButton>
        <ButtonDelete
          onClick={toggleModalDelete}
          disabled={allFlowSelected.length > 0 ? false : true}
        >
          <GoTrashcan size={25} />
          &ensp;Supprimer
        </ButtonDelete>
        <ButtonAdd onClick={toggleModal}>Ajouter un flu blabla</ButtonAdd>
      </ContainerButton>
      <ArrayContainer>
        <HeaderList>
          <TextElementHeader></TextElementHeader>
          <TextElementHeader>Date</TextElementHeader>
          <TextElementHeader>Nom de flu</TextElementHeader>
          <TextElementHeader>Nombre de tickets</TextElementHeader>
          <TextElementHeader></TextElementHeader>
        </HeaderList>
        <Divider />
        <ListContainer>
          {flows
            ? flows.map((flow: any, index) => {
                return (
                  <ItemList key={index}>
                    <ContainerInputItem>
                      <InputItem
                        type="checkbox"
                        data-testid={flow.flowName}
                        onChange={(e) => flowSelected(flow.id, e)}
                      ></InputItem>
                    </ContainerInputItem>
                    <TextElement>15/10/22 11:35:56</TextElement>
                    <TextElement>{flow.flowName}</TextElement>
                    <AllStatusContainer>
                      <StatusContainer>
                        <StatusNoScan></StatusNoScan>0
                      </StatusContainer>
                      <StatusContainer>
                        <StatusWaiting></StatusWaiting>0
                      </StatusContainer>
                      <StatusContainer>
                        <StatusValidate></StatusValidate>0
                      </StatusContainer>
                      <StatusContainer>
                        <StatusError></StatusError>0
                      </StatusContainer>
                    </AllStatusContainer>
                  </ItemList>
                );
              })
            : null}
        </ListContainer>
      </ArrayContainer>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        style={customStyles}
        onAfterClose={afterCloseModal}
        contentLabel="Example Modal"
      >
        <ModalContainer>
          <TitleContainer>
            <ContainerLogo>
              <LogotTitle src={logo}></LogotTitle>
              <TitleElement>Nouveau flu</TitleElement>
            </ContainerLogo>
            <ButtonClose onClick={() => toggleModal()}>X</ButtonClose>
          </TitleContainer>
          <FormContainer>
            <LabelElement>
              Nom
              <InputElement
                value={flowName}
                onChange={(e) => {
                  e.preventDefault();
                  setFlowName(e.target.value);
                }}
              ></InputElement>
            </LabelElement>
            <ButtonValidate onClick={() => submit()}>Confirmer</ButtonValidate>
          </FormContainer>
        </ModalContainer>
      </Modal>
      <Modal
        ariaHideApp={false}
        isOpen={modalDeleteIsOpen}
        onRequestClose={toggleModalDelete}
        onAfterClose={afterCloseModalDelete}
        style={customStyles}
        contentLabel="Example Modal"
        testId="modal"
      >
        <ModalContainer>
          <TitleContainer>
            <ContainerLogo>
              <LogotTitle src={logo}></LogotTitle>
              <TitleElement>Supprimer flux</TitleElement>
            </ContainerLogo>
            <ButtonClose onClick={() => toggleModalDelete()}>X</ButtonClose>
          </TitleContainer>
          <ContainerAskDelete>
            <QuestionElement>
              Voulez-vous vraiment supprimer les flux ?{' '}
            </QuestionElement>
            <ContainerButtonDeleteFlu>
              <ButtonValidateDelete onClick={() => submitDelete()}>
                Confirmer
              </ButtonValidateDelete>
              <ButtonCancelDelete>Annuler</ButtonCancelDelete>
            </ContainerButtonDeleteFlu>
          </ContainerAskDelete>
        </ModalContainer>
      </Modal>
    </MainContainer>
  );
};

export default MesFlux;
