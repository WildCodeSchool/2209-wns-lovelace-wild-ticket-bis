import { useQuery, useSubscription } from '@apollo/client';
import { URL_DEV } from 'config';
import {
  GET_TICKETS_BY_FLOW_ID,
  GET_TICKET_ADD_SUBSCRIPTION,
  SUBSCRIPTION_WITH_IDs,
} from 'gql-store';
import {
  Subscription,
  SubscriptionSubscriptionForTicketAddToFlowArgs,
  SubscriptionSubscriptionWithIdArgs,
} from 'gql/graphql';
import { useEffect, useRef, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useLocation } from 'react-router-dom';
import { PropsDisplayNavbar } from 'utils';
import logoLarge from '../../assets/logo_flux_large.png';
import {
  TicketWithSeconds,
  arraySortedByDate,
  convertIdFormat,
  extractIds,
  renderTime,
} from './QRCodeClient.services';
import {
  ContainerCircle,
  ContainerDesktop,
  ContainerLogoLarge,
  ContainerQrCodeClient,
  ContainerResponsive,
  ContainerText,
  ContainerTicketNumber,
  ContainerTicketNumberResponsive,
  LeftSideQrCodeClient,
  LogoLarge,
  NumberTicket,
  QRCodeClientElementContainer,
  QrCodeContainer,
  QrCodeSVG,
  QrCodeShadow,
  RightSideQrCodeClient,
  TextCountDown,
  TextNoTicket,
  TextQrCodeClient,
  TextScanQrCode,
  TextScanQrCodeResponsive,
  TextTicketNumber,
} from './QrCodeClient.styled';

const QRCodeClient = ({ displayNavbar }: PropsDisplayNavbar) => {
  //Recupere le flow id contenu dans l'url
  let location = useLocation();
  let flowId: string = location.state;

  const [arrayTickets, setArrayTickets] = useState(Array<TicketWithSeconds>);

  const [currentTicketId, setCurrentTicketId] =
    useState<TicketWithSeconds | null>(null);

  const { data, refetch, loading } = useQuery(GET_TICKETS_BY_FLOW_ID, {
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
   * Cette subscription ecoute tout les tickets presents dans le flux
   */
  const { data: dataSubAllTickets } = useSubscription<
    Subscription,
    SubscriptionSubscriptionWithIdArgs
  >(SUBSCRIPTION_WITH_IDs, {
    variables: { ids: ids },
    shouldResubscribe: true,
  });

  const TIMER = 10;

  useEffect(() => {
    displayNavbar(false);
    return () => {
      displayNavbar(false);
    };
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**Ce useEffect est executé a la reponse de la premiere query
   * Il ajoute les tickets deja presents dans le flux  */
  useEffect(() => {
    if (dataSubAllTickets?.subscriptionWithId.id) {
      setArrayTickets(
        arrayTickets?.filter(
          (ticket) => ticket.id === dataSubAllTickets?.subscriptionWithId.id
        )
      );
    }

    let ticketsWithTimer: TicketWithSeconds[] = [];
    if (!loading && data) {
      /**
       * Recupere les tickets deja present dans le flow
       * Rajoute dans chaque tickets, la valeur seconds
       * Verifier si les tickets ne sont pas en corbeille, puis rajoute le tableau dans un state
       */
      let arrayWithNewTickets: TicketWithSeconds[] =
        data.getTicketsByFlowId.tickets.slice();
      ticketsWithTimer = arrayWithNewTickets.map((ticket) => ({
        ...ticket,
        seconds: TIMER,
      }));
      setArrayTickets(arraySortedByDate(ticketsWithTimer));
      extractIds(ticketsWithTimer, setIds);
    }
    if (dataSub?.SubscriptionForTicketAddToFlow.id) {
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, dataSub?.SubscriptionForTicketAddToFlow.id, loading, refetch]);

  /*Use effect permettant de gérer le timer sur les tickets*/
  useEffect(() => {
    if (arrayTickets) {
      let arrayTicketSorted = arraySortedByDate(arrayTickets);
      if (currentTicketId) {
        // Supprimer le timer existant s'il y en a un
        if (timerRef.current) {
          clearInterval(timerRef.current as NodeJS.Timeout);
        }

        // Démarrer un nouveau timer
        timerRef.current = setInterval(() => {
          currentTicketId.seconds--;
          //si fin du temps ou que le currentTicket a subi un changement de statut
          if (
            currentTicketId.seconds === 0 ||
            dataSubAllTickets?.subscriptionWithId.id === currentTicketId.id
          ) {
            clearInterval(timerRef.current as NodeJS.Timeout);
            timerRef.current = null;
            // Supprime le ticket actuel du tableau
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

  return (
    <ContainerQrCodeClient>
      <ContainerDesktop>
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
                <NumberTicket>
                  {convertIdFormat(currentTicketId.id)}
                </NumberTicket>
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
                  duration={TIMER}
                  colors={['#2E8DC2', '#fff12b', '#f9d506', '#ff0000']}
                  colorsTime={[10, 6, 3, 0]}
                  size={50}
                  strokeWidth={5}
                >
                  {renderTime}
                </CountdownCircleTimer>
                <TextCountDown>Temps restant </TextCountDown>
              </ContainerCircle>
              <TextScanQrCode hidden={currentTicketId ? true : false}>
                • &nbsp; Scanner le Qr-code en dessous 👇
              </TextScanQrCode>
              <QRCodeClientElementContainer>
                <QrCodeShadow>
                  <QrCodeSVG
                    value={`${URL_DEV}pages-client/${currentTicketId?.id}`}
                    bgColor={'transparent'}
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
      </ContainerDesktop>
      <ContainerResponsive>
        <TextScanQrCodeResponsive hidden={currentTicketId ? true : false}>
          • &nbsp; Scanner le Qr-code en dessus 👆
        </TextScanQrCodeResponsive>
        <ContainerTicketNumberResponsive>
          {currentTicketId ? (
            <TextTicketNumber>
              Numero d’attente :
              <NumberTicket>{convertIdFormat(currentTicketId.id)}</NumberTicket>
            </TextTicketNumber>
          ) : null}
        </ContainerTicketNumberResponsive>
      </ContainerResponsive>
    </ContainerQrCodeClient>
  );
};

export default QRCodeClient;
