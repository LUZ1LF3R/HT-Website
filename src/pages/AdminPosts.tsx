import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { isAdminLoggedIn } from '../utils/auth';
import { getPosts, addPost, updatePost, deletePost, Post } from '../data/posts';
import { ArrowLeft, Plus, Edit, Trash2, X } from 'lucide-react';

export function AdminPosts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<Partial<Post>>({});

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }
    loadPosts();
  }, [navigate]);

  const loadPosts = () => {
    setPosts(getPosts());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.type || !formData.date || !formData.abstract || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    const postData = {
      ...formData,
      id: editingPost ? editingPost.id : Date.now().toString(),
    } as Post;

    if (editingPost) {
      updatePost(editingPost.id, postData);
    } else {
      addPost(postData);
    }

    loadPosts();
    resetForm();
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData(post);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(id);
      loadPosts();
    }
  };

  const resetForm = () => {
    setFormData({});
    setEditingPost(null);
    setShowForm(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Research Log':
        return '#FF6B9D';
      case 'CTF Writeup':
        return '#00E5FF';
      case 'Build Diary':
        return '#00FF9D';
      case 'Paper Notes':
        return '#FFB86C';
      default:
        return '#00E5FF';
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="font-['Inter',sans-serif] text-[14px]">Back to Dashboard</span>
              </Link>
              <h1 className="font-['Space_Grotesk',sans-serif] text-[32px] text-[var(--accent)] font-semibold">
                Manage Posts
              </h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-[var(--accent)] text-[var(--deep-black)] px-4 py-2 font-['Space_Grotesk',sans-serif] font-semibold text-[14px] hover:opacity-90 transition-opacity"
            >
              {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showForm ? 'Cancel' : 'Add Post'}
            </button>
          </motion.div>

          {showForm && (
            <motion.div
              className="border-2 border-[var(--divider)] p-6 sm:p-8 mb-8 bg-[var(--bg-secondary)] shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--divider)]">
                <div className="w-1 h-8 bg-[var(--accent)]"></div>
                <h2 className="font-['Space_Grotesk',sans-serif] text-[24px] font-semibold">
                  {editingPost ? 'Edit Post' : 'Add New Post'}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                      Type*
                    </label>
                    <select
                      value={formData.type || ''}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as Post['type'] })}
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Research Log">Research Log</option>
                      <option value="CTF Writeup">CTF Writeup</option>
                      <option value="Build Diary">Build Diary</option>
                      <option value="Paper Notes">Paper Notes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                      Date (YYYY-MM-DD)*
                    </label>
                    <input
                      type="date"
                      value={formData.date || ''}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Title*
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Breaking GraphQL: A Study in API Mutation Abuse"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Abstract*
                  </label>
                  <textarea
                    value={formData.abstract || ''}
                    onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                    placeholder="Brief description of the post..."
                    rows={3}
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)] resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Upload Markdown File*
                  </label>
                  <textarea
                    value={formData.content || ''}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="# Heading

Your markdown content here..."
                    rows={15}
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[13px] font-['JetBrains_Mono',monospace] focus:outline-none focus:border-[var(--accent)] resize-none"
                    required
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[var(--accent)] text-[var(--deep-black)] py-3 font-['Space_Grotesk',sans-serif] font-semibold text-[14px] uppercase hover:opacity-90 transition-opacity"
                  >
                    {editingPost ? 'Update Post' : 'Add Post'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 border border-[var(--divider)] hover:border-[var(--accent)] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div
                key={post.id}
                className="border border-[var(--divider)] p-5 hover:border-[var(--accent)] transition-all hover:shadow-md bg-[var(--bg-secondary)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="font-['JetBrains_Mono',monospace] text-[11px] uppercase"
                        style={{ color: getTypeColor(post.type) }}
                      >
                        [{post.type}]
                      </span>
                      <span className="font-['JetBrains_Mono',monospace] text-[11px] text-[var(--text-secondary)]">
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <h3 className="font-['Space_Grotesk',sans-serif] text-[18px] font-semibold mb-2">
                      {post.title}
                    </h3>
                    <p className="font-['Inter',sans-serif] text-[13px] text-[var(--text-secondary)]">
                      {post.abstract}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(post)}
                      className="p-2 border border-[var(--divider)] hover:border-[var(--accent)] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 border border-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
