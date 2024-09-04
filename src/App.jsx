import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
// import Register from "./routes/Register";
import ResetPassword from "./routes/ResetPassword";
import Dashboard from "./routes/Dashboard";
import AuthProvider from "./providers/AuthProvider";
import EmployeeJoin from "./routes/EmployeeJoin";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/employee-join" element={<EmployeeJoin />} />
        <Route
          path="/dashboard/*"
          element={
            <AuthProvider>
              <Dashboard />
            </AuthProvider>
          }
        />
        <Route path="*" element={<>404 page not found</>} />
      </Routes>
    </div>
  );
}
