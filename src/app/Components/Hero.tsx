import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React from 'react'

const Hero = () => {
    return (
        <>
            <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">Welcome to Our Blog</h1>
                        <p className="text-gray-700 dark:text-gray-300 text-lg">
                            Discover the latest news, insights, and trends in our blog.
                        </p>
                        <div className="flex gap-4">
                            <Button>
                                <Link href="/blog">
                                    Read More
                                </Link>
                            </Button>
                            <Button variant="secondary">
                                <Link href="/blog">
                                    Subscribe
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJsb2d8ZW58MHx8MHx8fDA%3D" width={600} height={400} alt="Hero Image" className="rounded-lg" />
                    </div>
                </div>
            </section>
            <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                        <img src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJsb2d8ZW58MHx8MHx8fDA%3D" width={600} height={400} alt="Featured Image" className="rounded-lg" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Featured Article</h2>
                        <p className="text-gray-700 dark:text-gray-300 text-lg">
                            Read our latest featured article and stay up-to-date with the latest trends and insights.
                        </p>
                        <Button>
                            <Link href="/blog">
                                Read More
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
            <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Recent Posts</h2>
                        <p className="text-gray-700 dark:text-gray-300 text-lg">Check out our latest blog posts.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <img src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJsb2d8ZW58MHx8MHx8fDA%3D" width={400} height={250} alt="Blog Post Image" className="rounded-t-lg" />
                            <div className="p-6 space-y-4">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Blog Post Title</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl
                                    nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                                </p>
                                <Button>
                                    <Link href="/blog">
                                        Read More
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <img src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJsb2d8ZW58MHx8MHx8fDA%3D" width={400} height={250} alt="Blog Post Image" className="rounded-t-lg" />
                            <div className="p-6 space-y-4">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Blog Post Title</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl
                                    nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                                </p>
                                <Button>
                                    <Link href="/blog">
                                        Read More
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <img src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJsb2d8ZW58MHx8MHx8fDA%3D" width={400} height={250} alt="Blog Post Image" className="rounded-t-lg" />
                            <div className="p-6 space-y-4">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Blog Post Title</h3>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl
                                    nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                                </p>
                                <Button>
                                    <Link href="/blog">
                                        Read More
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
                            Subscribe to Our Newsletter
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 text-lg">
                            Stay up-to-date with the latest news, insights, and trends by subscribing to our newsletter.
                        </p>
                        <div className="flex gap-4">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 bg-white dark:bg-gray-800 dark:text-gray-300"
                            />
                            <Button>
                                <Link href="/blog">
                                    Subscribe
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <img src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJsb2d8ZW58MHx8MHx8fDA%3D" width={600} height={400} alt="Newsletter Image" className="rounded-lg" />
                    </div>
                </div>
            </section>

        </>
    )
}

export default Hero
