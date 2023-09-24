import './App.css';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


        {/* <Login />
        <Dashboard />
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} /> */}

