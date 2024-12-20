import { useState, useEffect } from 'react';
import classes from './SlideTip.module.css';
import Title from '../Title/Title';
import ModalTip from '../Modal/ModalTip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SlideTip = () => {
  const [wineTips, setWineTips] = useState([]);
  const [gmTips, setGmTips] = useState([]);
  const [breadTips, setBreadTips] = useState([]);
  const [currentWineIndex, setCurrentWineIndex] = useState(0);
  const [currentGmIndex, setCurrentGmIndex] = useState(0);
  const [currentBreadIndex, setCurrentBreadIndex] = useState(0);
  const [isTipShow, setIsTipShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTip, setActiveTip] = useState(null);
  const [isWine, setIsWine] = useState(true); // Détermine la source des données

  useEffect(() => {
    const fetchTips = async () => {
      const response = await fetch('http://localhost:5001/tips');
      const data = await response.json();
      setWineTips(data.filter((tip) => tip.title)); // Général
      setGmTips(data.filter((tip) => tip.titleGM)); // Grand-mère
      setBreadTips(data.filter((tip) => tip.titleBread)); // Pain

    };

    fetchTips();
  }, []);

  const updateStateModalTip = (bool, tip, wine, bread) => {
    setIsModalOpen(bool);
    setIsTipShow(bool);
    if (bool) {
      setActiveTip(tip);
      setIsWine(wine);
    }
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


  if (wineTips.length === 0 && gmTips.length === 0 && breadTips.length === 0) {
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
          backgroundImage: `url(${wineTips[currentWineIndex]?.image || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={classes.slide}>
          <h3>{wineTips[currentWineIndex]?.title}</h3>
        </div>
        <div className={classes.navigation}>
          <button
            className={classes.arrowButton}
            onClick={() =>
              setCurrentWineIndex(
                (prevIndex) => (prevIndex - 1 + wineTips.length) % wineTips.length
              )
            }
          >
            <FontAwesomeIcon icon={faArrowLeft}/>
          </button>
          <button
            className={classes.arrowButton}
            onClick={() =>
              setCurrentWineIndex((prevIndex) => (prevIndex + 1) % wineTips.length)
            }
          >
            <FontAwesomeIcon icon={faArrowRight}/>
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
          backgroundImage: `url(${gmTips[currentGmIndex]?.imageGM || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={classes.slide}>
          <h3>{gmTips[currentGmIndex]?.titleGM}</h3>
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
            <FontAwesomeIcon icon={faArrowLeft}/>
          </button>
          <button
            className={classes.arrowButton}
            onClick={() =>
              setCurrentGmIndex((prevIndex) => (prevIndex + 1) % gmTips.length)
            }
          >
            <FontAwesomeIcon icon={faArrowRight}/>
          </button>
        </div>
        <button
          className={classes.moreButton}
          onClick={() => updateStateModalTip(true, gmTips[currentGmIndex], false)}
        >
          Voir plus
        </button>
      </div>


      <Title type="h3">Quels pains pour quels plats ?</Title>
      <div
        className={classes.carousel}
        style={{
          backgroundImage: `url(${breadTips[currentBreadIndex]?.imageBread || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className={classes.slide}>
          <h3>{breadTips[currentBreadIndex]?.titleBread}</h3>
        </div>
        <div className={classes.navigation}>
          <button
            className={classes.arrowButton}
            onClick={() =>
              setCurrentBreadIndex(
                (prevIndex) => (prevIndex - 1 + breadTips.length) % breadTips.length
              )
            }
          >
            <FontAwesomeIcon icon={faArrowLeft}/>
          </button>
          <button
            className={classes.arrowButton}
            onClick={() =>
              setCurrentBreadIndex((prevIndex) => (prevIndex + 1) % breadTips.length)
            }
          >
            <FontAwesomeIcon icon={faArrowRight}/>
          </button>
        </div>
        <button
          className={classes.moreButton}
          onClick={() => updateStateModalTip(true, breadTips[currentBreadIndex], false)}
        >
          Voir plus
        </button>
      </div>

      {isTipShow && activeTip && (
        <ModalTip funcEvent={updateStateModalTip} tipData={activeTip} isWine={isWine} />
      )}
      </div>
    </>
  );
};

export default SlideTip;
