module.exports = {
  extends: ['@bryce-loskie'],
  rules: {},
  overrides: [
    {
      files: ['playground/**/*.*'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
}
