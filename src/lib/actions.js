"use server";

import { Post } from "./models";
import { connectToDB } from "./utils";

export const getPosts = async () => {
  try {
    await connectToDB();
    const posts = await Post.find({});
    return posts;
  } catch (err) {
    console.log("Error Fetching Posts", err);
  }
};
