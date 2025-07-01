import { useDisclosure } from '@nextui-org/react';


import Expenses from '../components/Expenses';
// import RemindersSection from '../components/RemindersSection';
import Revenue from '../components/Revenue';
import Stats from '../components/Stats';
import TasksSection from '../components/TasksSection';

export default function Dashboard() {
    document.title = 'GoZupees';
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_max(33%,330px)] grid-rows-none gap-6">
                <div className="col-span-1 row-span-1 order-3 md:order-none h-40">
                    <Stats />
                </div>
                <div className="col-span-1 row-span-3 order-6 md:order-none">
                    <TasksSection />
                </div>
                <div className="col-span-1 row-span-2 order-4 md:order-none">
                    <Expenses />
                </div>
                <div className="col-span-1 row-span-2 order-5 md:order-none">
                    <Revenue />
                </div>
                {/* <div className="col-span-1 row-span-2 order-7 md:order-none">
                    <RemindersSection />
                </div> */}
            </div>
    );
}
