import { useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';

import crossIcon from '@assets/icons/left_arrow.svg';

function BackButton() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <button
            className="flex gap-1 text-base font-semibold cursor-pointer"
            type="button"
            onClick={handleBackClick}
        >
            <ReactSVG className="" src={crossIcon} /> Back
        </button>
    );
}

export default BackButton;
