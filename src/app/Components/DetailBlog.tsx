"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { POSTTYPE } from '@/types/type';
import axios from 'axios';
import { HeartIcon, MessageCircleIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface Props {
    data: POSTTYPE[];
}

const DetailBlog = ({ data }: any) => {
    console.log(data);

    const [description, setDescription] = useState<string>("")


    const [decodedToken, setDecodedToken] = useState<any>('');

    useEffect(() => {
        const decodeToken = (token: string) => {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                return JSON.parse(jsonPayload);
            } catch (error) {
                console.error('Failed to decode token:', error);
                return null;
            }
        };

        const token = localStorage.getItem('accessToken');
        if (token) {
            const decoded = decodeToken(token);
            setDecodedToken(decoded);
        }
    }, []);

    const createComment = async () => {
        try {

            const findUser = await axios.get(`/api/user/GetUser/${decodedToken.id}`)
            console.log(findUser.data.name);

            const fetchData = await axios.post("/api/blog/createComment", {
                name: findUser.data.name,
                postId: data.id,
                Description: description
            })

            toast({
                title: "Comment Added",
                description: "Your Comment Added",
            })
        } catch (error) {
            toast({
                title: "Error for Adding Comment",
                description: "Please Try Again",
            })
        }
    }

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
                                    <span className="text-muted-foreground">{data.createdAt}</span>
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
            <div className="flex items-center gap-4 mt-6">
                <p>{data.like}</p>
                <Button variant="ghost" size="icon">
                    <HeartIcon className="w-4 h-4" />
                    <span className="sr-only">Like</span>
                </Button>
                <p>{data.comment.length}</p>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MessageCircleIcon className="w-4 h-4" />
                            <span className="sr-only">Comment</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Create Comment</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input placeholder='Enter Comment' onChange={(e) => setDescription(e.target.value)} />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button onClick={createComment}>
                                Continue
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            <div className="mt-6 space-y-4">
                {
                    data.comment.map((el: any) => (
                        <div>
                            <div className="flex items-center space-x-4">
                                <img src="/placeholder.svg" alt="Comment Author Avatar" className="h-8 w-8 rounded-full" />
                                <div>
                                    <div className="font-medium">{el.name}</div>
                                    <div className="text-muted-foreground text-sm">{el.createdAt}</div>
                                </div>
                            </div>
                            <div className="mt-2 text-sm">
                                {el.Description}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DetailBlog
