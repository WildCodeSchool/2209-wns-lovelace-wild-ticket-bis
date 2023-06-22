import { useEffect, useState } from 'react';
import {
  ContainerLink,
  ContainerLogoLarge,
  ContainerQrCodeClient,
  ContainerText,
  ContainerTicketNumber,
  Hr,
  LeftSideQrCodeClient,
  LogoLarge,
  NumberTicket,
  QRCodeClientElementContainer,
  QrCodeContainer,
  QrCodeShadow,
  RightSideQrCodeClient,
  TextLinkQrCode,
  TextQrCodeClient,
  TextScanQrCode,
  TextTicketNumber,
  TextTitleLinkQrCode,
} from './QrCodeClient.styled';
import logoLarge from '../../assets/logo_flux_large.png';
import { PropsDisplayNavbar } from 'utils';
import { QRCodeSVG } from 'qrcode.react';
import { gql, useQuery, useSubscription } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import { GET_TICKETS_BY_FLOW_ID } from 'gql-store';
import {
  Subscription,
  SubscriptionSubscriptionForTicketAddToFlowArgs,
} from 'gql/graphql';

export const GET_TICKET_ADD_SUBSCRIPTION = gql`
  subscription SubscriptionForTicketAddToFlow($flowId: String!) {
    SubscriptionForTicketAddToFlow(flowId: $flowId) {
      message
      id
      flowId
    }
  }
`;

interface TicketWithSeconds {
  __typename: string;
  date: string;
  id: string;
  isTrash: boolean;
  status: string;
  seconds: number;
}

const QRCodeClient = ({ displayNavbar }: PropsDisplayNavbar) => {
  useEffect(() => {
    displayNavbar(false);
    return () => {
      displayNavbar(false);
    };
  });

  const [arrayTickets, setArrayTickets] = useState(Array<TicketWithSeconds>);
  const [currentTicketId, setCurrentTicketId] =
    useState<TicketWithSeconds | null>(null);

  let location = useLocation();
  let flowId: string = location.state;

  const { data, loading } = useQuery(GET_TICKETS_BY_FLOW_ID, {
    variables: { flowId },
  });

  const { data: dataSub, loading: subLoading } = useSubscription<
    Subscription,
    SubscriptionSubscriptionForTicketAddToFlowArgs
  >(GET_TICKET_ADD_SUBSCRIPTION, {
    variables: { flowId },
    shouldResubscribe: true,
  });

  useEffect(() => {
    if (!loading) {
      //Recupere data et fait un clone , puis rajoute dans chaque tickets , la valeur seconds , puis inplement le tableau dans le state
      let arrayWithNewTickets = data.getTicketsByFlowId.tickets.slice();
      const newArraySorted: TicketWithSeconds[] = arrayWithNewTickets.map(
        (ticket: any, index: any) => ({
          ...ticket,
          seconds: 10,
        })
      );
      newArraySorted.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      setArrayTickets(newArraySorted);
    }
  }, [data, loading]);

  useEffect(() => {
    console.log(subLoading);

    console.log(dataSub, 'iciciciiic');
  }, [dataSub, subLoading]);

  useEffect(() => {
    if (arrayTickets.length === 0) {
      console.log('Tous les tickets ont été traités.');
      return;
    }
    if (currentTicketId) {
      const timer = setInterval(() => {
        currentTicketId.seconds--;
        console.log(
          `Ticket ID: ${currentTicketId.id}, Timer: ${currentTicketId.seconds}`
        );

        if (currentTicketId.seconds === 0 || currentTicketId.seconds < 0) {
          clearInterval(timer);
          setCurrentTicketId(null);
          arrayTickets.shift();
        }
      }, 1000);
    } else {
      setCurrentTicketId(arrayTickets[0]);
      console.log(
        `Affichage du ticket ID: ${currentTicketId ? currentTicketId : null}`
      );
    }
  }, [arrayTickets, currentTicketId]);

  return (
    <ContainerQrCodeClient>
      <LeftSideQrCodeClient>
        <ContainerLogoLarge>
          <LogoLarge src={logoLarge}></LogoLarge>
        </ContainerLogoLarge>
        <ContainerText>
          <TextQrCodeClient>
            Soyez prévenue quand votre commande est prête ! 👋
          </TextQrCodeClient>
        </ContainerText>
        <ContainerTicketNumber>
          <TextTicketNumber>
            Numero d’attente : <br />
            <NumberTicket>
              {currentTicketId ? <p>{currentTicketId.id}</p> : <p>lol</p>}
            </NumberTicket>
          </TextTicketNumber>
        </ContainerTicketNumber>
      </LeftSideQrCodeClient>
      <RightSideQrCodeClient>
        <QrCodeContainer>
          <TextScanQrCode>
            • &nbsp; Scanner le Qr-code en dessous 👇
          </TextScanQrCode>
          <QRCodeClientElementContainer>
            <QrCodeShadow>
              <QRCodeSVG
                value={`https://localhost:3000/qr-code-client/
              )}`}
                bgColor={'transparent'}
                size={400}
              />
            </QrCodeShadow>
          </QRCodeClientElementContainer>
          <Hr></Hr>
          <ContainerLink>
            <TextTitleLinkQrCode>
              • &nbsp; Ou rendez-vous sur : <br />
              <TextLinkQrCode>https://NameOfApp/ticket/idticket</TextLinkQrCode>
            </TextTitleLinkQrCode>
          </ContainerLink>
        </QrCodeContainer>
      </RightSideQrCodeClient>
    </ContainerQrCodeClient>
  );
};

export default QRCodeClient;
