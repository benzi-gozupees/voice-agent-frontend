import { Tab, Tabs, TabsProps } from '@nextui-org/react';

interface CustomTabsProps extends TabsProps {
    selected: string;
    onTabChange: (key: string) => void;
    tabs: {
        title: string;
        key: string;
    }[];
}

export default function CustomTabs({ selected, onTabChange, tabs, ...props }: CustomTabsProps) {
    return (
        <Tabs
            aria-label="Options"
            {...props}
            classNames={{
                base: 'shadow-none flex',
                tabContent: 'group-data-[selected=true]:font:medium',
                cursor: 'bg-light',
                tabList: 'p-1 w-full shadow-none border',
                tab: 'px-5 font-medium text-[12px]',
            }}
            radius="md"
            selectedKey={selected}
            variant="bordered"
            onSelectionChange={onTabChange as any}
        >
            {tabs.map(tab => (
                <Tab key={tab.key} title={tab.title} />
            ))}
        </Tabs>
    );
}
