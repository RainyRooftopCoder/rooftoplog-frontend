import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const LoginPage = () => {
    const [uId, setUId] = useState('');
    const [uPw, setUPw] = useState('');

    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            if (!uId || !uPw) {
                return alert('아이디, 비밀번호를 입력해 주세요.');
            }

            const response = await api.post('/auth/login', {
                username: uId,
                password: uPw,
            });

            if (response.status === 200) {
                sessionStorage.setItem('isLoggedIn', 'true');
                navigate('/admin');
            } else {
                alert('로그인 실패');
            }
        } catch (error) {
            const err = error as any;
            if (err.response) {
                alert(err.response.data);
            } else {
                alert('알 수 없는 에러');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6">관리자 로그인</h2>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm mb-2" htmlFor="username">
                        아이디
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="admin"
                        value={uId}
                        onChange={(e) => setUId(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-600 text-sm mb-2" htmlFor="password">
                        비밀번호
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="••••••••"
                        value={uPw}
                        onChange={(e) => setUPw(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                    로그인
                </button>
            </div>
        </div>
    );
};

export default LoginPage;
