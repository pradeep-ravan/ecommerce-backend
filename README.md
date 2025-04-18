# E-Commerce Product Listing - Full Stack Application

This project is a full-stack e-commerce application with product listing, filtering, pagination, and cart functionality. It features a responsive UI built with React and an Express backend API.

## 📋 Features

### Frontend (React)
- Product listings in a responsive 3-column grid
- Category filter with multi-select checkboxes
- Price range slider for filtering products
- Sort options (latest, price low-high, price high-low)
- Pagination system
- Cart functionality
- Wishlist functionality

### Backend (Express)
- RESTful API endpoints
- Product listing with filtering and pagination
- Category listing
- Cart operations (add, list, remove)

## 🛠️ Tech Stack

### Frontend
- ReactJS with functional components and hooks
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB (without Mongoose)
- Joi for validation

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Installation

#### Backend Setup
1. Clone the repository
```bash
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app
```

2. Install backend dependencies
```bash
cd ecommerce-backend
npm install
```


3. Start the backend server
```bash
npm run dev
```
The backend server will run on http://localhost:5000
#### Frontend Setup
1. Open a new terminal and navigate to the frontend directory
```bash
cd ../ecommerce-frontend
```

2. Install frontend dependencies
```bash
npm install
```

3. Start the frontend development server
```bash
npm run dev
```
The frontend application will run on http://localhost:5173


## 📝 API Endpoints

### Products
- `GET /api/products` - Get paginated products with filtering options
  - Query params: `page`, `limit`, `sort`, `category`, `minPrice`, `maxPrice`
- `GET /api/products/:id` - Get single product details

### Categories
- `GET /api/categories` - Get all available categories

### Cart
- `POST /api/cart/add` - Add product to cart
  - Body: `{ productId, quantity }`
- `GET /api/cart` - Get current cart contents
- `DELETE /api/cart/remove/:productId` - Remove item from cart

## 🎯 Key Implementation Details

- **Component Reusability**: Designed with modular components that can be reused throughout the application
- **Responsive Design**: Optimized for both desktop and mobile viewing
- **Clean Code Structure**: Organized with feature-based architecture
- **State Management**: Uses Redux Toolkit for efficient state management
- **Loading & Error States**: Handles loading, error, and empty states for all UI actions
- **Filter Implementation**: Easy-to-use filters with intuitive UI controls

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px and above)
- Tablet (768px to 1023px)
- Mobile (below 768px)
