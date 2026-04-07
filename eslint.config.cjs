'use strict';

const svelte = require('eslint-plugin-svelte');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const svelteParser = require('svelte-eslint-parser');
const prettier = require('eslint-config-prettier');

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
    {
        ignores: ['**/.svelte-kit/', '**/node_modules/', '**/build/', '**/*.cjs']
    },
    // TypeScript/JavaScript files
    {
        files: ['**/*.ts', '**/*.js'],
        plugins: {
            '@typescript-eslint': tsPlugin
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 2020
            }
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
            ]
        }
    },
    // Svelte files
    ...svelte.configs['flat/recommended'],
    {
        files: ['**/*.svelte'],
        plugins: {
            '@typescript-eslint': tsPlugin
        },
        languageOptions: {
            parser: svelteParser,
            parserOptions: {
                parser: tsParser
            }
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
            ],
            // SvelteKit handles routing — href links don't need resolve()
            'svelte/no-navigation-without-resolve': 'off',
            // Existing codebase uses unkeyed each blocks throughout
            'svelte/require-each-key': 'off'
        }
    },
    prettier
];
