"use client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { toast, useToast } from '@/components/ui/use-toast';
import axios from "axios"

import React from 'react'

const Profile = (data: any) => {
    console.log(data);
    console.log(data.data);

    const { toast } = useToast()

    const becomeAuthor = async () => {
        try {
            const dataApi = await axios.post("http://localhost:3000/api/author/createAuthor", {
                name: data.data.name,
                profileUrl: "hfskjh"
            })
            const updateUser = await axios.patch(`http://localhost:3000/api/user/updateAuthor/${data.data.id}`, {
                Author: dataApi.data.id
            })
            toast({
                title: "Congratulation For Becoming Author 🥳🥳🥳🥳",
                description: "You become Author . Now You can add your blog",
            })
        } catch (error) {
            toast({
                title: "Error for creating Author",
                description: "Please Try Again",
            })
        }
    }

    return (
        <div>
            <header className="bg-muted py-8 px-4 md:px-6 lg:px-8">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src="/placeholder-user.jpg" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                            <h1 className="text-2xl font-bold">{data.data.name}</h1>
                            <p className="text-muted-foreground">{data.data.email}</p>
                        </div>
                    </div>

                    {
                        data.data.Author ? "You are now author" : (
                            <Sheet>
                                <SheetTrigger>
                                    <Button>Become Author</Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>Become Author</SheetTitle>
                                        <SheetDescription>
                                            This action cannot be undone. This will permanently delete your account
                                            and remove your data from our servers.
                                        </SheetDescription>
                                    </SheetHeader>
                                    <Button onClick={becomeAuthor}>Submit</Button>
                                </SheetContent>
                            </Sheet>
                        )
                    }
                </div>
            </header>
        </div>
    )
}

export default Profile
