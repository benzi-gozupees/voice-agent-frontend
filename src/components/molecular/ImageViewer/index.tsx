/* eslint-disable jsx-a11y/no-static-element-interactions */
import { CSSProperties, useCallback, useEffect, useState } from 'react';

import styles from './styles.module.css';

interface IProps {
    src: string[];
    currentIndex?: number;
    backgroundStyle?: CSSProperties;
    imageStyle?: CSSProperties;
    disableScroll?: boolean;
    closeOnClickOutside?: boolean;
    onClose?: () => void;
    closeComponent?: JSX.Element;
    leftArrowComponent?: JSX.Element;
    rightArrowComponent?: JSX.Element;
}

function ImageViewer(props: IProps) {
    const {
        src,
        currentIndex: currentIdx,
        backgroundStyle,
        disableScroll,
        closeOnClickOutside = true,
        onClose,
        closeComponent,
        leftArrowComponent,
        rightArrowComponent,
        imageStyle,
    } = props;

    const [currentIndex, setCurrentIndex] = useState(currentIdx ?? 0);

    const changeImage = useCallback(
        (delta: number) => {
            let nextIndex = (currentIndex + delta) % src.length;
            if (nextIndex < 0) nextIndex = src.length - 1;
            setCurrentIndex(nextIndex);
        },
        [currentIndex, src.length]
    );

    const handleClick = useCallback(
        (event: any) => {
            if (!event.target || !closeOnClickOutside) {
                return;
            }

            const checkId = event.target.id === 'ReactSimpleImageViewer';
            const checkClass = event.target.classList.contains('react-simple-image-viewer__slide');

            if (checkId || checkClass) {
                event.stopPropagation();
                onClose?.();
            }
        },
        [onClose]
    );

    const handleKeyDown = useCallback(
        (event: any) => {
            if (event.key === 'Escape') {
                onClose?.();
            }

            if (['ArrowLeft', 'h'].includes(event.key)) {
                changeImage(-1);
            }

            if (['ArrowRight', 'l'].includes(event.key)) {
                changeImage(1);
            }
        },
        [onClose, changeImage]
    );

    const handleWheel = useCallback(
        (event: any) => {
            if (event.wheelDeltaY > 0) {
                changeImage(-1);
            } else {
                changeImage(1);
            }
        },
        [changeImage]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        if (!disableScroll) {
            document.addEventListener('wheel', handleWheel);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);

            if (!disableScroll) {
                document.removeEventListener('wheel', handleWheel);
            }
        };
    }, [handleKeyDown, handleWheel]);

    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => {
            document.body.style.overflowY = 'auto';
        };
    }, []);

    return (
        <div
            className={`${styles.wrapper} react-simple-image-viewer__modal backdrop-blur-lg backdrop-brightness-50`}
            id="ReactSimpleImageViewer"
            style={backgroundStyle}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <button
                className={`${styles.close} react-simple-image-viewer__close text-default-700`}
                type="button"
                onClick={() => onClose?.()}
            >
                {closeComponent || '×'}
            </button>

            {/* {src.length > 1 && (
                <span
                    className={`${styles.navigation} ${styles.prev} react-simple-image-viewer__previous`}
                    onClick={() => changeImage(-1)}
                >
                    {leftArrowComponent || '❮'}
                </span>
            )}

            {src.length > 1 && (
                <span
                    className={`${styles.navigation} ${styles.next} react-simple-image-viewer__next`}
                    onClick={() => changeImage(1)}
                >
                    {rightArrowComponent || '❯'}
                </span>
            )} */}

            <div
                className={`${styles.content} react-simple-image-viewer__modal-content`}
                onClick={handleClick}
                onKeyUp={e => {
                    if (e.key === 'Escape') {
                        onClose?.();
                    }
                }}
            >
                <div
                    className={`${styles.slide} react-simple-image-viewer__slide animate-appearance-in`}
                >
                    <img
                        alt=""
                        className={styles.image}
                        src={src[currentIndex]}
                        style={imageStyle}
                    />
                </div>
            </div>
        </div>
    );
}

export default ImageViewer;
