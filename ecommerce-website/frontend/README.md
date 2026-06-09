# Ecommerce Website Frontend

This is the frontend part of the ecommerce website project. It is built using React and TypeScript, providing a user-friendly interface for browsing products, managing a shopping cart, and completing the checkout process.

## Features

- **Product Browsing**: Users can view a list of products, including electronics, clothes, and shoes.
- **Shopping Cart**: Users can add items to their cart, adjust quantities, and remove items.
- **Checkout Process**: A streamlined checkout process that handles payment and order confirmation.
- **User Authentication**: Users can sign in to their accounts to manage their orders and preferences.
- **Admin Dashboard**: Admins can manage products, view orders, and handle inventory.

## Project Structure

```
frontend
├── src
│   ├── components
│   │   ├── Cart.tsx
│   │   ├── Checkout.tsx
│   │   ├── Header.tsx
│   │   ├── ProductCard.tsx
│   │   └── SignIn.tsx
│   ├── pages
│   │   ├── Home.tsx
│   │   ├── Products.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── Electronics.tsx
│   │   ├── Clothes.tsx
│   │   └── Shoes.tsx
│   ├── styles
│   │   └── app.css
│   ├── App.tsx
│   └── index.tsx
├── package.json
└── tsconfig.json
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/omoit699/ecommerce-website.git
   ```
2. Navigate to the frontend directory:
   ```
   cd ecommerce-website/frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To start the development server, run:
```
npm start
```

The application will be available at `http://localhost:3000`.

## Contributing

Feel free to submit issues or pull requests for any improvements or bug fixes. 

## License

This project is licensed under the MIT License.