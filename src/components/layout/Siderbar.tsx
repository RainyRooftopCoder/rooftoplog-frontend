import { useState } from 'react';

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

const Sidebar = () => {
    const [openBoards, setOpenBoards] = useState<{ [key: string]: boolean }>({});

    const toggleBoard = (id: string) => {
        setOpenBoards((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <aside className="w-60 bg-gray-100 p-4 text-sm">
            <nav>
                <ul className="space-y-2">
                    {boardData.map((board) => (
                        <li key={board.id}>
                            <button
                                onClick={() => toggleBoard(board.id)}
                                className="flex items-center w-full text-left hover:text-blue-600"
                            >
                                {openBoards[board.id] ? '📂' : '📁'} {board.name}
                            </button>
                            {openBoards[board.id] && (
                                <ul className="pl-4 mt-1 space-y-1">
                                    {board.children.map((child, index) => (
                                        <li key={index}>
                                            <a href="#" className="block hover:text-blue-500">
                                                📄 {child}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                    <li>
                        <a href="#" className="block hover:text-blue-600">
                            💬 방명록
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
