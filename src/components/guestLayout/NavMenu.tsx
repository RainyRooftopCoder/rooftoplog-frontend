// src/components/layout/NavMenu.tsx
import { useState, useEffect } from 'react';
import api from '../../api/axios';

// const boardData = [
//     {
//         id: 'board1',
//         name: '게시판1',
//         children: ['게시판 1-1', '게시판 1-2'],
//     },
//     {
//         id: 'board2',
//         name: '게시판2',
//         children: ['게시판 2-1', '게시판 2-2'],
//     },
// ];

type MenuItem = {
    menuId: number;
    parentId: number | null;
    name: string;
    url: string;
};

const NavMenu = () => {
    const [menuTree, setMenuTree] = useState<MenuItem[]>([]);
    const [openBoards, setOpenBoards] = useState<{ [key: number]: boolean }>({});

    const toggleBoard = (id: number) => {
        setOpenBoards((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    useEffect(() => {
        api.get<MenuItem[]>('/menu/guest').then((res) => {
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
        <div className="relative group w-1/5">
            <button className="bg-white border w-full px-4 py-2 text-2xl font-semibold flex items-center justify-between hover:bg-gray-100">
                <span>MENU</span>
                <span className="ml-2 text-sm">▼</span>
            </button>
            {/* 드롭다운 메뉴 */}
            <div className="absolute px-2 pt-3 pb-3 left-0 w-full bg-white border shadow-lg hidden group-hover:block z-50">
                <ul className="p-2 text-lg space-y-1">
                    {grouped.map((board) => (
                        <li key={board.menuId}>
                            <button
                                onClick={() => toggleBoard(board.menuId)}
                                className="w-full text-left mt-1 mb-1 hover:text-blue-600"
                            >
                                {openBoards[board.menuId] ? '📂' : '📁'} {board.name}
                            </button>

                            {openBoards[board.menuId] && board.children.length > 0 && (
                                <ul className="pl-4 mt-1 space-y-1">
                                    {board.children.map((child) => (
                                        <li key={child.menuId} className="hover:text-blue-500 cursor-pointer">
                                            <a href={child.url} className="hover:text-blue-500">
                                                📄 {child.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                    <li className="hover:text-blue-600 cursor-pointer">
                        <a href={'/guestbook'} className="hover:text-blue-500">
                            💬 방명록
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavMenu;

{
    /* {boardData.map((board) => (
                        <li key={board.id}>
                            <button
                                onClick={() => toggleBoard(board.id)}
                                className="w-full text-left mt-1 mb-1 hover:text-blue-600"
                            >
                                {openBoards[board.id] ? '📂' : '📁'} {board.name}
                            </button>
                            {openBoards[board.id] && (
                                <ul className="pl-4 mt-1 space-y-1">
                                    {board.children.map((child, idx) => (
                                        <li key={idx} className="hover:text-blue-500 cursor-pointer">
                                            📄 {child}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))} */
}
