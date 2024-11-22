import classes from './App.module.css';
import { Routes, Route } from 'react-router-dom';
import Aperitifs from './pages/Aperitifs';
import Ptitdej from './pages/Ptitdej';
import Entrees from './pages/Entrees';
import Plats from './pages/Plats';
import Fromages from './pages/Fromages';
import Desserts from './pages/Desserts';
import Boissons from './pages/Boissons';
import Seconnecter from './pages/Seconnecter/Seconnecter';
import Footer from './components/Footer/Footer';
import Home from './pages/Home'


function App() {
  return (
    <div className={classes.app}>
      <Routes>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/seconnecter' element={<Seconnecter/>}></Route>
          <Route path='/ptitdej' element={<Ptitdej/>}></Route>
          <Route path='/aperitifs' element={<Aperitifs/>}></Route>
          <Route path='/entrees' element={<Entrees/>}></Route>
          <Route path='/plats' element={<Plats/>}></Route>
          <Route path='/fromages' element={<Fromages/>}></Route>
          <Route path='/desserts' element={<Desserts/>}></Route>
          <Route path='/boissons' element={<Boissons/>}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
