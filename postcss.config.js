import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import tailwindConfig from './tailwind.config';

module.exports = {
    plugins: [tailwind(tailwindConfig), autoprefixer]
};
