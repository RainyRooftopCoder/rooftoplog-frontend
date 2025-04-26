import { Outlet } from 'react-router-dom';
import AdminLayout from '../../components/adminLayout/AdminLayout';

const AdminPage = () => {
    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    );
};

export default AdminPage;
