import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage'; // 사용자용 블로그 메인
import AdminPage from '../pages/admin/AdminPage'; // 관리자용 페이지

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
    );
};

export default AppRoutes;
