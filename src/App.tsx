import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import CountriesPage from './pages/CountriesPage';
import Footer from './pages/Footer';
import NoPage from './pages/NoPage';
import Header from './pages/Header';
import Favorite from './pages/Favorite';
import Home from './pages/Home';
import Country from './pages/Country';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { CssBaseline } from '@mui/material';

import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [darkMode,setDarkMode]=useState(false)
  const theme=createTheme({
    palette:{
      mode:darkMode? "dark" : "light"
    }
  })

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header check={darkMode} change={()=>setDarkMode(!darkMode)}/>
      <ToastContainer autoClose={1000}/>
        <main>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/favorite' element={<Favorite />}/>
            <Route path='/countries' element={<CountriesPage />}/>
            <Route path='/country/:name' element={<Country />}/>
            <Route path='*' element={<NoPage />}/>
          </Routes>
        </main>
       </ThemeProvider>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
