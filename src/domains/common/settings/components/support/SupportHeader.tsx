import Call from '@assets/icons/support_call.svg?react';
import Chat from '@assets/icons/support_chat.svg?react';
import Mail from '@assets/icons/support_mail.svg?react';

function SupportHeader() {
    return (
        <div className="border flex justify-around sm:px-20 sm:gap-20 p-5 rounded-3xl mb-4">
            <div className="flex flex-col gap-1 items-center">
                <Call height={40} width={40} />
                <h5>Toll Free</h5>
                <p className="text-[rgb(0,148,255)]">
                    <a href="tel:+89556322566">89556322566</a>{' '}
                </p>
            </div>
            <div className="flex flex-col gap-1 items-center">
                <Mail height={40} width={40} />
                <h5>Write us on</h5>
                <p className="text-[rgb(0,148,255)]">
                    <a href="mailto:help@GoZupees.me">help@GoZupees.me</a>{' '}
                </p>
            </div>
            <div className="flex flex-col gap-1 items-center">
                <Chat height={40} width={40} />
                <h5>Chat us on</h5>
                <p className="text-[rgb(0,148,255)]">WhatsApp</p>
            </div>
        </div>
    );
}

export default SupportHeader;
