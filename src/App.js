import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import EditorPage from './pages/editorPage';
import './App.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <div>
      <Toaster
        position='top-right'
        toastOptions={{
          success:{
            theme:{
              primary: "#40c057"
            } 
          }
        }}
      ></Toaster>
    </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
