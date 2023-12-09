import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import Header from "./Header"
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [darkMode, setDarkMode] = useState<boolean>(false)
  const paletteType = darkMode ? 'dark' : 'light'

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: !darkMode ? '#eaeaea' : '#121212',      
      }
    }
  });

  const handleThemeChange = (): void => {
    setDarkMode(!darkMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Header handleThemeChange={handleThemeChange} darkMode={darkMode}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  )
}

export default App
