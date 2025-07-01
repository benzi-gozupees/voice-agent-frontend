import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAssistants } from '../api/index';
import { AssistantItem } from '../types';
import { RootState } from '@store/store'; // Adjust import if needed

export type Assistant = {
  name: string;
  type: string;
  company: string;
  category: string;
  createdAt: string;
  status: 'Active' | 'Inactive';
  isReady: boolean;
};

export const useAssistants = () => {
  const [assistants, setAssistants] = useState<Assistant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    getAssistants()
      .then((response) => {
        const data: AssistantItem[] = response;
      
        const mapped: Assistant[] = data.map((item) => {
          const status: 'Active' | 'Inactive' = item.isActive ? 'Active' : 'Inactive';

          return {
            name: item.name,
            type: 'Voice Assistant',
            company: item.businessName,
            category: item.industry,
            createdAt: new Date(item.createdAt).toLocaleDateString(),
            status,
            isReady: item.kbConfigured,
          };
        });

        setAssistants(mapped);
      })
      .catch((err) => {
        setError(err.message || 'Failed to load assistants');
      })
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  return { assistants, loading, error };
};
