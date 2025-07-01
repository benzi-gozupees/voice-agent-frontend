/* eslint-disable import/no-extraneous-dependencies */

import { useMutation } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import Button from '@components/atomic/Button';
import Checkbox from '@components/atomic/Checkbox';
import Input from '@components/atomic/Input';
import PasswordInput from '@components/atomic/PasswordInput';

import { register } from '../../api/authApi';
import { registerSchema } from '../../schema';

type Props = {};

function RegisterForm(props: Props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const planId = searchParams.get('plan');
    const partnerId = searchParams.get('partner');
    const referalCode = searchParams.get('referral_code');

    // const [search, setSearch] = useState('');
    // const [partners, setPartners] = useState([]);

    const { mutate, isPending } = useMutation({
        mutationFn: register,
        onSuccess: data => {
            if (data?.session.url) {
                toast.success('Redirecting to payment page...');
                window.location.href = data.session.url;
            } else {
                toast.success('Register successfully, Verify your email');
                navigate('/login');
            }
        },
        onError: (err: any) => {
            const message = err?.response?.data?.message || 'Something went wrong';
            toast.error(message);
        },
    });

    // const { data, refetch, isRefetching, isLoading } = useQuery({
    //     queryKey: ['allPartners', { search }],
    //     queryFn: () => allPartners({ page: 1, limit: 5, search }),
    // });

    // useEffect(() => {
    //     if (search) {
    //         refetch(); // Refetch data when the search term changes
    //     }
    // }, [search, refetch]);

    // useEffect(() => {
    //     if (data?.users) {
    //         const partner: any = [];
    //         data?.users?.map((user: any) => partner.push({ label: user.name, value: user._id }));
    //         setPartners(partner);
    //     }
    // }, [data?.users]);

    return (
        <Formik
            enableReinitialize
            initialValues={{
                name: '',
                email: '',
                password: '',
                role: '',
                confirm_password: '',
                partner: partnerId || '',
                terms: false,
                referral_code: referalCode || '',
            }}
            validationSchema={registerSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(false);
                const payload = {
                    name: values.name,
                    email: values.email,
                    password: values.password,
                    role: values.role,
                    partner: values.partner || '',
                    subscription: planId,
                    referral_code: values.referral_code,
                };
                mutate(payload);
            }}
        >
            {({ isValid }) => (
                <Form className="custom-form mt-4 pt-2">
                    <div className="flex flex-col gap-4">
                        <Input isRequired label="Name" name="name" placeholder="Enter your name" />
                        <Input
                            isRequired
                            label="Email"
                            name="email"
                            placeholder="Enter your email"
                        />
                        <PasswordInput
                            isRequired
                            label="Password"
                            name="password"
                            placeholder="Enter your Password"
                        />
                        <PasswordInput
                            isRequired
                            label="Confirm Password"
                            name="confirm_password"
                            placeholder="Re-enter to confirm password"
                        />
                        {/* <SelectInputWithSearch
                            handleSearch={inputValue => setSearch(inputValue)}
                            isLoading={isLoading || isRefetching}
                            label="Organisation"
                            name="partner"
                            options={partners}
                            placeholder="Select an organisation"
                        /> */}
                        <Checkbox name="terms"> Agree to terms and conditions</Checkbox>
                        <Button
                            color="primary"
                            disabled={!isValid}
                            isLoading={isPending}
                            type="submit"
                        >
                            Sign up
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default RegisterForm;
