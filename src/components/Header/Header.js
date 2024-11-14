import classes from "./Header.module.css"
import logo from "../../images/logo.png"
import { NavLink} from 'react-router-dom';
import Wrapper from "../Wrapper/Wrapper";
import Home from "../../pages/Home";

const Header = ({isHome = false}) => {

    const linkActive = ({isActive}) => {
        return isActive ? "active" : "";
    }

    let heroClass = classes.hero;
    heroClass += isHome ? ` ${classes["hero--home"]}` : ""


    return (

        <Wrapper>

        <div className={classes.header}>
           <div className={classes["header-logo-container"]}>
            <NavLink to='/home'>
                <img className={classes.logo} src={logo} alt="Logo" />
            </NavLink>
                <p><NavLink to="/seconnecter" className={linkActive}>Se connecter</NavLink></p>
            </div>

            <div className={heroClass}>
                <h1>Miam'Zelle</h1>
                <h2>Recette</h2>
                <h3>Cuisiner malin, savourer comme un chef, sans passer des heures en cuisine !</h3>
            </div>

            <div className={classes.navbar}>
                <ul>
                    <li><NavLink to="/aperitifs" className={linkActive}>Apéritifs</NavLink></li>
                    <li><NavLink to="/ptitdej" className={linkActive}>P'tit dej</NavLink></li>
                    <li><NavLink to="/entrees" className={linkActive}>Entrées</NavLink></li>
                    <li><NavLink to="/plats" className={linkActive}>Plats</NavLink></li>
                    <li><NavLink to="/fromages" className={linkActive}>Fromages</NavLink></li>
                    <li><NavLink to="/desserts" className={linkActive}>Desserts</NavLink></li>
                    <li><NavLink to="/boissons" className={linkActive}>Boissons</NavLink></li>
                </ul>
            </div>  
        </div>
</Wrapper>
    )
}

export default Header