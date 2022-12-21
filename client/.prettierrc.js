module.exports = {
    pluginSearchDirs: ['.'],
    plugins: ['@trivago/prettier-plugin-sort-imports'],
    trailingComma: 'none',
    semi: true,
    singleQuote: true,
    printWidth: 100,
    useTabs: false,
    tabWidth: 4,
    quoteProps: 'consistent',
    importOrder: ['<THIRD_PARTY_MODULES>', '^@/', '^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true
};
