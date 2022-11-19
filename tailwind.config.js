import Typography from '@tailwindcss/typography';

// module.exports =
/** @type {import("tailwindcss").Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {}
    },
    plugins: [Typography],
    prefix: 'tw-',
    corePlugins: {
        preflight: false
    }
};
