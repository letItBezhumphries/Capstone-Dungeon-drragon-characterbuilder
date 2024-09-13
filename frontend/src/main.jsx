import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './bootstrap.min.css';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
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
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/monsters' element={<MonstersScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/character' element={<CharacterScreen />}></Route>
        <Route path='/profile' element={<ProfileScreen />} exact></Route>
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
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
