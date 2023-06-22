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
import { useLazyQuery, useQuery, useSubscription } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import {
  Subscription,
  SubscriptionSubscriptionForTicketAddToFlowArgs,
} from 'gql/graphql';
import {
  GET_TICKETS_BY_FLOW_ID,
  GET_TICKET_ADD_SUBSCRIPTION,
  GET_TICKET_BY_ID,
} from 'gql-store';


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

  //Recupere le flow id contenu dans l'url
  let location = useLocation();
  let flowId: string = location.state;

  const { data, loading } = useQuery(GET_TICKETS_BY_FLOW_ID, {
    variables: { flowId },
  });

  const [
    getTicketWithId,
    { data: dataQueryTicket, loading: dataQueryLoading },
  ] = useLazyQuery(GET_TICKET_BY_ID);

  const { data: dataSub, loading: subLoading } = useSubscription<
    Subscription,
    SubscriptionSubscriptionForTicketAddToFlowArgs
  >(GET_TICKET_ADD_SUBSCRIPTION, {
    variables: { id : flowId },
    shouldResubscribe: true,
  });

  console.log(currentTicketId);
  // const { data: dataSubChangeStatus, loading: loadingSubChangeStatus } =
  //   useSubscription<SubscriptionSubscriptionWithIdArgs>(SUBSCRIPTION_WITH_ID, {
  //     skip: !currentTicketId,
  //     variables: { id: currentTicketId?.id },
  //     shouldResubscribe: true,
  //   });

  //Fonction pour trier en fonction de la date du tickets
  const arraySorted = (array: TicketWithSeconds[]) => {
    return array.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  useEffect(() => {
    let newArraySorted: TicketWithSeconds[] = [];
    if (!loading) {
      /**
       * Recupere les tickets deja present dans le flow
       * Rajoute dans chaque tickets, la valeur seconds
       * Verifier si les tickets ne sont pas en corbeille, puis rajoute le tableau dans un state
       */
      let arrayWithNewTickets = data.getTicketsByFlowId.tickets.slice();
      newArraySorted = arrayWithNewTickets.map((ticket: any, index: any) => ({
        ...ticket,
        seconds: 500,
      }));
      setArrayTickets(newArraySorted.filter((e) => e.isTrash === false));
    }
  }, [data, loading]);

  useEffect(() => {
    let newArraySorted: TicketWithSeconds[] = [];

    if (!subLoading && dataSub) {
      //Execute la query pour recuperer un ticket via id
      getTicketWithId({
        variables: { id: dataSub.SubscriptionForTicketAddToFlow.id },
      });

      if (dataQueryTicket) {
        //implemente la valeurs seconde dans le ticket
        let newTicketWithSecond: TicketWithSeconds = {
          ...dataQueryTicket.getTicketById,
          seconds: 500,
        };

        //Verifie si le ticket n'est pas deja present dans le tableau
        if (arrayTickets.some((el) => el.id === newTicketWithSecond.id)) {
          return;
        } else {
          //recupere le state
          newArraySorted = arrayTickets;
          //rajoute le nouveau ticket
          newArraySorted.push(newTicketWithSecond);
          //re-set le tableau avec le nouveau ticket
          setArrayTickets(newArraySorted);
        }
        //reset tableau
        newArraySorted = [];
      }
    }
  }, [dataSub, dataQueryTicket]);

  useEffect(() => {
    if (arrayTickets.length === 0) {
      console.log('Tous les tickets ont été traités.');
      return;
    }

    //trie le tableau
    let arrayTicketSorted = arraySorted(arrayTickets);

    if (currentTicketId) {
      console.log(`Affichage du ticket ID: ${currentTicketId.id}`);

      const timer = setInterval(() => {
        currentTicketId.seconds--;
        console.log(
          `Ticket ID: ${currentTicketId.id}, Timer: ${currentTicketId.seconds}`
        );

        if (currentTicketId.seconds === 0 || currentTicketId.seconds < 0) {
          clearInterval(timer);
          setCurrentTicketId(null);
          arrayTickets.shift();
          console.log(arrayTickets.length);
          if (arrayTickets.length === 0) {
            setArrayTickets([]);
          }
        }
      }, 1000);
    } else {
      //defini le ticket a afficher, toujours le premier du tableau
      setCurrentTicketId(arrayTicketSorted[0]);
    }
  }, [arrayTickets, currentTicketId]);

  // useEffect(() => {

  // }, [dataSubChangeStatus]);

  const convertIdFormat = (id: string) => {
    const shortId = id.toUpperCase().split('');
    shortId.splice(5, shortId.length).join('');
    return shortId;
  };

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
              {currentTicketId ? (
                <p>{convertIdFormat(currentTicketId.id)}</p>
              ) : (
                <p>lol</p>
              )}
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
