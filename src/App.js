
import './App.css';
import CustomerList from './components/CustomerList'
import Training from './components/TrainingList';
import Calendar from './components/Calendar';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Export from './components/Export';
import Stats from './components/Stats';



function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4">
            Personal Trainer 
          </Typography>
        </Toolbar>
      </AppBar>   

      
      <BrowserRouter>
   <h2> <Link to="/customerlist">Customer list</Link> {' - '}
    <Link to="/training">Training</Link> {' - '}
    <Link to="/calendar">Calendar</Link> {' - '}
    <Link to="/stats">Stats</Link> {' - '}
    <Export/>
    
    </h2>
     
   
      <Routes>
        <Route path="/customerlist" element={<CustomerList/>} />
        <Route path="/training" element={<Training/>} />
        <Route path="/calendar" element={<Calendar/>} />
        <Route path="/stats" element={<Stats/>} />
        <Route path="/export" element={Export} />
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
