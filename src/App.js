import React from 'react';
import './App.css'
import Divider from '@mui/material/Divider';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <div className='App-header'>
        <h1>Admin UI</h1>
        <Divider variant="middle" />
      </div>
      <Dashboard />
    </>
  );
}

export default App;
