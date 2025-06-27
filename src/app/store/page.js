import SinglePost from "@/components/SinglePost/SinglePost";
import { getPosts } from "@/lib/data";
export default async function Store() {
  const posts = await getPosts();
  return (
    <div className="flex flex-wrap w-6/7 container mx-auto items-center justify-center sm:justify-start start mb-40">
      {posts.map((post) => {
        return <SinglePost post={post} key={post.id} />;
      })}
    </div>
  );
}
