const PostCreatePage = () => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">📝 글 작성</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">제목</label>
                    <input type="text" className="w-full border rounded px-3 py-2" placeholder="제목을 입력하세요" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">내용</label>
                    <textarea className="w-full border rounded px-3 py-2 h-40" placeholder="내용을 입력하세요" />
                </div>
                <div className="flex justify-end space-x-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        작성 완료
                    </button>
                    {/* 추가 버튼 예시 */}
                    <button type="button" className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                        임시 저장
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostCreatePage;
