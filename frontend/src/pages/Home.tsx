import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await apiFetch(TASKS_API_URL);
      const data = await res.json();
      if (res.ok) {
        setTasks(data.data);
      } else {
        setError(data.message || t('dashboard.messages.fetch_error'));
        toast.error(t('dashboard.messages.fetch_error'));
      }
    } catch (err) {
      setError(t('dashboard.messages.fetch_error_generic'));
      toast.error(t('dashboard.messages.fetch_error_generic'));
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
        toast.success(t('dashboard.messages.create_success'));
      } else {
        toast.error(responseData.message || t('dashboard.messages.create_error'));
      }
    } catch (err) {
      toast.error(t('dashboard.messages.create_error'));
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
        toast.success(t('dashboard.messages.update_success'));
      } else {
        toast.error(t('dashboard.messages.update_error'));
      }
    } catch (err) {
      toast.error(t('dashboard.messages.update_error'));
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
      toast.error(t('dashboard.messages.status_error'));
    }
  };

  const handleDeleteTask = async (id: string) => {
    const task = tasks.find(t => t._id === id);
    if (task) setDeletingTask(task);
  };

  const confirmDeleteTask = async () => {
    if (!deletingTask) return;
    try {
      const res = await apiFetch(`${TASKS_API_URL}/${deletingTask._id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setTasks(tasks.filter(t => t._id !== deletingTask._id));
        toast.success(t('dashboard.messages.delete_success'));
        setDeletingTask(null);
      } else {
        toast.error(t('dashboard.messages.delete_error'));
      }
    } catch (err) {
      toast.error(t('dashboard.messages.delete_error'));
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
            <h2 className="text-3xl font-bold text-white tracking-tight">{t('dashboard.my_tasks')}</h2>
            <p className="text-gray-400 mt-1">{t('dashboard.manage_tasks')}</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} className="shadow-lg shadow-brand-500/20">
            <span className="mr-2 text-lg">+</span> {t('dashboard.new_task')}
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
            <h3 className="text-xl font-semibold text-white mb-2">{t('dashboard.no_tasks')}</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {t('dashboard.create_first_task')}
            </p>
            <Button onClick={() => setIsCreateModalOpen(true)} variant="secondary">
              {t('dashboard.create_task')}
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
          title={t('dashboard.create_new_task')}
        >
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setIsCreateModalOpen(false)}
            isLoading={isSubmitting}
            submitLabel={t('dashboard.create_task')}
          />
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          title={t('dashboard.edit_task')}
        >
          <TaskForm
            initialData={editingTask ? { title: editingTask.title, description: editingTask.description || '' } : undefined}
            onSubmit={handleUpdateTask}
            onCancel={() => setEditingTask(null)}
            isLoading={isSubmitting}
            submitLabel={t('dashboard.save_changes')}
          />
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={!!deletingTask}
          onClose={() => setDeletingTask(null)}
          title={t('dashboard.delete_task_title')}
        >
          <div className="space-y-4">
            <p className="text-gray-300">
              {t('dashboard.confirm_delete')}
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setDeletingTask(null)}>
                {t('dashboard.cancel')}
              </Button>
              <Button variant="danger" onClick={confirmDeleteTask}>
                {t('dashboard.delete')}
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};