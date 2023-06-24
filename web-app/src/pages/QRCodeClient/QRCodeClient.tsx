import { useEffect, useRef, useState } from 'react';
import {
  ContainerCircle,
  ContainerLink,
  ContainerLogoLarge,
  ContainerQrCodeClient,
  ContainerText,
  ContainerTicketNumber,
  Hr,
  LeftSideQrCodeClient,
  LogoLarge,
  NoTicketContainer,
  NumberTicket,
  QRCodeClientElementContainer,
  QrCodeContainer,
  QrCodeShadow,
  RightSideQrCodeClient,
  TextCountDown,
  TextLinkQrCode,
  TextNoTicket,
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
  SubscriptionSubscriptionWithIdArgs,
  Ticket,
} from 'gql/graphql';
import {
  GET_TICKETS_BY_FLOW_ID,
  GET_TICKET_ADD_SUBSCRIPTION,
  GET_TICKET_BY_ID,
  SUBSCRIPTION_WITH_IDs,
} from 'gql-store';
import { URL_DEV } from 'config';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface TicketWithSeconds extends Ticket {
  seconds: number;
}

const QRCodeClient = ({ displayNavbar }: PropsDisplayNavbar) => {
  useEffect(() => {
    displayNavbar(false);
    return () => {
      displayNavbar(false);
    };
  });

  const [arrayTickets, setArrayTickets] = useState<
    Array<TicketWithSeconds> | []
  >();
  const [ids, setIds] = useState(Array<string>);
  const [currentTicketId, setCurrentTicketId] =
    useState<TicketWithSeconds | null>(null);

  const [newTicket, setNewTicket] = useState<Ticket>();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  //Recupere le flow id contenu dans l'url
  let location = useLocation();
  let flowId: string = location.state;
  /**
   * Query executé au montage du composant, elle recupere les tickets
   */
  const { data, loading } = useQuery(GET_TICKETS_BY_FLOW_ID, {
    variables: { flowId },
  });

  /**
   * Cette subscription ecoute un flux , quand un ticket est ajouter , il recoit son id
   */
  const { data: dataSub, loading: subLoading } = useSubscription<
    Subscription,
    SubscriptionSubscriptionForTicketAddToFlowArgs
  >(GET_TICKET_ADD_SUBSCRIPTION, {
    variables: { id: flowId },
  });
  /**
   * Ce useEffect est execute quand dataSub recoit un message avec un id de ticket
   * Il execute un query pour recuperer le ticket
   */
  useEffect(() => {
    getTicketWithId({
      variables: { id: dataSub?.SubscriptionForTicketAddToFlow.id },
    });
  }, [dataSub]);

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
  const { data: dataSubAllTickets, loading: loadingSubTickets } =
    useSubscription<Subscription, SubscriptionSubscriptionWithIdArgs>(
      SUBSCRIPTION_WITH_IDs,
      {
        variables: { ids: ids },
        shouldResubscribe: true,
      }
    );

  /**
   * Ce useEffect s'execute quand dataSubAllTickets recois un message de modification d'un tickets
   * Il enleve ce ticket dans le tableau arrayTickets
   */
  useEffect(() => {
    setArrayTickets(
      arrayTickets?.filter(
        (ticket) => ticket.id === dataSubAllTickets?.subscriptionWithId.id
      )
    );
  }, [dataSubAllTickets]);

  /** Fonction pour trier en fonction de la date du tickets
   * +
   * supprime tickets qui sont deja scanner ou dans la corbeille */
  const arraySorted = (array: TicketWithSeconds[]) => {
    return array
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .filter((ticket) => {
        return (
          ticket.status === 'Ticket non scanné' && ticket.isTrash === false
        );
      });
  };
  /**Ce useEffect est executé a la reponse de la premiere query
   * Il ajoute les tickets deja presents dans le flux  */
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
      setArrayTickets(arraySorted(newArraySorted));
      extractIds(newArraySorted);
    }
  }, [data, loading]);

  /** Ce UseEffect est dedié au nouveau ticket ajouter dans un flux
   *  Il est executer quand la valeur de newTicket change */
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
      //reset tableau
      newArraySorted = [];
    }
  }, [newTicket]);

  useEffect(() => {
    if (arrayTickets) {
      if (arrayTickets.length === 0) {
        console.log('Tous les tickets ont été traités.');
      }
      //trie le tableau
      let arrayTicketSorted = arraySorted(arrayTickets);

      if (currentTicketId) {
        console.log(`Affichage du ticket ID: ${currentTicketId.id}`);
        // Supprimer le timer existant s'il y en a un
        if (timerRef.current) {
          clearInterval(timerRef.current as NodeJS.Timeout);
        }

        // Démarrer un nouveau timer
        timerRef.current = setInterval(() => {
          currentTicketId.seconds--;
          console.log(
            `Ticket ID: ${currentTicketId.id}, Timer: ${currentTicketId.seconds}`
          );
          //si fin du temps ou que mon currentTicket a subi un changement de statu
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
            console.warn(arrayTicketSorted);
            setArrayTickets(
              arrayTicketSorted.length === 0 ? [] : arrayTicketSorted
            );
            setCurrentTicketId(null);
          }
        }, 1000);
      } else {
        //defini le ticket a afficher, toujours le premier du tableau
        setCurrentTicketId(arrayTicketSorted[0]);
      }
    }
  }, [
    arrayTickets,
    arrayTickets?.length,
    currentTicketId,
    dataSubAllTickets?.subscriptionWithId.id,
  ]);

  function extractIds(ticketArray: Array<TicketWithSeconds>) {
    var idsArray: Array<string> = [];
    for (var i = 0; i < ticketArray.length; i++) {
      var ticket = ticketArray[i];
      idsArray.push(ticket.id);
    }
    setIds(idsArray);
  }

  const convertIdFormat = (id: string) => {
    const shortId = id.toUpperCase().split('');
    shortId.splice(5, shortId.length).join('');
    return shortId;
  };
  const renderTime = ({ remainingTime }: any) => {
    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
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
              Numero d’attente : <br />
              <NumberTicket>
                <p>{convertIdFormat(currentTicketId.id)}</p>
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
                duration={10}
                colors={['#004777', '#F7B801', '#A30000', '#A30000']}
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
            <Hr></Hr>
            <ContainerLink>
              <TextTitleLinkQrCode>
                • &nbsp; Ou rendez-vous sur : <br />
                <TextLinkQrCode>
                  {URL_DEV}pages-client/{currentTicketId?.id}
                </TextLinkQrCode>
              </TextTitleLinkQrCode>
            </ContainerLink>
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
