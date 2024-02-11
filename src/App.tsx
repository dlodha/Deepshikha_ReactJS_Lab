import React from 'react';
import logo from './logo.svg';
import './App.css';
import ExpenseTrackerForm from './components/ExpenseTrackerForm';
import ShowList from './components/ShowList';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ExpenseTrackerForm onClose={()=>{}} onTrue={()=>{}}/>}></Route>
        <Route path="/ShowList" element={ <ShowList />}></Route>
        
      </Routes>
    </Router>
       
  );
}

export default App;
