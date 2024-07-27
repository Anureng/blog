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
import axios from "axios";
import { PencilIcon } from 'lucide-react';
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import React, { useEffect, useState } from 'react';

interface ProfileProps {
    data: {
        id: string;
        name: string;
        email: string;
        Author?: string;
    };
}

const Profile = ({ data }: ProfileProps) => {
    const { toast } = useToast();
    const [imageUrl, setImageUrl] = useState<string>("");

    const handleUploadImage = async (result: CloudinaryUploadWidgetResults) => {
        const info = result.info as any;
        console.log("Upload result:", info);  // Log the upload result for debugging

        try {
            // Uncomment and adjust the following line if you want to update the image on the server
            await axios.patch(`/api/author/updateAuthorImage/${data.Author}`, {
                profileUrl: info.secure_url,
            });

            toast({
                title: "Image upload",
                description: "Your image has been uploaded",
            });
        } catch (error) {
            console.error("Error uploading image:", error);  // Log the error for debugging
            toast({
                title: "Error uploading image",
                description: "Please try again",
            });
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const Authordata = await axios.get(`/api/author/updateAuthor/${data.Author}`)
                setImageUrl(Authordata.data.profileUrl)
            } catch (error) {
                console.log(error);
            }
        }

        fetchData()
    }, [])

    const becomeAuthor = async () => {
        try {
            const dataApi = await axios.post("https://blog-gold-beta.vercel.app/api/author/createAuthor", {
                name: data.name,
            });
            await axios.patch(`https://blog-gold-beta.vercel.app/api/user/updateAuthor/${data.id}`, {
                Author: dataApi.data.id
            });
            toast({
                title: "Congratulations!",
                description: "You have become an author. You can now add your blog.",
            });
        } catch (error) {
            console.error("Error creating author:", error);  // Log the error for debugging
            toast({
                title: "Error creating author",
                description: "Please try again",
            });
        }
    };

    return (
        <div>
            <header className="bg-muted py-8 px-4 md:px-6 lg:px-8">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage src={imageUrl || "/placeholder-user.jpg"} />
                            <AvatarFallback>{data.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CldUploadButton uploadPreset="qlvvng0p" onUpload={handleUploadImage}>
                            <PencilIcon className="h-5 mt-10 w-5" />
                        </CldUploadButton>
                        <div className="grid gap-1">
                            <h1 className="text-2xl font-bold">{data.name}</h1>
                            <p className="text-muted-foreground">{data.email}</p>
                        </div>
                    </div>

                    {data.Author ? (
                        "You are now an author"
                    ) : (
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
                    )}
                </div>
            </header>
        </div>
    );
};

export default Profile;
