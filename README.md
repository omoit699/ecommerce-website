# E-commerce Website

This is a simple e-commerce website built using React and TypeScript. The application allows users to browse products, add them to a shopping cart, and proceed to checkout.

## Project Structure

```
ecommerce-website
├── src
│   ├── components
│   │   ├── Cart.tsx          # Manages the shopping cart state and displays items in the cart
│   │   ├── ProductCard.tsx   # Displays individual product details and add to cart option
│   │   └── Header.tsx        # Displays navigation and branding
│   ├── pages
│   │   ├── Home.tsx          # Landing page displaying a list of products
│   │   ├── Product.tsx       # Displays detailed information about a specific product
│   │   └── Checkout.tsx      # Handles the checkout process and displays order summary
│   ├── styles
│   │   └── app.css           # CSS styles for the application
│   ├── App.tsx               # Main application component with routing
│   └── index.tsx             # Entry point of the application
├── package.json               # npm configuration file
├── tsconfig.json              # TypeScript configuration file
└── README.md                  # Project documentation
```

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd ecommerce-website
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

## Features

- Browse a list of products
- View product details
- Add products to the shopping cart
- Checkout process with order summary

## Technologies Used

- React
- TypeScript
- CSS

## License

This project is licensed under the MIT License.