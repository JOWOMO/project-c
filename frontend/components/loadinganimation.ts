import { createDecorator } from 'vue-class-component';
import Vue, { ComponentOptions } from 'vue';

export const LoadingAnimation = createDecorator((options: ComponentOptions<Vue>, key) => {
    // Keep the original method for later.
    const originalMethod = options.methods![key];

    // Wrap the method with the logging logic.
    options.methods![key] = function wrapperMethod(...args) {
        this.$nextTick(async () => {
            try {
                // console.debug('starting animation');
                this.$nuxt.$loading.start();

                // await new Promise((resolve) => setTimeout(() => resolve(), 2000));
                await originalMethod.apply(this, args);
            } finally {
                // console.debug('stopping animation');
                this.$nuxt.$loading.finish();
            }
        });
    }
});
