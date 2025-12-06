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
        <div className="flex items-center justify-center h-64">
          <Spinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">My Tasks</h2>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          + New Task
        </Button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700 border-dashed">
          <p className="text-gray-400 mb-4">You don't have any tasks yet.</p>
          <Button variant="secondary" onClick={() => setIsCreateModalOpen(true)}>
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
    </Layout>
  );
};