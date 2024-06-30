import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
const Navbar = () => {
    return (
        <header className=" top-0 left-0 z-50 w-full bg-white shadow-sm dark:bg-gray-950">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="#" className="flex items-center gap-2" prefetch={false}>

                    <span className="text-lg font-semibold">Blog</span>
                </Link>
                <nav className="hidden space-x-4 md:flex">
                    <Link href="#" className="text-sm font-medium hover:underline hover:underline-offset-4" prefetch={false}>
                        Home
                    </Link>
                    <Link href="#" className="text-sm font-medium hover:underline hover:underline-offset-4" prefetch={false}>
                        About
                    </Link>
                    <Link href="/blog" className="text-sm font-medium hover:underline hover:underline-offset-4" prefetch={false}>
                        Blog
                    </Link>
                    <Link href="#" className="text-sm font-medium hover:underline hover:underline-offset-4" prefetch={false}>
                        Contact
                    </Link>
                </nav>
                <form className="relative flex-1 max-w-md">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search blog posts..."
                        className="w-full rounded-md border border-gray-200 bg-gray-100 py-2 pl-10 pr-4 text-sm focus:border-gray-300 focus:outline-none dark:border-gray-800 dark:bg-gray-800 dark:text-gray-50"
                    />
                </form>
                <div className="flex items-center gap-2">
                    <Link
                        href="#"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                        prefetch={false}
                    >
                        Login
                    </Link>
                    <Link
                        href="#"
                        className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200  bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                        prefetch={false}
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar
