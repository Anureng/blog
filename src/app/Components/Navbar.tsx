"use client";
import { Instagram, Linkedin, ShoppingCart, Twitter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from 'next/navigation'
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Correctly import js-cookie
import { useToast } from "@/components/ui/use-toast";
import jwt from "jsonwebtoken";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, UserCircle, UserCog } from "lucide-react";
import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DecodeToken from '@/custom/DecodeToken';


const Navbar = () => {
    const [countData, setCountData] = useState(0);
    const { toast } = useToast();
    const [nameData, setNameData] = useState("");
    const [emailData, setEmailData] = useState("");
    const [passwordData, setPasswordData] = useState("");
    const [roleData, setRoleData] = useState("user");

    const handleLoginData = async () => {
        const res = await fetch("/api/user/updateUser", {
            method: "POST",
            body: JSON.stringify({
                email: emailData,
                password: passwordData,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json()

        console.log(data.accessToken);

        localStorage.setItem("accessToken", data.accessToken)

        if (res.status === 500) {
            console.log(res.statusText);
        }
        if (res.status === 200) {
            console.log("Registering successfully, login with your credentials");
            window.location.reload();
            redirect("/")
        }
    }

    const handleClickaddData = async () => {
        const res = await fetch("/api/user/createUser", {
            method: "POST",
            body: JSON.stringify({
                email: emailData,
                name: nameData,
                password: passwordData,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.status === 500) {
            console.log(res.statusText);
        }
        if (res.status === 200) {
            console.log("Registering successfully, login with your credentials");
            redirect("/")
        }
    }

    // Retrieve the access token from cookies



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

    const SignOut = async () => {
        try {
            const findId = localStorage.removeItem("accessToken")
            toast({
                title: "Log Out",
                description: "successfully Log Out",
            })
            redirect("/")
        } catch (error) {
            toast({
                title: "Not able to Log Out",
                description: "Please Try Again",
            })
        }
    }
    const router = useRouter();
    return (
        <div>
            <div className='bg-gray-200 flex items-center justify-evenly p-3'>
                <div className='text-red-600 font-bold text-xs sm:text-xl '>
                    <Link href="/">
                        CulinaShare
                    </Link>
                </div>
                <div className='flex lg:space-x-3 text-xs'>
                    <Twitter />
                    <Instagram />
                    <Linkedin />
                </div>
                {
                    decodedToken ? (
                        <div className='flex items-center space-x-4'>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={""} alt="@shadcn" />
                                        <AvatarFallback className="text-primary hover:bg-primary hover:text-white transition-all">
                                            <UserCog className="h-5" />
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="mr-6 bg-white">
                                    <DropdownMenuLabel>
                                        <div className="pr-20 pl-4">
                                            <h1 className="font-semibold text-md">Signed in as</h1>
                                            <Link href={`Profile/${decodedToken.id}`}>
                                                <h1 className="font-semibold text-md">{decodedToken?.name}</h1>
                                            </Link>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <div onClick={() => { SignOut() }}>
                                        <DropdownMenuItem className="hover:!bg-red-500 cursor-pointer hover:!text-white">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <p>
                                <Link href="/About">
                                    About
                                </Link>
                            </p>
                        </div>
                    ) : (
                        <div className='flex items-center space-x-4'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className='text-xs p-1 lg:text-lg sm:p-4'>Log In</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Create Username</DialogTitle>
                                        <DialogDescription>
                                            Make changes to your profile here. Click save when youre done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Email
                                            </Label>
                                            <Input id="name" value={emailData} className="col-span-3" onChange={(e) => setEmailData(e.target.value)} placeholder="Enter the email" />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Password
                                            </Label>
                                            <Input id="name" value={passwordData} className="col-span-3" onChange={(e) => setPasswordData(e.target.value)} placeholder="Enter the password" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handleLoginData}>Log In</Button>
                                    </DialogFooter>
                                    <DialogFooter className='text-red-600'>
                                        Demo Email :- abc@gmail.com <br />
                                        Demo Password :- 123456
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className='text-xs p-1 lg:text-lg sm:p-4'>Sign In</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Create Username</DialogTitle>
                                        <DialogDescription>
                                            Make changes to your profile here. Click save when youre done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="name" className="text-right">
                                                Name
                                            </Label>
                                            <Input type="text" placeholder="name" className="col-span-3" value={nameData} onChange={(e) => setNameData(e.target.value)} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Email
                                            </Label>
                                            <Input type="email" className="col-span-3" placeholder="email" value={emailData} onChange={(e) => setEmailData(e.target.value)} />
                                        </div>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="username" className="text-right">
                                                Password
                                            </Label>
                                            <Input className="col-span-3" type="password" placeholder="password" value={passwordData} onChange={(e) => setPasswordData(e.target.value)} />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button onClick={handleClickaddData}>Sign In</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <p>
                                <Link href="/About">
                                    About
                                </Link>
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar;
