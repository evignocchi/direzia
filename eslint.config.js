import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  { ignores: ['dist/**', '.astro/**', 'node_modules/**', '.scratch/**', 'playwright-report/**', 'test-results/**', '.claude/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: { globals: { process: 'readonly', console: 'readonly', URL: 'readonly', fetch: 'readonly', Response: 'readonly', Request: 'readonly', document: 'readonly', window: 'readonly', location: 'readonly', URLSearchParams: 'readonly', FormData: 'readonly', setTimeout: 'readonly', clearTimeout: 'readonly', AbortController: 'readonly' } },
    rules: { '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'none' }] },
  },
  {
    // Script inline delle pagine (ES5 volutamente semplice, senza build): regole più morbide
    files: ['**/*.astro/*.js', '**/*.astro/*.ts'],
    languageOptions: { globals: { window: 'readonly', document: 'readonly', location: 'readonly', sessionStorage: 'readonly', fetch: 'readonly', FormData: 'readonly', URLSearchParams: 'readonly' } },
    rules: { 'no-var': 'off', 'no-empty': 'off', 'prefer-const': 'off', '@typescript-eslint/no-unused-vars': ['error', { caughtErrors: 'none' }] },
  },
];
