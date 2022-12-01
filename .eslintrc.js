module.exports = {
  extends: ['react-app', 'react-app/jest', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-restricted-globals': ['warn'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'after-used',
        argsIgnorePattern: '^_',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_',
      },
    ],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'no-use-before-define': 'warn',
    'no-param-reassign': 'warn',
    'jsx-a11y/no-autofocus': 'warn',
    'prefer-const': 'warn',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
