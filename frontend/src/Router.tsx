import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import Home from './pages/Home';
import Authed from './pages/Authed';
import Edit from './pages/Edit';
import Navbar from './components/custom/Navbar';

function Router() {
  return (
    <BrowserRouter>
      <Navbar/>
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
        <Route path="/edit" 
          element={
            <AuthContext requireAuth={true}>
              <Edit />
            </AuthContext>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router