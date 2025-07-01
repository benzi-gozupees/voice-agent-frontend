import { Spacer, Spinner, Switch } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { toast } from 'sonner';

import { getAlerts, setAlerts } from '../api/alert';

function Alerts() {
    const queryClient = useQueryClient();

    const { data, isPending, isLoading } = useQuery({
        queryKey: ['alerts'],
        queryFn: getAlerts,
    });

    const { mutate } = useMutation({
        mutationFn: setAlerts,
        onSuccess: res => {
            queryClient.invalidateQueries({ queryKey: ['alerts'] });
            toast.success(`Alert updated successfully`);
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || 'Something went wrong';
            toast.error(message);
        },
    });

    if (isPending || isLoading)
        return (
            <div className="flex justify-center items-center h-[250px]">
                <Spinner />
            </div>
        );
    return (
        <Formik
            enableReinitialize
            initialValues={{
                license_renewal: data?.license_renewal?.status || false,
                vat_filing: data?.vat_filing?.status || false,
                cheque: data?.cheque?.status || false,
                corporate_tax_filing: data?.corporate_tax_filing?.status || false,
                weekly_reports: data?.weekly_reports?.status || false,
            }}
            onSubmit={() => {}}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    <div className="flex flex-col sm:gap-3 gap-1">
                        <div className="flex justify-between rounded-3xl py-8 px-8 border">
                            <Switch
                                defaultSelected={values?.license_renewal}
                                name="license_renewal"
                                size="sm"
                                onChange={() => {
                                    const newValue = !values.license_renewal;
                                    setFieldValue('license_renewal', newValue);
                                    mutate({ license_renewal: newValue });
                                }}
                            >
                                Alert licence renewal before 15 days
                            </Switch>
                        </div>

                        <Spacer y={1} />
                        <div className="flex justify-between rounded-3xl py-8 px-8 border">
                            <Switch
                                defaultSelected={values.vat_filing}
                                name="vat_filing"
                                size="sm"
                                onChange={() => {
                                    const newValue = !values.vat_filing;
                                    setFieldValue('vat_filing', newValue);
                                    mutate({ vat_filing: newValue });
                                }}
                            >
                                Alert VAT filings due date in 5 days
                            </Switch>
                        </div>

                        <Spacer y={1} />
                        <div className="flex justify-between rounded-3xl py-8 px-8 border">
                            <Switch
                                defaultSelected={values.cheque}
                                name="cheque"
                                size="sm"
                                onChange={() => {
                                    const newValue = !values.cheque;
                                    setFieldValue('cheque', newValue);
                                    mutate({ cheque: newValue });
                                }}
                            >
                                Alert Cheques due in 5 days
                            </Switch>
                        </div>

                        <Spacer y={1} />
                        <div className="flex justify-between rounded-3xl py-8 px-8 border">
                            <Switch
                                defaultSelected={values.corporate_tax_filing}
                                name="corporate_tax_filing"
                                size="sm"
                                onChange={() => {
                                    const newValue = !values.corporate_tax_filing;
                                    setFieldValue('corporate_tax_filing', newValue);
                                    mutate({ corporate_tax_filing: newValue });
                                }}
                            >
                                Alert Corporate Tax filing date
                            </Switch>
                        </div>

                        <Spacer y={1} />
                        <div className="flex justify-between rounded-3xl py-8 px-8 border">
                            <Switch
                                defaultSelected={values.weekly_reports}
                                name="weekly_reports"
                                size="sm"
                                onChange={() => {
                                    const newValue = !values.weekly_reports;
                                    setFieldValue('weekly_reports', newValue);
                                    mutate({ weekly_reports: newValue });
                                }}
                            >
                                Subscribe to Weekly reports
                            </Switch>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default Alerts;
