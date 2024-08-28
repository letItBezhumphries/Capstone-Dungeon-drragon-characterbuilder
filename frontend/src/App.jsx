import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeScreen from './screens/HomeScreen';
import MonstersScreen from './screens/MonstersScreen/MonstersScreen';
import CharacterScreen from './screens/CharacterBuilderScreens/CharacterScreen';
import ChooseRaceScreen from './screens/CharacterBuilderScreens/ChooseRace/ChooseRaceScreen';
import ChooseClassScreen from './screens/CharacterBuilderScreens/ChooseClass/ChooseClassScreen';
import ChooseAbilitiesScreen from './screens/CharacterBuilderScreens/ChooseAbilities/ChooseAbilitiesScreen';
import ProfileScreen from './screens/ProfileScreens/ProfileScreen';
import CharacterDetailsScreen from './screens/CharacterDetailsScreen/CharacterDetails';
import CharacterEditScreen from './screens/admin/CharacterEditScreen';
import CharacterListScreen from './screens/admin/CharacterListScreen';
// import UserListScreen from './screens/admin/UserListScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

function App() {
  return (
    <div id='app'>
      <Navbar />
      <div className='main'>
        <Routes>
          <Route path='/' element={<HomeScreen />} exact></Route>
          <Route path='/monsters' element={<MonstersScreen />} exact></Route>
          <Route path='/character' element={<CharacterScreen />}></Route>
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
          <Route
            path='/character/chabilities'
            element={<ChooseAbilitiesScreen />}
            exact
          ></Route>
          <Route
            path='/character/:id'
            element={<CharacterDetailsScreen />}
            exact
          ></Route>
          <Route path='/profile' element={<ProfileScreen />} exact></Route>
          <Route
            path='/profile/character/:id/edit'
            element={<CharacterEditScreen />}
            exact
          ></Route>
          <Route path='/login' element={<LoginScreen />} exact></Route>
          <Route path='/register' element={<RegisterScreen />} exact></Route>
        </Routes>
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
