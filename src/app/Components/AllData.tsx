import React from 'react';
import { POSTTYPE } from '@/types/type';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

interface Props {
    data: POSTTYPE[];
}

const AllData: React.FC<Props> = ({ data }) => {
    console.log(data);

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
                    <div className="bg-background h-96 rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-bold mb-4">Filter</h2>
                        <div className="mb-4">
                            <label htmlFor="search" className="block font-medium mb-2">
                                Search
                            </label>
                            <Input
                                id="search"
                                type="text"
                                placeholder="Search blog posts..."
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="tags" className="block font-medium mb-2">
                                Tags
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {/* {uniqueTags.map((tag) => (
                                    <Button
                                        key={tag}
                                        variant={selectedTags.includes(tag) ? "primary" : "outline"}
                                        onClick={() => handleTagClick(tag)}
                                        className="w-full"
                                    >
                                        {tag}
                                    </Button>
                                ))} */}
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((post: any) => (
                            <div key={post.id} className="bg-background rounded-lg shadow-md overflow-hidden">
                                <Link href={`/detail/${post.id}`} prefetch={false}>
                                    <img
                                        src={post.img}
                                        alt={post.title}
                                        width={400}
                                        height={225}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                                        <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllData;
