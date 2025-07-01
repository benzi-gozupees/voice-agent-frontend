// /* eslint-disable no-plusplus */
// import { useRef, useState } from 'react';

// import { Field, FieldProps } from 'formik';
// import { ReactSVG } from 'react-svg';
// import Webcam from 'react-webcam';

// import CameraIcon from '@assets/icons/camera_icon.svg?react';
// import cross from '@assets/icons/cross.svg';

// interface CaptureImageProps {
//     name: string;
// }

// function CaptureImage({ name }: CaptureImageProps) {
//     const [imageSrc, setImageSrc] = useState<string | null>(null);
//     const [showCamera, setShowCamera] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const webcamRef = useRef<Webcam>(null); // Using a ref to access the webcam
//     const videoConstraints = {
//         width: 1280,
//         height: 720,
//         facingMode: 'user',
//     };

//     const handleCapture = (setFieldValue: (field: string, value: any) => void) => {
//         if (webcamRef.current) {
//             const capturedImage = webcamRef.current.getScreenshot();
//             if (capturedImage) {
//                 setImageSrc(capturedImage);

//                 // Convert the base64 image to a file and set it in Formik's field
//                 const file = dataURLToFile(capturedImage, 'captured-image.jpg');
//                 setFieldValue(name, [file]);
//                 setShowCamera(false);
//             }
//         }
//     };

//     const dataURLToFile = (dataUrl: string, filename: string) => {
//         const arr = dataUrl.split(',');
//         const mime = arr[0].match(/:(.*?);/)?.[1] || '';
//         const bstr = atob(arr[1]);
//         const u8arr = new Uint8Array(bstr.length);
//         for (let i = 0; i < bstr.length; i++) {
//             u8arr[i] = bstr.charCodeAt(i);
//         }
//         return new File([u8arr], filename, { type: mime });
//     };

//     return (
//         <Field name={name}>
//             {({ form: { setFieldValue } }: FieldProps) => (
//                 <div className="border rounded-2xl p-5">
//                     <div className="flex flex-col custom-dashed gap-5 justify-center items-center p-10 h-full">
//                         {!showCamera ? (
//                             <button
//                                 className="bg-transparent border-none cursor-pointer flex flex-col items-center"
//                                 type="button"
//                                 onClick={() => setShowCamera(true)}
//                             >
//                                 <CameraIcon height={35} width={35} />
//                                 <div>Take a picture</div>
//                             </button>
//                         ) : (
//                             <div className="relative flex flex-col justify-center items-center gap-2">
//                                 <Webcam
//                                     ref={webcamRef} // Set the ref here
//                                     audio={false}
//                                     height="100%"
//                                     screenshotFormat="image/jpeg"
//                                     videoConstraints={videoConstraints}
//                                     width="100%"
//                                     onUserMedia={() => setLoading(false)}
//                                     onUserMediaError={() => setShowCamera(false)}
//                                 />
//                                 {!loading && (
//                                     <>
//                                         <button
//                                             className="bg-transparent border-none cursor-pointer mt-4"
//                                             type="button"
//                                             onClick={() => handleCapture(setFieldValue)}
//                                         >
//                                             <CameraIcon height={25} width={25} />
//                                         </button>
//                                         <button
//                                             className="absolute top-0 right-0"
//                                             type="button"
//                                             onClick={() => setShowCamera(false)}
//                                         >
//                                             <ReactSVG className="text-white" src={cross} />
//                                         </button>
//                                     </>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </Field>
//     );
// }

// export default CaptureImage;
