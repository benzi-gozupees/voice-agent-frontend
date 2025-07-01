// import { useMemo } from 'react';

// import { Spacer, Spinner, useDisclosure } from '@nextui-org/react';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { Link } from 'react-router-dom';

// import CalendarIcon from '@assets/icons/calendar.svg?react';
// import MaestroLogo from '@assets/icons/maestro_logo.svg?react';
// import PlanIcon from '@assets/icons/plan_icon.svg?react';
// import SettingsIcon from '@assets/icons/settings2.svg?react';
// import Visa from '@assets/icons/visa_logo.svg?react';
// import Button from '@components/atomic/Button';
// import Chip from '@components/atomic/Chip';
// import Pagination from '@components/atomic/Pagination';
// import Skeleton from '@components/atomic/Skeleton';
// import Table, { ColumnProps } from '@components/atomic/Table';
// import Empty from '@components/molecular/Empty';
// import useGetTableData from '@domains/user/hooks/useGetTableData';
// import { useAppSelector } from '@hooks/store';
// import useFormatCurrency from '@hooks/useFormatCurrency';
// import { formatDate } from '@utils/formatDate';

// import {
//     getSubscriptionCards,
//     getSubscriptionInvoices,
//     manageSubscription,
//     ServiceLimitations,
// } from '../api/subscription';

// import SkeletonItem from './mobile/SkeletonItem';
// import SubscriptionItem from './mobile/SubscriptionItem';
// import PlanUsage from './subscription/PlanUsage';
// import UpgradePlanModal from './subscription/UpgradePlanModal';

// type Props = {};

// const getCardBrandIcon = (brand: string) => {
//     switch (brand) {
//         case 'visa':
//             return <Visa height={20} width={30} />;
//         case 'mastercard':
//             return <MaestroLogo height={20} width={30} />;
//         default:
//             return <Visa height={20} width={30} />;
//     }
// };

// function MyPlans(props: Props) {
//     const {
//         page,
//         setPage,
//         limit,
//         sort,
//         setSort,
//         setSearch,
//         search,
//         filters,
//         onFilterChange,
//         apiQuery,
//     } = useGetTableData({
//         defaultFilters: { period: new Set(['all']), category: new Set(['all']) },
//         defaultSort: {
//             column: 'created_at',
//             direction: 'descending',
//         },
//     });

//     const { auto_login } = useAppSelector(state => state.auth);
//     const company = useAppSelector(state => state.company);

//     const formatCurrency = useFormatCurrency();

//     const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
//     const { data, isPending } = useQuery({
//         queryKey: ['serviceLimitations', company?._id],
//         queryFn: () => ServiceLimitations(company?._id),
//         enabled: !!company?._id,
//     });

//     const notSubscribed = data?.user_subscription === null;

//     const {
//         data: invoicesData,
//         isPending: invoicesIsPending,
//         isLoading: invoicesIsLoading,
//         isError,
//     } = useQuery({
//         queryKey: ['subscriptionInvoices', apiQuery],
//         queryFn: () => getSubscriptionInvoices(apiQuery),
//     });

//     const {
//         data: cardsData,
//         isPending: cardsIsPending,
//         isLoading: cardsIsLoading,
//     } = useQuery({
//         queryKey: ['subscriptionCards', company?._id],
//         queryFn: () => getSubscriptionCards(company?._id),
//     });

//     const { mutate, isPending: MutationIsPending } = useMutation({
//         mutationFn: manageSubscription,
//         onSuccess: (res: { session: { url: string } }) => {
//             window.location.href = res?.session?.url;
//         },
//         onError: error => {
//             console.error('Error managing subscription:', error);
//         },
//     });

//     const currentDate = new Date();
//     const expiryDate = new Date(data?.user_subscription?.expiry_date);
//     const isActive = currentDate < expiryDate;
//     const handlePayments = async () => {
//         mutate(company?._id);
//     };
//     const showUpgradeButton = data?.user_subscription?.plan?.title === 'Free';

