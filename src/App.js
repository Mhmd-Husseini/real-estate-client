import {Routes, Route} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Landing from './pages/Landing';
import Homes from './pages/Homes';
import Lands from './pages/Lands';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Nav />}>
        <Route index element={<Landing />} />
        <Route path='houses' element={<Homes />} />
        <Route path='Lands' element={<Lands />} />
      </Route>
    </Routes>
  );
}

export default App;
