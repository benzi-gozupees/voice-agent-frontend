import { useDisclosure } from '@nextui-org/react';
import AssistantCard from '../components/AssistantCard';
import { useAssistants } from '../hooks/useAssistants';

export default function Assistant() {
  document.title = 'GoZupees';

  const { assistants, loading, error } = useAssistants();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading assistants: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assistants.map((assistant, index) => (
        <AssistantCard key={`${assistant.name}-${index}`} {...assistant} />
      ))}
    </div>
  );
}
