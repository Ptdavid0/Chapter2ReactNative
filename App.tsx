import { StatusBar } from "react-native";
import Groups from "@screens/Groups";
import NewGroup from "@screens/NewGroup";
import Players from "@screens/Players";
import { ThemeProvider } from "styled-components";
import theme from "@theme/index";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import Loading from "@components/Loading";

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="translucent"
        translucent
      />
      {fontsLoaded ? <Groups /> : <Loading />}
    </ThemeProvider>
  );
};

export default App;
