import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    return (
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
            로그아웃
        </button>
    );
};

export default LogoutButton;
