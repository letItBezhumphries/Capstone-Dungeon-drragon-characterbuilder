import './App.css';
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { getAllMonsters } from './actions/monsterActions';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import MonstersScreen from './screens/MonstersScreen/MonstersScreen';
import DungeonScreen from './screens/DungeonScreen';
import CharacterScreen from './screens/CharacterScreens/CharacterScreen';
import ChooseRaceScreen from './screens/CharacterScreens/ChooseRace/ChooseRaceScreen';
import ChooseClassScreen from './screens/CharacterScreens/ChooseClass/ChooseClassScreen';

function App() {
  const dispatch = useDispatch();
  // dispatch(getAllMonsters());
  return (
    <div id='app'>
      <Navbar />
      <div className='main'>
        <Routes>
          <Route path='/' element={<HomeScreen />} exact></Route>
          <Route path='/monsters' element={<MonstersScreen />} exact></Route>
          <Route path='/character' element={<CharacterScreen />} exact></Route>
          <Route
            path='/character/chrace'
            element={<ChooseRaceScreen />}
            exact
          ></Route>
          <Route
            path='/character/chclass'
            element={<ChooseClassScreen />}
            exact
          ></Route>
          <Route path='/dungeons' element={<DungeonScreen />} exact></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
