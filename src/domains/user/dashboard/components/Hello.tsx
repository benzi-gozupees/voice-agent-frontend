// import { Link, useDisclosure } from '@nextui-org/react';
// import { useQuery } from '@tanstack/react-query';
// import { useLocation, useNavigate } from 'react-router-dom';

// import PlusIcon from '@assets/icons/plus.svg?react';
// import Button from '@components/atomic/Button';
// import { ServiceLimitations } from '@domains/common/settings/api/subscription';
// import ChoosePlanInfoModal from '@domains/common/settings/components/subscription/ChoosePlanInfoModal';
// import PartnerUpgradePlanModal from '@domains/common/settings/components/subscription/PartnerUpgradePlanModal';
// import UpgradePlanModal from '@domains/common/settings/components/subscription/UpgradePlanModal';
// import NavbarSearch from '@domains/user/dashboard/components/NavbarSearch';
// import { useAppDispatch, useAppSelector } from '@src/hooks/store';
// import { setOpenModal } from '@src/slices/modal';

// export default function Hello() {
//     const { auto_login } = useAppSelector(state => state.auth);
//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();

//     const company = useAppSelector(state => state.company);

//     const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
//     const { data, isLoading, isPending, isRefetching } = useQuery({
//         queryKey: ['serviceLimitations', company?._id],
//         queryFn: () => ServiceLimitations(company?._id),
//         enabled: !!company?._id,
//     });

//     const location = useLocation();
//     const { pathname } = location;

//     const currentDate = new Date();
//     const expiryDate = new Date(data?.user_subscription?.expiry_date);

//     const notSubscribed = data?.user_subscription === null;

//     const expenseLimitation = data?.user_subscription?.limitations.find(
//         (limitation: any) => limitation.name === 'Expenses'
//     );

//     const invoiceLimitation = data?.user_subscription?.limitations.find(
//         (limitation: any) => limitation.name === 'Invoices'
//     );

//     const expenseLimitReached =
//         (!expenseLimitation?.is_unlimited && expenseLimitation?.count === 0) ||
//         !expenseLimitation?.is_available ||
//         (expiryDate < currentDate && data?.user_subscription?.plan?.title !== 'Free');

//     const invoiceLimitReached =
//         (!invoiceLimitation?.is_unlimited && invoiceLimitation?.count === 0) ||
//         !invoiceLimitation?.is_available ||
//         (expiryDate < currentDate && data?.user_subscription?.plan?.title !== 'Free');

//     const renderModal = () => {
//         if (!isOpen) return null;

//         if (auto_login) {
//             return (
//                 <PartnerUpgradePlanModal
//                     isOpen={isOpen}
//                     onClose={onClose}
//                     onOpenChange={onOpenChange}
//                 />
//             );
//         }

//         if (notSubscribed) {
//             return (
//                 <ChoosePlanInfoModal
//                     isOpen={isOpen}
//                     onClose={onClose}
//                     onOpenChange={onOpenChange}
//                 />
//             );
//         }

//         return (
//             <UpgradePlanModal
//                 isFree={data?.user_subscription?.plan?.title === 'Free'}
//                 isOpen={isOpen}
//                 priceId={data?.user_subscription?.plan?.stripe_price_id}
//                 onClose={onClose}
//                 onOpenChange={onOpenChange}
//             />
//         );
//     };

//     return (
//         <div className="flex flex-col md:flex-row flex-wrap gap-6">
//             <div className="flex-grow">
//                 <NavbarSearch />
//             </div>
//             <div className="md:w-[max(33%,330px)] flex justify-end gap-4 *:flex-1 md:*:flex-none">
//                 <Button
//                     className="border-primary rounded-2xl"
//                     startContent={<PlusIcon height={20} width={20} />}
//                     onClick={() =>
//                         expenseLimitReached || notSubscribed
//                             ? onOpenChange()
//                             : dispatch(setOpenModal('add-expense'))
//                     }
//                 >
//                     Add Expense
//                 </Button>

//                 <Button
//                     as={Link}
//                     className="border-primary rounded-2xl"
//                     startContent={<PlusIcon height={20} width={20} />}
//                     onClick={() =>
//                         invoiceLimitReached || notSubscribed
//                             ? onOpenChange()
//                             : navigate('/invoices/create')
//                     }
//                 >
//                     Create Invoice
//                 </Button>

//                 {renderModal()}
//             </div>
//         </div>
//     );
// }
