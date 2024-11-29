import Header from "../../components/Header/Header"
import classes from './Home.module.css'
import SlideTip from "../../components/SlideTip/SlideTip"
import Suggestion from "../../components/Suggestion/Suggestion"
import Title from "../../components/Title/Title"

const Home = () => {
    return (
        <>
        <Header isHome={true}/>
        <div className={classes.histoire}>
        <Title type="h1">Petite histoire</Title>
                <p>
                    Miam'Zelle Recette est né d'une grande source d'inspiration : ma grand-mère.<br />
                    Depuis mon plus jeune âge, elle m'a transmis ses secrets de cuisine, ses astuces pour réussir chaque plat avec amour et simplicité.<br />
                    C'est grâce à elle que j'ai appris à apprécier chaque geste en cuisine et à comprendre que bien cuisiner, c'est avant tout partager des moments de bonheur.<br />
               <br />
                    Aujourd'hui, j'ai crée ce site pour vous permettre de retrouver ces précieux conseils et recettes, et bien plus encore.<br />
                    Miam'Zelle Recette est conçu pour vous simplifier la cuisine au quotidien.<br />
                    Grâce à une interface simple et intuitive, vous pouvez facilement explorer, ajouter vos recettes favorites, et même ajouter vos propres création culinaires.<br />
                    Que vous soyez un cuisiner novice ou passioné, ce site vous aidera à réussir vos plats et à épater vos proches avec des recettes pleines de saveurs.
        </p></div>
        <SlideTip/>
        <Suggestion/>
        </>
        
)
}

export default Home