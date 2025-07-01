import { useEffect, useMemo, useState } from 'react';

import { DropdownSection, DropdownTrigger, Image, Spinner } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import AddCircle from '@assets/icons/add-circle.svg?react';
import ArrowDown from '@assets/icons/arrow_down.svg?react';
import CompanyDefault from '@assets/icons/company-default.svg?react';
import LogoutIcon from '@assets/icons/logout.svg?react';
import Refer from '@assets/icons/refer.svg?react';
import SettingsIcon from '@assets/icons/settings.svg?react';
import Button from '@components/atomic/Button';
import Dropdown, { DropdownItem, DropdownMenu } from '@components/atomic/DropDown';
import { setCompany } from '@domains/common/slices/company';
import { getAllCompanies, setDefaultCompany } from '@domains/user/dashboard/api/company';
import { Company } from '@domains/user/dashboard/types';
import { useAppDispatch, useAppSelector } from '@hooks/store';
import useLogout from '@src/domains/auth/hooks/useLogout';
import { setOpenModal } from '@src/slices/modal';

function CompanyImage({ logo, name }: { logo?: string; name?: string }) {
    if (logo)
        return (
            <Image
                alt={name}
                className="mix-blend-multiply"
                height="20"
                radius="none"
                src={logo}
                width="20"
            />
        );
    return <CompanyDefault className="text-default-500" height="20" width="20" />;
}

export default function SettingsDropdown() {
    const [isOpened, setIsOpened] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const companyId = searchParams.get('company');

    const { data, isPending, isRefetching } = useQuery({
        queryKey: ['getAllCompanies'],
        queryFn: getAllCompanies,
    });

    const company: Company | null = useMemo(() => {
        if (!data || !data.companies) return null;
        let comp = null;
        if (companyId) comp = data.companies.find(c => c._id === companyId);
        else comp = data.companies.find(c => c.is_default);
        return comp || data.companies[0];
    }, [companyId, data]);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (company) {
            dispatch(setCompany(company));
        }
    }, [company, dispatch]);

    const otherCompanies = useMemo(() => {
        if (!data || !data.companies) return [];
        return data.companies.filter(c => c._id !== company?._id);
    }, [data, company]);

    const queryClient = useQueryClient();
    const { mutate, isPending: isPendingSetDefault } = useMutation({
        mutationKey: ['setDefaultCompany'],
        mutationFn: setDefaultCompany,
        onSuccess: responseData => {
            if (companyId) setSearchParams({ company: responseData._id }, { replace: true });
            queryClient.invalidateQueries({ queryKey: ['getAllCompanies'] });
            // queryClient.invalidateQueries({ queryKey: ['getCompany'] });
            toast.success(`Switched to ${responseData?.name}`);
        },
    });

    const { handleLogout } = useLogout();
    const navigate = useNavigate();
    return (
        <Dropdown onOpenChange={setIsOpened}>
            <DropdownTrigger>
                <Button
                    className="rounded-xl bg-default-100 min-w-0"
                    color="default"
                    endContent={
                        <ArrowDown
                            className={`ml-1 transition-transform ${isOpened ? 'rotate-180' : ''}`}
                            height={12}
                            width={12}
                        />
                    }
                >
                    <div className="flex items-center md:gap-3">
                        {isPendingSetDefault || isPending || isRefetching ? (
                            <div className="">
                                <Spinner size="sm" />
                            </div>
                        ) : (
                            <CompanyImage logo={company?.logo} name={company?.name} />
                        )}
                        <span
                            className={`text-[#454545] transition-all duration-400 hidden md:grid max-w-24 ${isPendingSetDefault || isPending || isRefetching ? 'grid-cols-[0fr]' : 'grid-cols-[1fr]'}`}
                        >
                            <span className="overflow-hidden col-span-1 truncate text-secondary">
                                {company?.name}
                            </span>
                        </span>
                    </div>
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Actions" className="w-[200px]" color="default">
                <DropdownSection
                    classNames={{
                        heading: 'ms-2',
                    }}
                    title="My Companies"
                >
                    {
                        otherCompanies.map(it => (
                            <DropdownItem
                                key={it._id}
                                startContent={<CompanyImage logo={it.logo} name={it.name} />}
                                title={it.name}
                                onClick={() => mutate(it._id)}
                            />
                        )) as any
                    }

                    <DropdownItem
                        key="add-company"
                        startContent={<AddCircle height={20} width={20} />}
                        title="Add Company"
                        onClick={() => dispatch(setOpenModal('add-company'))}
                    />
                </DropdownSection>
                <DropdownSection
                    classNames={{
                        heading: 'ms-2',
                        base: 'mb-0',
                    }}
                    title="Settings"
                >
                    <DropdownItem
                        key="referral"
                        startContent={<Refer height={20} width={20} />}
                        title="Refer & Earn"
                        onClick={() => navigate('/settings/referral')}
                    />
                    <DropdownItem
                        key="settings"
                        startContent={<SettingsIcon height={20} width={20} />}
                        title="Profile"
                        onClick={() => navigate('/settings/profile')}
                    />
                    <DropdownItem
                        key="logout"
                        className="text-danger data-[hover=true]:text-danger border-0"
                        startContent={<LogoutIcon height={20} width={20} />}
                        title="Logout"
                        onClick={() => handleLogout()}
                    />
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}
