import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import Home from './pages/Home';
import Edit from './pages/EditMD';
import Navbar from './components/custom/Navbar';
import CreateTemplate from './pages/CreateTemplate';
import EditTemplate from './pages/EditTemplate';

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
              <Edit />
            </AuthContext>
          } 
        />
        <Route path="/create" 
          element={
            <AuthContext requireAuth={true}>
              <CreateTemplate />
            </AuthContext>
          } 
        />
        <Route path="/edit-template/:id" 
          element={
            <AuthContext requireAuth={true}>
              <EditTemplate />
            </AuthContext>
          } 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router