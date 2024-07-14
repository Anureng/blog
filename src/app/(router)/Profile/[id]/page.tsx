import { Chart } from '@/app/Components/Chart';
import Navbar from '@/app/Components/Navbar';
import Profile from '@/app/Components/Profile'
import { ProfileComponent } from '@/components/component/profile-component';
import React from 'react'

const fetchBlogData = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/user/GetUser/${id}`, {
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

const page = async (params: { id: string }) => {


    const data = await fetchBlogData(params.id)
    console.log(data);

    return (
        <div>
            <Navbar />
            <Profile data={data} />
            <ProfileComponent />
        </div>
    )
}

export default page
