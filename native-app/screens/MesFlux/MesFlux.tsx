import { Text, View, StyleSheet } from 'react-native';
import {
  COLOR_ERROR_TICKET,
  COLOR_NOSCAN_TICKET,
  COLOR_VALIDATE_TICKET,
  COLOR_WAITING_TICKET,
} from '../../styles/style-constants';
import { DataTable } from 'react-native-paper';
import DropDown from '../../components/Select/DropDown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';

type Flow = {
  __typename?: 'Flow';
  flowName: string;
  id: string;
  date: string;
  calculateTicketCounts: {
    __typename?: 'NumberOfTickets';
    incident?: number | null;
    nonScanned?: number | null;
    validate?: number | null;
    waiting?: number | null;
  };
};

const styles = StyleSheet.create({
  globalContainer: {
    flex: 1,
    backgroundColor: `#fefefe`,
  },
  dropdown: {
    paddingBottom: 5,
  },
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  table: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  head: {
    height: 50,
    backgroundColor: `#ecedf06e`,
  },
  row: { backgroundColor: `#ecedf06e`, height: 100 },
  bubble: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  bubbleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50,
  },
  status: {
    justifyContent: 'center',
    gap: 15,
  },
  containerloading: {
    display: 'flex',
    height: '70%',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const MesFlux = () => {
  const appContext = useContext(AppContext);

  const [flowSelected, setFlowSelected] = useState<Flow | null>(null);
  useEffect(() => {
    // console.log(appContext.serverError);
    if (appContext?.selectedFlow && appContext?.userProfile) {
      let flow = appContext?.userProfile.myProfile.flows.find(
        (flow) => flow.id === appContext?.selectedFlow.value
      );
      setFlowSelected(flow);
    }
 
  }, [appContext]);

  return (
    <View style={styles.globalContainer}>
      <DropDown />

      <View style={styles.container}>
        <DataTable style={styles.table}>
          <DataTable.Header style={styles.head}>
            <DataTable.Title>
              <Text>
                {flowSelected !== null
                  ? `${flowSelected.flowName}`
                  : 'Chargement... '}
              </Text>
            </DataTable.Title>
          </DataTable.Header>
          <DataTable.Row style={styles.row}>
            <DataTable.Cell>
              <View style={styles.bubbleContainer}>
                <StatusBubble color={`${COLOR_NOSCAN_TICKET}`} />
              </View>
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={styles.status}>
                <Text>Ticket non scanné</Text>
                <Text>
                  {flowSelected !== null
                    ? `${flowSelected.calculateTicketCounts.nonScanned}`
                    : 'Chargement... '}
                </Text>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.row}>
            <DataTable.Cell>
              <View style={styles.bubbleContainer}>
                <StatusBubble color={`${COLOR_WAITING_TICKET}`} />
              </View>
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={styles.status}>
                <Text>En attente</Text>
                <Text>
                  {' '}
                  {flowSelected !== null
                    ? `${flowSelected.calculateTicketCounts.waiting}`
                    : 'Chargement... '}
                </Text>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.row}>
            <DataTable.Cell>
              <View style={styles.bubbleContainer}>
                <StatusBubble color={`${COLOR_VALIDATE_TICKET}`} />
              </View>
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={styles.status}>
                <Text>Ticket validé</Text>
                <Text>
                  {' '}
                  {flowSelected !== null
                    ? `${flowSelected.calculateTicketCounts.validate}`
                    : 'Chargement... '}
                </Text>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row style={styles.row}>
            <DataTable.Cell>
              <View style={styles.bubbleContainer}>
                <StatusBubble color={`${COLOR_ERROR_TICKET}`} />
              </View>
            </DataTable.Cell>
            <DataTable.Cell>
              <View style={styles.status}>
                <Text>Incident</Text>
                <Text>
                  {' '}
                  {flowSelected !== null
                    ? `${flowSelected.calculateTicketCounts.incident}`
                    : 'Chargement... '}
                </Text>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </View>
  );
};

const StatusBubble = ({ color }) => (
  <View style={[styles.bubble, { backgroundColor: color }]} />
);

export default MesFlux;
