import { Button } from '../ui/Button';

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
  return (
    <div 
      className={`bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm hover:shadow-md transition-all group ${
        task.completed ? 'opacity-75' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="pt-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task._id, task.completed)}
            className="w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700 cursor-pointer transition-colors"
          />
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
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            variant="ghost" 
            className="p-1 h-8 w-8 flex items-center justify-center"
            onClick={() => onEdit(task)}
            title="Edit"
          >
            ✎
          </Button>
          <Button 
            variant="ghost" 
            className="p-1 h-8 w-8 flex items-center justify-center text-red-400 hover:text-red-300"
            onClick={() => onDelete(task._id)}
            title="Delete"
          >
            🗑
          </Button>
        </div>
      </div>
    </div>
  );
};
