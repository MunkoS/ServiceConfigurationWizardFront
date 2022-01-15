module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb-base',
    'plugin:import/errors',
    'plugin:import/warnings',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/standard'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    project: './tsconfig.eslint.json'
  },
  plugins: ['@typescript-eslint', 'prettier', '@angular-eslint/eslint-plugin'],
  rules: {
    'linebreak-style': 0,
    'import/extensions': [0], //["error", "never", { 'css': "always"} ],
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    'newline-per-chained-call': 0,
    'comma-dangle': 0,
    'lines-between-class-members': 0,
    'class-methods-use-this': 0,
    'arrow-parens': ['error', 'as-needed'],
    'arrow-body-style': ['error', 'as-needed'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    // '@typescript-eslint/class-name-casing': ['error', { allowUnderscorePrefix: true }],
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'private-static-field',
          'private-instance-field',
          'protected-static-field',
          'protected-instance-field',
          'public-static-field',
          'public-instance-field',
          'private-constructor',
          'protected-constructor',
          'public-constructor',
          'private-static-method',
          'private-instance-method',
          'protected-static-method',
          'protected-instance-method',
          'public-static-method',
          'public-instance-method'
        ]
      }
    ],
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/no-unsafe-return': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
    // '@typescript-eslint/no-untyped-public-signature': ['error'],
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'explicit',
          constructors: 'no-public',
          methods: 'explicit',
          properties: 'explicit',
          parameterProperties: 'explicit'
        }
      }
    ],
    'no-case-declarations': 0,
    'no-param-reassign': ['error', { props: false }],
    '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as', objectLiteralTypeAssertions: 'allow-as-parameter' }],
    'object-shorthand': 0,
    'grouped-accessor-pairs': ['error', 'getBeforeSet'],
    'function-paren-newline': 0,
    'no-useless-constructor': 0,
    'no-underscore-dangle': 0,
    'no-restricted-globals': 0,
    'max-classes-per-file': 0,
    'no-return-assign': 0,
    'no-continue': ['error'],
    'no-shadow': 0,
    'no-nested-ternary': ['error'],
    '@typescript-eslint/no-empty-function': ['error'],
    'radix': ['error'],
    '@typescript-eslint/no-empty-interface': ['error'],
    '@typescript-eslint/prefer-regexp-exec': 0,
    'prefer-destructuring': 0,
    '@typescript-eslint/adjacent-overload-signatures': 0,
    'no-bitwise': 0,
    'import/no-duplicates': ['error'],
    'func-names': 0,
    '@typescript-eslint/camelcase': 0,
    'no-alert': 0,
    'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
    '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
    'no-mixed-operators': 0,
    'no-useless-concat': ['error'],
    'no-tabs': [
      'error',
      {
        allowIndentationTabs: true
      }
    ],
    'no-restricted-properties': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used'
      }
    ],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': [
      'error',
      {
        allowArgumentsExplicitlyTypedAsAny: true,
        allowDirectConstAssertionInArrowFunctions: true,
        allowedNames: [],
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true
      }
    ],
    'quotes': [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    // '@typescript-eslint/interface-name-prefix': [
    //   'error',
    //   {
    //     prefixWithI: 'always'
    //   }
    // ],
    '@typescript-eslint/no-explicit-any': 0,
    'no-console': [
      'error',
      {
        allow: ['error', 'info', 'warn']
      }
    ],
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'property',
        modifiers: ['private'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'require'
      },
      {
        selector: 'property',
        format: ['camelCase', 'PascalCase']
      },
      {
        selector: 'property',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'allow', 'has', 'was', 'Is', 'Allow', 'Has', 'Was', 'can'],
        filter: '\b([a-z0-9]+)\b(?<!static)'
      },
      {
        selector: 'accessor',
        types: ['boolean'],
        prefix: ['is', 'has', 'allow', 'was', 'can'],
        format: ['camelCase', 'PascalCase']
      },
      {
        selector: 'class',
        format: ['PascalCase']
      },
      {
        selector: 'interface',
        format: ['PascalCase'],
        prefix: ['I']
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase']
      },
      {
        selector: 'method',
        format: ['camelCase', 'PascalCase']
      },
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will', 'can']
      },
      {
        selector: 'typeParameter',
        format: ['PascalCase'],
        prefix: ['T']
      },
      {
        selector: 'variable',
        format: ['camelCase']
      },
      {
        selector: 'parameter',
        types: ['boolean'],
        prefix: ['is', 'has', 'allow', 'was', 'use', 'can'],
        format: ['PascalCase']
      },
      {
        selector: 'parameter',
        format: ['camelCase']
      }
    ],
    '@typescript-eslint/restrict-template-expressions': 0,
    '@angular-eslint/no-attribute-decorator': ['error'],
    '@angular-eslint/prefer-output-readonly': ['error'],
    '@angular-eslint/no-input-rename': ['error'],
    '@angular-eslint/no-output-on-prefix': ['error'],
    '@angular-eslint/no-output-rename': ['error'],
    '@angular-eslint/directive-selector': ['error', { type: 'attribute', style: 'camelCase' }],
    '@angular-eslint/component-selector': ['error', { type: 'element', style: 'kebab-case' }],
    '@angular-eslint/no-host-metadata-property': ['error'],
    '@angular-eslint/no-inputs-metadata-property': ['error'],
    '@angular-eslint/no-outputs-metadata-property': ['error'],
    '@angular-eslint/no-queries-metadata-property': ['error'],
    '@typescript-eslint/no-unsafe-member-access': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/restrict-plus-operands': 0
  }
};
