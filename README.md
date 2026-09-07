# Merkaz HaZol

Full-stack web application for Merkaz HaZol, a family-owned retail store in Ramat Hasharon, operating since 1973.

The application provides a responsive public storefront for presenting the business, product categories, opening hours, contact information, and store location, alongside a protected administration interface for managing the product catalog.

## Features

- Responsive storefront
- Dynamic product catalog
- Stock availability management
- Featured product management
- Protected admin area
- Product CRUD operations
- JWT-based authentication

## Architecture

React Client
    ↓
NestJS REST API
    ↓
Mongoose
    ↓
MongoDB Atlas

The public storefront retrieves product data from the API and displays only products currently marked as in stock.

The admin area allows authenticated product management, including creation, editing, deletion, stock updates, and featured-product selection.

## API

Main endpoints:

POST   /api/auth/login

GET    /api/products
GET    /api/products/:id
POST   /api/products
PATCH  /api/products/:id
DELETE /api/products/:id

Product write operations require JWT authentication.

Swagger documentation is available at:

http://localhost:3000/api/docs

## Local Development

### Backend

cd api
npm install
npm run start:dev

### Frontend

cd web
npm install
npm run dev

Default URLs:

Frontend: http://localhost:5173
Admin:    http://localhost:5173/admin
API:      http://localhost:3000/api

## Environment Variables

The backend uses an `api/.env` file for local configuration.

Environment files are excluded from version control.