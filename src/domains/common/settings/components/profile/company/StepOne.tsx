import { useFormikContext } from 'formik';

import CurrencyPicker from '@components/atomic/CurrencyPicker';
import Input from '@components/atomic/Input';
import MobilenumberInput from '@components/atomic/MobilenumberInput';
import SelectInputWithSearch from '@components/atomic/SelectInputWithSearch';
import Textarea from '@components/atomic/Textarea';
import { countryData } from '@src/constants/country';

const languageOptions = [
    { label: 'English', value: 'English' },
    { label: 'Arabic', value: 'Arabic' },
];

type Props = {};

function StepOne(props: Props) {
    const { values }: any = useFormikContext();
    return (
        <>
            <div className="flex flex-row">
                <div className="w-full">
                    <Input
                        isRequired
                        label="Company name"
                        name="name"
                        placeholder="Enter company name"
                    />
                </div>
            </div>
            <div className="flex flex-row mb-3 gap-4">
                <div className="w-full md:w-6/12 mt-3">
                    <CurrencyPicker
                        isRequired
                        defaultInputValue={values?.currency || ''}
                        label="Currency"
                        name="currency"
                        placeholder="Select Currency"
                    />
                </div>
                <div className="w-full md:w-6/12 mt-3">
                    <SelectInputWithSearch
                        isRequired
                        defaultInputValue={values?.language || ''}
                        label="Language"
                        name="language"
                        options={languageOptions}
                        placeholder="Select Language"
                    />
                </div>
            </div>
            <div className="flex flex-row mb-3">
                <div className="w-full">
                    <Textarea
                        isRequired
                        label="Address"
                        name="address"
                        placeholder="Enter address"
                    />
                </div>
            </div>
            <div className="flex flex-row mb-3 gap-4">
                <div className="w-full md:w-6/12">
                    {/* <Input name="country" label="Country" /> */}
                    <SelectInputWithSearch
                        isRequired
                        defaultInputValue={values?.country || ''}
                        label="Country"
                        name="country"
                        options={countryData}
                        placeholder="Select country"
                    />
                </div>

                <div className="w-full md:w-6/12">
                    <Input isRequired label="State" name="state" placeholder="Enter state" />
                </div>
            </div>
            <div className="flex flex-row mb-3 gap-4">
                <div className="w-full md:w-6/12">
                    <Input isRequired label="City" name="city" placeholder="Enter city" />
                </div>
                <div className="w-full md:w-6/12">
                    <Input
                        isRequired
                        label="ZIP code"
                        name="zip_code"
                        placeholder="Enter ZIP code"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                <MobilenumberInput
                    isRequired
                    label="Mobile Number"
                    nameCode="country_code"
                    nameMobile="mobile"
                />
                <Input isRequired label="Email" name="email" placeholder="Enter email" />
            </div>
        </>
    );
}

export default StepOne;
