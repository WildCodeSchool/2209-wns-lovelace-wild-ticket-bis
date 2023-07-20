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
    console.log(appContext?.userProfile?.myProfile.flows);
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
                  console.log(' @@@ onselect ', e);
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

const styles = StyleSheet.create({
  label: {
    paddingLeft: 40,
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
    backgroundColor: '#F6F6F6',
  },
  headerTitle: { color: '#a6a6a6', fontWeight: 'bold', fontSize: 16 },
  saveAreaViewContainer: { flex: 1, backgroundColor: '#FFF' },
  viewContainer: { backgroundColor: '#FFF', paddingTop: 3 },
  scrollViewContainer: {
    paddingTop: 5,
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdown2BtnStyle: {
    width: '80%',
    height: 40,
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
