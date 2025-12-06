import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { apiFetch, TASKS_API_URL } from '../lib/api';
import { Layout } from '../components/Layout';
import { TaskCard } from '../components/tasks/TaskCard';
import { TaskForm } from '../components/tasks/TaskForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Spinner } from '../components/ui/Spinner';

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await apiFetch(TASKS_API_URL);
      const data = await res.json();
      if (res.ok) {
        setTasks(data.data);
      } else {
        setError(data.message || 'Failed to fetch tasks');
        toast.error('Failed to fetch tasks');
      }
    } catch (err) {
      setError('An error occurred while fetching tasks');
      toast.error('An error occurred while fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (data: { title: string; description: string }) => {
    setIsSubmitting(true);
    try {
      const res = await apiFetch(TASKS_API_URL, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      const responseData = await res.json();
      if (res.ok) {
        setTasks([responseData.data, ...tasks]);
        setIsCreateModalOpen(false);
        toast.success('Task created successfully');
      } else {
        toast.error(responseData.message || 'Failed to create task');
      }
    } catch (err) {
      toast.error('Failed to create task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTask = async (data: { title: string; description: string }) => {
    if (!editingTask) return;
    setIsSubmitting(true);
    try {
      const res = await apiFetch(`${TASKS_API_URL}/${editingTask._id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setTasks(tasks.map(t => t._id === editingTask._id ? { ...t, ...data } : t));
        setEditingTask(null);
        toast.success('Task updated successfully');
      } else {
        toast.error('Failed to update task');
      }
    } catch (err) {
      toast.error('Failed to update task');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    // Optimistic update
    setTasks(tasks.map(t => t._id === id ? { ...t, completed: !completed } : t));
    
    try {
      await apiFetch(`${TASKS_API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed: !completed }),
      });
    } catch (err) {
      // Revert on error
      setTasks(tasks.map(t => t._id === id ? { ...t, completed } : t));
      toast.error('Failed to update task status');
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      const res = await apiFetch(`${TASKS_API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setTasks(tasks.filter(t => t._id !== id));
        toast.success('Task deleted successfully');
      } else {
        toast.error('Failed to delete task');
      }
    } catch (err) {
      toast.error('Failed to delete task');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-[60vh]">
          <Spinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white tracking-tight">My Tasks</h2>
            <p className="text-gray-400 mt-1">Manage your daily goals and projects</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} className="shadow-lg shadow-brand-500/20">
            <span className="mr-2 text-lg">+</span> New Task
          </Button>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {tasks.length === 0 ? (
          <div className="glass-panel rounded-2xl p-12 text-center border-dashed border-2 border-white/10">
            <div className="w-20 h-20 bg-brand-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tasks yet</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              You haven't created any tasks yet. Start by adding a new task to organize your day.
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)} variant="secondary">
              Create your first task
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
                onEdit={setEditingTask}
              />
            ))}
          </div>
        )}

        {/* Create Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create New Task"
        >
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setIsCreateModalOpen(false)}
            isLoading={isSubmitting}
            submitLabel="Create Task"
          />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          title="Edit Task"
        >
          <TaskForm
            initialData={editingTask ? { title: editingTask.title, description: editingTask.description || '' } : undefined}
            onSubmit={handleUpdateTask}
            onCancel={() => setEditingTask(null)}
            isLoading={isSubmitting}
            submitLabel="Save Changes"
          />
        </Modal>
      </div>
    </Layout>
  );
};