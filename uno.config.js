import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
    presets: [{
        name: 'custom-preset',
        rules: [
            ['mt-5',{'margin-top': '5px'}]
        ]
    }]
})
