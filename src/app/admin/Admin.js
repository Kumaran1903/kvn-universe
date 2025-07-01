"use client";

import { useState, useCallback, useTransition } from "react";
import { useDropzone } from "react-dropzone";
import { createPost, deletepost, updatePost } from "./actions";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  IndianRupee,
  ImagePlus,      
} from "lucide-react";

export default function AdminPostsPage({ posts }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [oldImageUrl, setOldImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (postId) => {
    await deletepost(postId);
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setPreviewUrl(post.image);
    setOldImageUrl(post.image);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setSelectedPost({
      id: null,
      title: "",
      image: "",
      price: { personal: "", commercial: "" },
    });
    setPreviewUrl("");
    setOldImageUrl("");
    setIsCreating(true);
  };

  const handleSave = () => {
    if (!selectedPost) return;

    const formData = new FormData();
    formData.append("title", selectedPost.title);
    formData.append("personal", selectedPost.price.personal);
    formData.append("commercial", selectedPost.price.commercial);
    formData.append("image", selectedPost.image);

    startTransition(async () => {
      if (isCreating) {
        await createPost(formData);
      } else if (isEditing) {
        formData.append("id", selectedPost.id);
        formData.append("oldImage", oldImageUrl);
        await updatePost(formData);
      }
    });

    closeForm();
  };

  const closeForm = () => {
    setSelectedPost(null);
    setPreviewUrl("");
    setOldImageUrl("");
    setIsEditing(false);
    setIsCreating(false);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        setPreviewUrl(data.url);
        setSelectedPost((prev) => ({
          ...prev,
          image: data.url,
          file,
        }));
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      alert("Error uploading");
    } finally {
      setUploading(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "image/*": [] },
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100">
      <div className="max-w-7xl mx-auto" style={{ padding: "24px" }}>
        {/* Header */}
        <div
          className="bg-white rounded-2xl shadow-xl border border-indigo-200 mb-6"
          style={{ padding: "16px 24px" }}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className="bg-indigo-600 rounded-xl"
                style={{ padding: "8px" }}
              >
                <Edit2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-800 font-semibold text-xl sm:text-2xl">
                  Posts Management
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  {filteredPosts.length} posts found
                </p>
              </div>
            </div>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-2 font-medium transition-all"
              style={{ padding: "12px 16px" }}
              onClick={handleAddNew}
            >
              <Plus className="w-5 h-5" />
              <span>Add Post</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div
          className="bg-white rounded-2xl shadow-xl border border-indigo-200 mb-6"
          style={{ padding: "16px 24px" }}
        >
          <div className="relative">
            <div
              className="absolute inset-y-0 left-0 flex items-center"
              style={{ paddingLeft: "12px" }}
            >
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search posts by title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
              style={{
                paddingLeft: "40px",
                paddingRight: "16px",
                paddingTop: "12px",
                paddingBottom: "12px",
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-indigo-200 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-indigo-50 border-b border-indigo-200">
              <tr>
                {[
                  "Title",
                  "Image",
                  "Personal Price",
                  "Commercial Price",
                  "Actions",
                ].map((h, i) => (
                  <th
                    key={i}
                    className="text-left text-gray-700 font-semibold"
                    style={{ padding: "16px 24px" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b hover:bg-indigo-50 transition-colors"
                >
                  <td style={{ padding: "16px 24px" }}>{post.title}</td>
                  <td style={{ padding: "16px 24px" }}>
                    <img
                      src={post.image}
                      alt=""
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <span
                      className="bg-green-100 text-green-700 rounded-full text-sm flex w-fit"
                      style={{ padding: "4px 12px" }}
                    >
                      <IndianRupee className="w-4" /> {post.price.personal}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <span
                      className="bg-blue-100 text-blue-700 rounded-full text-sm flex w-fit"
                      style={{ padding: "4px 12px" }}
                    >
                      <IndianRupee className="w-4" /> {post.price.commercial}
                    </span>
                  </td>
                  <td style={{ padding: "16px 24px" }}>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="bg-indigo-100 hover:bg-indigo-600 hover:text-white text-indigo-600 rounded-lg"
                        style={{ padding: "8px" }}
                      >
                        <Edit2 className="w-4 h-4 " />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="bg-red-100 hover:bg-red-600 hover:text-white text-red-600 rounded-lg"
                        style={{ padding: "8px" }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {(isCreating || isEditing) && selectedPost && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            style={{ padding: "16px" }}
          >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div
                style={{
                  padding: "16px 24px",
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  {isCreating ? "Add New Post" : "Edit Post"}
                </h2>
              </div>
              <div style={{ padding: "16px 24px" }}>
                <div className="space-y-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      style={{ marginBottom: "8px" }}
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      value={selectedPost.title}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          title: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      style={{ padding: "12px" }}
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      style={{ marginBottom: "8px" }}
                    >
                      Upload Image
                    </label>
                    <div
                      {...getRootProps()}
                      className={`border-2 border-dashed rounded-lg cursor-pointer text-center transition-all ${isDragActive ? "border-indigo-400 bg-indigo-50" : "border-gray-300"}`}
                      style={{ padding: "20px" }}
                    >
                      <input {...getInputProps()} />
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="mx-auto h-32 object-contain"
                        />
                      ) : (
                        <div className="text-gray-500 flex flex-col items-center gap-2">
                          <ImagePlus className="w-6 h-6" />
                          <p>
                            {uploading
                              ? "Uploading..."
                              : "Drag & drop an image or click to select"}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700"
                        style={{ marginBottom: "8px" }}
                      >
                        Personal Price
                      </label>
                      <input
                        type="number"
                        value={selectedPost.price.personal}
                        onChange={(e) =>
                          setSelectedPost({
                            ...selectedPost,
                            price: {
                              ...selectedPost.price,
                              personal: e.target.value,
                            },
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        style={{ padding: "12px" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700"
                        style={{ marginBottom: "8px" }}
                      >
                        Commercial Price
                      </label>
                      <input
                        type="number"
                        value={selectedPost.price.commercial}
                        onChange={(e) =>
                          setSelectedPost({
                            ...selectedPost,
                            price: {
                              ...selectedPost.price,
                              commercial: e.target.value,
                            },
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        style={{ padding: "12px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="border-t border-gray-200 flex flex-col sm:flex-row justify-end gap-3"
                style={{ padding: "16px 24px" }}
              >
                <button
                  onClick={closeForm}
                  className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg"
                  style={{ padding: "12px 24px" }}
                >
                  Cancel
                </button>
                {(isCreating || isEditing) && selectedPost && (
                  <button
                    disabled={isPending || uploading}
                    onClick={() => handleSave(selectedPost)}
                    className={`w-full sm:w-auto bg-indigo-600 text-white rounded-lg transition-all ${
                      isPending || uploading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-indigo-700"
                    }`}
                    style={{ padding: "12px 24px" }}
                  >
                    {isCreating ? "Add Post" : "Save Changes"}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
