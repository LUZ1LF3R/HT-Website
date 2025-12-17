import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { isAdminLoggedIn } from '../utils/auth';
import { getMembers, addMember, updateMember, deleteMember, Member } from '../data/members';
import { ArrowLeft, Plus, Edit, Trash2, X } from 'lucide-react';

export function AdminMembers() {
  const navigate = useNavigate();
  const [members, setMembers] = useState<Member[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [formData, setFormData] = useState<Partial<Member>>({});

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }
    loadMembers();
  }, [navigate]);

  const loadMembers = () => {
    setMembers(getMembers());
  };

  const validateImage = (url: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = url;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.id || !formData.alias || !formData.domain || !formData.skills || !formData.year || !formData.image) {
      alert('Please fill in all required fields');
      return;
    }

    if (formData.skills && formData.skills.length > 150) {
      alert('Skills must be less than 150 characters');
      return;
    }

    // Validate image dimensions
    try {
      const dimensions = await validateImage(formData.image);
      if (dimensions.width !== 400 || dimensions.height !== 200) {
        const proceed = confirm(
          `Image dimensions are ${dimensions.width}x${dimensions.height}px.\n` +
          `Recommended dimensions are 400x200px.\n\n` +
          `Do you want to continue anyway?`
        );
        if (!proceed) return;
      }
    } catch (error) {
      alert('Failed to validate image. Please check the URL and try again.');
      return;
    }

    if (editingMember) {
      updateMember(editingMember.id, formData as Member);
    } else {
      addMember(formData as Member);
    }

    loadMembers();
    resetForm();
  };

  const handleEdit = (member: Member) => {
    setEditingMember(member);
    setFormData(member);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this member?')) {
      deleteMember(id);
      loadMembers();
    }
  };

  const resetForm = () => {
    setFormData({});
    setEditingMember(null);
    setShowForm(false);
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
                Manage Members
              </h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-[var(--accent)] text-[var(--deep-black)] px-4 py-2 font-['Space_Grotesk',sans-serif] font-semibold text-[14px] hover:opacity-90 transition-opacity"
            >
              {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showForm ? 'Cancel' : 'Add Member'}
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
                  {editingMember ? 'Edit Member' : 'Add New Member'}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    ID (Required)*
                  </label>
                  <input
                    type="text"
                    value={formData.id || ''}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    placeholder="N2100001"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Alias (Required)*
                  </label>
                  <input
                    type="text"
                    value={formData.alias || ''}
                    onChange={(e) => setFormData({ ...formData, alias: e.target.value })}
                    placeholder="cipher_"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Real Name
                  </label>
                  <input
                    type="text"
                    value={formData.realName || ''}
                    onChange={(e) => setFormData({ ...formData, realName: e.target.value })}
                    placeholder="John Doe"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Domain (Required)*
                  </label>
                  <input
                    type="text"
                    value={formData.domain || ''}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    placeholder="Web Security"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Year (Required)*
                  </label>
                  <input
                    type="text"
                    value={formData.year || ''}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="N21"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Image URL (Required, 400x200px)*
                  </label>
                  <input
                    type="url"
                    value={formData.image || ''}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                  <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                    Recommended: 400px width × 200px height
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isLeader"
                    checked={formData.isLeader || false}
                    onChange={(e) => setFormData({ ...formData, isLeader: e.target.checked })}
                    className="w-4 h-4 bg-[var(--bg-secondary)] border border-[var(--divider)] text-[var(--accent)] focus:ring-[var(--accent)]"
                  />
                  <label htmlFor="isLeader" className="font-['JetBrains_Mono',monospace] text-[11px] text-[var(--text-secondary)] uppercase cursor-pointer">
                    Year Leader
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Skills (Required, max 150 chars)*
                  </label>
                  <input
                    type="text"
                    value={formData.skills || ''}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="Server-side exploitation & API security"
                    maxLength={150}
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                  <p className="text-[11px] text-[var(--text-secondary)] mt-1">
                    {(formData.skills?.length || 0)}/150 characters
                  </p>
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    GitHub Username
                  </label>
                  <input
                    type="text"
                    value={formData.github || ''}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="username"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    LinkedIn Username
                  </label>
                  <input
                    type="text"
                    value={formData.linkedin || ''}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    placeholder="username"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.website || ''}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    X/Twitter Username
                  </label>
                  <input
                    type="text"
                    value={formData.twitter || ''}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    placeholder="username"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Instagram Username
                  </label>
                  <input
                    type="text"
                    value={formData.instagram || ''}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="username"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                  />
                </div>

                <div className="md:col-span-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[var(--accent)] text-[var(--deep-black)] py-3 font-['Space_Grotesk',sans-serif] font-semibold text-[14px] uppercase hover:opacity-90 transition-opacity"
                  >
                    {editingMember ? 'Update Member' : 'Add Member'}
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {members.map((member) => (
              <motion.div
                key={member.id}
                className="border-2 border-[var(--divider)] hover:border-[var(--accent)] transition-all hover:shadow-lg bg-[var(--bg-secondary)] overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex">
                  {/* Image Section */}
                  <div className="w-32 h-32 flex-shrink-0 relative">
                    <img
                      src={member.image}
                      alt={member.alias}
                      className="w-full h-full object-cover"
                    />
                    {member.isLeader && (
                      <div className="absolute top-2 right-2 bg-cyan-400 p-1 rounded-sm shadow-md">
                        <span className="text-[10px] font-['JetBrains_Mono',monospace] font-bold text-[var(--deep-black)]">★</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-['Space_Grotesk',sans-serif] text-[18px] font-semibold text-[var(--accent)] mb-1">
                          {member.alias}
                        </h3>
                        {member.realName && (
                          <p className="text-[12px] text-[var(--text-secondary)] mb-1">
                            {member.realName}
                          </p>
                        )}
                        <p className="font-['JetBrains_Mono',monospace] text-[10px] text-[var(--text-secondary)] uppercase">
                          {member.id}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="p-2 border border-[var(--divider)] hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
                          className="p-2 border border-red-500 hover:bg-red-500/10 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="text-[var(--accent)]">{member.year}</span>
                        <span className="text-[var(--text-secondary)]">•</span>
                        <span className="text-[var(--text-secondary)]">{member.domain}</span>
                      </div>
                      <p className="font-['Inter',sans-serif] text-[12px] text-[var(--text-secondary)] line-clamp-2">
                        {member.skills}
                      </p>
                    </div>
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
