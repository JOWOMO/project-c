import { createDecorator } from 'vue-class-component';

export const Meta = createDecorator((options: any, key: string) => {
    if (!options?.methods) return;
    options['metaInfo'] = options.methods[key];
});
