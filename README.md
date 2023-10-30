<h1 align="center">E-Commerce Admin</h1>

<p align="center">
  <img src="https://img.shields.io/github/languages/code-size/b-l-i-n-d/ecommerce-admin" alt="GitHub code size in bytes" />
  <img src="https://img.shields.io/github/last-commit/b-l-i-n-d/ecommerce-admin" alt="GitHub last commit" />
  <img src="https://img.shields.io/github/languages/count/b-l-i-n-d/ecommerce-admin" />
  <img src="https://img.shields.io/github/languages/top/b-l-i-n-d/ecommerce-admin" />
  <img src="https://img.shields.io/github/commit-activity/m/b-l-i-n-d/ecommerce-admin" alt="GitHub commit activity month" />
  <img src="https://img.shields.io/github/license/b-l-i-n-d/ecommerce-admin" alt="GitHub license" />
</p>

<p align="center">
  <a href="#-about">📝 About</a> •
  <a href="#-features">✨ Features</a> •
  <a href="#-technologies">💻 Technologies</a> •
  <a href="#-project-structure">📁 Project structure</a> •
  <a href="#-env-setup">⚙️ Environment variables</a> •
  <a href="#-how-to-run">🚀 How to run</a> •
  <a href="#-api-endpoints">☁️ API endpoints</a> •
  <a href="#-license">📄 License</a>
</p>

## 📝 About

E-Commerce Admin is a web application that allows you to manage your e-commerce store. I have created this project to learn more about next js app router. I have use nextjs as fullstack framework, tailwind css as css framework, clerk as authentication provider, planetscale as mysql database, prisma as orm, zustand as state management, shadcn/ui as ui components, react-hook-form for form validation, zod for data validation, axios for mutations, next-cloudinary for image upload, next-themes for dark mode, stripe for payment. I know that there are many things that I can improve in this project, I will try to improve it in the future. Feel free to contribute to this project. I will be very happy if you give this project a star ⭐.

## ✨ Features

