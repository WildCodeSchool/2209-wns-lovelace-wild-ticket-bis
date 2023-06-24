import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { TITLE_FONT_COLOR } from '../../styles/style-constants';

const DropDown = () => {
  const countries = [
    'Egypt',
    'Canada',
    'Australia',
    'Ireland',
    'Brazil',
    'England',
    'Dubai',
    'France',
    'Germany',
    'Saudi Arabia',
    'Argentina',
    'India',
  ];
  return (
    <SafeAreaView style={styles.saveAreaViewContainer}>
      <View style={styles.viewContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <Text>Flux Sélectionné :</Text>
          <SelectDropdown
            data={countries}
            defaultValueByIndex={1}
            defaultValue={'England'}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultButtonText={'Select country'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={(isOpened) => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={`${TITLE_FONT_COLOR}`}
                  size={18}
                />
              );
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#1b1b1b',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: { color: '#a6a6a6', fontWeight: 'bold', fontSize: 16 },
  saveAreaViewContainer: { flex: 1, backgroundColor: '#FFF' },
  viewContainer: { backgroundColor: '#FFF' },
  scrollViewContainer: {
    paddingTop: 5,
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#ecedf06e',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: `${TITLE_FONT_COLOR}`,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#ecedf06e',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: {
    backgroundColor: '#ecedf0',
    borderBottomColor: '#ecedf0',
  },
  dropdown2RowTxtStyle: {
    color: `${TITLE_FONT_COLOR}`,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DropDown;
