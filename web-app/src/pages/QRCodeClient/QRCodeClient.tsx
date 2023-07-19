import { useLazyQuery, useQuery, useSubscription } from '@apollo/client';
import { URL_DEV } from 'config';
import {
  GET_TICKETS_BY_FLOW_ID,
  GET_TICKET_ADD_SUBSCRIPTION,
  GET_TICKET_BY_ID,
  SUBSCRIPTION_WITH_IDs,
} from 'gql-store';
import {
  Subscription,
  SubscriptionSubscriptionForTicketAddToFlowArgs,
  SubscriptionSubscriptionWithIdArgs
} from 'gql/graphql';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useLocation } from 'react-router-dom';
import { PropsDisplayNavbar } from 'utils';
import logoLarge from '../../assets/logo_flux_large.png';
import {
  ContainerCircle,
  ContainerLogoLarge,
  ContainerQrCodeClient,
  ContainerText,
  ContainerTicketNumber,
  LeftSideQrCodeClient,
  LogoLarge,
  NumberTicket,
  QRCodeClientElementContainer,
  QrCodeContainer,
  QrCodeShadow,
  RightSideQrCodeClient,
  TextCountDown,
  TextNoTicket,
  TextQrCodeClient,
  TextScanQrCode,
  TextTicketNumber,
} from './QrCodeClient.styled';

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
  /**
   * Query executée au montage du composant, elle recupere les tickets
   */
  const { data, loading } = useQuery(GET_TICKETS_BY_FLOW_ID, {
    variables: { flowId },
  });

  /**
   * Cette subscription ecoute un flux , quand un ticket est ajouter , il reçoit son id
   */
  const { data: dataSub } = useSubscription<
    Subscription,
    SubscriptionSubscriptionForTicketAddToFlowArgs
  >(GET_TICKET_ADD_SUBSCRIPTION, {
    variables: { id: flowId },
    shouldResubscribe: true,
  });

  /**
   * Cette query permet de recuperer un ticket en db
   * Quand la query est complete(receved), elle ajoute le tickets dans un state
   */
  const [getTicketWithId] = useLazyQuery(GET_TICKET_BY_ID, {
    onCompleted(data) {
      setNewTicket(data.getTicketById);
    },
  });
  /**
   * Cette subscription ecoute tout les tickets presents dans le flux
   */
  const { data: dataSubAllTickets } = useSubscription<
    Subscription,
    SubscriptionSubscriptionWithIdArgs
  >(SUBSCRIPTION_WITH_IDs, {
    variables: { ids: ids },
    shouldResubscribe: true,
  });

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
        seconds: 10,
      }));
      setArrayTickets(newArraySorted.filter((e) => e.isTrash === false));
    }
  }, [data, loading]);

  useEffect(() => {
    let newArraySorted: TicketWithSeconds[] = [];
    if (newTicket && arrayTickets) {
      //implemente la valeurs seconde dans le ticket
      let newTicketWithSecond: TicketWithSeconds = {
        ...newTicket,
        seconds: 10,
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
        extractIds(newArraySorted);
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

            arrayTicketSorted = arrayTicketSorted.filter(
              (ticket) => ticket.id !== currentTicketId.id
            );
            setArrayTickets(
              arrayTicketSorted.length === 0 ? [] : arrayTicketSorted
            );
            setCurrentTicketId(null);
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
          {currentTicketId ? (
            <TextTicketNumber>
              Numero d’attente :
              <NumberTicket>{convertIdFormat(currentTicketId.id)}</NumberTicket>
            </TextTicketNumber>
          ) : null}
        </ContainerTicketNumber>
      </LeftSideQrCodeClient>
      <RightSideQrCodeClient>
        {currentTicketId ? (
          <QrCodeContainer>
            <ContainerCircle>
              <CountdownCircleTimer
                isPlaying
                duration={10}
                colors={['#2E8DC2', '#fff12b', '#A30000', '#A30000']}
                colorsTime={[10, 6, 3, 0]}
                size={50}
                strokeWidth={5}
              >
                {renderTime}
              </CountdownCircleTimer>
              <TextCountDown>Temps restant </TextCountDown>
            </ContainerCircle>
            <TextScanQrCode>
              • &nbsp; Scanner le Qr-code en dessous 👇
            </TextScanQrCode>
            <QRCodeClientElementContainer>
              <QrCodeShadow>
                <QRCodeSVG
                  value={`${URL_DEV}pages-client/${currentTicketId?.id}`}
                  bgColor={'transparent'}
                  size={400}
                />
              </QrCodeShadow>
            </QRCodeClientElementContainer>
          </QrCodeContainer>
        ) : (
          <NoTicketContainer>
            <TextNoTicket>Aucun ticket en cours </TextNoTicket>
          </NoTicketContainer>
        )}
      </RightSideQrCodeClient>
    </ContainerQrCodeClient>
  );
};

export default QRCodeClient;