//     const columns: ColumnProps<any>[] = [
//         {
//             title: 'Date Added',
//             uid: 'created_at',
//             render: ({ cell }) => (
//                 <div className="flex items-center gap-2">
//                     <CalendarIcon height={16} width={16} />
//                     <span>{formatDate(cell)}</span>
//                 </div>
//             ),
//             skeleton: <Skeleton className="w-40">date</Skeleton>,
//             width: 150,
//         },
//         {
//             title: 'Plan',
//             uid: 'plan',
//             skeleton: <Skeleton className="w-24">12345678</Skeleton>,
//             width: 150,
//         },
//         {
//             title: 'Amount',
//             uid: 'total',
//             skeleton: <Skeleton className="w-24">12345678</Skeleton>,
//             width: 150,

//             render: ({ row }) => (
//                 <span className="flex">
//                     <p className="text-default-900 ml-0.5">{formatCurrency(row?.total, true)}</p>
//                 </span>
//             ),
//         },

//         {
//             title: 'Download',
//             uid: 'actions',
//             render: ({ row }) => (
//                 <Link target="_blank" to={row?.invoice_pdf}>
//                     <Button size="sm">Download</Button>
//                 </Link>
//             ),
//             skeleton: <Skeleton className="w-8">date</Skeleton>,
//             width: 150,
//         },
//     ];

//     const emptyContent = <Empty message="" title="No payments so far" />;
//     const total = useMemo(
//         () => Math.ceil((invoicesData?.total || 0) / limit),
//         [invoicesData, limit]
//     );

//     if (isPending)
//         return (
//             <div className="flex justify-center items-center" style={{ marginTop: '100px' }}>
//                 <Spinner />
//             </div>
//         );

//     const mobileRender = ({ row }: { row: any }) => <SubscriptionItem row={row} />;

//     const renderRenewalContent = () => {
//         if (notSubscribed) {
//             return 'Not Available';
//         }
//         if (showUpgradeButton) {
//             return formatDate(expiryDate);
//         }
//         return formatDate(expiryDate);
//     };

//     const renderStatus = () => {
//         if (notSubscribed) {
//             return 'inactive';
//         }
//         if (isActive) {
//             return 'active';
//         }
//         return 'expired';
//     };

//     return (
//         <>
//             <div className="flex flex-col gap-3">
//                 {!auto_login ? (
//                     <div className="sm:flex justify-between rounded-3xl sm:py-10 sm:px-8 px-4 py-4 border">
//                         <div>
//                             <h1 className="font-semibold text-xl">Plan and Billing</h1>
//                             <p>Manange your Plan and Payments</p>
//                         </div>
//                         <div className="flex gap-2 mt-3 sm:mt-0">
//                             {!showUpgradeButton && (
//                                 <Button
//                                     className="text-semibold text-base text-white"
//                                     color="primary"
//                                     isDisabled={notSubscribed}
//                                     isLoading={MutationIsPending}
//                                     startContent={<PlanIcon />}
//                                     onClick={handlePayments}
//                                 >
//                                     Subscription Settings
//                                 </Button>
//                             )}
//                             <Button
//                                 className="text-semibold text-base text-white"
//                                 color="primary"
//                                 isDisabled={notSubscribed}
//                                 startContent={<SettingsIcon />}
//                                 onClick={() => onOpen()}
//                             >
//                                 Manage Plan
//                             </Button>
//                         </div>
//                     </div>
//                 ) : null}
//                 <div className="rounded-3xl sm:py-10 sm:px-8 px-4 py-4 border">
//                     <div className="flex justify-between items-center mb-6">
//                         <h1 className="font-semibold text-xl">Current Plan</h1>
//                         {/* <Button
//                             className="border border-primary"
//                             color="white"
//                             radius="md"
//                             startContent={<EditPencilIcon />}
//                         >
//                             Edit
//                         </Button> */}
//                     </div>

