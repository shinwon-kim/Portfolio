// import { useState } from "react";
import './App.css';
import Nav from './components/Nav';
import Home from "./components/Home";
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Career from './components/Career';
import ContactBadge from './common/ContactBadge';
// import Preloader from './components/Preloader'; // ✅ 프리로더 컴포넌트 추가

function App() {
  // const [loaded, setLoaded] = useState(false); // ✅ 로딩 완료 여부 상태

  return (
    <>
      {/* {!loaded && <Preloader onLoaded={() => setLoaded(true)} />}  */}

      {/* {loaded && (
        <>
          <Nav />
          <Home />
          <AboutMe />
          <Projects />
          <Career />
        </>
      )} */}
      
        <>
          <Nav />
          <Home />
          <AboutMe />
          <Projects />
          <Career />
          <ContactBadge/>
        </>
      
    </>
  );
}

export default App;
