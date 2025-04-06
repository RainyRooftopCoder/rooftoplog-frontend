import { ReactNode } from 'react';
import Sidebar from './Siderbar';

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* TOP */}
            <header className="h-[20vh] bg-gray-200 shadow flex items-center justify-center">
                {/* <h1 className="text-xl font-bold">📝 Rooftoplog</h1> */}
                <h1 className="text-4xl font-bold">움직여라 게으른 놈아!</h1>
            </header>

            {/* MAIN */}
            <div className="flex flex-1">
                {/* MENU */}
                <Sidebar />

                {/* CONTENT */}
                <main className="flex-1 p-6 bg-white">{children}</main>
            </div>

            {/* FOOTER */}
            <footer className="bg-gray-200 p-4 text-sm text-center">ⓒ 2025 Rooftoplog</footer>
        </div>
    );
};

export default MainLayout;
