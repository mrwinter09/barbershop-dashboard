<!-- @format -->

## Hi there 👋

## 💻 My Tech Stack

![JavaScript](https://img.shields.io/badge/-JavaScript-05122A?style=flat&logo=javascript)&nbsp;
![TypeScript](https://img.shields.io/badge/-TypeScript-05122A?style=flat&logo=TypeScript)&nbsp;
![React](https://img.shields.io/badge/-React-05122A?style=flat&logo=react)&nbsp;
![Vite](https://img.shields.io/badge/-Vite-05122A?style=flat&logo=vite)&nbsp;
![Next.js](https://img.shields.io/badge/-Next.js-05122A?style=flat&logo=next.js)&nbsp;
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-05122A?style=flat&logo=tailwindcss)&nbsp;
![Formik](https://img.shields.io/badge/-Formik-05122A?style=flat&logo=formik)&nbsp;
![Yup](https://img.shields.io/badge/-Yup-05122A?style=flat&logo=yup)&nbsp;
![GitHub](https://img.shields.io/badge/-GitHub-05122A?style=flat&logo=github)&nbsp;
![VS Code](https://img.shields.io/badge/-VS%20Code-05122A?style=flat&logo=visual-studio-code)&nbsp;

---

# 📦 Project: Barbershop Dashboard (Assignment)

This repository contains a **React + TypeScript + Vite** application structured for production-level clarity.  
It follows modern patterns using:

- **React + TS**
- **Bun** as the package runner
- **TanStack Query** for async data & caching
- **Formik + Yup** for forms & validation
- **Mantine** for UI (tables, modals, layout)
- **OpenAPI-ready** folder structure
- **Clean architecture** for maintainability

This setup matches industry expectations for senior-level frontend structure.

---

# ⚡️ React + TypeScript + Vite

This template provides a minimal yet scalable setup to get React working in Vite with HMR and ESLint rules.

### Plugins included

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) – Babel/Oxidizer for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) – SWC Fast Refresh

---

## 🧠 React Compiler

The React Compiler is **not** enabled by default due to its dev/build performance impact.  
To add it, follow:  
➡️ https://react.dev/learn/react-compiler/installation

---

# 🧹 ESLint Configuration (Advanced)

If you expand this into a production application, update your ESLint config for type-aware rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      // or stricter
      tseslint.configs.strictTypeChecked,
      // stylistic
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
```
