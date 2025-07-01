// import { useEffect } from 'react';

// import { Popover, PopoverContent, PopoverTrigger, useDisclosure } from '@nextui-org/react';
// import { useQuery, useQueryClient } from '@tanstack/react-query';

// import Bell from '@assets/icons/bell.svg?react';
// import Button from '@components/atomic/Button';
// import Skeleton from '@components/atomic/Skeleton';
// import { allNotifications } from '@domains/common/api/notification';
// import { useAppSelector } from '@hooks/store';
// import { notificationEvents } from '@src/constants/notificationEvents';

// // import { useSocket } from '../contexts/socket';

// import AllNotifications from './AllNotifications';
// import PopoverTitle from './PopoverTitle';

// export default function NotificationPopover() {
//     const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();
//     const { role } = useAppSelector(state => state.auth);
//     const { _id } = useAppSelector(state => state.company);
//     const { data, isPending } = useQuery({
//         queryKey: ['allNotifications', _id],
//         queryFn: () => allNotifications(role, { page: 1, limit: 1, search: '', status: 'all', company: _id }),
//     });

//     // const socket = useSocket();
//     const queryClient = useQueryClient();
//     // useEffect(() => {
//     //     if (!socket) return;
//     //     socket?.on(notificationEvents.NEW_NOTIFICATION, async () => {
//     //         queryClient.invalidateQueries({
//     //             queryKey: ['allNotifications', { page: 1, limit: 10 }],
//     //         });
//     //     });
//     //     queryClient.invalidateQueries({
//     //         queryKey: ['allNotifications'],
//     //     });
//     //     // eslint-disable-next-line react-hooks/exhaustive-deps
//     // }, [socket]);

//     return (
//         <Popover
//             shouldBlockScroll
//             className="rounded-3xl overflow-hidden shadow-sm"
//             isOpen={isOpen}
//             placement="bottom"
//             shadow="sm"
//             onOpenChange={onOpenChange}
//         >
//             <PopoverTrigger>
//                 <div className="relative z-30">
//                     <Skeleton className="rounded-xl" isLoaded={!isPending}>
//                         <Button
//                             isIconOnly
//                             className="rounded-xl bg-default-100 min-w-[48px] h-[48px] px-0"
//                             color="default"
//                             radius="full"
//                             onClick={onOpen}
//                         >
//                             <Bell className="text-secondary" height={20} width={20} />
//                         </Button>
//                     </Skeleton>
//                     {data?.total_unread && data?.total_unread > 0 ? (
//                         <div className="absolute top-[5px] right-[5px] size-2 rounded-full bg-orange-600 border animate-pulse" />
//                     ) : null}
//                 </div>
//             </PopoverTrigger>
//             <PopoverContent className="w-[380px] max-w-[380px] p-0 pb-4 justify-start border rounded-3xl border-default-100">
//                 <PopoverTitle />
//                 <AllNotifications isModal onClose={onClose} />
//             </PopoverContent>
//         </Popover>
//     );
// }
