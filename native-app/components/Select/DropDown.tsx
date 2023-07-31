import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { TITLE_FONT_COLOR } from '../../styles/style-constants';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Flow } from '../../gql/graphql';

const DropDown = () => {
  const [flowsOptions, setFlowsOptions] = useState<
    { value: string; label: string }[] | null
  >();

  const [isInitialFlowSelected, setIsInitialFlowSelected] = useState(false);
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext?.userProfile?.myProfile.flows) {
      const flowOptions = appContext.userProfile.myProfile.flows.map(
        (flow: Flow) => ({
          value: flow.id,
          label: flow.flowName,
        })
      );
      setFlowsOptions(flowOptions);
      if (flowOptions.length > 0 && isInitialFlowSelected === false) {
        appContext?.setSelectedFlow({
          label: flowOptions[0].label,
          value: flowOptions[0].value,
        });

        setIsInitialFlowSelected(true);
      } else if (flowOptions.length === 0) {
        setIsInitialFlowSelected(false);
      }
    }
  }, [appContext, isInitialFlowSelected]);

  const handleChangeSelectedFlow = (e) => {
    let res = flowsOptions.find((obj) => obj.label === e) || null;
    appContext?.setSelectedFlow({
      label: res.label,
      value: res.value,
    });
    appContext.refetch();
  };
  const [darkMode, setDarkMode] = useState<boolean>();
  useEffect(() => {
    if (appContext) {
      setDarkMode(appContext.darkMode);
    }
  }, [appContext]);

  const styles = StyleSheet.create({
    label: {
      paddingLeft: 40,
      fontWeight: '500',
      fontFamily: 'Quicksand_400Regular',
      fontSize: 20,
      color: `${darkMode ? 'white' : 'black'}`,
    },
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
      backgroundColor: `${darkMode ? '#2D2D30' : '#fefefe'}`,
    },
    headerTitle: { color: '#a6a6a6', fontWeight: 'bold', fontSize: 16 },
    saveAreaViewContainer: {
      flex: 1,
      margin: 10,
      backgroundColor: '#FFF',
    },
    viewContainer: {
      backgroundColor: `${darkMode ? '#2D2D30' : '#fefefe'}`,
      paddingTop: 3,
      fontFamily: 'Quicksand_400Regular',
      fontSize: 30,
    },
    scrollViewContainer: {
      paddingTop: 5,
      flexGrow: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Quicksand_400Regular',
      fontSize: 30,
      backgroundColor: `${darkMode ? '#2D2D30' : '#fefefe'}`,
    },
    dropdown2BtnStyle: {
      width: '80%',
      height: 40,
      backgroundColor: '#ecedf06e',
      borderRadius: 8,
    },
    dropdown2BtnTxtStyle: {
      color: `${darkMode ? 'white' : 'black'}`,
      textAlign: 'center',
      fontWeight: '500',
      fontFamily: 'Quicksand_400Regular',
      fontSize: 20,
    },
    dropdown2DropdownStyle: {
      backgroundColor: `${darkMode ? '#2D2D30' : '#fefefe'}`,
      borderBottomLeftRadius: 12,
      borderBottomRightRadius: 12,
    },
    dropdown2RowStyle: {
      backgroundColor: `${darkMode ? '#2D2D30' : '#fefefe'}`,
      borderBottomColor: `${darkMode ? 'gray' : 'black'}`,
    },
    dropdown2RowTxtStyle: {
      color: `${darkMode ? 'white' : 'black'}`,
      textAlign: 'center',
      fontWeight: '500',
      fontFamily: 'Quicksand_400Regular',
      fontSize: 20,
    },
  });

  return (
    <SafeAreaView style={styles.saveAreaViewContainer}>
      <View style={styles.viewContainer}>
        <Text style={styles.label}>Flux Sélectionné :</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          {flowsOptions && flowsOptions.length > 0 ? (
            <SelectDropdown
              data={flowsOptions.map((e) => e.label)}
              onSelect={(e) => {
                handleChangeSelectedFlow(e);
              }}
              defaultValueByIndex={0}
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
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DropDown;
