import {Routes, Route} from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Landing from './pages/Landing';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Nav />}>
        <Route index element={<Landing />} />

      </Route>
    </Routes>
  );
}

export default App;
