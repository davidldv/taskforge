import { useTranslation } from 'react-i18next';

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
}

export const TaskCard = ({ task, onToggle, onDelete, onEdit }: TaskCardProps) => {
  const { t } = useTranslation();

  return (
    <div 
      className={`glass-panel p-5 rounded-xl transition-all duration-200 group hover:border-brand-500/30 ${
        task.completed ? 'opacity-60' : 'opacity-100'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="pt-1">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task._id, task.completed)}
              className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-white/20 bg-dark-900/50 transition-all checked:border-brand-500 checked:bg-brand-500 hover:border-brand-400 focus:ring-2 focus:ring-brand-500/30 focus:ring-offset-0"
            />
            <svg
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 3L4.5 8.5L2 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 
            className={`font-medium text-lg truncate transition-colors ${
              task.completed ? 'line-through text-gray-500' : 'text-white'
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p 
              className={`text-gray-400 mt-1 text-sm line-clamp-2 ${
                task.completed ? 'line-through' : ''
              }`}
            >
              {task.description}
            </p>
          )}
        </div>
        <div className="flex gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-2 group-hover:translate-x-0">
          <button 
            className="p-2 rounded-lg text-slate-400 hover:text-brand-400 hover:bg-brand-500/10 transition-colors cursor-pointer"
            onClick={() => onEdit(task)}
            title={t('dashboard.edit')}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button 
            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
            onClick={() => onDelete(task._id)}
            title={t('dashboard.delete')}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
