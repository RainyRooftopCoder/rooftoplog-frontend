import { useState, useRef, useEffect } from 'react';
import api from '../../api/axios';

type MenuItem = {
    menuId: number;
    parentId: number | null;
    name: string;
    url: string;
    isAdmin: string;
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

    const [addingSubMenuId, setAddingSubMenuId] = useState<number | null>(null);
    const [subMenuName, setSubMenuName] = useState('');

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
            setMenuTree(res.data);
        });
    }, []);

    const grouped = menuTree
        .filter((item) => item.parentId === null)
        .map((parent) => ({
            ...parent,
            children: menuTree.filter((child) => child.parentId === parent.menuId),
        }));

    const saveNewMenu = async () => {
        if (confirm('저장 하시겠습니까?')) {
            try {
                if (!newMenuName) return alert('메뉴이름을 입력해주세요.');

                const response = await api.post('/menu', {
                    name: newMenuName,
                    parentId: newParentId,
                    url: newUrl,
                    isAdmin: isAdmin,
                    isActive: newIsActive,
                    isDeleted: newIsDelete,
                });

                if (response.status === 200) {
                    alert('저장 하였습니다.');
                    const res = await api.get<MenuItem[]>('/menu/admin');
                    setMenuTree(res.data);
                } else {
                    alert('저장 실패하였습니다.');
                }

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

    const handleSaveSubMenu = async () => {
        if (!subMenuName) return alert('하위 메뉴 이름을 입력해주세요.');
        try {
            const response = await api.post('/menu', {
                name: subMenuName,
                parentId: addingSubMenuId,
                url: newUrl,
                isAdmin: isAdmin,
                isActive: newIsActive,
                isDeleted: newIsDelete,
            });

            if (response.status === 200) {
                alert('하위 메뉴가 추가되었습니다.');
                const res = await api.get<MenuItem[]>('/menu/admin');
                setMenuTree(res.data);
            } else {
                alert('추가 실패');
            }
        } catch (err) {
            alert('추가 실패\n' + err);
        }

        setAddingSubMenuId(null);
        setSubMenuName('');
        setNewUrl('');
    };

    const saveEditMenu = async () => {
        if (!editingMenuId || !editMenuName) return alert('메뉴 이름을 입력해주세요.');

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

                if (response.status === 200) {
                    alert('수정 완료되었습니다.');
                    const res = await api.get<MenuItem[]>('/menu/admin');
                    setMenuTree(res.data);
                } else {
                    alert('수정 실패했습니다.');
                }

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
                    data: { menuId },
                });

                if (response.status === 200) {
                    alert('삭제 하였습니다.');
                    const res = await api.get<MenuItem[]>('/menu/admin');
                    setMenuTree(res.data);
                } else {
                    alert('삭제 실패하였습니다.');
                }
            } catch (err) {
                alert('삭제 실패\n' + err);
            }
        }
    };

    return (
        <div>
            <button
                className="mt-4 text-blue-600 hover:underline flex items-center"
                onClick={() => setIsAddingMenu(true)}
            >
                <span className="text-xl mr-2">＋카테고리 추가</span>
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
                                    placeholder="카테고리명"
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
                            <div className="flex space-x-2">
                                <button className="px-2 text-blue-600 rounded hover:bg-blue-100" onClick={saveNewMenu}>
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
                        ) : (
                            <div className="w-full font-semibold flex items-center justify-between">
                                <span onClick={() => toggleBoard(board.menuId)}>
                                    {openBoards[board.menuId] ? '▾' : '▸'} {board.name}
                                    <span className="text-gray-400">({board.children?.length || 0})</span>
                                </span>
                                <div className="flex space-x-2">
                                    <button
                                        className="px-2 rounded hover:bg-gray-200"
                                        onClick={() => {
                                            setAddingSubMenuId(board.menuId);
                                            setSubMenuName('');
                                            toggleBoard(board.menuId);
                                        }}
                                    >
                                        +메뉴 추가
                                    </button>
                                    <button
                                        className="px-2 text-blue-600 rounded hover:bg-blue-100"
                                        onClick={() => {
                                            setEditingMenuId(board.menuId);
                                            setEditMenuName(board.name);
                                            setEditParentId(board.parentId);
                                            setEditIsAdmin(board.isAdmin);
                                            setEditUrl(board.url);
                                            setEditIsActive('Y');
                                            setEditIsDelete('N');
                                            setEditingMenu(true);
                                        }}
                                    >
                                        수정
                                    </button>
                                    <button
                                        className="px-2 text-red-600 rounded hover:bg-red-100"
                                        onClick={() => deleteBoard(board.menuId)}
                                    >
                                        삭제
                                    </button>
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
                                        {editingMenu && editingMenuId === item.menuId ? (
                                            <div className="flex items-center space-x-2 w-full">
                                                <input
                                                    type="text"
                                                    className="border-b px-2 py-1 rounded w-64"
                                                    value={editMenuName}
                                                    onChange={(e) => setEditMenuName(e.target.value)}
                                                />
                                                <select
                                                    className="border px-2 py-1 rounded w-64"
                                                    value={editIsAdmin}
                                                    onChange={(e) => setEditIsAdmin(e.target.value)}
                                                >
                                                    <option value="N">게스트</option>
                                                    <option value="Y">관리자</option>
                                                </select>
                                                <div className="flex space-x-2 ml-auto">
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
                                        ) : (
                                            <>
                                                <span>{item.name}</span>
                                                <div className="flex justify-end space-x-2">
                                                    <button
                                                        className="px-2 text-blue-600 rounded hover:bg-blue-100"
                                                        onClick={() => {
                                                            setEditingMenuId(item.menuId);
                                                            setEditMenuName(item.name);
                                                            setEditParentId(item.parentId);
                                                            setEditIsAdmin(item.isAdmin);
                                                            setEditUrl(item.url);
                                                            setEditIsActive('Y');
                                                            setEditIsDelete('N');
                                                            setEditingMenu(true);
                                                        }}
                                                    >
                                                        수정
                                                    </button>
                                                    <button
                                                        className="px-2 text-red-600 rounded hover:bg-red-100"
                                                        onClick={() => deleteBoard(item.menuId)}
                                                    >
                                                        삭제
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </li>
                            ))}
                            {addingSubMenuId === board.menuId && (
                                <li className="py-2 border-b border-gray-200 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <input
                                            type="text"
                                            className="border-b px-2 py-1 rounded w-64"
                                            placeholder="메뉴 이름"
                                            value={subMenuName}
                                            onChange={(e) => setSubMenuName(e.target.value)}
                                        />
                                        <input
                                            type="text"
                                            className="border-b px-2 py-1 rounded w-64"
                                            placeholder="URL[/admin/menu]"
                                            value={newUrl}
                                            onChange={(e) => setNewUrl(e.target.value)}
                                        />
                                        <div className="flex space-x-2">
                                            <button
                                                className="px-2 text-blue-600 rounded hover:bg-blue-100"
                                                onClick={handleSaveSubMenu}
                                            >
                                                저장
                                            </button>
                                            <button
                                                className="px-2 text-red-600 rounded hover:bg-red-100"
                                                onClick={() => {
                                                    setAddingSubMenuId(null);
                                                    setSubMenuName('');
                                                }}
                                            >
                                                취소
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default MenuManagementPage;
