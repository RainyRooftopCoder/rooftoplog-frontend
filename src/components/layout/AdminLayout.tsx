import { ReactNode, useState } from 'react';

const boardData = [
    {
        id: 'board1',
        name: '게시판1',
        children: ['게시판 1-1', '게시판 1-2'],
    },
    {
        id: 'board2',
        name: '게시판2',
        children: ['게시판 2-1', '게시판 2-2'],
    },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
    const [openBoards, setOpenBoards] = useState<{ [key: string]: boolean }>({});

    const toggleBoard = (id: string) => {
        setOpenBoards((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div>
            {/* Header */}
            <header style={{ padding: '1rem', background: '#333', color: 'white' }}>
                <h1>관리자 페이지</h1>
            </header>

            <div className="flex min-h-screen">
                {/* Sidebar */}
                <aside className="w-60 bg-gray-100 p-4 shadow-md">
                    <h2 className="text-lg font-bold mb-4">관리자 메뉴</h2>
                    <nav>
                        <ul className="space-y-2 text-sm">
                            <li className="mt-3">
                                <a href="/admin/post/create" className="hover:text-blue-600">
                                    📝 글쓰기
                                </a>
                            </li>
                            <li className="mt-3">
                                <a href="/admin/menu" className="hover:text-blue-600">
                                    📋 메뉴 관리
                                </a>
                            </li>
                            <li className="mt-3">
                                <a href="#" className="hover:text-blue-600">
                                    🔧 코드 관리
                                </a>
                            </li>
                            <li className="mt-3">
                                <a href="#" className="hover:text-blue-600">
                                    💬 방명록 관리
                                </a>
                            </li>
                            {boardData.map((board) => (
                                <li key={board.id}>
                                    <button
                                        onClick={() => toggleBoard(board.id)}
                                        className="w-full text-left font-medium hover:text-blue-600"
                                    >
                                        {openBoards[board.id] ? '📂' : '📁'} {board.name}
                                    </button>
                                    {openBoards[board.id] && (
                                        <ul className="pl-4 mt-1 space-y-1">
                                            {board.children.map((child, idx) => (
                                                <li key={idx}>
                                                    <a href="#" className="hover:text-blue-500">
                                                        📄 {child}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Content */}
                <main className="flex-1 p-6 bg-white">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
