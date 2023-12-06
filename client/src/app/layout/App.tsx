import Catalog from "../../features/catalog/Catalog"
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import Header from "./Header"
import { useState } from "react";

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
      <CssBaseline />
      <Header handleThemeChange={handleThemeChange} darkMode={darkMode}/>
      <Container>
        <Catalog />
      </Container>
    </ThemeProvider>
  )
}

export default App
