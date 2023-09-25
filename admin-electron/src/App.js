import './App.css';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Layout from './components/Layout';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='dashboard/' element={<Layout />}>
          <Route index element={<Profile />} />
          <Route path='users' element={<Users />} /> 
          <Route path='analytics' element={<Analytics />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;