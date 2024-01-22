import Register from './Screens\'/Register';
import { BrowserRouter, Route, Routes   } from 'react-router-dom';
import Login from './Screens\'/Login';
import GoogleSignin from './Screens\'/GoogleSignin';
import './App.css';
import ForgotPassword from './Screens\'/ForgetPassword';
import Home from './Screens\'/Home';
import UserDashboard from './Screens\'/UserDashboard';
import AdminDashboard from './Screens\'/AdminDashboard';
import RegistrationList from './Screens\'/RegistrationList';

function App() {
  return (
    <div>
      
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path ="register"element={<Register/>}/>
          <Route path ="home"element={<Home/>}/>
          <Route path ="login"element={<Login/>}/>
          <Route path="GoogleSignin" element={<GoogleSignin/>}/>
          <Route path = "ForgetPassword" element={<ForgotPassword/>}/>
          <Route path = "UserDashboard" element={<UserDashboard/>}/>
          <Route path = "AdminDashboard" element={<AdminDashboard/>}/>
          <Route path = "RegistrationList" element={<RegistrationList/>}/>
        </Routes>
      
      </BrowserRouter> 
      
    </div>
  );
}

export default App;

