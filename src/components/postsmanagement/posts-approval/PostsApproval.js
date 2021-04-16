import React, { useEffect, useState } from "react";
import { getPosts } from "../../../redux/actions/getPosts";
import { getUnacceptedPosts } from "../../../redux/actions/getUnacceptedPosts";
import { deletePost } from "../../../redux/actions/deletePost";
import { approvePost } from "../../../redux/actions/approvePost";

const PostsApproval = () => {
  const [posts, setPosts] = useState([]);
  const [unacceptedPosts, setUnacceptedPosts] = useState([]);
  useEffect(() => {
    getPosts((item) => {
      setPosts(item.data.posts);
    });
    getUnacceptedPosts((item) => {
      setUnacceptedPosts(item.posts);
    });
  }, []);

  console.log("posts");
  console.log(posts);
  console.log("unacceptedPosts");
  console.log(unacceptedPosts);

  return (
    <div>This is Posts Approval</div>
  );
};

export default PostsApproval;
