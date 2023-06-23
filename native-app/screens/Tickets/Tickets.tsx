import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import { mockedFlowTickets } from './MockedTickets';
import {
  COLOR_ERROR_TICKET,
  COLOR_VALIDATE_TICKET,
  COLOR_WAITING_TICKET,
} from '../../styles/style-constants';

export type FlowTicket = {
  Date: string;
  Number: number;
  Status: string;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: `#fefefe`,
  },
  table: {
    borderRadius: 15,
    overflow: 'hidden',
    maxHeight: 500,
  },
  head: {
    height: 50,
    backgroundColor: `#ecedf06e`,
  },
  row: { backgroundColor: `#ecedf06e` },
  bubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  bubbleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const getStatusColor = (status: string) => {
  switch (status) {
    case 'En attente':
      return `${COLOR_WAITING_TICKET}`;
    case 'Ticket non scanné':
      return `${COLOR_WAITING_TICKET}`;
    case 'Incident':
      return `${COLOR_ERROR_TICKET}`;
    case 'Ticket validé':
      return `${COLOR_VALIDATE_TICKET}`;
    default:
      return '#989898';
  }
};

const Tickets = () => {
  const [flowTickets, setFlowTickets] = useState<FlowTicket[]>();

  useEffect(() => {
    const fetchFlowTickets = async () => {
      try {
        setFlowTickets(mockedFlowTickets);
      } catch (error) {
        console.error('Error fetching flow tickets:', error);
      }
    };

    fetchFlowTickets();
  }, []);

  return (
    <View style={styles.container}>
      <DataTable style={styles.table}>
        <DataTable.Header style={styles.head}>
          <DataTable.Title>
            <Text>Date</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text>Numéro</Text>
          </DataTable.Title>
          <DataTable.Title>
            <Text>Statut</Text>
          </DataTable.Title>
        </DataTable.Header>
        <ScrollView>
          {flowTickets &&
            flowTickets?.map((flowTicket, index) => {
              const statusColor = getStatusColor(flowTicket.Status);
              return (
                <DataTable.Row style={styles.row} key={index}>
                  <DataTable.Cell>{flowTicket.Date}</DataTable.Cell>
                  <DataTable.Cell>{flowTicket.Number}</DataTable.Cell>
                  <DataTable.Cell>
                    <View style={styles.bubbleContainer}>
                      <StatusBubble color={statusColor} />
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            })}
        </ScrollView>
      </DataTable>
    </View>
  );
};

const StatusBubble = ({ color }) => (
  <View style={[styles.bubble, { backgroundColor: color }]} />
);

export default Tickets;
