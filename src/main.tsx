import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from './components/Login.tsx';
import Table from './components/Table.tsx';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/product" replace />} />
        <Route path="login" element={<Login />} />
        <Route 
          path="product" 
          element={
            <ProtectedRoute>
              <Table />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

)
