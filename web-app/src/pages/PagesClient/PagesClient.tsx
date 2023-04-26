import { useParams } from 'react-router-dom';
import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import {
  ChangeTicketStatusMutation,
  GetTicketByIdQuery,
  Subscription,
  SubscriptionSubscriptionWithIdArgs,
} from 'gql/graphql';
import { useEffect, useState } from 'react';
import {
  Card,
  ContainerCard,
  ContainerIconStatus,
  ContainerLogoMobile,
  ContainerPages,
  ContainerTextMobile,
  LogoMobile,
  TextCardMobile,
  TextLightMobile,
  TextMobile,
} from './PagesClient.styled';
import logoMobile from '../../assets/logo_mobile.png';
import { toast } from 'react-toastify';
import { RiErrorWarningLine } from 'react-icons/ri';
import { BsClockHistory } from 'react-icons/bs';
import { HiOutlineCheck } from 'react-icons/hi';
import { log } from 'console';

enum ColorStatus {
  'En attente' = '#61A7CE',
  'Ticket validé' = '#2BC016',
  'Incident' = '#D93737',
}

const GET_TICKET_BY_ID = gql`
  query getTicketById($id: String!) {
    getTicketById(id: $id) {
      isTrash
      id
      status
    }
  }
`;

const CHANGE_TICKET_STATUS_BY_ID = gql`
  mutation ChangeTicketStatus($id: String!, $status: String!) {
    changeTicketStatus(id: $id, status: $status) {
      date
      id
      status
    }
  }
`;

const SUBSCRIPTION_WITH_ID = gql`
  subscription Subscription($id: String) {
    subscriptionWithId(id: $id) {
      message
      id
    }
  }
`;
const PagesClient = ({ displayNavbar }: any) => {
  const { id } = useParams();
  const [status, setStatus] = useState('');

  useEffect(() => {
    displayNavbar(false);
    return () => {
      displayNavbar(false);
    };
  });

  const { data: dataQuery, refetch } = useQuery<GetTicketByIdQuery>(
    GET_TICKET_BY_ID,
    { variables: { id: id } }
  );

  const [changeticketStatus] = useMutation<ChangeTicketStatusMutation>(
    CHANGE_TICKET_STATUS_BY_ID
  );

  const { data: dataSub, loading } = useSubscription<
    Subscription,
    SubscriptionSubscriptionWithIdArgs
  >(SUBSCRIPTION_WITH_ID, {
    variables: { id },
  });

  const quicklyChangeStatus = async () => {
    try {
      await changeticketStatus({
        variables: { id: id, status: 'En attente' },
      });
      refetch({ id: id });
    } catch {
      toast.error('Un problème est survenue, veuillez réessayer');
    }
  };

  if (dataQuery && dataQuery.getTicketById.status) {
    if (dataQuery.getTicketById.status === 'Ticket non scanné') {
      quicklyChangeStatus();
    }
  }

  useEffect(() => {
    if (loading && dataQuery) {
      setStatus(dataQuery.getTicketById.status);
    }
    if (!loading && dataSub) {
      setStatus(dataSub.subscriptionWithId.message);
    }
  }, [dataQuery, dataSub, loading]);

  const cardDisplay = () => {
    switch (status) {
      case 'En attente':
        return (
          <Card
            style={{
              backgroundColor: `${
                ColorStatus[status as keyof typeof ColorStatus]
              }`,
            }}
          >
            <ContainerIconStatus>
              <BsClockHistory size={'80%'} color="white" />
            </ContainerIconStatus>
            <TextCardMobile>Vous êtes toujours en attente !</TextCardMobile>
            <TextCardMobile>
              Votre commande est en cours de préparation !
            </TextCardMobile>
          </Card>
        );

      case 'Ticket validé':
        return (
          <Card
            style={{
              backgroundColor: `${
                ColorStatus[status as keyof typeof ColorStatus]
              }`,
            }}
          >
            <ContainerIconStatus>
              <HiOutlineCheck size={'80%'} color="white" />
            </ContainerIconStatus>
            <TextCardMobile>Votre commande est prête ! </TextCardMobile>
            <TextCardMobile>
              Vous pouvez la récupérer auprès de votre vendeur !
            </TextCardMobile>
          </Card>
        );

      case 'Incident':
        return (
          <Card
            style={{
              backgroundColor: `${
                ColorStatus[status as keyof typeof ColorStatus]
              }`,
            }}
          >
            <ContainerIconStatus>
              <RiErrorWarningLine size={'80%'} color="white" />
            </ContainerIconStatus>
            <TextCardMobile>
              On dirait qu’il y a un probleme avec votre commande !
            </TextCardMobile>
            <TextCardMobile>
              On vous invite à retourner voir votre vendeur !
            </TextCardMobile>
          </Card>
        );
    }
  };

  return (
    <ContainerPages>
      <ContainerLogoMobile>
        <LogoMobile src={logoMobile}></LogoMobile>
      </ContainerLogoMobile>
      <ContainerTextMobile>
        <TextMobile>Bienvenue sur Flux ! 👋</TextMobile>
        <TextLightMobile>
          Ici, vous êtes informé(e) en direct de l'avancement de votre commande.
        </TextLightMobile>
      </ContainerTextMobile>
      <ContainerCard>{cardDisplay()}</ContainerCard>
    </ContainerPages>
  );
};

export default PagesClient;
