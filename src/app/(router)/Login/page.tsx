import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white dark:bg-gray-950 p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400">Sign in to your account</p>
                </div>
                <form className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="example@email.com" required />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" required />
                    </div>
                    <Button type="submit" className="w-full">
                        Sign In
                    </Button>
                </form>
                <div className="text-center mt-4 text-sm">
                    Dont have an account?{" "}
                    <Link href="#" className="text-blue-500 hover:underline" prefetch={false}>
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default page
