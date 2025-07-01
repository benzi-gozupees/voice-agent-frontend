import { useState } from 'react';

import Clip from '@assets/icons/copy.svg?react';

import Button from '../Button';

function CopyToClipboard({
    text,
    size,
    isButton = true,
}: {
    text: string;
    size?: 'sm' | 'md' | 'lg';
    isButton?: boolean;
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 5000);
        });
    };

    return (
        <div className="copy-to-clipboard">
            <input hidden readOnly className="form-control" type="text" value={text} />
            {isButton ? (
                <Button
                    className="text-semibold text-sm text-white"
                    color="primary"
                    size={size || 'md'}
                    startContent={<Clip height={15} width={15} />}
                    onClick={handleCopy}
                >
                    {copied ? 'Copied!' : 'Copy'}
                </Button>
            ) : (
                <button className="btn btn-primary ml-2" type="button" onClick={handleCopy}>
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            )}
        </div>
    );
}

export default CopyToClipboard;
