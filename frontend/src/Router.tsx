import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import Home from './pages/Home';
import Authed from './pages/Authed';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
          element={
            <AuthContext requireAuth={false}>
              <Home />
            </AuthContext>
          } 
        />
        <Route path="/home" 
          element={
            <AuthContext requireAuth={true}>
              <Authed />
            </AuthContext>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router