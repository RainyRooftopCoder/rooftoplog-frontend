import { ReactNode } from 'react';
import LeftMenu from './LeftMenu';
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            {/* Header */}
            <header style={{ padding: '1rem', background: '#333', color: 'white' }}>
                <h1>
                    <Link to="/admin">관리자 페이지</Link>
                </h1>
            </header>

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <LeftMenu />

                {/* Content */}
                <main className="flex-1 p-6 bg-white">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
