import { useState, useEffect } from "react";
import classes from "./SlideTip.module.css";
import Title from "../Title/Title";
import ModalTip from "../Modal/ModalTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const SlideTip = () => {
  const [wineTips, setWineTips] = useState([]);
  const [gmTips, setGmTips] = useState([]);
  const [breadTips, setBreadTips] = useState([]);
  const [biereTips, setBiereTips] = useState([]);
  const [currentWineIndex, setCurrentWineIndex] = useState(0);
  const [currentGmIndex, setCurrentGmIndex] = useState(0);
  const [currentBreadIndex, setCurrentBreadIndex] = useState(0);
  const [currentBiereIndex, setCurrentBiereIndex] = useState(0);
  const [isTipShow, setIsTipShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTip, setActiveTip] = useState(null);
  const [isWine, setIsWine] = useState(true); // Détermine la source des données

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch("http://localhost:4008/tips");
        const contentType = response.headers.get("content-type");
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("La réponse n'est pas en JSON");
        }

        const data = await response.json();

        // Filtrage selon category_id
        setWineTips(data.filter((tip) => tip.category_id === 1));
        setGmTips(data.filter((tip) => tip.category_id === 2));
        setBreadTips(data.filter((tip) => tip.category_id === 3));
        setBiereTips(data.filter((tip) => tip.category_id === 4));
      } catch (error) {
        console.error("Erreur dans fetchTips:", error);
      }
    };

    fetchTips();
  }, []);

  const updateStateModalTip = (
    bool,
    tip,
    isWine = false,
    isBread = false,
    isBiere = false
  ) => {
    setIsModalOpen(bool);
    setIsTipShow(bool);
    if (bool) {
      setActiveTip(tip);

      // Logique pour identifier la catégorie active
      if (isWine) {
        setIsWine(true);
      } else if (isBread || isBiere) {
        setIsWine(false); // Pas du vin
      }
    }
  };

  const getTipTitle = (tip) => {
    if (!tip) return "";
    return typeof tip.title === "string" ? tip.title : tip.title?.text || "";
  };

  useEffect(() => {
    if (wineTips.length === 0 || isModalOpen) return;

    const intervalId = setInterval(() => {
      setCurrentWineIndex((prevIndex) => (prevIndex + 1) % wineTips.length);
    }, 4900);

    return () => clearInterval(intervalId);
  }, [wineTips, isModalOpen]);

  useEffect(() => {
    if (gmTips.length === 0 || isModalOpen) return;

    const intervalId = setInterval(() => {
      setCurrentGmIndex((prevIndex) => (prevIndex + 1) % gmTips.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [gmTips, isModalOpen]);

  useEffect(() => {
    if (breadTips.length === 0 || isModalOpen) return;

    const intervalId = setInterval(() => {
      setCurrentBreadIndex((prevIndex) => (prevIndex + 1) % breadTips.length);
    }, 5100);

    return () => clearInterval(intervalId);
  }, [breadTips, isModalOpen]);

  useEffect(() => {
    if (biereTips.length === 0 || isModalOpen) return;

    const intervalId = setInterval(() => {
      setCurrentBiereIndex((prevIndex) => (prevIndex + 1) % biereTips.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [biereTips, isModalOpen]);

  if (
    wineTips.length === 0 &&
    gmTips.length === 0 &&
    breadTips.length === 0 &&
    biereTips.length === 0
  ) {
    return <p>Chargement des conseils...</p>;
  }

  return (
    <>
      <div>
        <Title type="h1">Trucs & Astuces</Title>
        <Title type="h3">Quels vins pour quels plats ?</Title>
        <div
          className={classes.carousel}
          style={{
            backgroundImage: `url(${
              wineTips[currentWineIndex]?.image_url || ""
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className={classes.slide}>
            <h3>{getTipTitle(wineTips[currentWineIndex])}</h3>
          </div>
          <div className={classes.navigation}>
            <button
              className={classes.arrowButton}
              onClick={() =>
                setCurrentWineIndex(
                  (prevIndex) =>
                    (prevIndex - 1 + wineTips.length) % wineTips.length
                )
              }
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className={classes.arrowButton}
              onClick={() =>
                setCurrentWineIndex(
                  (prevIndex) => (prevIndex + 1) % wineTips.length
                )
              }
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <button
            className={classes.moreButton}
            onClick={() =>
              updateStateModalTip(true, wineTips[currentWineIndex], true)
            }
          >
            Voir plus
          </button>
        </div>

        <Title type="h3">Astuces de Grand-mère ?</Title>
        <div
          className={classes.carousel}
          style={{
            backgroundImage: `url(${gmTips[currentGmIndex]?.image_url || ""})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className={classes.slide}>
            <h3>{gmTips[currentGmIndex]?.title}</h3>
          </div>
          <div className={classes.navigation}>
            <button
              className={classes.arrowButton}
              onClick={() =>
                setCurrentGmIndex(
                  (prevIndex) => (prevIndex - 1 + gmTips.length) % gmTips.length
                )
              }
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className={classes.arrowButton}
              onClick={() =>
                setCurrentGmIndex(
                  (prevIndex) => (prevIndex + 1) % gmTips.length
                )
              }
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <button
            className={classes.moreButton}
            onClick={() =>
              updateStateModalTip(true, gmTips[currentGmIndex], false)
            }
          >
            Voir plus
          </button>
        </div>

        <Title type="h3">Quels pains pour quels plats ?</Title>
        <div
          className={classes.carousel}
          style={{
            backgroundImage: `url(${
              breadTips[currentBreadIndex]?.image_url || ""
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className={classes.slide}>
            <h3>{breadTips[currentBreadIndex]?.title}</h3>
          </div>
          <div className={classes.navigation}>
            <button
              className={classes.arrowButton}
              onClick={() =>
                setCurrentBreadIndex(
                  (prevIndex) =>
                    (prevIndex - 1 + breadTips.length) % breadTips.length
                )
              }
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className={classes.arrowButton}
              onClick={() =>
                setCurrentBreadIndex(
                  (prevIndex) => (prevIndex + 1) % breadTips.length
                )
              }
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <button
            className={classes.moreButton}
            onClick={() =>
              updateStateModalTip(
                true,
                breadTips[currentBreadIndex],
                false,
                true
              )
            }
          >
            Voir plus
          </button>
        </div>

        <Title type="h3">Quels bières pour quels plats ?</Title>
        <div
          className={classes.carousel}
          style={{
            backgroundImage: `url(${
              biereTips[currentBiereIndex]?.image_url || ""
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className={classes.slide}>
            <h3>{biereTips[currentBiereIndex]?.title}</h3>
          </div>
          <div className={classes.navigation}>
            <button
              className={classes.arrowButton}
              onClick={() =>
                setCurrentBiereIndex(
                  (prevIndex) =>
                    (prevIndex - 1 + biereTips.length) % biereTips.length
                )
              }
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <button
              className={classes.arrowButton}
              onClick={() =>
                setCurrentBiereIndex(
                  (prevIndex) => (prevIndex + 1) % biereTips.length
                )
              }
            >
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <button
            className={classes.moreButton}
            onClick={() =>
              updateStateModalTip(
                true,
                biereTips[currentBiereIndex],
                false,
                false,
                true
              )
            }
          >
            Voir plus
          </button>
        </div>

        {isTipShow && activeTip && (
          <ModalTip
            funcEvent={updateStateModalTip}
            tipData={activeTip}
            isWine={isWine}
          />
        )}
      </div>
    </>
  );
};

export default SlideTip;
