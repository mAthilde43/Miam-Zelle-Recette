import Header from "../../components/Header/Header";
import Suggestion from "../../components/Suggestion/Suggestion";
import classes from "./Apropos.module.css";
import Title from "../../components/Title/Title";

const Apropos = () => {
  return (
    <>
      <Header isHome={true} />
      <Title type="h1">À propos de nous</Title>

      <div className={classes.apropos}>
        <p>
          Développé dans le cadre d'une formation CDA à la CCI Campus de
          Strasbourg, Miam'Zelle Recette est un espace d'inspiration culinaire,
          dédié à l'exploration de nouvelles recettes, d'astuces pratiques, et
          accords parfaits pour sublimer chaque repas"
        </p>
      </div>
      <Suggestion />
    </>
  );
};

export default Apropos;
