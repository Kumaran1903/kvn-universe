"use client";
import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Eye, Filter } from "lucide-react";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with Next.js 14",
      content:
        "Learn how to build modern web applications with Next.js 14 and its new features...",
      author: "John Doe",
      status: "published",
      category: "Technology",
      createdAt: "2024-01-15",
      views: 1250,
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      content:
        "Explore advanced React patterns and best practices for scalable applications...",
      author: "Jane Smith",
      status: "draft",
      category: "Development",
      createdAt: "2024-01-20",
      views: 890,
    },
    {
      id: 3,
      title: "CSS Grid vs Flexbox",
      content:
        "Understanding when to use CSS Grid and when to use Flexbox for layouts...",
      author: "Mike Johnson",
      status: "published",
      category: "CSS",
      createdAt: "2024-01-25",
      views: 2100,
    },
    {
      id: 4,
      title: "Building RESTful APIs",
      content:
        "A comprehensive guide to building RESTful APIs with Node.js and Express...",
      author: "Sarah Wilson",
      status: "published",
      category: "Backend",
      createdAt: "2024-01-30",
      views: 1500,
    },
    {
      id: 5,
      title: "TypeScript Best Practices",
      content:
        "Learn TypeScript best practices for better code quality and maintainability...",
      author: "David Brown",
      status: "draft",
      category: "TypeScript",
      createdAt: "2024-02-05",
      views: 650,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== postId));
    }
  };

  const handleEdit = (post) => {
    setSelectedPost(post);
    setIsEditing(true);
  };

  const handleSave = (updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setIsEditing(false);
    setSelectedPost(null);
  };

  const handleStatusChange = (postId, newStatus) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, status: newStatus } : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100">
      <div className="max-w-7xl mx-auto" style={{ padding: "24px" }}>
        {/* Header */}
        <div
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-200"
          style={{ marginBottom: "24px" }}
        >
          <div style={{ padding: "24px" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="bg-indigo-600 rounded-xl"
                  style={{ padding: "8px" }}
                >
                  <Edit2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-gray-800 font-semibold text-2xl">
                    Posts Management
                  </h1>
                  <p className="text-gray-600">
                    {filteredPosts.length} posts found
                  </p>
                </div>
              </div>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
                style={{ padding: "12px 20px" }}
              >
                <Plus className="w-5 h-5" />
                Add New Post
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-200"
          style={{ marginBottom: "24px" }}
        >
          <div style={{ padding: "24px" }}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search posts by title, content, or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  style={{
                    paddingLeft: "40px",
                    padding: "12px 40px 12px 40px",
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                  style={{ padding: "12px 16px" }}
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-indigo-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-50 border-b border-indigo-200">
                <tr>
                  <th
                    className="text-left text-gray-700 font-semibold"
                    style={{ padding: "16px" }}
                  >
                    Title
                  </th>
                  <th
                    className="text-left text-gray-700 font-semibold"
                    style={{ padding: "16px" }}
                  >
                    Author
                  </th>
                  <th
                    className="text-left text-gray-700 font-semibold"
                    style={{ padding: "16px" }}
                  >
                    Category
                  </th>
                  <th
                    className="text-left text-gray-700 font-semibold"
                    style={{ padding: "16px" }}
                  >
                    Status
                  </th>
                  <th
                    className="text-left text-gray-700 font-semibold"
                    style={{ padding: "16px" }}
                  >
                    Views
                  </th>
                  <th
                    className="text-left text-gray-700 font-semibold"
                    style={{ padding: "16px" }}
                  >
                    Date
                  </th>
                  <th
                    className="text-left text-gray-700 font-semibold"
                    style={{ padding: "16px" }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post, index) => (
                  <tr
                    key={post.id}
                    className="border-b border-gray-100 hover:bg-indigo-50/50 transition-colors duration-200"
                  >
                    <td style={{ padding: "16px" }}>
                      <div>
                        <h3 className="font-semibold text-gray-800 hover:text-indigo-600 cursor-pointer transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm truncate max-w-xs">
                          {post.content}
                        </p>
                      </div>
                    </td>
                    <td className="text-gray-600" style={{ padding: "16px" }}>
                      {post.author}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <span
                        className="bg-gray-100 text-gray-700 rounded-full text-sm"
                        style={{ padding: "4px 12px" }}
                      >
                        {post.category}
                      </span>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <select
                        value={post.status}
                        onChange={(e) =>
                          handleStatusChange(post.id, e.target.value)
                        }
                        className={`rounded-full text-sm font-medium border-0 ${
                          post.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                        style={{ padding: "4px 12px" }}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </td>
                    <td className="text-gray-600" style={{ padding: "16px" }}>
                      {post.views}
                    </td>
                    <td className="text-gray-600" style={{ padding: "16px" }}>
                      {post.createdAt}
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div className="flex gap-2">
                        <button
                          onClick={() => alert(`Viewing post: ${post.title}`)}
                          className="bg-blue-100 hover:bg-blue-600 hover:text-white text-blue-600 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95"
                          style={{ padding: "8px" }}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(post)}
                          className="bg-indigo-100 hover:bg-indigo-600 hover:text-white text-indigo-600 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95"
                          style={{ padding: "8px" }}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="bg-red-100 hover:bg-red-600 hover:text-white text-red-600 rounded-lg transition-all duration-300 transform hover:scale-110 active:scale-95"
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

          {filteredPosts.length === 0 && (
            <div className="text-center" style={{ padding: "64px 24px" }}>
              <Edit2
                className="w-16 h-16 text-gray-400 mx-auto"
                style={{ marginBottom: "16px" }}
              />
              <p className="text-gray-500 text-lg">No posts found</p>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {isEditing && selectedPost && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            style={{ padding: "24px" }}
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div
                className="border-b border-gray-200"
                style={{ padding: "24px" }}
              >
                <h2 className="text-xl font-semibold text-gray-800">
                  Edit Post
                </h2>
              </div>
              <div style={{ padding: "24px" }}>
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
                      className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      style={{ padding: "12px" }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700"
                      style={{ marginBottom: "8px" }}
                    >
                      Content
                    </label>
                    <textarea
                      value={selectedPost.content}
                      onChange={(e) =>
                        setSelectedPost({
                          ...selectedPost,
                          content: e.target.value,
                        })
                      }
                      rows={6}
                      className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      style={{ padding: "12px" }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700"
                        style={{ marginBottom: "8px" }}
                      >
                        Category
                      </label>
                      <input
                        type="text"
                        value={selectedPost.category}
                        onChange={(e) =>
                          setSelectedPost({
                            ...selectedPost,
                            category: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        style={{ padding: "12px" }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700"
                        style={{ marginBottom: "8px" }}
                      >
                        Status
                      </label>
                      <select
                        value={selectedPost.status}
                        onChange={(e) =>
                          setSelectedPost({
                            ...selectedPost,
                            status: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        style={{ padding: "12px" }}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="border-t border-gray-200 flex justify-end gap-3"
                style={{ padding: "24px" }}
              >
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedPost(null);
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-300"
                  style={{ padding: "12px 24px" }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSave(selectedPost)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300"
                  style={{ padding: "12px 24px" }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
