import SinglePost from "@/components/SinglePost/SinglePost";
import { getPosts } from "@/lib/actions";
export default async function Store() {
  const posts = await getPosts();
  console.log(posts);
  return (
    <div className="flex flex-wrap container mx-auto items-center justify-center sm:justify-start start mb-40">
      <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
      <SinglePost />
    </div>
  );
}
