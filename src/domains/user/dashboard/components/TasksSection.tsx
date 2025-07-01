import { Chip as NextChip } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

import NoTasksIcon from '@assets/icons/menu_board.svg?react';
import Chip from '@components/atomic/Chip';
import Skeleton from '@components/atomic/Skeleton';
import { useAppSelector } from '@hooks/store';

import { getTasks } from '../api/company';

type TaskItemProps = {
    name: string;
    status: 'pending' | 'cancelled' | 'in_progress' | 'completed';
};

type ChipColor = 'warning' | 'success' | 'danger' | 'default' | 'primary' | 'secondary';

const statusMap = {
    active: {
        color: 'success',
        title: 'Active',
    },
    inactive: {
        color: 'danger',
        title: 'Inactive',
    },
    in_progress: {
        color: 'warning',
        title: 'In Progress',
    },
    completed: {
        color: 'success',
        title: 'Completed',
    },
    cancelled: {
        color: 'default',
        title: 'Cancelled',
    },
    confirmed: {
        color: 'success',
        title: 'Confirmed',
    },
    resolved: {
        color: 'success',
        title: 'Resolved',
    },
    pending: {
        color: 'warning',
        title: 'Pending',
    },
    rejected: {
        color: 'danger',
        title: 'Rejected',
    },
    resubmit: {
        color: 'danger',
        title: 'Resubmit',
    },
    high: {
        color: 'danger',
        title: 'High',
    },
    medium: {
        color: 'warning',
        title: 'Medium',
    },
    low: {
        color: 'success',
        title: 'Low',
    },
    true: {
        color: 'success',
        title: 'True',
    },
    false: {
        color: 'danger',
        title: 'False',
    },
};

function TaskItem({ name, status }: TaskItemProps) {
    return (
        <div className="flex items-center py-4 px-4 rounded-xl hover:bg-hover font-normal">
            <span className="text-sm col-span-4 flex-grow">{name}</span>
            <div className="flex-shrink-0">
                <NextChip
                    className="text-light min-w-[95px] text-center px-2 py-1"
                    color={statusMap[status]?.color as ChipColor}
                    size="sm"
                    variant="solid"
                >
                    <span className="text-xs">{statusMap[status]?.title}</span>
                </NextChip>
            </div>
        </div>
    );
}

function TasksSection() {
    const company = useAppSelector(state => state.company);
    const { data, isLoading, isError } = useQuery({
        queryKey: ['allTasks', 'dashboard', company?._id],
        queryFn: () => getTasks({ page: 1, limit: 6, company: company?._id }),
    });

    const tasks = data?.tasks || [];
    const skeletonArray = new Array(6).fill(null);

    const renderBody = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col gap-4">
                    {skeletonArray.map((_, index) => (
                        <Skeleton key={index} className="rounded-2xl h-[58px]" />
                    ))}
                </div>
            );
        }
        if (isError) {
            return (
                <div className="flex-grow flex flex-col text-danger-600 items-center justify-center mt-5">
                    <Chip size="lg" status="info">
                        Failed to load tasks
                    </Chip>
                </div>
            );
        }
        if (tasks.length === 0) {
            return (
                <div className="flex-grow flex flex-col text-default-400 items-center justify-center">
                    <NoTasksIcon height={48} width={48} />
                    <p className="mt-2">All tasks are completed</p>
                </div>
            );
        }
        return (
            <div className="flex flex-col gap-4">
                {tasks.slice(0, 6).map((task: any) => (
                    <div key={task._id} className="bg-white rounded-2xl">
                        <Link to={`/checklist/${task?._id}`}>
                            <TaskItem name={task.name} status={task.status} />
                        </Link>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="bg-[#F0F2FF] p-4 rounded-3xl relative h-full flex flex-col">
            <div
                className="absolute -top-4 left-[50%] translate-x-[-50%]"
                style={{
                    borderLeft: '25px solid transparent',
                    borderRight: '25px solid transparent',
                    borderTop: '35px solid white',
                    height: 0,
                    width: '125px',
                }}
            />
            <div className="flex px-2 py-4 justify-between">
                <span className="font-semibold">Tasks</span>
                <Link className="text-sm text-secondary font-semibold" to="/checklist">
                    View All
                </Link>
            </div>
            {renderBody()}
        </div>
    );
}

export default TasksSection;
