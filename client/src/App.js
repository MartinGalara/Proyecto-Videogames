import './App.css';
import { Route } from "react-router-dom";
import LandingPage from './components/LandingPage/LandingPage';
import DetailCard from './components/DetailCard/DetailCard';
import Home from './components/Home/Home';
import CreateVideogame from './components/CreateVideogame/CreateVideogame';

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
      <LandingPage/>
      </Route>
      <Route path='/home'>
      <Home/>
      </Route>
      <Route path='/detail/:id'>
      <DetailCard />
      </Route>
      <Route path='/create'>
      <CreateVideogame/>
      </Route>
    </div>
  );
}

export default App;
