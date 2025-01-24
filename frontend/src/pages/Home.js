import Header from "../components/Header/Header";
import SlideTip from "../components/SlideTip/SlideTip";
import Suggestion from "../components/Suggestion/Suggestion";

const Home = () => {
  return (
    <>
      <Header isHome={true} />
      <SlideTip />
      <Suggestion />
    </>
  );
};

export default Home;
