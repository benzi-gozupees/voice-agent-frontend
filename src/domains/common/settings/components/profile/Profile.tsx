import { useAppSelector } from '@hooks/store';
import useModal from '@hooks/useModal';

import BankAccount from './bankAccount/BankAccount';
import CompanyInfo from './company/CompanyInfo';
// import CompanyInfoModal from './company/CompanyInfoModal';
import MyProfile from './myProfile/MyProfile';

type Props = {};

function Profile(props: Props) {
    const { user } = useAppSelector(state => state.auth);
    const companyInfoModal = useModal();

    return (
        <div className="flex flex-col sm:flex-row gap-4 w-full">
            {user?.role === 'TENANT' && (
                <div className="sm:w-1/2">
                    <CompanyInfo toggle={companyInfoModal.openModal} />{' '}
                </div>
            )}

            <div className="sm:w-1/2 flex gap-4 flex-col">
                <MyProfile />
                {user?.role === 'TENANT' && <BankAccount />}
            </div>
        </div>
    );
}

export default Profile;
