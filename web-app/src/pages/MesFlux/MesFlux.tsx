/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
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
  LogoLinkButton,
  LogoLinkButtonDisabled,
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
import ReactModal from 'react-modal';
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
import { MY_PROFILE } from 'App/App';
import Corbeille from '../../assets/corbeille.png';

const MesFlux = (data: any) => {
  const [id, setId] = useState('');
  const [flowName, setFlowName] = useState('');
  const [flows, setFlows] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [allFlowSelected, setAllFlowSelected] = useState<Array<string>>([]);

  ReactModal.setAppElement('#root');

  useEffect(() => {
    if (data.data) {
      setFlows(data.data.myProfile.flows);
      setId(data.data.myProfile.id);
    }
  }, [data]);

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

  function openModal() {
    setIsOpen(true);
  }
  function openModalDelete() {
    setModalDeleteIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeModalDelete() {
    setModalDeleteIsOpen(false);
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

  const ADD_FLOW = gql`
    mutation addFlow($id: String!, $flowName: String!) {
      addFlow(id: $id, flowName: $flowName) {
        id
        flowName
      }
    }
  `;

  const DELETE_FLOW = gql`
    mutation deleteFlow($arrayId: [String!]!) {
      deleteFlow(arrayId: $arrayId)
    }
  `;

  const [addFlow] = useMutation<AddFlowMutation, AddFlowMutationVariables>(
    ADD_FLOW,
    { refetchQueries: [{ query: MY_PROFILE }] }
  );

  const [deleteFlow] = useMutation<
    DeleteFlowMutation,
    DeleteFlowMutationVariables
  >(DELETE_FLOW, { refetchQueries: [{ query: MY_PROFILE }] });

  const submit = async () => {
    try {
      await addFlow({
        variables: { id, flowName },
      });
      toast.success(`Creation reussi.`);
      closeModal();
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
      closeModalDelete();
      afterCloseModalDelete();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };
  return (
    <MainContainer>
      <ContainerButton>
        <ButtonDelete
          onClick={openModalDelete}
          disabled={allFlowSelected.length > 0 ? false : true}
        >
          {allFlowSelected.length > 0 ? (
            <LogoLinkButton src={Corbeille}></LogoLinkButton>
          ) : (
            <LogoLinkButtonDisabled src={Corbeille}></LogoLinkButtonDisabled>
          )}
          Supprimer
        </ButtonDelete>
        <ButtonAdd onClick={openModal}>Ajouter un flu</ButtonAdd>
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
          {data.data
            ? flows.map((flow: any) => {
                return (
                  <ItemList key={flow.id}>
                    <ContainerInputItem>
                      <InputItem
                        type="checkbox"
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
        onRequestClose={closeModal}
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
            <ButtonClose onClick={() => closeModal()}>X</ButtonClose>
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
        onRequestClose={closeModalDelete}
        onAfterClose={afterCloseModalDelete}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalContainer>
          <TitleContainer>
            <ContainerLogo>
              <LogotTitle src={logo}></LogotTitle>
              <TitleElement>Supprimer flux</TitleElement>
            </ContainerLogo>
            <ButtonClose onClick={() => closeModalDelete()}>X</ButtonClose>
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
