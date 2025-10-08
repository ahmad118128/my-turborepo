/** @type {import("prettier").Config} */
module.exports = {
  semi: true, // End each statement with a semicolon — improves readability in large codebases
  singleQuote: true, // Standard in most JS/TS teams (Next.js, Vercel, Meta)
  trailingComma: "all", // Helps produce cleaner diffs in Git
  printWidth: 100, // Maximum line width — 100 is good for readability
  tabWidth: 2, // Common standard in JS
  useTabs: false, // Use spaces instead of tabs for CI/CD consistency
  bracketSpacing: true, // Adds space inside object literals: { a: 1 } → more readable
  arrowParens: "always", // Always include parentheses in arrow functions
  jsxSingleQuote: false, // Use double quotes in JSX (React standard)
  endOfLine: "lf", // Cross-OS consistency — fixes line-ending issues on mac/linux/windows
  plugins: ["prettier-plugin-tailwindcss"], // Automatically sorts Tailwind classes
  tailwindFunctions: ["clsx", "cva"], // For projects using clsx or cva functions
};
