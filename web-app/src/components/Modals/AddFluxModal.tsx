import {
  ButtonClose,
  ButtonValidate,
  ContainerLogo,
  FormContainer,
  InputElement,
  LabelElement,
  LogotTitle,
  ModalContainer,
  TitleContainer,
  TitleElement,
  customStyles,
} from 'pages/MesFlux/MesFlux.styled';
import logo from '../../assets/Flu-icone.png';
import { RxCross2 } from 'react-icons/rx';
import { TEXT_FONT_COLOR } from 'styles/style-constants';
import Modal from 'react-modal';

type PropsType = {
  isAddModalOpen: boolean;
  addNewFlow: () => Promise<void>;
  afterCloseModal: () => void;
  toggleModal: () => void;
  setFlowName: React.Dispatch<React.SetStateAction<string>>;
  flowName: string;
};

const AddFluxModal = ({
  isAddModalOpen,
  addNewFlow,
  afterCloseModal,
  toggleModal,
  setFlowName,
  flowName,
}: PropsType) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isAddModalOpen}
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
          <ButtonClose onClick={() => toggleModal()}>
            <RxCross2 color={TEXT_FONT_COLOR} size={18} />
          </ButtonClose>
        </TitleContainer>
        <FormContainer>
          <LabelElement>
            Nom
            <InputElement
              value={flowName}
              placeholder="La liste infinie"
              onChange={(e) => {
                e.preventDefault();
                setFlowName(e.target.value);
              }}
            ></InputElement>
          </LabelElement>
          <ButtonValidate onClick={() => addNewFlow()}>
            Confirmer
          </ButtonValidate>
        </FormContainer>
      </ModalContainer>
    </Modal>
  );
};

export default AddFluxModal;
