// import { useMemo, useState } from 'react';

// import { Spacer } from '@nextui-org/react';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { formatDistance } from 'date-fns';
// import { Link } from 'react-router-dom';

// import Logo from '@assets/icons/logo_t.svg?react';
// import More from '@assets/icons/more.svg?react';
// import MarkRead from '@assets/icons/tick-circle-read.svg?react';
// import Button from '@components/atomic/Button';
// import Dropdown, { DropdownItem, DropdownMenu, DropdownTrigger } from '@components/atomic/DropDown';
// import Pagination from '@components/atomic/Pagination';
// import { ScrollArea } from '@components/atomic/ScrollArea';
// import Skeleton from '@components/atomic/Skeleton';
// import CustomTabs from '@components/atomic/Tabs';
// import Empty from '@components/molecular/Empty';
// import Error from '@components/molecular/Error';
// import { allNotifications, markNotificationRead } from '@domains/common/api/notification';
// import { useAppSelector } from '@hooks/store';

// type AllNotificationsProps = {
//     onClose: () => void;
//     isModal?: boolean;
// };

// export default function AllNotifications({ onClose, isModal = false }: AllNotificationsProps) {
//     const { user } = useAppSelector(state => state.auth);
//     const [page, setPage] = useState(1);
//     const [limit, setLimit] = useState(10);
//     const [status, setStatus] = useState('unread');
//     const company = useAppSelector(state => state.company);

//     const { data, isPending, isRefetching, error } = useQuery({
//         queryKey: ['allNotifications', { page, limit, status, company: company?._id }],
//         queryFn: () =>
//             allNotifications(user?.role, { page, limit, search: '', status, company: company?._id }),
//     });

//     const queryClient = useQueryClient();
//     const { mutate } = useMutation({
//         mutationKey: ['markAsRead'],
//         mutationFn: ({ id, notification_ids }: { id: string; notification_ids?: string[] }) =>
//             markNotificationRead(user?.role, id, notification_ids),
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['allNotifications'] });
//             setPage(1);
//         },
//     });
//     const total = useMemo(() => Math.ceil((data?.total || 1) / limit), [data, limit]);

//     const handleCloseAndMark = (id: string) => {
//         onClose();
//         mutate({ id });
//     };

//     const generateLink = (notification: any) => {
//         const id = notification?.data?._id;
//         const company_id = notification.company;
//         if (user?.role === 'TENANT') {
//             switch (notification.type) {
//                 case 'task':
//                     return `/checklist/${id}?company=${company_id}`;
//                 case 'expense':
//                     return `/expenses?company=${company_id}&id=${id}&details=true`;
//                 case 'invoice':
//                     return `/invoices?company=${company_id}&id=${id}&details=true`;
//                 case 'meeting':
//                     return `/meetings/schedule/${id}/?company=${company_id}&details=true`;
//                 case 'service_request':
//                     return `/cfo-services/my-requests/${id}?company=${company_id}&details=true`;
//                 case 'tax_filing':
//                     return `/tax-filing/recent/`;
//                 default:
//                     return '';
//             }
//         }
//         if (user?.role === 'admin') {
//             switch (notification.type) {
//                 case 'task':
//                     return `/accountant/checklist/${id}?company=${company_id}`;
//                 case 'expense':
//                     return `/accountant/expenses?company=${company_id}&id=${id}&details=true`;
//                 case 'invoice':
//                     return `/accountant/invoices?company=${company_id}&id=${id}&details=true`;
//                 case 'meeting':
//                     return `/accountant/meetings/${id}/?company=${company_id}&details=true`;
//                 case 'service_request':
//                     return `/accountant/cfo-services/my-requests/${id}?company=${company_id}&details=true`;
//                 case 'tax_filing':
//                     return `/accountant/tax-filing/?company=${company_id}&id=${id}&details=true`;
//                 case 'invoice_submission':
//                     return `/accountant/inbox/?company=${company_id}&details=true`;
//                 default:
//                     return '';
//             }
//         }
//         return '';
//     };

