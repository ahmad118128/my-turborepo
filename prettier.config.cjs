/** @type {import("prettier").Config} */
module.exports = {
  semi: true, // پایان هر خط ; داشته باشه — کدهای بزرگ readability بهتری دارن
  singleQuote: true, // استاندارد اکثر تیم‌های JS/TS (Next.js، Vercel، Meta)
  trailingComma: "all", // مفید برای diff تمیزتر در Git
  printWidth: 100, // حداکثر عرض خط — 100 برای readability مناسبه
  tabWidth: 2, // استاندارد عمومی در JS
  useTabs: false, // spaces بجای tabs برای هماهنگی با CI/CD
  bracketSpacing: true, // فاصله بین { a: 1 } → خواناتر
  arrowParens: "always", // همیشه پرانتز برای arrow function
  jsxSingleQuote: false, // در JSX از double quote استفاده کن (استاندارد React)
  endOfLine: "lf", // مخصوص cross-OS تیمی — حل مشکل line-ending در mac/linux/windows
  plugins: ["prettier-plugin-tailwindcss"], // مرتب‌سازی کلاس‌های Tailwind خودکار
  tailwindFunctions: ["clsx", "cva"], // مخصوص پروژه‌هایی که از clsx یا cva استفاده می‌کنن
};