//                     <div className="grid sm:grid-cols-5 grid-cols-2  gap-x-4 gap-y-6">
//                         <div>
//                             <h2 className="text-default-400">Plan</h2>
//                             <p className="mt-2">
//                                 {notSubscribed
//                                     ? 'No Active Plan '
//                                     : data?.user_subscription?.plan?.title}
//                             </p>
//                         </div>

//                         <div>
//                             <h2 className="text-default-400">Renewal Date</h2>
//                             <p className="mt-2">{renderRenewalContent()}</p>
//                         </div>

//                         <div>
//                             <h2 className="text-default-400">Status</h2>
//                             <Chip className="mt-2" status={renderStatus()} />
//                         </div>

//                         <div>
//                             <h2 className="text-default-400">Saved Card</h2>
//                             <Skeleton
//                                 className="mt-2"
//                                 isLoaded={!cardsIsLoading || !cardsIsPending}
//                             >
//                                 <div className="mt-2 flex items-center justify-start gap-2">
//                                     {cardsData?.cards?.length && !notSubscribed ? (
//                                         <>
//                                             {getCardBrandIcon(cardsData?.cards[0]?.card?.brand)}
//                                             <p>**** **** **** {cardsData?.cards[0]?.card?.last4}</p>
//                                         </>
//                                     ) : (
//                                         <p>Not available</p>
//                                     )}
//                                 </div>
//                             </Skeleton>
//                         </div>

//                         <div>
//                             <h2 className="text-default-400">Card Expiry</h2>
//                             <Skeleton
//                                 className="mt-2"
//                                 isLoaded={!cardsIsLoading || !cardsIsPending}
//                             >
//                                 {cardsData?.cards?.length ? (
//                                     <p className="mt-2">
//                                         {cardsData?.cards[0]?.card.exp_month}/
//                                         {cardsData?.cards[0]?.card.exp_year}
//                                     </p>
//                                 ) : (
//                                     <p>Not available</p>
//                                 )}
//                             </Skeleton>
//                         </div>
//                     </div>

//                     <Spacer y={4} />
//                     <h1 className="font-semibold text-xl">Subscription Invoices</h1>
//                     <Spacer y={6} />

//                     <div className="">
//                         {/* <div className="flex justify-between items-center p-4">
//                             <SearchInput
//                                 className=""
//                                 placeholder="Search for invoices"
//                                 onChange={e => setSearch(e.target.value)}
//                             />
//                         </div> */}

//                         <Table
//                             removeWrapper
//                             classNames={{
//                                 th: 'first:rounded-tl-3xl last:rounded-tr-3xl ',
//                                 base: 'border rounded-3xl',
//                             }}
//                             columns={columns}
//                             emptyContent={emptyContent}
//                             isError={isError}
//                             isLoading={invoicesIsPending || invoicesIsLoading}
//                             items={invoicesData?.invoices}
//                             mobileRender={mobileRender}
//                             mobileSkeleton={SkeletonItem}
//                             sortDescriptor={sort}
//                             uid="_id"
//                             onSortChange={setSort}
//                         />

//                         <Spacer y={3} />
//                         <Pagination page={page} total={total} onChange={setPage} />
//                         {total >= limit && <Spacer y={3} />}
//                     </div>
//                 </div>

//                 {isActive ? (
//                     <div className="rounded-3xl sm:py-10 sm:px-8 px-4 py-4 border">
//                         <h1 className="font-semibold text-xl mb-2">Usage</h1>
//                         <Spacer y={6} />
//                         <PlanUsage data={data} />
//                     </div>
//                 ) : null}
//             </div>

//             {isOpen ? (
//                 <UpgradePlanModal
//                     isActive={isActive}
//                     isFree={data?.user_subscription?.plan?.title === 'Free'}
//                     isOpen={isOpen}
//                     priceId={data?.user_subscription?.plan?.stripe_price_id}
//                     onOpenChange={onOpenChange}
//                 />
//             ) : null}
//         </>
//     );
// }

// export default MyPlans;
