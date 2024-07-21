import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { POSTTYPE } from '@/types/type';
import Link from 'next/link';
import React from 'react'

interface Props {
    data: POSTTYPE[];
}

const DetailBlog = ({ data }: any) => {
    console.log(data);

    return (
        <div className="bg-background">
            <div className="container mx-auto py-12 px-4 md:px-6 lg:py-16">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="col-span-2">
                        <article className="prose prose-gray dark:prose-invert">
                            <div className="space-y-2 not-prose">
                                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                                    {data?.title}
                                </h1>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <img src="/placeholder.svg" alt="Author Avatar" className="h-8 w-8 rounded-full" />
                                        <span className="text-muted-foreground">John Doe</span>
                                    </div>
                                    <span className="text-muted-foreground">Published on July 19, 2024</span>
                                </div>
                            </div>
                            <figure className="lg:-mx-12 xl:-mx-20">
                                <img
                                    src={data.img}
                                    alt="AI in action"
                                    width={1250}
                                    height={340}
                                    className="aspect-video overflow-hidden rounded-lg object-cover"
                                />
                            </figure>
                            <p>
                                {data?.description}
                            </p>
                        </article>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailBlog
