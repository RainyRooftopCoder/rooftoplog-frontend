import { ReactNode, useState, useEffect } from 'react';
import api from '../../api/axios';

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

type MenuItem = {
    menuId: number;
    parentId: number | null;
    name: string;
    url: string;
};

const LeftMenu = () => {
    const [menuTree, setMenuTree] = useState<MenuItem[]>([]);
    const [openBoards, setOpenBoards] = useState<{ [key: number]: boolean }>({});

    const toggleBoard = (id: number) => {
        setOpenBoards((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    useEffect(() => {
        api.get<MenuItem[]>('/menu/admin').then((res) => {
            console.log(res.data);
            setMenuTree(res.data);
        });
    }, []);

    // 트리 구조로 그룹핑
    const grouped = menuTree
        .filter((item) => item.parentId === null)
        .map((parent) => ({
            ...parent,
            children: menuTree.filter((child) => child.parentId === parent.menuId),
        }));

    return (
        <aside className="w-60 bg-gray-100 p-4 shadow-md">
            <h2 className="text-lg font-bold mb-4">관리자 메뉴</h2>
            <nav>
                <ul className="space-y-2 text-sm">
                    <li className="mt-3">
                        <a href="/admin/post/create" className="hover:text-blue-600">
                            📝 글쓰기
                        </a>
                    </li>
                    {grouped.map((board) => (
                        <li key={board.menuId}>
                            <button
                                onClick={() => toggleBoard(board.menuId)}
                                className="w-full text-left font-medium hover:text-blue-600"
                            >
                                {openBoards[board.menuId] ? '📂' : '📁'} {board.name}
                            </button>
                            {openBoards[board.menuId] && (
                                <ul className="pl-4 mt-1 space-y-1">
                                    {board.children.map((child, idx) => (
                                        <li key={idx}>
                                            <a href={'/admin' + child.url} className="hover:text-blue-500">
                                                📄 {child.name}
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
    );
};

export default LeftMenu;
