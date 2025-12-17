import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { PageTransition } from '../components/PageTransition';
import { isAdminLoggedIn } from '../utils/auth';
import { getOperations, addOperation, updateOperation, deleteOperation, Operation } from '../data/operations';
import { ArrowLeft, Plus, Edit, Trash2, X } from 'lucide-react';

export function AdminOperations() {
  const navigate = useNavigate();
  const [operations, setOperations] = useState<Operation[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingOperation, setEditingOperation] = useState<Operation | null>(null);
  const [formData, setFormData] = useState<Partial<Operation>>({});

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin');
      return;
    }
    loadOperations();
  }, [navigate]);

  const loadOperations = () => {
    setOperations(getOperations());
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.name || !formData.role || !formData.focus || !formData.outcome || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }

    const operationData = {
      ...formData,
      id: editingOperation ? editingOperation.id : Date.now().toString(),
    } as Operation;

    if (editingOperation) {
      updateOperation(editingOperation.id, operationData);
    } else {
      addOperation(operationData);
    }

    loadOperations();
    resetForm();
  };

  const handleEdit = (operation: Operation) => {
    setEditingOperation(operation);
    setFormData(operation);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this operation?')) {
      deleteOperation(id);
      loadOperations();
    }
  };

  const resetForm = () => {
    setFormData({});
    setEditingOperation(null);
    setShowForm(false);
  };

  const getCategoryColor = (category: Operation['category']) => {
    switch (category) {
      case 'CTF':
        return '#00E5FF';
      case 'Hackathon':
        return '#00FF9D';
      case 'Research':
        return '#FF6B9D';
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
                Manage Operations
              </h1>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-[var(--accent)] text-[var(--deep-black)] px-4 py-2 font-['Space_Grotesk',sans-serif] font-semibold text-[14px] hover:opacity-90 transition-opacity"
            >
              {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {showForm ? 'Cancel' : 'Add Operation'}
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
                  {editingOperation ? 'Edit Operation' : 'Add New Operation'}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Category*
                  </label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Operation['category'] })}
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="CTF">CTF</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Research">Research</option>
                  </select>
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Date (YYYY-MM)*
                  </label>
                  <input
                    type="text"
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="2024-05"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Name*
                  </label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="DEFCON CTF Qualifiers 2024"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Role*
                  </label>
                  <input
                    type="text"
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Team Participant"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Focus*
                  </label>
                  <input
                    type="text"
                    value={formData.focus || ''}
                    onChange={(e) => setFormData({ ...formData, focus: e.target.value })}
                    placeholder="Binary exploitation, cryptography"
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)]"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block font-['JetBrains_Mono',monospace] text-[11px] mb-2 text-[var(--text-secondary)] uppercase">
                    Outcome*
                  </label>
                  <textarea
                    value={formData.outcome || ''}
                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                    placeholder="Top 50 globally, developed custom fuzzing tool"
                    rows={3}
                    className="w-full bg-[var(--bg-secondary)] border border-[var(--divider)] px-4 py-2 text-[14px] focus:outline-none focus:border-[var(--accent)] resize-none"
                    required
                  />
                </div>

                <div className="md:col-span-2 flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-[var(--accent)] text-[var(--deep-black)] py-3 font-['Space_Grotesk',sans-serif] font-semibold text-[14px] uppercase hover:opacity-90 transition-opacity"
                  >
                    {editingOperation ? 'Update Operation' : 'Add Operation'}
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
            {operations.map((operation) => (
              <motion.div
                key={operation.id}
                className="border border-[var(--divider)] p-5 hover:border-[var(--accent)] transition-all hover:shadow-md bg-[var(--bg-secondary)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className="font-['JetBrains_Mono',monospace] text-[11px] uppercase"
                        style={{ color: getCategoryColor(operation.category) }}
                      >
                        [{operation.category}]
                      </span>
                      <span className="font-['JetBrains_Mono',monospace] text-[11px] text-[var(--text-secondary)]">
                        {operation.date}
                      </span>
                    </div>
                    <h3 className="font-['Space_Grotesk',sans-serif] text-[18px] font-semibold mb-2">
                      {operation.name}
                    </h3>
                    <p className="font-['Inter',sans-serif] text-[13px] text-[var(--text-secondary)] mb-1">
                      <strong>Role:</strong> {operation.role}
                    </p>
                    <p className="font-['Inter',sans-serif] text-[13px] text-[var(--text-secondary)] mb-1">
                      <strong>Focus:</strong> {operation.focus}
                    </p>
                    <p className="font-['Inter',sans-serif] text-[13px] text-[var(--text-secondary)]">
                      <strong>Outcome:</strong> {operation.outcome}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(operation)}
                      className="p-2 border border-[var(--divider)] hover:border-[var(--accent)] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(operation.id)}
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
