
import AllData from '@/app/Components/AllData';
import Navbar from '@/app/Components/Navbar';
import React from 'react';

const fetchBlogData = async () => {
    try {
        const res = await fetch("https://blog-gold-beta.vercel.app/api/blog/getBlogData", {
            next: { revalidate: 10 }
        });
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    } catch (error) {
        console.log(error);
        return null;
    }
};

const Page = async () => {
    const data = await fetchBlogData();
    return (
        <>
            <Navbar />
            <AllData data={data} />
        </>
    );
};

export default Page;
