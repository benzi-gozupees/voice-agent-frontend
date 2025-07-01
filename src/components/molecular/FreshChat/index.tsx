import { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

import { useAppSelector } from '@hooks/store';

const createProxy = () =>
    new Proxy(
        {},
        {
            get:
                (_, method: string) =>
                (...args: any[]) => {},
        }
    );

const widget = (fcWidget: any, fake: any) => {
    if (fcWidget) return fcWidget;
    if (!fake) fake = createProxy();
    return fake;
};

const loadScript = () => {
    const id = 'freshchat-script';
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.src = '//in.fw-cdn.com/32172106/1158296.js';
    script.id = id;
    document.head.appendChild(script);
};
const hiddenRoutes = ['/chat'];

export default function FreshChat() {
    const [fcWidget, setFcWidget] = useState<any>(null);
    const { user } = useAppSelector(state => state.auth);
    const { pathname } = useLocation();

    useEffect(() => {
        const init = (settings: any) => {
            if (settings.onInit) {
                const tmp = settings.onInit;
                settings.onInit = () => tmp(fcWidget || widget(fcWidget, null));
            }

            const { fcWidget: fcw } = window as any;
            if (fcw) {
                setFcWidget(fcw);
                fcw.init(settings);
                if (settings.onInit) {
                    settings.onInit();
                }
            } else {
                loadScript();
                const interval = setInterval(() => {
                    const { fcWidget: fcw2 } = window as any;
                    if (fcw2) {
                        clearInterval(interval);
                        setFcWidget(fcw2);
                        fcw2.init(settings);
                        if (settings.onInit) {
                            settings.onInit();
                        }
                    }
                }, 1000);
            }
        };

        init({
            onInit: async () => {
                if (fcWidget) {
                    fcWidget.user.setEmail(user?.email);
                    fcWidget.show();
                }
            },
        });

        const handleChatOnScrollToBottom = () => {
            if (!fcWidget) return;

            const isAtBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;

            if (isAtBottom) fcWidget.hide();
            else fcWidget.show();
        };

        window.addEventListener('scroll', handleChatOnScrollToBottom);

        return () => {
            if (fcWidget) {
                fcWidget.hide();
                fcWidget.user.clear();
            }
            window.removeEventListener('scroll', handleChatOnScrollToBottom);
        };
    }, [fcWidget, user]);

    useEffect(() => {
        if (hiddenRoutes.includes(pathname)) fcWidget?.hide();
        else fcWidget?.show();
    }, [fcWidget, pathname]);

    return null;
}
