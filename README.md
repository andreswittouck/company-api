# 💼 Data Company API

API simple construida con NestJS siguiendo principios de arquitectura Hexagonal. Permite registrar empresas y consultar transferencias y adhesiones recientes.

---

## 🚀 Endpoints principales

Todos los endpoints están documentados en Swagger:

> http://localhost:3000/api/docs

### Empresas (`/companies`)

| Método | Ruta                         | Descripción                       |
| ------ | ---------------------------- | --------------------------------- |
| `POST` | `/companies`                 | Crea una empresa                  |
| `GET`  | `/companies`                 | Lista todas las empresas          |
| `GET`  | `/companies/recently-joined` | Empresas creadas en el último mes |
| `GET`  | `/companies/:cuit`           | Busca empresa por CUIT            |

### Transferencias (`/transfers`)

| Método | Ruta                                 | Descripción                                        |
| ------ | ------------------------------------ | -------------------------------------------------- |
| `POST` | `/transfers`                         | Registra una transferencia                         |
| `GET`  | `/transfers`                         | Lista todas las transferencias                     |
| `GET`  | `/transfers/recent`                  | Transferencias creadas en el último mes            |
| `GET`  | `/transfers/by-source/:sourceId`     | Transferencias relacionadas con una entidad origen |
| `GET`  | `/transfers/companies-in-last-month` | Empresas que hicieron transferencias recientes     |

---

## ⚙️ Instalación

```bash
# 1. Clonar el proyecto
git clone https://github.com/andreswittouck/company-api.git
cd company-api

# 2. Instalar dependencias
npm install

# 3. Ejecutar en desarrollo
npm run start:dev

# 4. Ejecutar de test
npm run test

Autor
Andrés Wittouck
📧 andreswittouck@gmail.com
```
