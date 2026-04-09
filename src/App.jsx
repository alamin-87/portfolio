import Portfolio from "./portfolio/Portfolio";
import CustomCursor from "./components/CustomCursor";
import useLenis from "./hooks/useLenis";
import ParticleField from "./components/ParticleField";

function App() {
  // Initialize Lenis smooth scrolling
  useLenis();

  return (
    <>
      <CustomCursor />
      <ParticleField />
      <div className="relative z-10">
        <Portfolio />
      </div>
    </>
  );
}

export default App;
