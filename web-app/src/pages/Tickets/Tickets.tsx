import { useState } from 'react';
import {
  ContainerButton,
  ButtonDelete,
  LogoLinkButton,
  LogoLinkButtonDisabled,
  MainContainer,
  ButtonAdd,
} from 'pages/MesFlux/MesFlux.styled';
import Corbeille from '../../assets/corbeille.png';

const Tickets = () => {
  const [allTicketsSelected, setAllTicketsSelected] = useState<Array<string>>(
    []
  );
  return (
    <MainContainer>
      <ContainerButton>
        <ButtonDelete disabled={allTicketsSelected.length > 0 ? false : true}>
          {allTicketsSelected.length > 0 ? (
            <LogoLinkButton src={Corbeille}></LogoLinkButton>
          ) : (
            <LogoLinkButtonDisabled src={Corbeille}></LogoLinkButtonDisabled>
          )}
          Supprimer
        </ButtonDelete>
        <ButtonAdd>Ajouter un ticket</ButtonAdd>
      </ContainerButton>
    </MainContainer>
  );
};

export default Tickets;
