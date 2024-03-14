import { BrowserRouter as Router, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Footer from './components/Footer';
import TechBlogs from './pages/TechBlogs';
import Hackathons from './pages/Hackathons';
import About from './pages/About';
import Contact from './pages/Contact';
import MoreDetails from './pages/MoreDetails';
import ProfileView from './pages/ProfileView';
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset';

function FooterControl() {
  const location = useLocation();

  if (
    location.pathname === '/login' ||
    location.pathname === '/forgotpassword' ||
    location.pathname.startsWith('/passwordreset/') ||
    location.pathname === '/register'
  ) {
    return null; // Do not render footer on these pages
  }

  return <Footer />;
}

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <div>
          <Header />
          <Routes>
          {/* Routes with footer */}
          <Route path='/' element={<Dashboard />} />
          <Route path='/profiles' element={<TechBlogs />} />
          <Route path='/hackathons' element={<Hackathons />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/more-details/:id/:type' element={<MoreDetails />} />
          {/* Protect the profile route */}
          <Route path='/profile' element={user ? <ProfileView /> : <Navigate to="/" />} />

          {/* Routes without footer */}
          <Route path='/login' element={<Login />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/passwordreset/:email' element={<PasswordReset />} />
          <Route path='/register' element={<Register />} />
          
          {/* Redirect unmatched routes to dashboard */}
          <Route path='*' element={<Navigate to="/" />} />
        </Routes>
          <FooterControl />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
