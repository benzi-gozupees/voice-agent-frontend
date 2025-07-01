// /* eslint-disable import/no-extraneous-dependencies */
// import { Spacer } from '@nextui-org/react';
// import { useFormikContext } from 'formik';

// import DatePicker from '@components/atomic/DatePicker';
// import Input from '@components/atomic/Input';
// import SelectInputWithSearch from '@components/atomic/SelectInputWithSearch';
// import { useAppSelector } from '@hooks/store';

// const bussinessYearsOptions = [
//     { label: '1-2', value: '1-2' },
//     { label: '2-5', value: '2-5' },
//     { label: '5-8', value: '5-8' },
//     { label: '8-12', value: '8-12' },
//     { label: '12-15', value: '12-15' },
//     { label: '15 and above', value: '15+' },
// ];

// const employessCountOptions = [
//     { label: '1-10', value: '1-10' },
//     { label: '11-30', value: '11-30' },
//     { label: '31-75', value: '31-75' },
//     { label: '76-100', value: '76-100' },
//     { label: '100 & Above', value: '100 & Above' },
// ];

// const userRoleOptions = [
//     { label: 'CEO', value: 'CEO' },
//     { label: 'Accountant', value: 'Accountant' },
// ];

// const currentMethodsOptions = [
//     { label: 'Pen and Paper', value: 'Pen and Paper' },
//     { label: 'Wafeq', value: 'Wafeq' },
//     { label: 'Zoho', value: 'Zoho' },
//     { label: 'Accountant', value: 'Accountant' },
// ];

// const sectorOptions = [
//     { label: 'Service', value: 'service' },
//     { label: 'Product', value: 'product' },
// ];

// function StepTwo({ mode }: { mode: string }) {
//     const { values, errors, touched }: any = useFormikContext();
//     const { is_company_added } = useAppSelector(state => state.auth);
//     return (
//         <>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
//                 <DatePicker
//                     isRequired
//                     showMonthAndYearPickers
//                     label="Financial start date"
//                     name="financial_start_date"
//                 />
//                 <SelectInputWithSearch
//                     isRequired
//                     defaultInputValue={values?.sector || ''}
//                     label="Sector"
//                     name="sector"
//                     options={sectorOptions}
//                     placeholder="Select sector"
//                 />
//             </div>

//             <Spacer y={4} />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
//                 <SelectInputWithSearch
//                     isRequired
//                     defaultInputValue={values?.business_years || ''}
//                     label="Company Years"
//                     name="business_years"
//                     options={bussinessYearsOptions}
//                     placeholder="Select years"
//                 />
//                 <SelectInputWithSearch
//                     isRequired
//                     defaultInputValue={values?.user_role || ''}
//                     label="Designation"
//                     name="user_role"
//                     options={userRoleOptions}
//                     placeholder="Select designation"
//                 />
//             </div>

//             <Spacer y={4} />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
//                 <SelectInputWithSearch
//                     isRequired
//                     defaultInputValue={values?.size || ''}
//                     label="Employee count"
//                     name="size"
//                     options={employessCountOptions}
//                     placeholder="Select employee count"
//                 />
//                 <SelectInputWithSearch
//                     isRequired
//                     defaultInputValue={values?.current_method || ''}
//                     label="Current accounting Method"
//                     name="current_method"
//                     options={currentMethodsOptions}
//                     placeholder="Select accounting method"
//                 />
//             </div>

//             <Spacer y={4} />

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
//                 <Input isRequired label="Activity" name="purpose" placeholder="Enter activity" />
//                 <Input
//                     isRequired
//                     label="Corporate Tax ID"
//                     name="tax_number"
//                     placeholder="Enter tax number"
//                 />
//             </div>

//             <Spacer y={4} />

//             {mode !== 'edit' ? (
//                 <>
//                     <div className="flex flex-row mb-3 gap-4">
//                         <div className="sm:w-full md:w-6/12">
//                             <Input
//                                 isRequired
//                                 label="License Number"
//                                 name="license_number"
//                                 placeholder="Enter license number"
//                             />
//                         </div>
//                         <div className="sm:w-full md:w-6/12">
//                             <Input
//                                 isRequired
//                                 label="Licensing Authority"
//                                 name="license_authority"
//                                 placeholder="Enter licensing authority"
//                             />
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
//                         <Input
//                             isRequired
//                             accept=".pdf, .jpg, .jpeg, .png"
//                             label="License"
//                             name="license"
//                             type="file"
//                         />
//                         <DatePicker
//                             disableFutureDates
//                             isRequired
//                             showMonthAndYearPickers
//                             label="License Issued Date"
//                             name="license_issue_date"
//                         />
//                     </div>
//                     <Spacer y={3} />
//                 </>
//             ) : null}
//             <div className="flex flex-row mb-3 gap-4">
//                 {mode !== 'edit' ? (
//                     <div className="sm:w-full md:w-6/12">
//                         <DatePicker
//                             disablePastDates
//                             isRequired
//                             showMonthAndYearPickers
//                             label="License Expiry Date"
//                             name="license_expiry"
//                         />
//                     </div>
//                 ) : null}
//                 <div className="sm:w-full md:w-6/12">
//                     <Input isRequired label="TRN" name="trn" placeholder="Enter TRN" />
//                 </div>
//             </div>
//         </>
//     );
// }

// export default StepTwo;
