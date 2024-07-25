"use client"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CldUploadButton, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { JSX, SVGProps, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "../ui/use-toast"

export function ProfileComponent(data: any) {
  console.log(data);

  const [datai, setDatai] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [tags, setTags] = useState('')
  const [imageUrl, setImageUrl] = useState<string>("")

  console.log(imageUrl);



  useEffect(() => {
    const author = async () => {
      try {
        const getData = await axios.get(`/api/author/updateAuthor/${data.data.Author}`)

        setDatai(getData.data.posts)
      } catch (error) {
        toast({
          title: "Error for Passing Author",
          description: "Please Try Again",
        })
      }
    }
    author()
  }, [data.data.Author])

  const handleUploadImage = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as object;
    if ("public_id" in info && "secure_url" in info) {
      setImageUrl(info.secure_url as string)
    }
  }

  const handleAddBlog = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('img', "");
      formData.append('description', description);
      formData.append('like', '0');
      formData.append('authorId', data.data.Author);
      tags.split(',').forEach(tag => formData.append('tags[]', tag.trim()));
      formData.append('imageUrl', ''); // Add image URL if necessary/
      formData.append('excerpt', description.slice(0, 100));
      formData.append('slug', title.toLowerCase().replace(/ /g, '-'));

      await axios.post(`/api/blog/createBlog`, {
        title: title,
        img: imageUrl,
        description: description,
        like: 0,
        authorId: data.data.Author,
        tags: [tags],
        imageUrl: "",
        excerpt: description.slice(0, 40),
        slug: title.toLowerCase().replace(/ /g, '-')
      })

      toast({
        title: "Blog Added",
        description: "Congratulation For Adding the Blog",
      })

    } catch (error) {
      toast({
        title: "Error for Adding Blog",
        description: "Please Try Again",
      })
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto grid gap-8 px-4 py-8 md:px-6 md:py-12">
          <Tabs defaultValue="add-blog">
            <TabsList className="border-b">
              <TabsTrigger value="add-blog">Add Blog</TabsTrigger>
              <TabsTrigger value="blog-analytics">Blog Analytics</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            <TabsContent value="add-blog">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Blog Post</CardTitle>
                  <CardDescription>Fill out the form to create a new blog post.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Enter blog post title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Enter blog post description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Image</Label>
                    <CldUploadButton uploadPreset="qlvvng0p" onSuccess={handleUploadImage} >
                      <Input accept="image/*" className="h-10" id="images" multiple type="file" />
                    </CldUploadButton>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input id="tags" placeholder="Enter tags separated by commas" value={tags} onChange={(e) => setTags(e.target.value)} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" onClick={handleAddBlog}>Publish Blog Post</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="blog-analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Analytics</CardTitle>
                  <CardDescription>View your blogs performance and engagement metrics.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 items-center justify-center">
                      <Card className="flex flex-col items-center justify-center gap-2 p-4">
                        <EyeIcon className="h-8 w-8 text-primary" />
                        <div className="text-2xl font-bold">1.2K</div>
                        <p className="text-sm text-muted-foreground">Views</p>
                      </Card>
                      <Card className="flex flex-col items-center justify-center gap-2 p-4">
                        <HeartIcon className="h-8 w-8 text-red-500" />
                        <div className="text-2xl font-bold">325</div>
                        <p className="text-sm text-muted-foreground">Likes</p>
                      </Card>
                      <Card className="flex flex-col items-center justify-center gap-2 p-4">
                        <MessageCircleIcon className="h-8 w-8 text-green-500" />
                        <div className="text-2xl font-bold">142</div>
                        <p className="text-sm text-muted-foreground">Comments</p>
                      </Card>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Image</TableHead>
                          <TableHead>Tags</TableHead>
                          <TableHead>Views</TableHead>
                          <TableHead>Likes</TableHead>
                          <TableHead>Comments</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {
                          datai &&
                          datai.map((el: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell>
                                {el.title.slice(0, 15)}
                              </TableCell>
                              <TableCell>
                                {el.description.slice(0, 20)}
                              </TableCell>
                              <TableCell>
                                <img src={el.img} height={50} width={50} />
                              </TableCell>
                              <TableCell>
                                {el.tags.map((tag: string, tagIndex: number) => <Badge key={tagIndex}>{tag}</Badge>)}
                              </TableCell>
                              <TableCell>
                                {el.like}
                              </TableCell>
                              <TableCell>
                                {el.like}
                              </TableCell>
                              <TableCell>
                                {el.like}
                              </TableCell>
                            </TableRow>
                          ))
                        }
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>User Profile</CardTitle>
                  <CardDescription>Update your profile information.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="Enter your email" type="email" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="image">Profile Image</Label>
                    <Input id="image" type="file" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Update Profile</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function EyeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function HeartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function MessageCircleIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}


function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function UsersIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}


function XIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}