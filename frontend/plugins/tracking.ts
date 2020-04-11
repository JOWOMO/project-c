import { Plugin } from '@nuxt/types'

type Category = 'authentication' | 'registration' | 'teams' | 'dashboard';

declare module '@nuxt/types' {
    interface Context {
        $gtm: {
            push: (data: any) => void;
        }
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        $track(category: Category, action: string, label?: string, value?: string): void;
    }
}

const trackPlugin: Plugin = (context, inject) => {
    if (context.app.router) {
        console.log('Registering tracking plugin');

        context.app.router.afterEach((to) => {
            let name = to.name!;
            if (name.match(/___/)) {
                name = name.substring(0, name.indexOf('___'));
            }

            if (context.isDev) {
                console.debug('[Page Tracking]',
                    name,
                    to.fullPath,
                    (typeof document !== 'undefined' && document.title) || ''
                );
            }

            setTimeout(() =>
                context.$gtm.push({
                    routeName: name,
                    pageType: 'PageView',
                    pageUrl: to.fullPath,
                    pageTitle: (typeof document !== 'undefined' && document.title) || '',
                    event: 'nuxtRoute',
                }),
                250,
            );
        });
    }

    inject('track', function (category: Category, action: string, label?: string, value?: string) {
        if (context.isDev) {
            console.debug('[Event Tracking]', category, action, label, value);
        }

        context.$gtm.push({
            'event': 'GAEvent',
            'eventCategory': category,
            'eventAction': action,
            'eventLabel': label || '',
            'eventValue': value || ''
        });
    });
}

export default trackPlugin;