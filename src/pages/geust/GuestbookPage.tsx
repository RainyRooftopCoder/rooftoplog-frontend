import { useEffect, useState } from 'react';
import axios from 'axios';

const GuestbookPage = () => {
    const [author, setAuthor] = useState('');
    const [password, setPassword] = useState('');
    const [content, setContent] = useState('');
    const [guestbooks, setGuestbooks] = useState([]);
    const [showForm, setShowForm] = useState(false);

    const fetchGuestbooks = async () => {
        const res = await axios.get('/api/guestbook');
        setGuestbooks(res.data);
    };

    const handleSubmit = async () => {
        if (!author || !password || !content) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        await axios.post('/api/guestbook', { author, password, content });
        setAuthor('');
        setPassword('');
        setContent('');
        setShowForm(false);
        fetchGuestbooks();
    };

    useEffect(() => {
        fetchGuestbooks();
    }, []);

    return (
        <div className="max-w-2xl mx-auto pt-4 px-4 pb-32">
            {/* 작성 폼 (위쪽에 고정) */}
            {/* 목록 */}
            <ul className="space-y-4 mt-4">
                {guestbooks.map((g: any) => (
                    <li key={g.guestbookId} className="border p-4 rounded shadow-sm bg-white">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold">{g.author}</span>
                            <span className="text-sm text-gray-500">{g.createdAt}</span>
                        </div>
                        <p className="my-2">{g.content}</p>
                        <button className="text-sm text-blue-500 hover:underline">▸ 댓글(0)</button>
                    </li>
                ))}
            </ul>
            {showForm && (
                <div className="fixed left-1/2 transform -translate-x-1/2 bottom-24 z-50 bg-white border p-4 rounded shadow-lg max-w-2xl w-full">
                    <div className="flex gap-2 mb-2">
                        <input
                            className="w-1/2 border p-2 rounded"
                            placeholder="닉네임"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                        <input
                            className="w-1/2 border p-2 rounded"
                            type="password"
                            placeholder="비밀번호"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <textarea
                        className="w-full border p-2 rounded mb-2"
                        placeholder="내용을 입력하세요..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="text-right space-x-2">
                        <button
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                            닫기
                        </button>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleSubmit}
                        >
                            등록
                        </button>
                    </div>
                </div>
            )}

            {/* 하단 고정 버튼 */}
            <button
                onClick={() => setShowForm(true)}
                className="fixed bottom-20 right-20 z-50 bg-blue-600 hover:bg-blue-700 text-white px-3 py-6 rounded shadow-lg flex items-center justify-center"
                style={{ writingMode: 'vertical-rl', right: '4.5rem', bottom: '6rem' }}
            >
                방명록 작성
            </button>
        </div>
    );
};

export default GuestbookPage;
