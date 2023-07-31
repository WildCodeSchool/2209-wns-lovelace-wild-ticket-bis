import * as React from 'react';
import { Switch } from 'react-native-paper';
import { AppContext } from '../../context/AppContext';

const SwitchComponent = () => {
  const appContext = React.useContext(AppContext);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState<boolean>();
  React.useEffect(() => {
    if (appContext) {
      setDarkMode(appContext.darkMode);
    }
  }, [appContext]);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
      appContext.setDarkMode(!appContext.darkMode);
  }
  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
};

export default SwitchComponent;