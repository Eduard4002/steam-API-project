import './App.css'
import './assets/components/Default'
import './assets/components/ToggleVisibility'
import StuckMenu from './assets/components/stuckMenu'; // Import your Slideshow component
import Slideshow from "./assets/components/slideshow";

function App() {

  return (
    <>
      {/* Other components */}
      <StuckMenu /> {/* Use the Slideshow component */}
      {/* Other components */}
      <div className="appContainer">
        <div className="slideWrapper">
          <Slideshow />
        </div>
        
      </div>
    </>
  );
}
export default App;
