import { type ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/Button';

export const Layout = ({ children }: { children: ReactNode }) => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-blue-500">TaskForge</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm hidden sm:block">
                Welcome, <span className="text-white font-medium capitalize">{user?.name}</span>
              </span>
              <Button variant="secondary" onClick={signOut} className="text-sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};
