import {Routes, Route} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Landing from './pages/Landing';
import Homes from './pages/Homes';
import Lands from './pages/Lands';
import Trends from './pages/Trends';
import Authentication from './pages/Authentication';
import PropertyDetails from './pages/PropertyDetails';
import SideNav from './components/SideNav';
import Profile from './pages/Profile';
import AddProperty from './pages/AddProperty';
import UserProperties from './pages/UserProperties';
import GoogleCallback from "./pages/GoogleCallback";
import Schedule from './pages/Schedule';

function App() {
  return (
    <Routes>
      <Route path="auth/google" element={<GoogleCallback />}></Route>
      <Route path='auth' element={<Authentication />} />
      <Route path='/' element={<Nav />}>
        <Route index element={<Landing />} />
        <Route path='houses' element={<Homes />} />
        <Route path='lands' element={<Lands />} />
        <Route path='property/:id' element={<PropertyDetails />} />
        <Route path='trends' element={<Trends />} />
        <Route path='dashboard/' element={<SideNav />}>
          <Route index element={<Profile />} />
          <Route path='add' element={<AddProperty />} />
          <Route path='properties' element={<UserProperties />} />
          <Route path='meetings' element={<Schedule />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
