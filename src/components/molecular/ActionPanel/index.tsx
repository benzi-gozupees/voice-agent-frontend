import ActionButton, { ActionButtonProps } from '@components/atomic/ActionButton';

import MoreDropdown from './MoreDropdown';

type ActionPanelProps = {
    options: (ActionButtonProps & {
        isHidden?: boolean;
        isDisabled?: boolean;
    })[];
};

export default function ActionPanel({ options }: ActionPanelProps) {
    const dropdownItems = options.slice(2);
    return (
        <div className="flex w-[120px] items-center justify-center">
            {options.slice(0, 2).map(item => (
                <ActionButton
                    key={item.type}
                    disabled={item.isDisabled}
                    hidden={item.isHidden}
                    href={item.href}
                    tooltipContent={item.tooltipContent}
                    type={item.type}
                    onClick={item.onClick}
                />
            ))}
            <MoreDropdown items={dropdownItems} />
        </div>
    );
}
