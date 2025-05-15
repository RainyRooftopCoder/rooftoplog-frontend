import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PostsPage = () => {
    const { boardId } = useParams();
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        const res = await axios.get('/api/post/list', { params: { boardId } });
        console.log(res.data);
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="max-w-2xl mx-auto pt-4 px-4 pb-32">
            <ul className="space-y-4 mt-4">
                {posts.map((p: any) => (
                    <li key={p.postId} className="border p-4 rounded shadow-sm bg-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="font-semibold pr-2">{p.title}</span>
                            </div>
                            <span className="text-sm text-gray-500">{p.createdAt}</span>
                        </div>
                        <p className="my-2 text-gray-500">{p.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsPage;