//     const renderBody = () => {
//         if (isPending) {
//             return (
//                 <div className="space-y-3">
//                     {Array.from({ length: 4 }).map((_, index) => (
//                         <div key={index} className="px-6 flex items-start gap-3">
//                             <Skeleton className="size-12 rounded-full" />
//                             <div className="space-y-1">
//                                 <Skeleton className="font-semibold w-[100px]">title</Skeleton>
//                                 <Skeleton className="text-content2 line-clamp-3">
//                                     message content of the notification
//                                 </Skeleton>
//                                 <span className="text-content2 text-tiny invisible">
//                                     created_at
//                                 </span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             );
//         }
//         if (error || !data) return <Error width={180} />;
//         if (data.total === 0) return <Empty message="" title="No notifications" width={150} />;
//         return (
//             <>
//                 <ScrollArea baseClassNames="h-[50vh]">
//                     <div className="mx-4">
//                         {data.notifications.map((notification: any) => (
//                             <div
//                                 key={notification._id}
//                                 className="flex items-start gap-3 group p-2 rounded-xl relative hover:bg-default-100"
//                             >
//                                 <Link
//                                     className="flex-grow"
//                                     to={generateLink(notification)}
//                                     onClick={() => handleCloseAndMark(notification._id)}
//                                 >
//                                     <div className="flex gap-3">
//                                         <div className="p-3 bg-white border rounded-full self-start">
//                                             <Logo height={24} width={24} />
//                                         </div>
//                                         <div className="flex-grow space-y-1">
//                                             <p className="font-medium">{notification?.title}</p>
//                                             <p className="text-content2 line-clamp-3 text-sm">
//                                                 {notification?.message}
//                                             </p>
//                                             <p className="text-default-500 text-xs">
//                                                 {formatDistance(
//                                                     new Date(notification.created_at),
//                                                     new Date(),
//                                                     {
//                                                         addSuffix: true,
//                                                     }
//                                                 )}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </Link>
//                                 <div
//                                     className={`invisible absolute right-2 top-2 group-hover:visible ${status === 'all' ? 'hidden' : ''} `}
//                                 >
//                                     <Dropdown>
//                                         <DropdownTrigger>
//                                             <Button
//                                                 isIconOnly
//                                                 className="rounded-full bg-default-100 min-w-[48px] h-[48px] px-0"
//                                                 color="default"
//                                                 href="/chat"
//                                             >
//                                                 <More height={20} width={20} />
//                                             </Button>
//                                         </DropdownTrigger>
//                                         <DropdownMenu aria-label="Actions" color="text">
//                                             <DropdownItem
//                                                 key="mark_read"
//                                                 startContent={<MarkRead height={24} width={24} />}
//                                                 title="Mark as read"
//                                                 onClick={() => mutate({ id: notification._id })}
//                                             />
//                                         </DropdownMenu>
//                                     </Dropdown>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </ScrollArea>
//                 {!isModal && (
//                     <Pagination
//                         classNames={{ base: 'py-10' }}
//                         page={page}
//                         total={total}
//                         onChange={setPage}
//                     />
//                 )}
//             </>
//         );
//     };

//     return (
//         <div className="w-full">
//             <div className="p-4 w-full">
//                 <CustomTabs
//                     selected={status}
//                     tabs={[
//                         { title: 'Unread', key: 'unread' },
//                         { title: 'All', key: 'all' },
//                     ]}
//                     onTabChange={setStatus}
//                 />
//             </div>
//             <div className="flex justify-end items-center px-6">
//                 <Link
//                     className="underline text-sm"
//                     hidden={!isModal}
//                     to={role === 'customer' ? '/notifications' : `/${role}/notifications`}
//                     onClick={onClose}
//                 >
//                     See All
//                 </Link>
//             </div>
//             <Spacer y={4} />
//             {renderBody()}
//         </div>
//     );
// }
