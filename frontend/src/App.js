import classes from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Aperitifs from "./pages/Aperitifs";
import Ptitdej from "./pages/Ptitdej";
import Entrees from "./pages/Entrees";
import Plats from "./pages/Plats";
import Fromages from "./pages/Fromages";
import Desserts from "./pages/Desserts";
import Boissons from "./pages/Boissons";
import Seconnecter from "./pages/Seconnecter/Seconnecter";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes/Recipes";
import Favoris from "./pages/Favoris/Favoris";
import MyAccount from "./pages/MyAccount/MyAccount";
import Mentions from "./pages/RGPD/Mentions";
import PasswordForgotten from "./pages/PasswordForgotten/PasswordForgotten";
import SearchResults from "./pages/SearchResults/SearchResults";
import Apropos from "./pages/Apropos/Apropos";

function App() {
  return (
    <div className={classes.app}>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/seconnecter" element={<Seconnecter />}></Route>
        <Route path="/myaccount" element={<MyAccount />}></Route>
        <Route path="/recipes" element={<Recipes />}></Route>
        <Route path="/favoris" element={<Favoris />}></Route>
        <Route
          path="/passwordforgotten"
          element={<PasswordForgotten />}
        ></Route>
        <Route path="/mentions" element={<Mentions />}></Route>
        <Route path="/search" element={<SearchResults />} />
        <Route path="/apropos" element={<Apropos />} />

        <Route path="/ptitdej" element={<Ptitdej />}></Route>
        <Route path="/aperitifs" element={<Aperitifs />}></Route>
        <Route path="/entrees" element={<Entrees />}></Route>
        <Route path="/plats" element={<Plats />}></Route>
        <Route path="/fromages" element={<Fromages />}></Route>
        <Route path="/desserts" element={<Desserts />}></Route>
        <Route path="/boissons" element={<Boissons />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
