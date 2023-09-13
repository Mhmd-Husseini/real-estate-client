import {Routes, Route} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Landing from './pages/Landing';
import Homes from './pages/Homes';
import Lands from './pages/Lands';
import Authentication from './pages/Authentication';
import PropertyDetails from './pages/PropertyDetails';

function App() {
  return (
    <Routes>
      <Route path='auth' element={<Authentication />} />
      <Route path='/' element={<Nav />}>
        <Route index element={<Landing />} />
        <Route path='houses' element={<Homes />} />
        <Route path='lands' element={<Lands />} />
        <Route path='property/:id' element={<PropertyDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
