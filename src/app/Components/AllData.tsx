import React from 'react';
import { POSTTYPE } from '@/types/type';

interface Props {
    data: POSTTYPE[];
}

const AllData: React.FC<Props> = ({ data }) => {
    return (
        <div className='post-list space-y-4'>
            {data.map((post, index) => (
                <div key={index} className='post-details bg-white p-6 rounded-lg shadow-md'>
                    <h2 className='post-title text-2xl font-bold mb-2'>{post.title}</h2>
                    <p className='post-description text-gray-700 mb-4'>{post.description}</p>
                    <div className='post-meta flex justify-between text-gray-600'>
                        <span className='post-like'>Likes: {post.like}</span>
                        <span className='post-comments'>Comments: {post.comment.length}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllData;
