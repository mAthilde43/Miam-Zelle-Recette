import classes from "./Footer.module.css"
import imageFooter from "../../images/imageFooter.jpg"
import logo from "../../images/logo.png"
import { NavLink} from 'react-router-dom';
import Wrapper from "../Wrapper/Wrapper";


const Footer = ({footer}) => {
    
    const linkActive = ({isActive}) => {
        return isActive ? "active" : "";
    }

    return (
        <div className={classes.footer}>
            <div className={classes["footer-image"]}>
                <img className={classes.imageFooter} src={imageFooter} alt="Logo" />
            </div>
        
        <Wrapper>
        <div className={classes["footer-infos"]}>
            <div className={classes["footer-logo"]}>
                <img className={classes.logo} src={logo} alt="Logo" />
                {/* logo Facebbok/insta/pinterest */}
            </div>

            <div className={classes.pages}>
                <p>Pages</p>
                <ul>
                    <li><NavLink to="/ptitdej" className={linkActive}>P'tit dej</NavLink></li>
                    <li><NavLink to="/aperitifs" className={linkActive}>Apéritifs</NavLink></li>
                    <li><NavLink to="/entrees" className={linkActive}>Entrées</NavLink></li>
                    <li><NavLink to="/plats" className={linkActive}>Plats</NavLink></li>
                    <li><NavLink to="/fromages" className={linkActive}>Fromages</NavLink></li>
                    <li><NavLink to="/desserts" className={linkActive}>Desserts</NavLink></li>
                    <li><NavLink to="/boissons" className={linkActive}>Boissons</NavLink></li>
                </ul>
            </div>

            <div className={classes.connexion}>
                <p>Connexion</p>
                <ul>
                    <li><NavLink to="/seconnecter" className={linkActive}>Se connecter</NavLink></li>
                    <li><NavLink to="/seconnecter" className={linkActive}>Créer un compte</NavLink></li>
                    <li><NavLink to="/favoris" className={linkActive}>Mes favoris</NavLink></li>
                    <li><NavLink to="/recipes" className={linkActive}>Ajouter une recette</NavLink></li>
                </ul>
            </div>

            <div className={classes.contact}>
                <p>Contact</p>
                <ul>
                    <li>234 Avenue de Colmar 67021 Strasbourg</li>
                    <li>contact@miamzelle.com</li>
                    <li>03.88.43.08.00</li>
                </ul>
            </div>
        </div>

        <div className={classes.copiright}>
            <p>Copyright © Miam'Zelle Recette</p><p>Mentions légales</p><p>Politique de protection des données</p>
        </div>

        </Wrapper>
        </div>   
    )
}

export default Footer