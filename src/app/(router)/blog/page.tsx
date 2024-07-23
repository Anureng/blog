// app/blog/page.jsx

import React from 'react';
import Navbar from '@/app/Components/Navbar';
import AllData from '@/app/Components/AllData';

const fetchBlogData = async () => {
    const res = await fetch(`https://blog-gold-beta.vercel.app/api/blog/getBlogData`, {
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
};

const BlogPage = async () => {
    let data;
    try {
        data = await fetchBlogData();
    } catch (error) {
        console.error('Error fetching blog data:', error);
        data = null;
    }

    return (
        <>
            <Navbar />
            {data ? <AllData data={data} /> : <p>Error fetching data</p>}
        </>
    );
};

export default BlogPage;
