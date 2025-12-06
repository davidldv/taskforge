import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface TaskFormProps {
  initialData?: { title: string; description: string };
  onSubmit: (data: { title: string; description: string }) => Promise<void>;
  onCancel?: () => void;
  isLoading?: boolean;
  submitLabel?: string;
}

export const TaskForm = ({ 
  initialData, 
  onSubmit, 
  onCancel, 
  isLoading,
  submitLabel
}: TaskFormProps) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    await onSubmit({ title, description });
    if (!initialData) {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Input
        label={t('dashboard.title')}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={t('dashboard.title_placeholder')}
        required
        autoFocus
        className="bg-dark-900/50"
      />
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-1.5">
          {t('dashboard.description')}
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={t('dashboard.description_placeholder')}
          className="w-full input-field rounded-lg px-4 py-3 text-white placeholder-gray-500 outline-none h-32 resize-none"
        />
      </div>
      <div className="flex justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            {t('dashboard.cancel')}
          </Button>
        )}
        <Button type="submit" isLoading={isLoading}>
          {submitLabel || t('dashboard.save')}
        </Button>
      </div>
    </form>
  );
};
