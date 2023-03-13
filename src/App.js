import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Footer from './pages/Footer';
import NoPage from './pages/NoPage';
import Header from './pages/Header';


function App() {
  return (
    <BrowserRouter>
    <Header />
    <main>
    <Routes>
     <Route path='/' element={<Home />}/>
     <Route path='*' element={<NoPage />}/>
    </Routes>
    </main>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
