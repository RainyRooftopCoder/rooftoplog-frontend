import { useEffect, useState } from 'react';
import axios from 'axios';

const GuestbookPage = () => {
    const [author, setAuthor] = useState('');
    const [password, setPassword] = useState('');
    const [content, setContent] = useState('');
    const [guestbooks, setGuestbooks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [division, setDivision] = useState('');
    const [selectedGuestbookId, setSelectedGuestbookId] = useState<number>(0);

    const fetchGuestbooks = async () => {
        const res = await axios.get('/api/guestbook');
        setGuestbooks(res.data);
    };

    const handleSubmit = async () => {
        if (!author || !password || !content) {
            alert('모든 항목을 입력해주세요.');
            return;
        }

        if (confirm('저장 하시겠습니까?')) {
            try {
                const response = await axios.post('/api/guestbook', {
                    author,
                    password,
                    content,
                    executionDivision: 'insert',
                });

                if (response.status === 200) {
                    alert(response.data);

                    setAuthor('');
                    setPassword('');
                    setContent('');
                    setShowForm(false);
                    fetchGuestbooks();
                } else {
                    alert('오류 : ' + response.data);
                }
            } catch (err: any) {
                alert(err.response.data);
            }
        }
    };

    const checkPswd = async () => {
        if (!password) {
            alert('비밀번호를 입력해주세요.');
            return;
        }

        try {
            const response = await axios.post('/api/guestbook/checkPswd', {
                guestbookId: selectedGuestbookId,
                password,
            });

            if (response.status === 200) {
                setPassword('');
            } else {
                alert('비밀번호확인중 오류가 발생했습니다.');
                return;
            }
        } catch (err: any) {
            alert(err.response.data);
            setPassword('');
        } finally {
            (document.getElementById('checkPasswordDialog') as HTMLDialogElement).close();
        }

        if (division === 'delete') {
            const response = await axios.put('/api/guestbook', {
                guestbookId: selectedGuestbookId,
                executionDivision: division,
            });

            if (response.status === 200) {
                alert(response.data);
            }

            fetchGuestbooks();
            return;
        } else {
            if (!author || !password || !content) {
                alert('모든 항목을 입력해주세요.');
                return;
            }

            if (confirm('저장 하시겠습니까?')) {
                try {
                    const response = await axios.put('/api/guestbook', {
                        selectedGuestbookId,
                        author,
                        password,
                        content,
                        executionDivision: division,
                    });

                    if (response.status === 200) {
                        alert(response.data);

                        setAuthor('');
                        setPassword('');
                        setContent('');
                        fetchGuestbooks();
                    } else {
                        alert('오류 : ' + response.data);
                    }
                } catch (err: any) {
                    alert(err.response.data);
                }
            }
        }
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
                            <div>
                                <span className="font-semibold pr-2">{g.author}</span>
                                {/*                                 
                                <button
                                    className="px-2 text-blue-600 rounded hover:bg-blue-100"
                                    onClick={() => {
                                        setSelectedGuestbookId(g.guestbookId);
                                        setDivision('update');
                                        (
                                            document.getElementById('checkPasswordDialog') as HTMLDialogElement
                                        ).showModal();
                                    }}
                                >
                                    수정
                                </button>
                                <button
                                    className="px-2 text-red-600 rounded hover:bg-red-100"
                                    onClick={() => {
                                        setSelectedGuestbookId(g.guestbookId);
                                        setDivision('delete');
                                        (
                                            document.getElementById('checkPasswordDialog') as HTMLDialogElement
                                        ).showModal();
                                    }}
                                >
                                    삭제
                                </button>
                                 */}
                            </div>
                            <span className="text-sm text-gray-500">{g.createdAt}</span>
                        </div>
                        <p className="my-2">{g.content}</p>
                    </li>
                ))}
            </ul>
            {showForm && (
                <div className="fixed left-1/2 transform -translate-x-1/2 bottom-20 z-50 bg-white border p-4 rounded shadow-lg max-w-2xl w-full">
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
                        className="w-full h-30 border p-2 rounded mb-2 resize-none"
                        placeholder="내용을 입력하세요..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <div className="text-right space-x-2">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleSubmit}
                        >
                            등록
                        </button>
                        <button
                            onClick={() => setShowForm(false)}
                            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                        >
                            닫기
                        </button>
                    </div>
                </div>
            )}

            {/* 하단 고정 버튼 */}
            <button
                onClick={() => setShowForm(true)}
                className="fixed z-50 bg-blue-600 hover:bg-blue-700 text-white px-3 py-6 rounded shadow-lg flex items-center justify-center"
                style={{
                    writingMode: 'vertical-rl',
                    right: 'calc((100vw - 768px) / 2 - 1rem)', // (브라우저 너비 - 콘텐츠 너비)/2 - 살짝 더 밀어냄
                    bottom: '5rem',
                }}
            >
                방명록 작성
            </button>

            {/* 비밀번호 체크 모달 */}
            <dialog id="checkPasswordDialog" className="rounded p-4 shadow-md w-80">
                <form method="dialog" className="flex flex-col gap-3">
                    <h2 className="text-lg font-semibold">비밀번호 확인</h2>
                    <input
                        type="password"
                        className="border p-2 rounded"
                        placeholder="비밀번호를 입력하세요"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                            onClick={() => {
                                checkPswd();
                            }}
                        >
                            확인
                        </button>
                        <button
                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                            onClick={() => {
                                setPassword('');
                                (document.getElementById('checkPasswordDialog') as HTMLDialogElement).close();
                            }}
                        >
                            취소
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default GuestbookPage;
