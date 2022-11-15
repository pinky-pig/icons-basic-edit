module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: '@antfu/eslint-config',
  rules: {
    // 禁止出现 console
    'no-console': 'off',
    // 禁止出现 debugger
    'no-debugger': 'off',
    // 禁止提示使用尚未定义
    'no-use-before-define': 'off',
    // @typescript-eslint禁止出现未使用过的变量
    '@typescript-eslint/no-use-before-define': 'off',
    // @typescript-eslint禁止出现未使用过的变量
    '@typescript-eslint/no-unused-vars': 'off',
    'import/namespace': 'off',
    'import/default': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
  },
  overrides: [
    {
      files: ['**/*.md', '**/*.md/*.*', 'demo.vue', 'scripts/*.ts', '*.test.ts'],
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
      },
    },
  ],
}
