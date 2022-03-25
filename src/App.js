import React from 'react';
import { Route, Routes, Redirect } from 'react-router-dom';
import PageHeader from './components/PageHeader/PageHeader';
import FrontPage from './pages/FrontPage/FrontPage';
import './App.css';

function App() {
  return (
    <div className="App">
        <PageHeader />
        <Routes>
          <Route path="/" element={<FrontPage />} />
        </Routes>
      
      
    </div>
  );
}

export default App;
