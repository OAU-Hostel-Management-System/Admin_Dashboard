
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Hostel from './pages/admin/hostels'
import Allocation from './pages/admin/allocation'
import Dashboard from './pages/admin/Dashboard';
import Students from './pages/admin/students'
import Login from './pages/login';
import { useAuth } from './auth/authProvider';

function App() {
  const { authToken } = useAuth()
  const authT = sessionStorage.getItem('authToken');
  return (
 <>
   { !authT ? <Login /> :    <div className="w-full flex overflow-hidden ">
   <Navbar />

   {/* brower router would be used so the Navbar won't be re-rendered when a page is selected */}
   <div className='w-3/4 ml-auto overflow-hidden bg-[#EBEBEB]'>
    <Routes>
    <Route path='/' element={<Dashboard />}> </Route>
    <Route path='/hostel_records' element={<Hostel />}> </Route>
    <Route path='/custom' element={<Allocation />}> </Route>
    <Route path='/student_records' element={<Students />}> </Route>
    <Route path='/list' element={<Dashboard />}>
    </Route>
   </Routes>
   </div>
    </div>}
 </>
  );
}

export default App;
