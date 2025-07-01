// import { useState } from 'react';

// import { Tab, Tabs } from '@nextui-org/react';
// import { ReactSVG } from 'react-svg';

// import card from '@assets/icons/card.svg';
// import logout from '@assets/icons/logout.svg';
// import tick from '@assets/icons/tick-circle.svg';
// import Button from '@components/atomic/Button';
// import Modal, { ModalBody, ModalContent, ModalHeader } from '@components/atomic/Modal';
// import useLogout from '@src/domains/auth/hooks/useLogout';

// import CompanyInfoBody from './CompanyInfoBody';

// type CompanyInfoModalProps = {
//     isOpen: boolean;
//     toggle: () => void;
//     mode: 'edit' | 'create';
// };

// function CompanyInfoModal({ isOpen, toggle, mode }: CompanyInfoModalProps) {
//     const [activeTab, setActiveTab] = useState<'stepOne' | 'stepTwo'>('stepOne');

//     const { handleLogout } = useLogout();

//     return (
//         <Modal
//             backdrop={mode === 'create' ? 'blur' : undefined}
//             classNames={{
//                 closeButton: `${mode === 'create' ? 'hidden' : 'z-10'}`,
//             }}
//             isDismissable={mode === 'edit'}
//             isKeyboardDismissDisabled={mode === 'create'}
//             isOpen={isOpen}
//             scrollBehavior="outside"
//             size="3xl"
//             onClose={() => setActiveTab('stepOne')}
//             onOpenChange={toggle}
//         >
//             <ModalContent>
//                 <>
//                     <ModalHeader className="relative flex flex-col items-center justify-center pt-4">
//                         <div className="absolute right-5 top-5">
//                             {mode === 'create' && (
//                                 <Button
//                                     className="text-danger border-0"
//                                     color="text"
//                                     startContent={<ReactSVG height={24} src={logout} width={24} />}
//                                     onClick={() => handleLogout()}
//                                 >
//                                     Logout
//                                 </Button>
//                             )}
//                         </div>
//                         <div className="text-center text-xl w-full font-semibold">
//                             Company Details
//                         </div>
//                         <div className="font-normal text-sm text-center w-full mt-2">
//                             {mode === 'create'
//                                 ? 'Add your company details'
//                                 : 'Edit your company details'}
//                         </div>
//                         <div className="flex items-center mt-6 justify-center bg-background">
//                             <Tabs
//                                 aria-label="Company Info Tabs"
//                                 classNames={{
//                                     tabList: 'gap-10 bg-light',
//                                     cursor: 'bg-light rounded-full',
//                                     panel: `rounded-b-2xl rounded-3xl h-full transition-all rounded-tl-none`,
//                                     tab: 'p-6 min-h-[40px] bg-light rounded-full z-10',
//                                     tabContent: 'group-data-[selected=true]:text-primary',
//                                 }}
//                                 defaultSelectedKey={activeTab}
//                                 selectedKey={activeTab}
//                                 // onSelectionChange={setActiveTab as any}
//                             >
//                                 <Tab
//                                     key="stepOne"
//                                     className="cursor-default hover:text-base hover:bg-base border"
//                                     title={
//                                         <div
//                                             className={`flex ${activeTab === 'stepTwo' ? 'text-success-600' : ''} items-center gap-2 px-2`}
//                                         >
//                                             <ReactSVG src={activeTab === 'stepOne' ? card : tick} />
//                                             <span className="text-base font-semibold">Step 1</span>
//                                         </div>
//                                     }
//                                 />
//                                 <Tab
//                                     key="stepTwo"
//                                     className="cursor-default hover:text-base hover:bg-base border"
//                                     title={
//                                         <div className="flex items-center gap-2 px-2">
//                                             <ReactSVG src={card} />
//                                             <span className="text-base font-semibold">Step 2</span>
//                                         </div>
//                                     }
//                                 />
//                             </Tabs>
//                             <div className="absolute mt-20 z-0 inset-y-0 w-[2px] bg-gray-200 rotate-90" />
//                         </div>
//                     </ModalHeader>

//                     <ModalBody>
//                         <CompanyInfoBody
//                             activeTab={activeTab}
//                             mode={mode}
//                             setActiveTab={setActiveTab}
//                             toggle={toggle}
//                         />
//                     </ModalBody>
//                 </>
//             </ModalContent>
//         </Modal>
//     );
// }

// export default CompanyInfoModal;
