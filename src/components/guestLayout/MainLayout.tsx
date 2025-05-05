import { ReactNode } from 'react';
import NavMenu from './NavMenu';

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* 상단 헤더 */}
            <header className="h-[20vh] bg-gray-200 shadow flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold">움직여라 게으른 놈아!</h1>
            </header>

            {/* 네비게이션 메뉴 영역 */}
            <div className="bg-white border-b border-gray-300 shadow flex items-center justify-between">
                {/* 드롭다운 메뉴 */}
                <NavMenu />

                {/* 오른쪽 경로 네비게이션 예시 */}
                <div className="text-base text-gray-700 font-semibold px-3">HOME &gt; 게시판 1 &gt; 게시판 1-1</div>
            </div>

            {/* 본문 */}
            <main className="flex-1 p-6 m-4">{children}</main>

            {/* 푸터 */}
            <footer className="bg-gray-200 p-4 text-sm text-center">ⓒ 2025 Rooftoplog</footer>
        </div>
    );
};

export default MainLayout;
