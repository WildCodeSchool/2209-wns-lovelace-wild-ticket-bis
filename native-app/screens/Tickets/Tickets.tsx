import { useCallback, useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { DataTable } from 'react-native-paper';
import { mockedFlowTickets } from './MockedTickets';
import {
  COLOR_ERROR_TICKET,
  COLOR_NOSCAN_TICKET,
  COLOR_VALIDATE_TICKET,
  COLOR_WAITING_TICKET,
} from '../../styles/style-constants';
import { AppContext } from '../../context/AppContext';
import { useQuery } from '@apollo/client';
import { GetTicketsByFlowIdQuery, Ticket } from '../../gql/graphql';
import { GET_TICKETS_BY_FLOW_ID } from '../../gql-store';

export type FlowTicket = {
  Date: string;
  Number: number;
  Status: string;
};

export type Flow = {
  __typename?: 'Ticket' | undefined;
  date: string;
  id: string;
  isTrash: boolean;
  status: string;
}[];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'En attente':
      return `${COLOR_WAITING_TICKET}`;
    case 'Ticket non scanné':
      return `${COLOR_NOSCAN_TICKET}`;
    case 'Incident':
      return `${COLOR_ERROR_TICKET}`;
    case 'Ticket validé':
      return `${COLOR_VALIDATE_TICKET}`;
    default:
      return '#989898';
  }
};

const Tickets = () => {
  const appContext = useContext(AppContext);
  const [flowTickets, setFlowTickets] = useState<Flow>();
  const [flowName, setFlowName] = useState<string>();
  const [darkMode, setDarkMode] = useState<boolean>();

  const { data, refetch } = useQuery<GetTicketsByFlowIdQuery>(
    GET_TICKETS_BY_FLOW_ID
  );
  const convertIdFormat = (id: string) => {
    const shortId = id.toUpperCase().split('');
    shortId.splice(5, shortId.length).join('');
    return shortId;
  };

  useEffect(() => {
    if (appContext) {
      setDarkMode(appContext.darkMode);
    }
  }, [appContext]);

  const convertDateFormat = (isoDate: string) => {
    const date = new Date(isoDate);
    const dateResult = date.toLocaleDateString('en-Gb', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    return dateResult;
  };

  useEffect(() => {
    refetch({ flowId: appContext?.selectedFlow?.value });
    if (data?.getTicketsByFlowId) {
      setFlowTickets(
        data.getTicketsByFlowId.tickets.filter(
          (ticket) => ticket.isTrash !== true
        )
      );
      setFlowName(data.getTicketsByFlowId.flowName);
    }
  }, [appContext?.selectedFlow?.value, data, refetch]);

  const handleDarkMode = () => {
    appContext.setDarkMode(!appContext.darkMode);
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 10,
      paddingHorizontal: 20,
      backgroundColor: `${darkMode ? '#2D2D30' : '#fefefe'}`,
      alignItems: 'center',
    },
    table: {
      borderRadius: 15,
      overflow: 'hidden',
      maxHeight: 450,
      backgroundColor: `${darkMode ? '#2D2D30' : '#ecedf06e'}`,
    },
    head: {
      height: 50,
      backgroundColor: `#ecedf06e`,
    },
    bubble: {
      width: 20,
      height: 20,
      borderRadius: 10,
    },
    dateCell: {
      width: 10,
      height: 50,
      margin: 0,
      color: `${darkMode ? 'white' : 'black'}`,
    },
    row: {
      backgroundColor: `#ecedf06e`,
      textAlign: 'center',
      padding: 0,
      width: '100%',
      flex: 1,
      alignContent: 'flex-start',
      color: `${darkMode ? 'white' : 'black'}`,
    },

    bubbleContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    textWelcome: {
      fontFamily: 'Quicksand_400Regular',
      fontSize: 25,
      margin: 15,
      color: `${darkMode ? 'white' : 'black'}`,
      alignSelf: 'flex-start',
    },
    containerLegend: {
      borderRadius: 10,
      height: 100,
      width: '100%',
      margin: 20,
      flex: 1,
      flexDirection: 'row',
      maxHeight: 100,
      backgroundColor: `#ecedf06e`,
    },

    bubbleContainerLeft: {
      height: '100%',
      width: '50%',
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'space-evenly',
    },
    bubbleContainerRight: {
      height: '100%',
      width: '50%',
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'space-evenly',
    },
    text: {
      fontFamily: 'Quicksand_400Regular',
      fontSize: 15,
      color: `${darkMode ? 'white' : 'black'}`,
    },
  });
  const StatusBubble = ({ color }) => (
    <View style={[styles.bubble, { backgroundColor: color }]} />
  );
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch({ flowId: appContext?.selectedFlow?.value });
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textWelcome}>{flowName}</Text>
      <DataTable style={styles.table}>
        <DataTable.Header style={styles.head}>
          <DataTable.Title>
            <Text style={styles.text}>Date</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.text}>Numéro</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text style={styles.text}>Statut</Text>
          </DataTable.Title>
        </DataTable.Header>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={flowTickets}
          renderItem={(flowTicket) => {
            const statusColor = getStatusColor(flowTicket.item.status);
            return (
              <DataTable.Row style={styles.row}>
                <DataTable.Cell style={styles.dateCell}>
                  <Text style={styles.text}>
                    {convertDateFormat(flowTicket.item.date)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dateCell}>
                  <Text style={styles.text}>
                    {convertIdFormat(flowTicket.item.id)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={styles.dateCell}>
                  <View style={styles.bubbleContainer}>
                    <StatusBubble color={statusColor} />
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
            );
          }}
        />
      </DataTable>
      <View style={styles.containerLegend}>
        <View style={styles.bubbleContainerLeft}>
          <View style={styles.bubbleContainer}>
            <StatusBubble color="#61A7CE" />
            <Text style={styles.text}>En attente</Text>
          </View>
          <View style={styles.bubbleContainer}>
            <StatusBubble color="#F0D472" />
            <Text style={styles.text}>Non Scanné</Text>
          </View>
        </View>
        <View style={styles.bubbleContainerRight}>
          <View style={styles.bubbleContainer}>
            <TouchableOpacity onPress={handleDarkMode}>
              <StatusBubble color="#D93737" />
            </TouchableOpacity>
            <Text style={styles.text}>Incident</Text>
          </View>
          <View style={styles.bubbleContainer}>
            <StatusBubble color="#2BC016" />
            <Text style={styles.text}>Validé</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Tickets;
