import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {
  COLOR_ERROR_TICKET,
  COLOR_NOSCAN_TICKET,
  COLOR_VALIDATE_TICKET,
  COLOR_WAITING_TICKET,
} from '../../styles/style-constants';
import { DataTable } from 'react-native-paper';
import DropDown from '../../components/Select/DropDown';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import SignOut from '../SignOut/SignOut';
import SwitchComponent from '../../components/Switch/Switch';

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

const MesFlux = () => {
  const appContext = useContext(AppContext);

  const [flowSelected, setFlowSelected] = useState<Flow | null>(null);
  useEffect(() => {
    if (appContext?.selectedFlow && appContext?.userProfile) {
      let flow = appContext?.userProfile.myProfile.flows.find(
        (flow) => flow.id === appContext?.selectedFlow.value
      );
      setFlowSelected(flow);
      appContext.refetch();
    }
  }, [appContext]);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    appContext.refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const [darkMode, setDarkMode] = useState<boolean>();
  useEffect(() => {
    if (appContext) {
      setDarkMode(appContext.darkMode);
    }
  }, [appContext]);

  const styles = StyleSheet.create({
    globalContainer: {
      flexGrow: 1,
      // paddingTop: 20,
      // borderColor: 'red',
      // borderWidth: 1,
      backgroundColor: `${darkMode ? '#2D2D30' : '#fefefe'}`,
      fontFamily: 'Quicksand_400Regular',
    },
    signOut: {
      marginTop: 30,
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
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    },
    containerloading: {
      display: 'flex',
      height: '70%',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    text: {
      fontFamily: 'Quicksand_400Regular',
      fontSize: 15,
      color: `${darkMode ? 'white' : 'black'}`,
    },
    textWelcome: {
      fontFamily: 'Quicksand_400Regular',
      fontSize: 30,
      margin: 15,
      color: `${darkMode ? 'white' : 'black'}`,
    },
  });
  const StatusBubble = ({ color }) => (
    <View style={[styles.bubble, { backgroundColor: color }]} />
  );
  return (
    <ScrollView
      style={styles.globalContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {appContext?.userProfile?.myProfile.firstName !== undefined ? (
        <Text style={styles.textWelcome}>
          Bonjour {appContext?.userProfile?.myProfile.firstName}
        </Text>
      ) : null}
      <DropDown />
      <View style={styles.container}>
        <DataTable style={styles.table}>
          <DataTable.Header style={styles.head}>
            <DataTable.Title>
              <Text style={styles.text}>
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
                <Text style={styles.text}>Ticket non scanné</Text>
                <Text style={styles.text}>
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
                <Text style={styles.text}>En attente</Text>
                <Text style={styles.text}>
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
                <Text style={styles.text}>Ticket validé</Text>
                <Text style={styles.text}>
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
                <Text style={styles.text}>Incident</Text>
                <Text style={styles.text}>
                  {' '}
                  {flowSelected !== null
                    ? `${flowSelected.calculateTicketCounts.incident}`
                    : 'Chargement... '}
                </Text>
              </View>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <View style={styles.signOut}>
          <SignOut></SignOut>
        
        </View>
      </View>
    </ScrollView>
  );
};

export default MesFlux;
