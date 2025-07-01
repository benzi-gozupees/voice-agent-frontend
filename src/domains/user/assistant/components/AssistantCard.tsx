import { CheckCircle, Clock, Activity, Cog } from 'lucide-react';

export type Assistant = {
  name: string;
  type: string;
  company: string;
  category: string;
  createdAt: string;
 status: 'Active' | 'Inactive';
  isReady: boolean;
};

export default function AssistantCard({
  name,
  type,
  company,
  category,
  createdAt,
  status,
  isReady,
}: Assistant) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-5 w-[300px] flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
            <Cog size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-indigo-600">{type}</p>
          </div>
        </div>
        {isReady && (
          <div className="text-green-600 bg-green-100 text-sm px-2 py-1 rounded-full flex items-center gap-1">
            <CheckCircle size={14} />
            Ready
          </div>
        )}
      </div>

      <div className="text-sm text-gray-600 py-6">
        <div className="flex items-center gap-1 py-2">
          <span className="font-medium">{company}</span> • {category}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Clock size={14} />
          Created: {createdAt}
        </div>
        <div className="flex items-center gap-2">
          <Activity size={14} />
          Status:
          <span
            className={`font-medium ${
              status === 'Active' ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {status}
          </span>
        </div>
      </div>

      <button className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl text-sm font-medium">
        Configure
      </button>
    </div>
  );
}
