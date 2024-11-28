/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-prettier/recommended"],
  rules: {
    "custom-property-empty-line-before": null,
    "declaration-empty-line-before": null,
    "value-keyword-case": null,
    "number-max-precision": 6,
  },
};
