import { useState, useEffect } from 'react';
import { apiFetch, TASKS_API_URL } from '../lib/api';
import { useAuth } from '../context/AuthContext';

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

export const Home = () => {
  const { user, signOut } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      const res = await apiFetch(TASKS_API_URL);
      const data = await res.json();
      if (res.ok) {
        setTasks(data.data);
      } else {
        setError(data.message || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError('An error occurred while fetching tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await apiFetch(TASKS_API_URL, {
        method: 'POST',
        body: JSON.stringify({ title, description }),
      });
      const data = await res.json();
      if (res.ok) {
        setTasks([data.data, ...tasks]);
        setTitle('');
        setDescription('');
      }
    } catch (err) {
      console.error('Failed to create task', err);
    }
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    try {
      const res = await apiFetch(`${TASKS_API_URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed: !completed }),
      });
      if (res.ok) {
        setTasks(tasks.map(t => t._id === id ? { ...t, completed: !completed } : t));
      }
    } catch (err) {
      console.error('Failed to update task', err);
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
      }
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading tasks...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">TaskForge</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 capitalize">Welcome, {user?.name}</span>
            <button
              onClick={signOut}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-gray-700 border-gray-600 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              Add Task
            </button>
          </form>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No tasks yet. Create one above!</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className={`bg-gray-800 p-4 rounded-lg shadow flex items-start justify-between group transition-all ${
                  task.completed ? 'opacity-75' : ''
                }`}
              >
                <div className="flex items-start gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task._id, task.completed)}
                    className="mt-1.5 w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700 cursor-pointer"
                  />
                  <div>
                    <h3 className={`font-medium text-lg ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className={`text-gray-400 mt-1 ${task.completed ? 'line-through' : ''}`}>
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity px-2 py-1"
                  title="Delete task"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};