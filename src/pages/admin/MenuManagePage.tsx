import { useState, useRef, useEffect } from 'react';
import api from '../../api/axios';

type MenuItem = {
    menuId: number;
    parentId: number | null;
    name: string;
    url: string;
};

const MenuManagementPage = () => {
    const [isAddingMenu, setIsAddingMenu] = useState(false);
    const [editingMenu, setEditingMenu] = useState(false);

    const [newMenuName, setNewMenuName] = useState('');
    const [newParentId, setNewParentId] = useState<number | null>(null);
    const [isAdmin, setIsAdmin] = useState('N');
    const [newUrl, setNewUrl] = useState('');
    const [newIsActive, setNewIsActive] = useState('Y');
    const [newIsDelete, setNewIsDelete] = useState('N');

    const [editingMenuId, setEditingMenuId] = useState<number | null>(null);
    const [editMenuName, setEditMenuName] = useState('');
    const [editParentId, setEditParentId] = useState<number | null>(null);
    const [editIsAdmin, setEditIsAdmin] = useState('N');
    const [editUrl, setEditUrl] = useState('');
    const [editIsActive, setEditIsActive] = useState('Y');
    const [editIsDelete, setEditIsDelete] = useState('N');

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isAddingMenu) {
            inputRef.current?.focus();
        }
    }, [isAddingMenu]);

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

    const saveNewMenu = async () => {
        if (confirm('저장 하시겠습니까?')) {
            try {
                if (!newMenuName) {
                    return alert('메뉴이름을 입력해주세요.');
                }

                const response = await api.post('/menu', {
                    name: newMenuName,
                    parentId: newParentId,
                    url: newUrl,
                    isAdmin: isAdmin,
                    isActive: newIsActive,
                    isDeleted: newIsDelete,
                });

                console.log('/* 성공 */');
                console.log(response.data);

                if (response.status === 200) {
                    alert('저장 하였습니다.');
                } else {
                    return alert('저장 실패하였습니다.');
                }

                const res = await api.get<MenuItem[]>('/menu/admin');
                setMenuTree(res.data);

                setNewMenuName('');
                setIsAddingMenu(false);
                setNewParentId(null);
                setNewUrl('');
                setIsAdmin('N');
                setNewIsActive('Y');
                setNewIsDelete('N');
            } catch (err) {
                alert('저장 실패\n' + err);
            }
        }
    };

    const saveEditMenu = async () => {
        if (!editingMenuId) return alert('수정할 메뉴가 없습니다.');
        if (!editMenuName) return alert('메뉴 이름을 입력해주세요.');

        if (confirm('수정 하시겠습니까?')) {
            try {
                const response = await api.put('/menu', {
                    menuId: editingMenuId,
                    name: editMenuName,
                    parentId: editParentId,
                    url: editUrl,
                    isAdmin: editIsAdmin,
                    isActive: editIsActive,
                    isDeleted: editIsDelete,
                });

                console.log('수정 성공', response.data);

                if (response.status === 200) {
                    alert('수정 완료되었습니다.');
                } else {
                    alert('수정 실패했습니다.');
                }

                // 수정 후 목록 다시 불러오기
                const res = await api.get<MenuItem[]>('/menu/admin');
                setMenuTree(res.data);

                setEditingMenu(false);
                setEditingMenuId(null);
                setEditMenuName('');
                setEditParentId(null);
                setEditIsAdmin('N');
                setEditUrl('');
                setEditIsActive('Y');
                setEditIsDelete('N');
            } catch (error) {
                alert('수정 실패\n' + error);
            }
        }
    };

    const deleteBoard = async (menuId: number) => {
        if (confirm('삭제 하시겠습니까?')) {
            try {
                const response = await api.delete('/menu', {
                    data: {
                        menuId: menuId,
                    },
                });

                console.log('/* 성공 */');
                console.log(response.data);

                if (response.status === 200) {
                    alert('삭제 하였습니다.');
                } else {
                    return alert('삭제 실패하였습니다.');
                }

                const res = await api.get<MenuItem[]>('/menu/admin');
                setMenuTree(res.data);
            } catch (err) {
                alert('저장 실패\n' + err);
            }
        }
    };

    return (
        <div>
            <button
                className="mt-4 text-blue-600 hover:underline flex items-center"
                onClick={() => setIsAddingMenu(true)}
            >
                <span className="text-xl mr-2">＋ 메뉴 추가</span>
            </button>
            <p className="text-right text-gray-400 mt-1 text-xs">14 / 500</p>
            {isAddingMenu && (
                <div className="mb-2 border rounded bg-white">
                    <div className="cursor-pointer px-4 py-2 flex items-center justify-between">
                        <div className="w-full font-semibold flex items-center justify-between">
                            <span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="border-b px-2 py-1 rounded w-64"
                                    placeholder="메뉴 이름 입력"
                                    value={newMenuName}
                                    onChange={(e) => setNewMenuName(e.target.value)}
                                />
                                <select
                                    className="border ml-1 px-2 py-1 rounded w-64"
                                    value={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.value)}
                                >
                                    <option value="N">게스트</option>
                                    <option value="Y">관리자</option>
                                </select>
                            </span>
                            <div>
                                <div className="flex space-x-2">
                                    <button
                                        className="px-2 text-blue-600 rounded hover:bg-blue-100"
                                        onClick={saveNewMenu}
                                    >
                                        저장
                                    </button>
                                    <button
                                        className="px-2 text-red-600 rounded hover:bg-red-100"
                                        onClick={() => setIsAddingMenu(false)}
                                    >
                                        취소
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {grouped.map((board) => (
                <div key={board.menuId} className="mb-2 border rounded bg-white">
                    <div className="cursor-pointer px-4 py-2 flex items-center justify-between hover:bg-gray-100">
                        {editingMenu && editingMenuId === board.menuId ? (
                            <div className="w-full font-semibold flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="text"
                                        className="border-b px-2 py-1 rounded w-64"
                                        value={editMenuName}
                                        onChange={(e) => setEditMenuName(e.target.value)}
                                    />
                                    <select
                                        className="border-b px-2 py-1 rounded w-64"
                                        value={editIsAdmin}
                                        onChange={(e) => setEditIsAdmin(e.target.value)}
                                    >
                                        <option value="N">게스트</option>
                                        <option value="Y">관리자</option>
                                    </select>
                                </div>
                                <div>
                                    <div className="flex space-x-2">
                                        <button
                                            className="px-2 text-blue-600 rounded hover:bg-blue-100"
                                            onClick={saveEditMenu}
                                        >
                                            저장
                                        </button>
                                        <button
                                            className="px-2 text-red-600 rounded hover:bg-red-100"
                                            onClick={() => setEditingMenu(false)}
                                        >
                                            취소
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="w-full font-semibold flex items-center justify-between">
                                <span onClick={() => toggleBoard(board.menuId)}>
                                    {openBoards[board.menuId] ? '▾' : '▸'} {board.name}
                                    <span className="text-gray-400">({board.children?.length || 0})</span>
                                </span>
                                <div>
                                    <div className="flex space-x-2">
                                        <button className="px-2 rounded hover:bg-gray-200">하위메뉴 추가</button>
                                        <button
                                            className="px-2 text-blue-600 rounded hover:bg-blue-100"
                                            onClick={() => {
                                                setEditingMenuId(board.menuId);
                                                setEditingMenu(true);
                                            }}
                                        >
                                            수정
                                        </button>
                                        <button
                                            className="px-2 text-red-600 rounded hover:bg-red-100"
                                            onClick={() => {
                                                deleteBoard(board.menuId);
                                            }}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {openBoards[board.menuId] && (
                        <ul className="pl-6 pr-4 py-2 space-y-1 border-t">
                            {board.children?.map((item) => (
                                <li
                                    key={item.menuId}
                                    className="py-2 border-b border-gray-200 last:border-b-0 hover:text-blue-600"
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{item.name}</span>{' '}
                                        <div className="flex justify-end space-x-2">
                                            <button className="px-2 text-blue-600 rounded hover:bg-blue-100">
                                                수정
                                            </button>
                                            <button
                                                className="px-2 text-red-600 rounded hover:bg-red-100"
                                                onClick={() => {
                                                    deleteBoard(item.menuId);
                                                }}
                                            >
                                                삭제
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MenuManagementPage;
