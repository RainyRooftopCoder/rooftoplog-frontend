import { ReactNode } from 'react';
import LeftMenu from './LeftMenu';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-semibold">
                    <Link to="/admin" className="hover:underline">
                        관리자 페이지
                    </Link>
                </h1>
                <LogoutButton />
            </header>

            {/* Body: Sidebar + Content */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <LeftMenu />

                {/* Main Content */}
                <main className="flex-1 p-6 bg-gray-100">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
