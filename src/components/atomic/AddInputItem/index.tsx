import { ReactSVG } from 'react-svg';

import minus from '@assets/icons/minus_circle.svg';
import Button from '@components/atomic/Button';
import Input from '@components/atomic/Input';

interface AddInvoiceItemProps {
    index: number;
    label?: string;
    item: any;
    arrayHelpers: any;
    values: any;
    name: string;
    placeholder: string;
}

const handleErrorMessage = (arrayHelpers: any, index: number, name: string) => {
    const isTouched = arrayHelpers.form.touched?.[name]?.[index];
    if (!isTouched) return '';
    const error = arrayHelpers.form.errors?.[name]?.[index];
    return error;
};

export default function AddInputItem({
    index,
    item,
    label,
    arrayHelpers,
    values,
    name,
    placeholder,
}: AddInvoiceItemProps) {
    return (
        <div className="flex items-start">
            <div className="flex-1 mb-3">
                <Input
                    errorMessage={handleErrorMessage(arrayHelpers, index, name)}
                    label={label || ''}
                    name={`${name}.${index}`}
                    placeholder={placeholder}
                    value={item}
                />
            </div>
            <Button
                isIconOnly
                className="text-danger disabled:text-default-500"
                color="text"
                disabled={values[name].length === 1}
                startContent={<ReactSVG src={minus} />}
                type="button"
                onClick={() => arrayHelpers.remove(index)}
            />
        </div>
    );
}
