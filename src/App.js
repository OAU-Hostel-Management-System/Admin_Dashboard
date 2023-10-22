
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Hostel from './pages/admin/hostels'
import Allocation from './pages/admin/allocation'
import Dashboard from './pages/admin/Dashboard';
import Students from './pages/admin/students'
import Login from './pages/login';
import { useAuth } from './auth/authProvider';
import PageLayout from './components/pageLayout';
import IdCard from './components/idCard';



function App() {
 


  const { authToken } = useAuth()
  const authT = sessionStorage.getItem('authToken');
  return (
    <>
      {!authT ? (
        <Login />
      ) : (
        
          <div className="lw-3/4 lml-auto overflow-hidden bg-[#EBEBEB]">
            <Routes>
              <Route
                path="/"
                element={
                  <PageLayout>
                    <Dashboard />
                  </PageLayout>
                }
              >
              </Route>
              <Route
                path="/hostel_records"
                element={
                  <PageLayout>
                    <Hostel />
                  </PageLayout>
                }
              >
              </Route>
              <Route
                path="/custom"
                element={
                  <PageLayout>
                    <Allocation />
                  </PageLayout>
                }
              >
              </Route>
              <Route
                path="/student_records"
                element={
                  <PageLayout>
                    <Students />
                  </PageLayout>
                }
              >
              </Route>
              <Route
                path="/idcardooo"
                element={
                  <PageLayout>
                    <IdCard />
                  </PageLayout>
                }
              >
              </Route>
              <Route path="/list" element={<Dashboard />}></Route>
            </Routes>
          </div>
      )}
    </>
  );
}

export default App;
