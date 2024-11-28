import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import ResultPage from './components/ResultPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/result/:name" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;