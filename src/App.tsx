import 'antd/dist/antd.css';
import PrivateRoute from 'components/Private';
import EmailForgot from 'containers/LoginEmailForgot';
import OtpForgot from 'containers/LoginOtpForgot';
import ResetPassword from 'containers/LoginResetForgot';
import Auth from 'pages/Auth';
import Configuration from 'pages/Configuration';
import Customers from 'pages/Customers';
import Add from 'pages/Customers/Add';
import Deposited from 'pages/Customers/Deposited';
import Details from 'pages/Customers/Detail';
import Dashboard from 'pages/Dashboard';
import Employees from 'pages/Employees';
import EmployeeAdd from 'pages/Employees/EmployeeAdd';
import EmployeeDetail from 'pages/Employees/EmployeeDetail';
import Missions from 'pages/Missions';
import EditMission from 'pages/Missions/EditMission';
import NotFound from 'pages/NotFound';
import Users from 'pages/Users';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddNewMission from './pages/Missions/AddNewMission';
import UserDetail from './pages/Users/userDetail';
import UserMission from './pages/Users/userMission';
import UserWithdraw from './pages/Users/userWithdraw';
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        {/* employees */}
        <Route
          path="/employees"
          element={
            <PrivateRoute>
              <Employees />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/:id"
          element={
            <PrivateRoute>
              <EmployeeDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/employees/add"
          element={
            <PrivateRoute>
              <EmployeeAdd />
            </PrivateRoute>
          }
        />

        {/* users */}
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Users />
            </PrivateRoute>
          }
        />

        <Route
          path="/users/:id"
          element={
            <PrivateRoute>
              <UserDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:id/withdraw"
          element={
            <PrivateRoute>
              <UserWithdraw />
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:id/missiondetail"
          element={
            <PrivateRoute>
              <UserMission />
            </PrivateRoute>
          }
        />

        {/* customers */}
        <Route
          path="/customers"
          element={
            <PrivateRoute>
              <Customers />
            </PrivateRoute>
          }
        />

        <Route
          path="/customers/add"
          element={
            <PrivateRoute>
              <Add />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers/:id"
          element={
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          }
        />
        <Route
          path="/customers/:id/deposited"
          element={
            <PrivateRoute>
              <Deposited />
            </PrivateRoute>
          }
        />

        {/* missions */}
        <Route
          path="/missions"
          element={
            <PrivateRoute>
              <Missions />
            </PrivateRoute>
          }
        />
        <Route
          path="/missions/add"
          element={
            <PrivateRoute>
              <AddNewMission />
            </PrivateRoute>
          }
        />
        <Route
          path="/missions/:id"
          element={
            <PrivateRoute>
              <EditMission />
            </PrivateRoute>
          }
        />

        {/* configuration */}
        <Route
          path="/configuration"
          element={
            <PrivateRoute>
              <Configuration />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Auth />} />
        <Route path="/forgot" element={<EmailForgot />} />
        <Route path="/otp" element={<OtpForgot />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
