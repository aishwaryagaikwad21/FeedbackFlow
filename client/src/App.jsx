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
import FeedbackManagement from "./pages/FeedbackManagement";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import WriteFeedback from "./pages/WriteFeedback";
import FeedbackListing from "./pages/FeedbackListing";
import EditFeedback from "./pages/EditFeedback";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Layout */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Landing />} />
                    <Route path="/write-feedback" element={<WriteFeedback />} />
                    <Route path="/all-feedbacks" element={<FeedbackListing />} />
                    <Route path="/edit-feedback/:feedbackId" element={<EditFeedback />} />
                </Route>

             <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/feedbacks" element={<FeedbackManagement />} />
                </Route>
            </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </BrowserRouter>
    );
};

export default App;