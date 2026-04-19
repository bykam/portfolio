// @ts-check

// eslint.config.js — Angular 21 + ESLint 9 Flat Config
// Compatibile con: angular-eslint 21.x, typescript-eslint, @eslint/js 10.x

const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  // ─── Ignores globali ─────────────────────────────────────────────────────
  {
    ignores: [
      '.angular/**',
      'dist/**',
      'coverage/**',
      'node_modules/**',
      '**/*.spec.ts',        // rimuovi se vuoi lintare i test
    ],
  },

  // ─── TypeScript (Components, Directives, Services, Pipes…) ───────────────
  {
    files: ['**/*.ts'],

    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],

    // Processa i template inline dei Component come se fossero file .html
    processor: angular.processInlineTemplates,

    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.spec.json'],
      },
    },

    rules: {
      // ── Selettori Angular ──────────────────────────────────────────────
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'app', style: 'kebab-case' },
      ],

      // ── Best practice Angular (moderne) ───────────────────────────────
      '@angular-eslint/no-empty-lifecycle-method': 'warn',
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      '@angular-eslint/prefer-output-readonly': 'warn',
      '@angular-eslint/prefer-signals': 'warn',          // Angular signals
      '@angular-eslint/prefer-standalone': 'warn',       // standalone components
      '@angular-eslint/no-lifecycle-call': 'error',
      '@angular-eslint/no-output-native': 'error',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/contextual-lifecycle': 'error',

      // ── TypeScript strict ──────────────────────────────────────────────
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true, allowTypedFunctionExpressions: true },
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'no-public' },
      ],
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-shadow': 'warn',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
      '@typescript-eslint/array-type': ['warn', { default: 'array' }],
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        },
        {
          selector: 'class',
          format: ['PascalCase'],
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: { regex: '^I[A-Z]', match: false }, // no "IMyInterface" prefix
        },
      ],

      // ── Qualità del codice JavaScript/TypeScript ───────────────────────
      'eqeqeq': ['error', 'always'],
      'curly': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-arrow-callback': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-new-wrappers': 'error',
      'no-bitwise': 'error',
      'no-useless-concat': 'error',
      'one-var': ['error', 'never'],
      'guard-for-in': 'error',
      'max-classes-per-file': ['error', 1],
      'complexity': ['error', 15],
      'max-lines': ['warn', 400],
      'max-len': ['warn', { code: 100, comments: 160 }], // allineato al tuo printWidth Prettier

      // ── Import / sort (già gestito parzialmente da Prettier) ──────────
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true, // usa eslint-plugin-import per l'ordine dei moduli
          allowSeparatedGroups: true,
        },
      ],
    },
  },

  // ─── HTML Templates ───────────────────────────────────────────────────────
  {
    files: ['**/*.html'],

    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],

    rules: {
      // ── Ordine attributi nel template ─────────────────────────────────
      '@angular-eslint/template/attributes-order': [
        'warn',
        {
          alphabetical: false,
          order: [
            'STRUCTURAL_DIRECTIVE', // *ngIf, *ngFor (legacy)
            'TEMPLATE_REFERENCE',   // #myRef
            'ATTRIBUTE_BINDING',    // id="x", class="x", required
            'INPUT_BINDING',        // [value]="x"
            'TWO_WAY_BINDING',      // [(ngModel)]="x"
            'OUTPUT_BINDING',       // (click)="x()"
          ],
        },
      ],

      // ── Template moderna (Angular 17+) ────────────────────────────────
      '@angular-eslint/template/prefer-control-flow': 'error',  // @if, @for, @switch
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',
      '@angular-eslint/template/use-track-by-function': 'warn',
      '@angular-eslint/template/button-has-type': 'warn',
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/cyclomatic-complexity': ['warn', { maxComplexity: 10 }],
      '@angular-eslint/template/prefer-ngsrc': 'warn',          // NgOptimizedImage

      // ── Accessibilità (già inclusa via templateAccessibility) ─────────
      // Puoi overridare qui regole specifiche se necessario:
      // '@angular-eslint/template/click-events-have-key-events': 'warn',
    },
  },
);