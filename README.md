# 🚀 Proyecto Playwright

<p align="right">
  <a href="#es">🇪🇸 Español</a> | <a href="#en">🇬🇧 English</a>
</p>

---

## <a name="es"></a>🇪🇸 Español

### 📌 Descripción
Este proyecto utiliza **Playwright** para la automatización de pruebas end‑to‑end. En este README encontrarás los pasos necesarios para **descargar el proyecto, instalar dependencias y desplegarlo correctamente**, así como los **requisitos mínimos**.

---

### 🧩 Requisitos mínimos
Antes de comenzar, asegúrate de tener instalado lo siguiente:

- **Node.js** ≥ 18.x (recomendado LTS)
- **npm** ≥ 9.x (o **yarn / pnpm** si lo prefieres)
- **Git**
- Sistema operativo compatible:
  - macOS
  - Linux
  - Windows 10 / 11

> 💡 Playwright descarga automáticamente los navegadores necesarios (Chromium, Firefox y WebKit).

---

### ⬇️ Descargar el proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/carloslmo/playwright_first_steps.git
```

2. Accede a la carpeta del proyecto:

```bash
cd playwright_first_steps
```

---

### 📦 Instalación de dependencias

Instala las dependencias del proyecto:

```bash
npm install
```

Instala los navegadores de Playwright:

```bash
npx playwright install
```

---

### ▶️ Ejecutar Playwright

Ejecutar todos los tests:

```bash
npx playwright test
```

Ejecutar tests en modo UI:

```bash
npx playwright test --ui
```

Ver el último reporte:

```bash
npx playwright show-report
```

---

### 🛠️ Configuración adicional (opcional)

- Variables de entorno: `.env`
- Configuración principal: `playwright.config.ts`
- Tests ubicados en: `/tests`

---

## <a name="en"></a>🇬🇧 English

### 📌 Description
This project uses **Playwright** for end‑to‑end test automation. This README explains how to **download, install dependencies, and run the project**, including the **minimum requirements**.

---

### 🧩 Minimum requirements
Make sure you have the following installed:

- **Node.js** ≥ 18.x (LTS recommended)
- **npm** ≥ 9.x (or **yarn / pnpm**)
- **Git**
- Supported OS:
  - macOS
  - Linux
  - Windows 10 / 11

> 💡 Playwright automatically downloads required browsers (Chromium, Firefox, WebKit).

---

### ⬇️ Download the project

1. Clone the repository:

```bash
git clone https://github.com/carloslmo/playwright_first_steps.git
```

2. Go to the project folder:

```bash
cd playwright_first_steps
```

---

### 📦 Install dependencies

Install project dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

### ▶️ Run Playwright

Run all tests:

```bash
npx playwright test
```

Run tests in UI mode:

```bash
npx playwright test --ui
```

Open last report:

```bash
npx playwright show-report
```

---

### 🛠️ Additional configuration (optional)

- Environment variables: `.env`
- Main configuration file: `playwright.config.ts`
- Tests location: `/tests`

---

✨ Happy testing with Playwright!

