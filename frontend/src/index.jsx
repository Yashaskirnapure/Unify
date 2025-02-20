import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router";
import Login from './components/Common/Login';
import Signup from './components/Common/Signup';
import Upload from './components/User/Upload';
import Catalog from './components/User/Catalog';
import Viewer from './components/User/Viewer';
import ProtectedRoute from './components/Protected/ProtectedRoute';
import Transform from './components/User/Transform';
import ForgotPassword from './components/Common/ForgotPassword';
import ResetPassword from './components/Common/ResetPassword';

import store from './store/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login/>}/> 
          <Route path="/signup" element={<Signup/>}/>
          <Route path='/forgot-password' element={<ForgotPassword/>  }/>
          <Route path='/reset-password' element={<ResetPassword/>} />

          <Route path="/upload" element={<ProtectedRoute><Upload/></ProtectedRoute>}/>
          <Route path='/catalog' element={<ProtectedRoute><Catalog/></ProtectedRoute>}/>
          <Route path='/image/view/:id' element={<ProtectedRoute><Viewer/></ProtectedRoute>}/>
          <Route path='/image/transform/:id' element={<ProtectedRoute><Transform/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);