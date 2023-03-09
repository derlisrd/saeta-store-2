import SettingsMain from "./SettingsMain"
import SettingsProvider from "./SettingsProvider";
const Settings = () => {


  return (
    <SettingsProvider>
      <SettingsMain />
    </SettingsProvider>
  );
};

export default Settings;
