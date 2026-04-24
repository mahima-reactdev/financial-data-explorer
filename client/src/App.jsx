import './App.css';
import DashboardLayout from './Components/DashboardLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/HomePage';
import Dashboard from './Pages/Dashboard';
import Compare from './Pages/Compare';

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path="/compare" element={<Compare/>} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;