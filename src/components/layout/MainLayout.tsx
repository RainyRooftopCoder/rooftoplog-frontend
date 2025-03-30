import { ReactNode } from 'react';

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <header style={{ padding: '1rem', background: '#eee', color: 'black' }}>
                <h1>📝 Rooftoplog</h1>
            </header>
            <main style={{ padding: '1rem' }}>{children}</main>
            <footer style={{ padding: '1rem', background: '#eee', color: 'black' }}>
                <small>© Rooftoplog 2025</small>
            </footer>
        </div>
    );
};

export default MainLayout;
