import { ReactNode } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <header style={{ padding: '1rem', background: '#333', color: 'white' }}>
                <h1>관리자 페이지</h1>
            </header>
            <main style={{ padding: '1rem' }}>{children}</main>
        </div>
    );
};

export default AdminLayout;
