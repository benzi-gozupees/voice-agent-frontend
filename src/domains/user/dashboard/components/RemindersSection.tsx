// import { useQuery } from '@tanstack/react-query';
// import { Link } from 'react-router-dom';

// import NoTasksIcon from '@assets/icons/menu_board.svg?react';
// import Chip from '@components/atomic/Chip';
// import Skeleton from '@components/atomic/Skeleton';
// import { useAppSelector } from '@hooks/store';

// import { getLicenseExpiry } from '../api/company';

// type ReminderItemProps = {
//     title: string;
//     message: string;
//     duration: number;
//     suffix: string;
// };

// function ReminderItem({ title, message, duration, suffix }: ReminderItemProps) {
//     return (
//         <div className="bg-white rounded-2xl flex items-center justify-between py-4 font-semibold px-4 hover:bg-hover">
//             <div className="flex items-center">
//                 <div className="rounded-xl flex flex-col px-1 py-3 min-w-16 items-center justify-center bg-[#FAEBFF]">
//                     <span className="text-lg font-bold">{duration}</span>
//                     <span className="text-[10px] truncate font-normal">{suffix}</span>
//                 </div>
//                 <div className="ml-4">
//                     <span className="text-sm font-semibold">{title}</span>
//                     <br />
//                     <span className="text-sm font-medium text-[#555] line-clamp-1">{message}</span>
//                 </div>
//             </div>
//         </div>
//     );
// }

// function RemindersSection() {
//     const { is_company_added } = useAppSelector(state => state.auth);
//     const company = useAppSelector(state => state.company);

//     const { data, isLoading, error } = useQuery({
//         queryKey: ['getExpiry', company?._id],
//         queryFn: () => getLicenseExpiry(company?._id),
//         enabled: is_company_added,
//     });

//     const reminders = data || [];
//     const skeletonArray = new Array(2).fill(null);

//     // Render loading state
//     if (isLoading && !error) {
//         return (
//             <div className="bg-[#F0F2FF] p-4 relative rounded-3xl h-full">
//                 <div
//                     className="absolute -top-4 left-[50%] translate-x-[-50%]"
//                     style={{
//                         borderLeft: '25px solid transparent',
//                         borderRight: '25px solid transparent',
//                         borderTop: '35px solid white',
//                         height: 0,
//                         width: '125px',
//                     }}
//                 />
//                 <div className="flex px-2 py-4 justify-between">
//                     <span className="font-semibold">Reminders</span>
//                     {/* <Link className="text-sm text-secondary underline font-semibold" to="/">
//                         View All
//                     </Link> */}
//                 </div>
//                 <div className="flex flex-col gap-3">
//                     {skeletonArray.map((_, index) => (
//                         <Skeleton key={index}>
//                             <ReminderItem
//                                 duration={0}
//                                 message="Loading..."
//                                 suffix="..."
//                                 title="Loading..."
//                             />
//                         </Skeleton>
//                     ))}
//                 </div>
//             </div>
//         );
//     }

//     // Render error state
//     if (error) {
//         return (
//             <div className="bg-[#F0F2FF] p-4 relative rounded-3xl h-full flex flex-col">
//                 <div
//                     className="absolute -top-4 left-[50%] translate-x-[-50%]"
//                     style={{
//                         borderLeft: '25px solid transparent',
//                         borderRight: '25px solid transparent',
//                         borderTop: '35px solid white',
//                         height: 0,
//                         width: '125px',
//                     }}
//                 />
//                 <div className="flex px-2 py-4 justify-between">
//                     <span className="font-semibold">Reminders</span>
//                     <Link className="text-sm text-secondary underline font-semibold" to="/">
//                         View All
//                     </Link>
//                 </div>
//                 <div className="flex-grow flex items-center justify-center">
//                     <Chip size="lg" status="info">
//                         Failed to load tasks
//                     </Chip>
//                 </div>
//             </div>
//         );
//     }

//     // Render empty state
//     if (reminders.length === 0) {
//         return (
//             <div className="bg-[#F0F2FF] p-4 relative rounded-3xl h-full">
//                 <div
//                     className="absolute -top-4 left-[50%] translate-x-[-50%]"
//                     style={{
//                         borderLeft: '25px solid transparent',
//                         borderRight: '25px solid transparent',
//                         borderTop: '35px solid white',
//                         height: 0,
//                         width: '125px',
//                     }}
//                 />
//                 <div className="flex px-2 py-4 justify-between">
//                     <span className="font-semibold">Reminders</span>
//                     <Link className="text-sm text-secondary underline font-semibold" to="/">
//                         View All
//                     </Link>
//                 </div>
//                 <div className="flex items-center justify-center rounded-3xl h-full">
//                     <div className="flex flex-col items-center text-default-400 justify-center">
//                         <NoTasksIcon height={48} width={48} />
//                         <p className="mt-2">No reminders right now</p>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     // Render reminders
//     return (
//         <div className="bg-[#F0F2FF] p-4 rounded-3xl relative h-full">
//             <div
//                 className="absolute -top-4 left-[50%] translate-x-[-50%]"
//                 style={{
//                     borderLeft: '25px solid transparent',
//                     borderRight: '25px solid transparent',
//                     borderTop: '35px solid white',
//                     height: 0,
//                     width: '125px',
//                 }}
//             />
//             <div className="flex px-2 py-4 justify-between">
//                 <span className="font-semibold">Reminders</span>
//                 {/* <Link className="text-sm text-secondary underline font-semibold" to="/">
//                     View All
//                 </Link> */}
//             </div>
//             <div className="flex flex-col gap-2">
//                 {reminders.map((reminder: any, index: number) => (
//                     <ReminderItem
//                         key={index}
//                         duration={reminder.duration}
//                         message={reminder.message}
//                         suffix={reminder.suffix}
//                         title={reminder.title}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default RemindersSection;
