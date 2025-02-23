import eslint from '@eslint/js';
import tseslint from '@typescript-eslint';
import eslintPluginImport from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';

export default [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            parser: tseslint.parser,
            parserOptions: {
                project: true,
            },
        },
        plugins: {
            import: eslintPluginImport,
        },
        rules: {
            'import/order': ['error', { 'alphabetize': { 'order': 'asc' } }],
        },
    },
    prettierConfig,
];

