import { useState } from 'react';
import {
  MainContainer,
  ButtonAdd,
  AllStatusContainer,
  ArrayContainer,
  ContainerInputItem,
  Divider,
  HeaderList,
  InputItem,
  ItemList,
  ListContainer,
  StatusContainer,
  StatusNoScan,
  TextElement,
  TextElementHeader,
  ButtonDelete,
} from 'pages/MesFlux/MesFlux.styled';
import {
  ButtonAction,
  ContainerButton,
  ContainerButtonAction,
} from './Tickets.styled';
import { GoTrashcan } from 'react-icons/go';
import { IoIosPlay } from 'react-icons/io';
import {
  COLOR_ERROR_TICKET,
  COLOR_VALIDATE_TICKET,
  COLOR_WAITING_TICKET,
} from 'styles/style-constants';

const Tickets = () => {
  const [allTicketsSelected] = useState<Array<string>>([]);
  const [tickets] = useState([]);
  return (
    <MainContainer>
      <ContainerButton>
        <ContainerButtonAction>
          <ButtonDelete disabled={allTicketsSelected.length > 0 ? false : true}>
            <GoTrashcan size={25} /> &ensp;Supprimer
          </ButtonDelete>
          <ButtonAction disabled={allTicketsSelected.length > 0 ? false : true}>
            {allTicketsSelected.length > 0 ? (
              <IoIosPlay size={25} style={{ color: COLOR_WAITING_TICKET }} />
            ) : (
              <IoIosPlay size={25} />
            )}
            &ensp;En attente
          </ButtonAction>
          <ButtonAction disabled={allTicketsSelected.length > 0 ? false : true}>
            {allTicketsSelected.length > 0 ? (
              <IoIosPlay size={25} style={{ color: COLOR_VALIDATE_TICKET }} />
            ) : (
              <IoIosPlay size={25} />
            )}
            &ensp;Valider
          </ButtonAction>
          <ButtonAction disabled={allTicketsSelected.length > 0 ? false : true}>
            {allTicketsSelected.length > 0 ? (
              <IoIosPlay size={25} style={{ color: COLOR_ERROR_TICKET }} />
            ) : (
              <IoIosPlay size={25} />
            )}
            &ensp;Incident
          </ButtonAction>
        </ContainerButtonAction>
        <ButtonAdd>Ajouter un ticket</ButtonAdd>
      </ContainerButton>
      <ArrayContainer>
        <HeaderList>
          <TextElementHeader></TextElementHeader>
          <TextElementHeader>Heure</TextElementHeader>
          <TextElementHeader>Numéro</TextElementHeader>
          <TextElementHeader>Statut</TextElementHeader>
          <TextElementHeader></TextElementHeader>
        </HeaderList>
        <Divider />
        <ListContainer>
          {tickets.map((ticket: any) => {
            return (
              <ItemList key={ticket.id}>
                <ContainerInputItem>
                  <InputItem></InputItem>
                </ContainerInputItem>
                <TextElement>15/10/22 11:35:56</TextElement>
                <TextElement>{ticket.number}</TextElement>
                <AllStatusContainer>
                  <StatusContainer>
                    <StatusNoScan></StatusNoScan>0
                  </StatusContainer>
                </AllStatusContainer>
              </ItemList>
            );
          })}
        </ListContainer>
      </ArrayContainer>
    </MainContainer>
  );
};

export default Tickets;
