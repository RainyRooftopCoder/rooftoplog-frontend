import { ReactNode, useState, useEffect } from 'react';
import api from '../../api/axios';

type MenuItem = {
    menuId: number;
    parentId: number | null;
    name: string;
    url: string;
};

const PostCreatePage = () => {
    const [menuTree, setMenuTree] = useState<MenuItem[]>([]);
    const [openBoards, setOpenBoards] = useState<{ [key: number]: boolean }>({});
    const [boardUrl, setBoardUrl] = useState('');
    const [boardNm, setBoardNm] = useState('');
    const [boardTitle, setBoardTitle] = useState('');
    const [boardContent, setBoardContent] = useState('');

    const toggleBoard = (id: number) => {
        setOpenBoards((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    useEffect(() => {
        api.get<MenuItem[]>('/menu/guest').then((res) => {
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
        <div>
            <h2 className="text-xl font-bold mb-4">📝 글 작성</h2>
            <form className="space-y-4">
                <div>
                    <input
                        type="text"
                        className="w-full border rounded px-4 py-2 font-semibold"
                        placeholder="제목을 입력하세요"
                        value={boardTitle}
                        onChange={(e) => setBoardTitle(e.target.value)}
                    />
                </div>
                <div className="relative group w-5/5">
                    <button className="bg-white border w-full px-3 py-2 text-2xl flex items-center justify-between hover:bg-gray-100">
                        <span>{boardUrl ? boardNm : '게시판'}</span>
                        <span className="ml-2 text-sm">▼</span>
                    </button>
                    <div className="absolute px-2 pt-3 pb-3 left-0 w-full bg-white border shadow-lg hidden group-hover:block z-50">
                        <ul className="p-2 text-lg space-y-1">
                            {grouped.map((board) => (
                                <li key={board.menuId}>
                                    <span className="w-full text-left mt-1 mb-1 hover:text-blue-600">
                                        {openBoards[board.menuId] ? '📂' : '📁'} {board.name}
                                    </span>
                                    {board.children.length > 0 && (
                                        <ul className="pl-4 mt-1 space-y-1">
                                            {board.children.map((child) => (
                                                <li key={child.menuId} className="hover:text-blue-500 cursor-pointer">
                                                    <span
                                                        className="hover:text-blue-500"
                                                        onClick={() => {
                                                            setBoardUrl(child.url);
                                                            setBoardNm(child.name);
                                                        }}
                                                    >
                                                        📄 {child.name} [ {child.url} ]
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div>
                    <textarea
                        className="w-full border rounded px-3 py-2 h-40"
                        placeholder="내용을 입력하세요"
                        value={boardContent}
                        onChange={(e) => setBoardContent(e.target.value)}
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        작성 완료
                    </button>
                    {/* 추가 버튼 예시 */}
                    <button type="button" className="bg-red-300 text-gray-800 px-4 py-2 rounded hover:bg-red-400">
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostCreatePage;
