import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <main className="min-h-screen">
            <Outlet />
        </main>
    );
};

export default AdminLayout;