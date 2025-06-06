import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage'; // 사용자용 블로그 메인
import AdminPage from '../pages/admin/AdminPage'; // 관리자용 페이지
import Dashboard from '../pages/admin/Dashboard';
import PostCreatePage from '../pages/admin/PostCreatePage';
import MenuManagePage from '../pages/admin/MenuManagePage';
import LoginPage from '../pages/admin/LoginPage';
import PrivateRoute from '../components/adminLayout/PrivateRoute';
import GuestbookPage from '../pages/geust/guestbookPage';
import PostsPage from '../pages/post/PostsPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />}>
                <Route path="guestbook" element={<GuestbookPage />} />
                <Route path="post/:boardId" element={<PostsPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />

            <Route path="admin" element={<PrivateRoute />}>
                <Route element={<AdminPage />}>
                    <Route index element={<Dashboard />} />
                    <Route path="board/create" element={<PostCreatePage />} />
                    <Route path="menu" element={<MenuManagePage />} />
                    <Route path="post/:boardId" element={<PostsPage />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AppRoutes;
