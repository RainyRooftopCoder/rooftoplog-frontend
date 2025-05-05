import { Outlet } from 'react-router-dom';
import MainLayout from '../components/guestLayout/MainLayout';

const MainPage = () => {
    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    );
};

export default MainPage;
