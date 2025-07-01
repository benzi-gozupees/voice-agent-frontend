// import axios from 'axios';
// import { toast } from 'sonner';

// import { broadcastLogoutEvent } from '@layouts/components/PersistState';
// import { SERVER_URL } from '@src/config-global';
// import { setLogout } from '@src/domains/auth/slices/auth';
// import paths from '@src/routes/paths';
// import { store } from '@store/store';

// const handleLogout = async () => {
//     const { token} = store.getState().auth;

//     await axios
//         .post(
//             `${SERVER_URL}/user/auth/${paths.authPaths.jwt.logout}`,
//             {},
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'X-Token': token,
//                 },
//             }
//         )
//         .catch(error => {
//             const message = error?.response?.data?.message || 'Something went wrong';
//             toast.error(message);
//         });
//     broadcastLogoutEvent();
//     store.dispatch(setLogout());
//     window.location.href = '/login';
// };

// export default handleLogout;
