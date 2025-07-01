// import { useEffect, useState } from 'react';

// import { useLocation } from 'react-router-dom';

// import { useAppSelector } from '@hooks/store';

// import Alerts from '../components/Alerts';
// import MyPasswords from '../components/MyPasswords';
// import MyPlans from '../components/MyPlans';
// import Profile from '../components/profile/Profile';
// import Referral from '../components/Referral';
// import Sidebar from '../components/Sidebar';
// import Softwares from '../components/Softwares';
// import Supports from '../components/Support';

// function Settings() {
//     document.title = 'Settings | GoZupees';
//     const { role } = useAppSelector(state => state.auth);
//     const location = useLocation();
//     const [activeTab, setActiveTab] = useState('myProfile');

//     useEffect(() => {
//         if (role === 'customer') {
//             const currentPath = location.pathname.split('/').slice(1).join('/');
//             switch (currentPath) {
//                 case 'settings/profile':
//                     setActiveTab('myProfile');
//                     break;
//                 case 'settings/my-passwords':
//                     setActiveTab('myPassword');
//                     break;
//                 case 'settings/my-plans':
//                     setActiveTab('myPlans');
//                     break;
//                 case 'settings/softwares':
//                     setActiveTab('software');
//                     break;
//                 case 'settings/support':
//                     setActiveTab('support');
//                     break;
//                 case 'settings/alerts':
//                     setActiveTab('alerts');
//                     break;
//                 case 'settings/referral':
//                     setActiveTab('referral');
//                     break;
//                 default:
//                     setActiveTab('myProfile');
//                     break;
//             }
//         }
//     }, [location.pathname, role]);

//     const renderContent = () => {
//         switch (activeTab) {
//             case 'myProfile':
//                 return <Profile />;
//             case 'myPassword':
//                 return <MyPasswords />;
//             case 'myPlans':
//                 return <MyPlans />;
//             case 'software':
//                 return <Softwares />;
//             case 'support':
//                 return <Supports />;
//             case 'alerts':
//                 return <Alerts />;
//             case 'referral':
//                 return <Referral />;
//             default:
//                 return <Profile />;
//         }
//     };

//     return (
//         <div className="h-full flex flex-col sm:w-full">
//             <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
//             <div className="py-4 ">{renderContent()}</div>
//         </div>
//     );
// }

// export default Settings;
