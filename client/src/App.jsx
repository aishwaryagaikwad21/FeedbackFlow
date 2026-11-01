import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import PublicLayout from './layouts/PublicLayout'
import AdminLayout from "./layouts/AdminLayout";

import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from "./pages/Dashboard";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Layout */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Landing />} />
                </Route>

                <Route element={<AdminLayout />}>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;