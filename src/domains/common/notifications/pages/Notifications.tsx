// import { useMutation, useQueryClient } from '@tanstack/react-query';

// import More from '@assets/icons/more-hollow.svg?react';
// import MarkRead from '@assets/icons/tick-circle-read.svg?react';
// import Button from '@components/atomic/Button';
// import Dropdown, { DropdownItem, DropdownMenu, DropdownTrigger } from '@components/atomic/DropDown';
// import GoBack from '@components/molecular/GoBack';
// import { markNotificationRead } from '@domains/common/api/notification';
// import { useAppSelector } from '@hooks/store';

// import AllNotifications from '../components/AllNotifications';

// export default function Notifications() {
//     document.title = 'Notifications | GoZupees';
//     const { role } = useAppSelector(state => state.auth);
//     const queryClient = useQueryClient();
//     const { mutate } = useMutation({
//         mutationKey: ['markAsRead'],
//         mutationFn: ({ id, notification_ids }: { id: string; notification_ids?: string[] }) =>
//             markNotificationRead(role, id, notification_ids),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['allNotifications'] });
//             // setPage(1);
//         },
//     });
//     return (
//         <div className="max-w-xl mx-auto">
//             <div className="flex gap-2 justify-between items-center p-4">
//                 <GoBack title="Notifications" />
//                 <Dropdown>
//                     <DropdownTrigger>
//                         <Button isIconOnly className="text-content2" color="text" size="md">
//                             <More height={24} width={24} />
//                         </Button>
//                     </DropdownTrigger>
//                     <DropdownMenu aria-label="Actions">
//                         <DropdownItem
//                             key="mark_read"
//                             startContent={<MarkRead height={24} width={24} />}
//                             title="Mark all as read"
//                             onClick={() => mutate({ id: 'all' })}
//                         />
//                     </DropdownMenu>
//                 </Dropdown>
//             </div>
//             <AllNotifications onClose={() => {}} />
//         </div>
//     );
// }
