import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "react-hooks/exhaustive-deps": "off", // Nonaktifkan warning useEffect dependencies
      "@typescript-eslint/no-unused-expressions": "off", // Nonaktifkan error unused expression
      "@typescript-eslint/no-explicit-any": "off", // Nonaktifkan larangan penggunaan any
      "@typescript-eslint/no-unused-vars": "off", // Nonaktifkan error variabel tidak digunakan
      "prefer-const": "off" // Nonaktifkan prefer cons
    },
  },
];

export default eslintConfig;
