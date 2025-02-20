/**
 * @package buyers-experience
 */
import { mount } from '@vue/test-utils';

async function createWrapper() {
    return mount(await wrapTestComponent('sw-cms-el-preview-image-slider', {
        sync: true,
    }), {
        global: {
            stubs: {
                'sw-icon': await wrapTestComponent('sw-icon'),
            },
        },
    });
}

describe('src/module/sw-cms/elements/image-slider/preview', () => {
    it('should be a Vue.JS component', async () => {
        const wrapper = await createWrapper();
        expect(wrapper.vm).toBeTruthy();
    });
});
