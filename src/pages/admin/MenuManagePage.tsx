// src/pages/admin/MenuManagementPage.tsx
import { useState } from 'react';

type MenuItem = {
    id: string;
    name: string;
    children?: MenuItem[];
};

const sampleData: MenuItem[] = [
    {
        id: '1',
        name: '오류 모음',
        children: [
            { id: '1-1', name: 'Java & Spring' },
            { id: '1-2', name: 'HTML' },
            { id: '1-3', name: 'CSS' },
            { id: '1-4', name: 'JavaScript' },
            { id: '1-5', name: 'Dart & Flutter' },
        ],
    },
    {
        id: '2',
        name: '개인 연습',
        children: [{ id: '2-1', name: '첫 게시판' }],
    },
    {
        id: '3',
        name: '정리 모음',
        children: [
            { id: '3-1', name: 'SVN' },
            { id: '3-2', name: 'Flutter' },
            { id: '3-3', name: 'Java' },
        ],
    },
];

const MenuManagementPage = () => {
    const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

    const toggleItem = (id: string) => {
        setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div>
            <button className="mt-4 text-blue-600 hover:underline flex items-center">
                <span className="text-xl mr-2">＋</span> 메뉴 추가
            </button>
            <p className="text-right text-gray-400 mt-1 text-xs">14 / 500</p>
            {sampleData.map((category) => (
                <div key={category.id} className="mb-2 border rounded bg-white">
                    <div
                        className="cursor-pointer px-4 py-2 flex items-center justify-between hover:bg-gray-100"
                        onClick={() => toggleItem(category.id)}
                    >
                        <div className="w-full font-semibold flex items-center justify-between">
                            <span>
                                {openItems[category.id] ? '▾' : '▸'} {category.name}
                                <span className="text-gray-400">({category.children?.length || 0})</span>
                            </span>
                            <div>
                                <div className="flex space-x-2">
                                    <button className="px-2 rounded hover:bg-gray-200">하위메뉴 추가</button>
                                    <button className="px-2 text-blue-600 rounded hover:bg-blue-100">수정</button>
                                    <button className="px-2 text-red-600 rounded hover:bg-red-100">삭제</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {openItems[category.id] && (
                        <ul className="pl-6 pr-4 py-2 space-y-1 border-t">
                            {category.children?.map((item) => (
                                <li
                                    key={item.id}
                                    className="py-2 border-b border-gray-200 last:border-b-0 hover:text-blue-600"
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{item.name}</span>{' '}
                                        <div className="flex justify-end space-x-2">
                                            <button className="px-2 text-blue-600 rounded hover:bg-blue-100">
                                                수정
                                            </button>
                                            <button className="px-2 text-red-600 rounded hover:bg-red-100">삭제</button>
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
