import { gql, useMutation } from '@apollo/client';
import {
  ButtonAdd,
  ButtonDelete,
  ContainerButton,
} from './ButtonContainer.styled';
import { AddFlowMutation, AddFlowMutationVariables } from '../../gql/graphql';
import { useState } from 'react';
import Modal from 'react-modal';
import ReactModal from 'react-modal';

const ButtonContainer = (data: any) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  ReactModal.setAppElement('#root');

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

  let userId: string;
  let flowName: string;
  if (data.data) {
    userId = data.data.myProfile.id;
    flowName = 'newnewnew';
  }

  const ADD_FLOW = gql`
    mutation addFlow($id: String!, $flowName: String!) {
      addFlow(id: $id, flowName: $flowName) {
        id
        flowName
      }
    }
  `;
  const [addFlow, { loading }] = useMutation<
    AddFlowMutation,
    AddFlowMutationVariables
  >(ADD_FLOW);

  const addFlowSubmit = async () => {
    try {
      await addFlow({
        variables: { id: userId, flowName },
      });
      console.log('ok');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ContainerButton>
        {/* Pour page flux  */}
        <ButtonDelete>Supprimer un flu</ButtonDelete>
        <ButtonAdd onClick={openModal}>Ajouter un flu</ButtonAdd>
      </ContainerButton>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <h2>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </>
  );
};

export default ButtonContainer;
