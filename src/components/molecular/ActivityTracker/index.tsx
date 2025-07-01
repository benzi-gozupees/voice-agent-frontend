// import { ReactNode, useEffect, useRef, useState } from 'react';

// import { useMutation } from '@tanstack/react-query';
// // import { useIdleTimer } from 'react-idle-timer';

// import { addTracking } from '@src/api';

// type ActivityTrackerProps = {
//     children: ReactNode;
// };

// export default function ActivityTracker({ children }: ActivityTrackerProps) {
//     const [startTime, setStartTime] = useState<Date>(new Date());
//     const [lastActiveTime, setLastActiveTime] = useState<number>(0);

//     // const handleScreenshot = () => {
//     //     html2canvas(captureRef.current).then(canvas => {
//     //         const image = canvas.toDataURL('image/png');
//     //         const link = document.createElement('a');
//     //         link.href = image;
//     //         link.download = 'full_window_screenshot.png';
//     //         link.click();
//     //     });
//     // };

//     const sendIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
//     const captureRef = useRef(null);

//     const { mutate } = useMutation({
//         mutationFn: addTracking,
//     });

//     const { getActiveTime, getTabId } = useIdleTimer({ crossTab: true });

//     const sendTracking = () => {
//         const activeTime = getActiveTime();
//         setLastActiveTime(activeTime);
//         const tabId = getTabId();

//         const endTime = new Date();
//         const payload = {
//             start_time: startTime,
//             end_time: endTime,
//             active_time: activeTime - lastActiveTime,
//             tab_id: tabId,
//         };

//         mutate(payload);
//         setStartTime(endTime);
//     };

//     useEffect(() => {
//         sendIntervalRef.current = setInterval(sendTracking, 5 * 60 * 1000);
//         window.addEventListener('beforeunload', sendTracking);
//         return () => {
//             clearInterval(sendIntervalRef.current as NodeJS.Timeout);
//         };
//     });

//     return (
//         <div ref={captureRef} className="activity-tracker">
//             {children}
//         </div>
//     );
// }
