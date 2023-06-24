import { Text, View, StyleSheet } from 'react-native';
import {
  COLOR_ERROR_TICKET,
  COLOR_NOSCAN_TICKET,
  COLOR_VALIDATE_TICKET,
  COLOR_WAITING_TICKET,
} from '../../styles/style-constants';
import { DataTable } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: `#fefefe`,
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
  row: { backgroundColor: `#ecedf06e`, height: 112 },
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});

const MesFlux = () => {
  return (
    <View style={styles.container}>
      <DataTable style={styles.table}>
        <DataTable.Header style={styles.head}>
          <DataTable.Title>
            <Text>Le camion vert</Text>
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
              <Text>10</Text>
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
              <Text>2</Text>
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
              <Text>20</Text>
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
              <Text>2</Text>
            </View>
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
};

const StatusBubble = ({ color }) => (
  <View style={[styles.bubble, { backgroundColor: color }]} />
);

export default MesFlux;
