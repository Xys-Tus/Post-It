"use client";
import axios from "axios";
import CreatePost from "./Components/AddPost";
import { useQuery } from "@tanstack/react-query";
import Post from "./Components/Post";
import { PostType } from "./types/Posts";
// fetch all posts

const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";

  return (
    <main className="h-full w-full">
      <CreatePost />
      {data?.map((post) => (
        <Post
        comments={post.Comment}
          key={post.id}
          name={post.user.name}
          avater={post.user.image}
          postTitle={post.title}
          id={post.id}
        />
      ))}
    </main>
  );
}

// queryFn: allPosts,
//     queryKey: ["posts"],
