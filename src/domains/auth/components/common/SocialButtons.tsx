import googleIcon from '@assets/icons/google-icon.svg';
import Button from '@components/atomic/Button';

type Props = {};

function SocialButtons(props: Props) {
    return (
        <div className="flex flex-col">
            <Button className="my-4" radius="full">
                <div className="flex flex-row items-center gap-2">
                    <img alt="google-icon" src={googleIcon} />
                    <h5 className="font-semibold">Sign in with Google</h5>
                </div>
            </Button>
        </div>
    );
}

export default SocialButtons;
