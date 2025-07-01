// import { parseDate } from '@internationalized/date';
// import { DateValue, Divider } from '@nextui-org/react';
// import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
// import { format } from 'date-fns';
// import { Form, Formik } from 'formik';
// import { toast } from 'sonner';

// import Button from '@components/atomic/Button';
// import { setDefaultCompany } from '@domains/user/dashboard/api/company';
// import { setIsCompanyAdded } from '@src/domains/auth/slices/auth';
// import { useAppDispatch, useAppSelector } from '@src/hooks/store';

// import { addCompany, getCompany, getTempCompany, updateCompany } from '../../../api/company';
// import { AddCompanySchema, EditCompanySchema } from '../../../schema/company';

// import StepOne from './StepOne';
// import StepTwo from './StepTwo';

// type CompanyInfoBodyProps = {
//     mode: 'edit' | 'create';
//     activeTab: 'stepOne' | 'stepTwo';
//     setActiveTab: (activeTab: 'stepOne' | 'stepTwo') => void;
//     toggle: () => void;
// };

// function CompanyInfoBody({ mode, activeTab, setActiveTab, toggle }: CompanyInfoBodyProps) {
//     const dispatch = useAppDispatch();
//     const company = useAppSelector(state => state.company);
//     const { is_company_added } = useAppSelector(state => state.auth);
//     const queryClient = useQueryClient();

//     const { mutate: defaultCompanyMutate, isPending: isPendingSetDefault } = useMutation({
//         mutationKey: ['setDefaultCompany'],

//         mutationFn: setDefaultCompany,
//         onSuccess: responseData => {
//             // if (companyId) setSearchParams({ company: responseData._id }, { replace: true });
//             queryClient.invalidateQueries({ queryKey: ['getAllCompanies'] });
//             queryClient.invalidateQueries({ queryKey: ['getCompany'] });
//             toast.success(`Switched to ${responseData?.name}`);
//         },
//     });

//     const { mutate, isPending } = useMutation({
//         mutationFn: addCompany,
//         onSuccess: res => {
//             dispatch(setIsCompanyAdded(true));
//             queryClient.invalidateQueries({ queryKey: ['getCompany'] });
//             queryClient.invalidateQueries({ queryKey: ['getExpiry'] });
//             queryClient.invalidateQueries({ queryKey: ['getAllCompanies'] });
//             // dispatch(setCompany(res?.company));
//             toast.success('Company details added successfully');
//             setActiveTab('stepOne');
//             toggle();
//             defaultCompanyMutate(res?.company._id);
//         },
//         onError: (error: any) => {
//             const message = error?.response?.data?.message || 'Something went wrong';
//             toast.error(message);
//         },
//     });

//     const { mutate: mutateUpdateCompany, isPending: isPendingUpdateCompany } = useMutation({
//         mutationFn: updateCompany,
//         onSuccess: res => {
//             queryClient.invalidateQueries({
//                 queryKey: ['getCompany'],
//             });
//             queryClient.invalidateQueries({ queryKey: ['getAllCompanies'] });
//             toast.success('Company details updated successfully');
//             setActiveTab('stepOne');
//             // dispatch(setCompany(res?.company));
//             toggle();
//         },
//         onError: (error: any) => {
//             const message = error?.response?.data?.message || 'Something went wrong';
//             toast.error(message);
//         },
//     });

//     const { data: tempCompany, isPending: isPendingTempGetCompany } = useQuery({
//         queryKey: ['getTempCompany'],
//         queryFn: getTempCompany,
//         refetchOnMount: true,
//         enabled: !is_company_added,
//     });

//     const { data, isPending: isPendingGetCompany } = useQuery({
//         queryKey: ['getCompany', company?._id],
//         queryFn: getCompany,
//         enabled: is_company_added,
//         retry: 1,
//     });

//     let companyData;
//     if (data?.company) {
//         companyData = {
//             ...data?.company,
//             financial_start_date: parseDate(
//                 format(new Date(data?.company?.financial_start_date), 'yyyy-MM-dd')
//             ),
//             license_expiry: null,
//             license_issue_date: null,
//             license: [],
//         };
//     }

//     const companyInitialValues = {
//         name: tempCompany?.company?.name || '',
//         currency: tempCompany?.company?.currency || 'AED',
//         language: tempCompany?.company?.language || '',
//         address: tempCompany?.company?.address || '',
//         city: tempCompany?.company?.city || '',
//         state: '',
//         zip_code: tempCompany?.company?.zip_code || '',
//         country: '',
//         country_code: tempCompany?.company?.country_code || '+971',
//         mobile: tempCompany?.company?.mobile || '',
//         email: tempCompany?.company?.email || '',
//         purpose: '',
//         current_method: '',
//         size: tempCompany?.company?.size || '',
//         business_years: '',
//         user_role: tempCompany?.company?.user_role || '',
//         sector: '',
//         financial_start_date: null,
//         license_expiry: null,
//         license_issue_date: null,
//         license: [],
//         tax_number: '',
//         license_number: '',
//         license_authority: '',
//         trn: '',
//     };

//     const initialValues =
//         mode === 'edit' ? companyData || companyInitialValues : companyInitialValues;
//     const validationSchema = mode === 'edit' ? EditCompanySchema : AddCompanySchema;

//     return (
//         <Formik
//             enableReinitialize={!!tempCompany?.company?._id || mode === 'edit'}
//             initialValues={initialValues}
//             validationSchema={validationSchema[activeTab]}
//             onSubmit={(values, actions) => {
//                 if (activeTab === 'stepOne') {
//                     actions.setTouched({});
//                     setActiveTab('stepTwo');
//                     return;
//                 }

//                 if (mode === 'edit') {
//                     const payload = {
//                         ...values,
//                         financial_start_date: (
//                             values.financial_start_date as unknown as DateValue
//                         )?.toString(),
//                     };
//                     mutateUpdateCompany(payload);
//                 } else {
//                     const payload = {
//                         ...values,
//                         financial_start_date: (
//                             values.financial_start_date as unknown as DateValue
//                         )?.toString(),
//                         license_expiry: (values.license_expiry as unknown as DateValue)?.toString(),
//                         license_issue_date: (
//                             values.license_issue_date as unknown as DateValue
//                         )?.toString(),
//                         license: values.license ? values.license : [],
//                     };
//                     mutate(payload);
//                 }
//             }}
//         >
//             {({ errors, touched, values }) => (
//                 <Form>
//                     {activeTab === 'stepOne' ? <StepOne /> : <StepTwo mode={mode} />}
//                     <Divider className="w-full mt-5 h-[.5px]" />
//                     <div className="mt-4 flex justify-end items-center">
//                         <div className="flex gap-2">
//                             <Button
//                                 className={activeTab === 'stepOne' ? 'hidden' : ''}
//                                 color="white"
//                                 isDisabled={activeTab === 'stepOne'}
//                                 size="lg"
//                                 type="button"
//                                 onClick={() => setActiveTab('stepOne')}
//                             >
//                                 Previous
//                             </Button>
//                             <Button
//                                 color="primary"
//                                 isLoading={isPending || isPendingUpdateCompany}
//                                 type="submit"
//                             >
//                                 {activeTab === 'stepOne' ? 'Next' : 'Save'}
//                             </Button>
//                         </div>
//                     </div>
//                 </Form>
//             )}
//         </Formik>
//     );
// }

// export default CompanyInfoBody;
