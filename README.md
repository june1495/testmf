# Microfrontend Angular 18.2.0 con Module Federation

Este proyecto es un **Microfrontend** desarrollado en **Angular 18.2.0** e integrado en un ecosistema de **Module Federation**, donde el proyecto **`mf-shell`** actúa como orquestador.

---

## Requisitos previos

- **Node.js**: `^18.13.0` o `^20.0.0` (recomendado Node 20 LTS)  
- **npm**: `>=9.x` (incluido con Node) o **Yarn** `>=1.22.x`  
- **Angular CLI** (opcional, para ejecutar comandos `ng` globalmente):  

## instalación 

- Ejecutar npm install o yarn install

## 🚀 Comandos de desarrollo

En este monorepo existen varios comandos para levantar el entorno de **Module Federation** con `mf-shell` como orquestador.

### Para levantar el proyecto ejecutar
```bash
npm run all

 **Levantar solo el mfshell (orquestador)
```bash
npm run mf-shell
 **Levantar solo el mfcrud (microfrontend)
```bash
npm run mf-crud
