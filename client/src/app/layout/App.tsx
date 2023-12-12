import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStoreContext } from "../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import { Basket } from "../models/basket";
import LoadingComponent from "./LoadingComponent";

function App() {
  const { setBasket } = useStoreContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId !== "") {
      agent.Basket.getBasket()
        .then((basket) => setBasket(basket as Basket))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    }
    else setLoading(false)
  }, [setBasket]);

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: !darkMode ? "#eaeaea" : "#121212",
      },
    },
  });

  const handleThemeChange = (): void => {
    setDarkMode(!darkMode);
  };

  if (loading) return <LoadingComponent message="Initialising app..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header handleThemeChange={handleThemeChange} darkMode={darkMode} />
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
