/* eslint-disable react-hooks/exhaustive-deps */
import { Component, useEffect, useState } from 'react';
import {
  AddFluContainer,
  AllStatusContainer,
  ButtonAdd,
  ButtonClose,
  ButtonDelete,
  ButtonValidate,
  ContainerButton,
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
import { AddFlowMutation, AddFlowMutationVariables } from 'gql/graphql';
import { toast } from 'react-toastify';
import { getErrorMessage } from 'utils';
import { MY_PROFILE } from 'App/App';

const MesFlux = (data: any) => {
  const [id, setId] = useState('');
  const [flowName, setFlowName] = useState('');
  const [flows, setFlows] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
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

  function closeModal() {
    setIsOpen(false);
  }

  const ADD_FLOW = gql`
    mutation addFlow($id: String!, $flowName: String!) {
      addFlow(id: $id, flowName: $flowName) {
        id
        flowName
      }
    }
  `;

  const [addFlow] = useMutation<AddFlowMutation, AddFlowMutationVariables>(
    ADD_FLOW,
    { refetchQueries: [{ query: MY_PROFILE }] }
  );

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

  return (
    <MainContainer>
      <ContainerButton>
        <ButtonDelete>Supprimer un flu</ButtonDelete>
        <ButtonAdd onClick={openModal}>Ajouter un flu</ButtonAdd>
      </ContainerButton>
      <HeaderList>
        <TextElementHeader>Date</TextElementHeader>
        <TextElementHeader>Nom de flu</TextElementHeader>
        <TextElementHeader>Nombre de tickets</TextElementHeader>
      </HeaderList>

      <ListContainer>
        {data.data
          ? flows.map((e: any) => {
              return (
                <ItemList>
                  <InputItem type='checkbox'></InputItem>
                  <TextElement>15/10/22 11:35:56</TextElement>
                  <TextElement>{e.flowName}</TextElement>
                  <AllStatusContainer>
                    <StatusContainer>
                      <StatusNoScan> </StatusNoScan>0
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
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <AddFluContainer>
          <TitleContainer>
            <ContainerLogo>
              <LogotTitle src={logo}></LogotTitle>
              <TitleElement>Nouveau flu</TitleElement>
            </ContainerLogo>
            <ButtonClose onClick={() => closeModal()}>X</ButtonClose>
          </TitleContainer>
          <FormContainer>
            <LabelElement>
              <InputElement
                value={flowName}
                onChange={(e) => {
                  e.preventDefault();
                  setFlowName(e.target.value);
                }}
              ></InputElement>
              Nom
            </LabelElement>
            <ButtonValidate onClick={() => submit()}>Confirmer</ButtonValidate>
          </FormContainer>
        </AddFluContainer>
      </Modal>
    </MainContainer>
  );
};

export default MesFlux;
