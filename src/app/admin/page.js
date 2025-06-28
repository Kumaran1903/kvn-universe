export const dynamic = "force-dynamic";

import { getPosts } from "@/lib/data";
import AdminPostsPage from "./Admin";

export default async function Admin() {
  const posts = await getPosts();
  return <AdminPostsPage posts={posts} />;
}
