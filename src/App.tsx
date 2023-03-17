import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Countries from './pages/CountriesPage';
import Footer from './pages/Footer';
import NoPage from './pages/NoPage';
import Header from './pages/Header';
import Favorite from './pages/Favorite';
import Home from './pages/Home';
import Country from './pages/Country';


function App() {
  return (
    <BrowserRouter>
      <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/favorite' element={<Favorite />}/>
            <Route path='/countries' element={<Countries />}/>
            <Route path='/country/:name' element={<Country />}/>
            <Route path='*' element={<NoPage />}/>
          </Routes>
        </main>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
