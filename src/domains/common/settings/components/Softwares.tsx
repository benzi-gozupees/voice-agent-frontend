// import { useEffect, useState } from 'react';

// import { Spacer, useDisclosure } from '@nextui-org/react';
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';

// import WafeqLogo from '@assets/image/wafeq.png';
// import ZohoLogo from '@assets/image/zoho.png';
// import Button from '@components/atomic/Button';
// import { setCompany } from '@domains/common/slices/company';
// import { useAppDispatch, useAppSelector } from '@hooks/store';
// import useModal from '@hooks/useModal';

// import { disconnectWafeq, disconnectZoho, getZohoToken } from '../api/softwares';

// import DeleteConfirmModal from './software/DeleteConfirmModal';
// import WafeqModal from './software/WafeqModal';
// import ZohoOrg from './software/ZohoOrg';

// function Softwares() {
//     const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
//     const [selectedData, setSelectedData] = useState('');
//     const { role } = useAppSelector((state: any) => state.auth);
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const code = queryParams.get('code');
//     const queryClient = useQueryClient();
//     const disconnectWafeqModal = useModal();
//     const ZohoOrgModal = useModal();
//     const navigate = useNavigate();
//     const company = useAppSelector(state => state.company);
//     const dispatch = useAppDispatch();
//     const { mutate, isPending } = useMutation({
//         mutationFn: getZohoToken,
//         onSuccess: data => {
//             dispatch(setCompany(data));
//             queryClient.invalidateQueries({ queryKey: ['softwares'] });
//             toast.success('Integrated sucessfully');
//         },
//         onError: (error: any) => {
//             const message = error?.response?.data?.message || 'Something went wrong';
//             toast.error(message);
//         },
//     });
//     const handleEdit = () => {
//         setSelectedData(company?.wafeq_key || '');
//         onOpen();
//     };
//     const handleZohoConnect = () => {
//         window.location.href = `https://accounts.zoho.com/oauth/v2/auth?scope=ZohoBooks.fullaccess.all&client_id=${import.meta.env.VITE_ZOHO_CLIENT_ID}&state=testing&response_type=code&redirect_uri=${import.meta.env.VITE_CLIENT_URL}/settings/softwares&access_type=offline&prompt=consent`;
//     };
//     useEffect(() => {
//         async function fetch() {
//             console.log(company);
//             if (code && company) {
//                 const response = await mutate({ code, companyId: company?._id });
//             }
//             navigate(location.pathname, { replace: true });
//         }
//         if (company?.zoho_tokens?.token && !company?.zoho_org_id) {
//             ZohoOrgModal.openModal();
//         }
//         fetch();
//     }, [code, location.pathname, mutate, navigate, company]);
//     // if (isLoading)
//     //     return (
//     //         <div className="flex justify-center items-center" style={{ marginTop: '100px' }}>
//     //             <Spinner />
//     //         </div>
//     //     );
//     return (
//         <>
//             <Spacer y={2} />
//             <div className="flex flex-col gap-3">
//                 <div className="p-4 border rounded-3xl">
//                     <div className="flex w-full p-5 sm:px-8 justify-between">
//                         <div>
//                             <img
//                                 alt="Wafeq Icon"
//                                 className="w-48 h-11 object-contain"
//                                 src={WafeqLogo}
//                             />
//                         </div>
//                         {/* <div
//                         style={{
//                             width: '55%',
//                             display: 'flex',
//                             alignItems: 'start',
//                             fontSize: '20px',
//                             flexDirection: 'column',
//                             justifyContent: 'center',
//                         }}
//                     >
//                         <div className=" font-semibold text-lg">Wafeq</div>
//                         <div className="text-sm mt-1">Add your api key to integrate Wafeq</div>
//                     </div> */}
//                         <div
//                             style={{
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                             }}
//                         >
//                             {company.wafeq_key ? (
//                                 <Button
//                                     color="danger"
//                                     onClick={() => {
//                                         setSelectedData('wafeq');
//                                         disconnectWafeqModal.openModal();
//                                     }}
//                                 >
//                                     Disconnect
//                                 </Button>
//                             ) : (
//                                 <Button onClick={handleEdit}>Connect</Button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 <div className="p-4 border rounded-3xl">
//                     <div className="flex w-full p-5 sm:px-8 justify-between">
//                         <div>
//                             <img
//                                 alt="zoho Icon"
//                                 className=" w-40 h-14 object-contain"
//                                 src={ZohoLogo}
//                             />
//                         </div>
//                         {/* <div
//                             style={{
//                                 width: '53.5%',
//                                 display: 'flex',
//                                 alignItems: 'start',
//                                 fontSize: '20px',
//                                 flexDirection: 'column',
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             <div className="font-semibold text-lg">Zoho books</div>
//                             <div className="text-sm mt-1">
//                                 Authenticate your zoho account with us.
//                             </div>
//                         </div> */}
//                         <div
//                             style={{
//                                 display: 'flex',
//                                 justifyContent: 'center',
//                                 alignItems: 'center',
//                             }}
//                         >
//                             {company?.zoho_org_id ? (
//                                 <Button
//                                     color="danger"
//                                     onClick={() => {
//                                         setSelectedData('zoho');
//                                         disconnectWafeqModal.openModal();
//                                     }}
//                                 >
//                                     Disconnect
//                                 </Button>
//                             ) : (
//                                 <Button
//                                     onClick={() =>
//                                         company?.zoho_tokens?.token
//                                             ? ZohoOrgModal.openModal()
//                                             : handleZohoConnect()
//                                     }
//                                 >
//                                     Connect
//                                 </Button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//                 {/* {!auto_login && (
//                     <div className="p-4 border rounded-3xl">
//                         <div className="flex w-full p-5 sm:px-8 justify-between">
//                             <div>
//                                 <img
//                                     alt="zoho Icon"
//                                     className=" w-38 h-12 object-contain"
//                                     src="https://www.peko.one/assets/logo_2-f4WSVIa5.png"
//                                 />
//                             </div>
//                             {/* <div
//                             style={{
//                                 width: '53.5%',
//                                 display: 'flex',
//                                 alignItems: 'start',
//                                 fontSize: '20px',
//                                 flexDirection: 'column',
//                                 justifyContent: 'center',
//                             }}
//                         >
//                             <div className="font-semibold text-lg">Zoho books</div>
//                             <div className="text-sm mt-1">
//                                 Authenticate your zoho account with us.
//                             </div>
//                         </div> */}
//                             <div
//                                 style={{
//                                     display: 'flex',
//                                     justifyContent: 'center',
//                                     alignItems: 'center',
//                                 }}
//                             >
//                                 <Button>Connect</Button>
//                             </div>
//                         </div>
//                     </div>
//                 )} */}
//             </div>
//             {isOpen ? (
//                 <WafeqModal
//                     isOpen={isOpen}
//                     selectedData={selectedData}
//                     onOpenChange={onOpenChange}
//                 />
//             ) : null}
//             {disconnectWafeqModal.isOpen ? (
//                 <DeleteConfirmModal
//                     _id={company?._id || ''}
//                     body="Do you want to disconnect this software ?"
//                     invalidationKey="softwares"
//                     isOpen={disconnectWafeqModal.isOpen}
//                     mutationFn={selectedData === 'wafeq' ? disconnectWafeq : disconnectZoho}
//                     title="Disconnect Software"
//                     onClose={disconnectWafeqModal.closeModal}
//                 />
//             ) : null}
//             {ZohoOrgModal.isOpen ? (
//                 <ZohoOrg isOpen={ZohoOrgModal.isOpen} onOpenChange={ZohoOrgModal.closeModal} />
//             ) : null}
//         </>
//     );
// }

// export default Softwares;
