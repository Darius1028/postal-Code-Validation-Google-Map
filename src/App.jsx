
import './App.css';
import GoogleMapsSearch from './components/googleMapsSearch';


function App() {

  return (
  <div className="location">
    <h1>Where are you located?</h1>
    <div className="instructions">
      So we know where to drop off the stuff
    </div>
    <div className="instructions-details">
      {`We won't share your address `}
      <br />
      {`with your ex (or whoever).`}
    </div>
    <GoogleMapsSearch />
  </div>

  )
}

export default App
