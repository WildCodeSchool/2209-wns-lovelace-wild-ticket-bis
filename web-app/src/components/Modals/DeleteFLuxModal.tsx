import { RxCross2 } from 'react-icons/rx';
import Modal from 'react-modal';
import { TEXT_FONT_COLOR } from 'styles/style-constants';
import logo from '../../assets/Flu-icone.png';
import {
  customStyles,
  ModalContainer,
  TitleContainer,
  ContainerLogo,
  LogotTitle,
  TitleElement,
  ButtonClose,
  ContainerAskDelete,
  QuestionElement,
  ContainerButtonDeleteFlu,
  ButtonValidateDelete,
  ButtonCancelDelete,
} from './Modal.styled';

type PropsType = {
  isModalDeleteOpen: boolean;
  toggleModalDelete: () => void;
  afterCloseModalDelete: () => void;
  deletedSelectedFlow: () => Promise<void>;
  setIsModalDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteFLuxModal = ({
  isModalDeleteOpen,
  toggleModalDelete,
  afterCloseModalDelete,
  deletedSelectedFlow,
  setIsModalDeleteOpen,
}: PropsType) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isModalDeleteOpen}
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
          <ButtonClose onClick={() => toggleModalDelete()}>
            <RxCross2 color={TEXT_FONT_COLOR} size={18} />
          </ButtonClose>
        </TitleContainer>
        <ContainerAskDelete>
          <QuestionElement>
            Voulez-vous vraiment supprimer les flux ?{' '}
          </QuestionElement>
          <ContainerButtonDeleteFlu>
            <ButtonValidateDelete onClick={() => deletedSelectedFlow()}>
              Confirmer
            </ButtonValidateDelete>
            <ButtonCancelDelete onClick={() => setIsModalDeleteOpen(false)}>
              Annuler
            </ButtonCancelDelete>
          </ContainerButtonDeleteFlu>
        </ContainerAskDelete>
      </ModalContainer>
    </Modal>
  );
};

export default DeleteFLuxModal;
