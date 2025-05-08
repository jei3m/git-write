import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import Home from './pages/Home';
import Edit from './pages/EditMD';
import Navbar from './components/navbar/Navbar';
import CreateTemplate from './pages/CreateTemplate';
import EditTemplate from './pages/EditTemplate';
import UnauthBar from './components/navbar/UnauthBar';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" 
          element={
            <AuthContext requireAuth={false}>
              <UnauthBar/>
              <Home />
            </AuthContext>
          } 
        />
        <Route path="/home" 
          element={
            <AuthContext requireAuth={true}>
              <Navbar/>
              <Edit />
            </AuthContext>
          } 
        />
        <Route path="/create" 
          element={
            <AuthContext requireAuth={true}>
              <Navbar/>
              <CreateTemplate />
            </AuthContext>
          } 
        />
        <Route path="/edit-template/:id" 
          element={
            <AuthContext requireAuth={true}>
              <Navbar/>
              <EditTemplate />
            </AuthContext>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router