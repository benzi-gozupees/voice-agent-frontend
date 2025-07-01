// import { useState } from 'react';

// import { Tab, Tabs } from '@nextui-org/react';
// import { ReactSVG } from 'react-svg';

// import card from '@assets/icons/card.svg';
// import tick from '@assets/icons/tick-circle.svg';
// import Modal, { ModalBody, ModalContent, ModalHeader } from '@components/atomic/Modal';

// import CompanyInfoBody from './CompanyInfoBody';

// type AddCompanyModalProps = {
//     isOpen: boolean;
//     onClose: () => void;
// };

// function AddCompanyModal({ isOpen, onClose }: AddCompanyModalProps) {
//     const [activeTab, setActiveTab] = useState<'stepOne' | 'stepTwo'>('stepOne');

//     return (
//         <Modal
//             isDismissable
//             classNames={{
//                 closeButton: 'z-10',
//             }}
//             isOpen={isOpen}
//             scrollBehavior="outside"
//             size="3xl"
//             onOpenChange={onClose}
//         >
//             <ModalContent>
//                 <>
//                     <ModalHeader className="relative flex flex-col items-center justify-center pt-4">
//                         <div className="text-center text-xl w-full font-semibold">
//                             Company Details
//                         </div>
//                         <div className="font-normal text-sm text-center w-full mt-2">
//                             Add your company details
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
//                             mode="create"
//                             setActiveTab={setActiveTab}
//                             toggle={onClose}
//                         />
//                     </ModalBody>
//                 </>
//             </ModalContent>
//         </Modal>
//     );
// }

// export default AddCompanyModal;