-   [x] Authentication using [CLERK](https://www.clerk.dev/)
-   [x] Store management
    -   [x] Create store
    -   [x] Update store
-   [x] Dashboard
    -   [x] Total revenue
    -   [x] Total sales
    -   [x] Types of products
    -   [x] Graph of sales
    -   [x] Recent sales
-   [x] Billboards
    -   [x] Create billboard
    -   [x] Update billboard
    -   [x] Delete billboard
-   [x] Categories
    -   [x] Create category
    -   [x] Update category
    -   [x] Delete category
-   [x] Sizes
    -   [x] Create size
    -   [x] Update size
    -   [x] Delete size
-   [x] Colors
    -   [x] Create color
    -   [x] Update color
    -   [x] Delete color
-   [x] Products
    -   [x] Create product
    -   [x] Update product
    -   [x] Delete product
-   [x] Orders
    -   [x] View orders
-   [x] Each pages has its related API endpoints to make integration with forntend easier

## 💻 Technologies

-   [Next.js](https://nextjs.org/) v13.4 with [TypeScript](https://www.typescriptlang.org/) and app router
-   [Tailwind CSS](https://tailwindcss.com/)
-   [PlanetScale](https://planetscale.com/) as mysql database
-   [Prisma](https://www.prisma.io/) as ORM
-   [Clerk](https://www.clerk.dev/)
-   [Zustand](https://zustand-demo.pmnd.rs/) for state management
-   [shadcn/ui](https://ui.shadcn.com/) for UI components
-   [react-hook-form](https://react-hook-form.com/) for form validation
-   [zod](https://zod.dev/) for data validation
-   [axios](https://axios-http.com/) for mutations
-   [next-cloudinary](https://next.cloudinary.dev/) for image upload
-   [next-themes](https://www.npmjs.com/package/next-themes) for dark mode
-   [stripe](https://stripe.com/) for payment

## 📁 Project structure

```bash
├── .eslintrc.json
├── .gitignore
├── README.md
├── actions
│   ├── get-revenue-data.ts
│   ├── get-sales-data.ts
│   └── get-stock-data.ts
├── app
│   ├── (auth)
│   │   ├── (routes)
│   │   │   ├── sign-in
│   │   │   │   └── [[...sign-in]]
│   │   │   │       ├── components
│   │   │   │       │   └── sign-in-with-theme.tsx
│   │   │   │       └── page.tsx
│   │   │   └── sign-up
│   │   │       └── [[...sign-up]]
│   │   │           ├── components
│   │   │           │   └── sign-up-with-theme.tsx
│   │   │           └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)
│   │   ├── [storeId]
│   │   │   ├── (routes)
│   │   │   │   ├── billboards
│   │   │   │   │   ├── [billboardId]
│   │   │   │   │   │   ├── components
│   │   │   │   │   │   │   └── billboard-form.tsx
│   │   │   │   │   │   ├── error.tsx
│   │   │   │   │   │   ├── loading.tsx
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── components
│   │   │   │   │   │   ├── cell-action.tsx
│   │   │   │   │   │   ├── client.tsx
│   │   │   │   │   │   └── columns.tsx
│   │   │   │   │   ├── error.tsx
│   │   │   │   │   ├── loading.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── categories
│   │   │   │   │   ├── [categoryId]
│   │   │   │   │   │   ├── components
│   │   │   │   │   │   │   └── category-form.tsx
│   │   │   │   │   │   ├── error.tsx
│   │   │   │   │   │   ├── loading.tsx
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── components
│   │   │   │   │   │   ├── cell-action.tsx
│   │   │   │   │   │   ├── client.tsx
│   │   │   │   │   │   └── columns.tsx
│   │   │   │   │   ├── error.tsx
│   │   │   │   │   ├── loading.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── colors
│   │   │   │   │   ├── [colorId]
│   │   │   │   │   │   ├── components
│   │   │   │   │   │   │   └── color-form.tsx
│   │   │   │   │   │   ├── error.tsx
│   │   │   │   │   │   ├── loading.tsx
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── components
│   │   │   │   │   │   ├── cell-action.tsx
│   │   │   │   │   │   ├── client.tsx
│   │   │   │   │   │   └── columns.tsx
│   │   │   │   │   ├── error.tsx
│   │   │   │   │   ├── loading.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── error.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   ├── orders
│   │   │   │   │   ├── components
│   │   │   │   │   │   ├── client.tsx
│   │   │   │   │   │   └── columns.tsx
│   │   │   │   │   ├── error.tsx
│   │   │   │   │   ├── loading.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   ├── products
│   │   │   │   │   ├── [productId]
│   │   │   │   │   │   ├── components
│   │   │   │   │   │   │   └── product-form.tsx
│   │   │   │   │   │   ├── error.tsx
│   │   │   │   │   │   ├── loading.tsx
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── components
│   │   │   │   │   │   ├── cell-action.tsx
│   │   │   │   │   │   ├── client.tsx
│   │   │   │   │   │   └── columns.tsx
│   │   │   │   │   ├── error.tsx
│   │   │   │   │   ├── loading.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── settings
│   │   │   │   │   ├── components
│   │   │   │   │   │   └── settings-form.tsx
│   │   │   │   │   ├── error.tsx
│   │   │   │   │   ├── loading.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   └── sizes
│   │   │   │       ├── [sizeId]
│   │   │   │       │   ├── components
│   │   │   │       │   │   └── size-form.tsx
│   │   │   │       │   ├── error.tsx
│   │   │   │       │   ├── loading.tsx
│   │   │   │       │   └── page.tsx
│   │   │   │       ├── components
│   │   │   │       │   ├── cell-action.tsx
│   │   │   │       │   ├── client.tsx
│   │   │   │       │   └── columns.tsx
│   │   │   │       ├── error.tsx
│   │   │   │       ├── loading.tsx
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   └── user-profile
│   │       └── [[...user-profile]]
│   │           ├── layout.tsx
│   │           └── page.tsx
│   ├── (root)
│   │   ├── (routes)
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api
│   │   ├── [storeId]
│   │   │   ├── billboards
│   │   │   │   ├── [billboardId]
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── categories
│   │   │   │   ├── [categoryId]
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── checkout
│   │   │   │   └── route.ts
│   │   │   ├── colors
│   │   │   │   ├── [colorId]
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── products
│   │   │   │   ├── [productId]
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   └── sizes
│   │   │       ├── [sizeId]
│   │   │       │   └── route.ts
│   │   │       └── route.ts
│   │   ├── stores
│   │   │   ├── [storeId]
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── webhook
│   │       └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── loading.tsx
├── components.json
├── components
│   ├── main-nav.tsx
│   ├── modals
│   │   ├── alert-modal.tsx
│   │   └── store-modal.tsx
│   ├── navbar-actions.tsx
│   ├── navbar.tsx
│   ├── overview.tsx
│   ├── store-switcher.tsx
│   ├── theme-toggle.tsx
│   └── ui
│       ├── alert.tsx
│       ├── api-alert.tsx
│       ├── api-list.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── command.tsx
│       ├── data-table.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── heading.tsx
│       ├── image-upload.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── loader.tsx
│       ├── modal.tsx
│       ├── popover.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── table.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       └── use-toast.ts
├── hooks
│   ├── use-origin.tsx
│   └── use-store-modal.tsx
├── lib
│   ├── prismadb.ts
│   ├── stripe.ts
│   └── utils.ts
├── middleware.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── prisma
│   └── schema.prisma
├── providers
│   ├── modal-provider.tsx
│   ├── nprogress-provider.tsx
│   └── theme-provider.tsx
├── public
│   ├── next.svg
│   └── vercel.svg
├── tailwind.config.ts
└── tsconfig.json
```

## ⚙️ Environment variables

Create a `.env.local` file in the root directory and add the following variables:

```bash
# CLERK
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<CLERK_PUBLISHABLE_KEY>
CLERK_SECRET_KEY=<CLERK_SECRET_KEY>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=<PLANETSCALE_DATABASE_URL>

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<CLOUDINARY_CLOUD_NAME>
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=<CLOUDINARY_UPLOAD_PRESET>

# Stripe
STRIPE_SECRET_KEY=<STRIPE_SECRET_KEY>
STRIPE_WEBHOOK_SECRET=<STRIPE_WEBHOOK_SECRET>

# Frontend
FRONTEND_STORE_URL=<FRONTEND_STORE_URL>
```

## 🚀 How to run

1. Clone this repository

```bash
git clone https://github.com/b-l-i-n-d/ecommerce-admin.git
```

2. Install dependencies

```bash
npm install
```

4. Generate prisma client

```bash
dotenv -e .env.local -- npx prisma generate

# make sure to install dotenv-cli globally first
# npm install -g dotenv-cli
# or to be hassle free, just rename .env.local to .env
# and run npx prisma generate

```

5. Push prisma schema to database

```bash
dotenv -e .env.local --  npx prisma db push
```

6. Run the development server

```bash
npm run dev
```

7. Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## ☁️ API endpoints

### Store

| Endpoint          | Method | Description      |
| :---------------- | :----: | :--------------- |
| `/api/stores`     |  POST  | Create new store |
| `/api/stores/:id` | PATCH  | Update store     |
| `/api/stores/:id` | DELETE | Delete store     |

### Billboard

| Endpoint                       | Method | Description          |
| :----------------------------- | :----: | :------------------- |
| `/api/:storeId/billboards`     |  GET   | Get all billboards   |
| `/api/:storeId/billboards/:id` |  GET   | Get billboard by id  |
| `/api/:storeId/billboards`     |  POST  | Create new billboard |
| `/api/:storeId/billboards/:id` | PATCH  | Update billboard     |
| `/api/:storeId/billboards/:id` | DELETE | Delete billboard     |

### Category

| Endpoint                       | Method | Description         |
| :----------------------------- | :----: | :------------------ |
| `/api/:storeId/categories`     |  GET   | Get all categories  |
| `/api/:storeId/categories/:id` |  GET   | Get category by id  |
| `/api/:storeId/categories`     |  POST  | Create new category |
| `/api/:storeId/categories/:id` | PATCH  | Update category     |
| `/api/:storeId/categories/:id` | DELETE | Delete category     |

### Size

| Endpoint                  | Method | Description     |
| :------------------------ | :----: | :-------------- |
| `/api/:storeId/sizes`     |  GET   | Get all sizes   |
| `/api/:storeId/sizes/:id` |  GET   | Get size by id  |
| `/api/:storeId/sizes`     |  POST  | Create new size |
| `/api/:storeId/sizes/:id` | PATCH  | Update size     |
| `/api/:storeId/sizes/:id` | DELETE | Delete size     |

### Color

| Endpoint                   | Method | Description      |
| :------------------------- | :----: | :--------------- |
| `/api/:storeId/colors`     |  GET   | Get all colors   |
| `/api/:storeId/colors/:id` |  GET   | Get color by id  |
| `/api/:storeId/colors`     |  POST  | Create new color |
| `/api/:storeId/colors/:id` | PATCH  | Update color     |
| `/api/:storeId/colors/:id` | DELETE | Delete color     |

### Product

| Endpoint                     | Method | Description        |
| :--------------------------- | :----: | :----------------- |
| `/api/:storeId/products`     |  GET   | Get all products   |
| `/api/:storeId/products/:id` |  GET   | Get product by id  |
| `/api/:storeId/products`     |  POST  | Create new product |
| `/api/:storeId/products/:id` | PATCH  | Update product     |
| `/api/:storeId/products/:id` | DELETE | Delete product     |

### Order

| Endpoint               | Method | Description    |
| :--------------------- | :----: | :------------- |
| `/api/:storeId/orders` |  GET   | Get all orders |

## Screenshots

### Sign in

![Sign in](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670764/ecommerce-admin/sign_in_xouapm.png)

### Sign up

![Sign up](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670760/ecommerce-admin/sign_up_eeur0x.png)

### Create Store

![Create Store](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670760/ecommerce-admin/create_store_xftl6m.png)

### Dashboard

![Dashboard](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670763/ecommerce-admin/dashboard_cjr6fe.png)

### Billboards

![Billboards](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670762/ecommerce-admin/billboards_n8qhvn.png)

### Create Billboard

![Create Billboard](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670762/ecommerce-admin/create_billboard_dnhne6.png)

### Edit Billboard

![Edit Billboard](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698674886/ecommerce-admin/edit_billboard_udqxpv.png)

### Categories

![Categories](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670763/ecommerce-admin/categories_u5djwv.png)

### Create Category

![Create Category](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670761/ecommerce-admin/create_category_wijnyf.png)

### Sizes

![Sizes](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670766/ecommerce-admin/sizes_ezvdwd.png)

### Create Size

![Create Size](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670762/ecommerce-admin/create_size_c20koj.png)

### Colors

![Colors](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670766/ecommerce-admin/color_zjj9qe.png)

### Create Color

![Create Color](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670761/ecommerce-admin/create_color_czlabz.png)

### Products

![Products](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670762/ecommerce-admin/products_pafqyu.png)

### Create Product

![Create Product](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670760/ecommerce-admin/create_product_its2ge.png)

### Orders

![Orders](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670763/ecommerce-admin/orders_r2etr0.png)

### Store Settings

![Store Settings](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698670763/ecommerce-admin/settings_csds4k.png)

### User Profile

![User Profile](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698675773/ecommerce-admin/user_profile_lijvqx.png)

### Light Mode

![Light Mode](https://res.cloudinary.com/b-l-i-n-d/image/upload/v1698675522/ecommerce-admin/light_mode_hhy4da.png)

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
