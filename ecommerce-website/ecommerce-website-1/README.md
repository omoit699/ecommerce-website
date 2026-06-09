# Ecommerce Website

This is a full-stack ecommerce website project that includes both frontend and backend components. The project is designed to provide a seamless shopping experience for users, featuring a variety of products including electronics, clothes, and shoes.

## Project Structure

The project is organized into two main directories: `frontend` and `backend`.

### Frontend

The frontend is built using React and TypeScript. It includes the following components and pages:

- **Components:**
  - `Cart`: Displays items in the user's cart and allows for item removal and quantity adjustments.
  - `Checkout`: Handles the checkout process, including payment and order confirmation.
  - `Header`: Displays the navigation bar and links to different sections of the website.
  - `ProductCard`: Displays individual product details, including images, names, and prices.
  - `SignIn`: Allows users to log in to their accounts.

- **Pages:**
  - `Home`: The landing page of the website.
  - `Products`: Lists all available products for browsing.
  - `AdminDashboard`: Provides administrative functionalities for managing products and viewing orders.
  - `Electronics`: Displays electronic products.
  - `Clothes`: Displays clothing items.
  - `Shoes`: Displays shoe products.

- **Styles:**
  - `app.css`: Contains the CSS styles for the frontend application.

### Backend

The backend is built using Node.js and Express. It includes the following components:

- **Controllers:**
  - `ProductController`: Handles product-related requests.
  - `CartController`: Manages the user's cart.
  - `CheckoutController`: Processes orders and handles payments.
  - `AuthController`: Manages user authentication.
  - `InventoryController`: Manages inventory levels and product availability.

- **Routes:**
  - `products`: API endpoints for product-related operations.
  - `cart`: API endpoints for cart-related operations.
  - `checkout`: API endpoints for checkout-related operations.
  - `auth`: API endpoints for authentication-related operations.
  - `inventory`: API endpoints for inventory-related operations.

- **Models:**
  - `Product`: Defines the structure of product data.
  - `Cart`: Defines the structure of the user's cart data.
  - `Order`: Defines the structure of order data.
  - `User`: Defines the structure of user data.

- **Middleware:**
  - `auth`: Middleware functions for handling authentication and authorization.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```

3. Navigate to the backend directory and install dependencies:
   ```
   cd ../backend
   npm install
   ```

4. Start the backend server:
   ```
   npm start
   ```

5. Start the frontend application:
   ```
   cd ../frontend
   npm start
   ```

## Features

- User authentication (sign-in and registration)
- Product browsing and searching
- Cart management (add, remove, and update items)
- Checkout process with payment handling
- Admin dashboard for managing products and orders

## License

This project is licensed under the MIT License.