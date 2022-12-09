import Groups from "@screens/Groups";
import { ThemeProvider } from "styled-components";
import theme from "@theme/index";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Groups />
    </ThemeProvider>
  );
};

export default App;
