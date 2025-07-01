// import { useMutation, useQueryClient } from '@tanstack/react-query';

// import More from '@assets/icons/more-hollow.svg?react';
// import MarkRead from '@assets/icons/tick-circle-read.svg?react';
// import Button from '@components/atomic/Button';
// import Dropdown, { DropdownItem, DropdownMenu, DropdownTrigger } from '@components/atomic/DropDown';
// import { markNotificationRead } from '@domains/common/api/notification';
// import { useAppSelector } from '@hooks/store';

// export default function PopoverTitle() {
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
//         <div className="w-full flex justify-between items-center bg-violet p-6 pe-0">
//             <h3 className="text-xl font-medium text-light">Notifications</h3>
//             <Dropdown>
//                 <DropdownTrigger>
//                     <Button isIconOnly className="text-light" color="text" size="md">
//                         <More height={24} width={24} />
//                     </Button>
//                 </DropdownTrigger>
//                 <DropdownMenu aria-label="Actions" color="text">
//                     <DropdownItem
//                         key="mark_read"
//                         startContent={<MarkRead height={24} width={24} />}
//                         title="Mark all as read"
//                         onClick={() => mutate({ id: 'all' })}
//                     />
//                 </DropdownMenu>
//             </Dropdown>
//         </div>
//     );
// }
