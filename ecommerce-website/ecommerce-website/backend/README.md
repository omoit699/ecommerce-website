# Ecommerce Website Backend

This is the backend component of the ecommerce website project. It is built using Node.js and TypeScript, providing a RESTful API for the frontend to interact with.

## Features

- **Product Management**: Manage products including adding, updating, and deleting products.
- **Cart Management**: Handle user cart operations such as adding and removing items.
- **Checkout Process**: Process orders and handle payments.
- **User Authentication**: Sign-in and registration functionalities for users.
- **Inventory Management**: Manage inventory levels and product availability.

## Directory Structure

- **src/**: Contains the source code for the backend.
  - **controllers/**: Contains the logic for handling requests.
  - **routes/**: Defines the API endpoints.
  - **models/**: Contains the data models for products, users, orders, and carts.
  - **middleware/**: Contains middleware for authentication.
  - **app.ts**: Sets up the Express application.
  - **server.ts**: Entry point for starting the server.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/omoit699/ecommerce-website.git
   ```

2. Navigate to the backend directory:
   ```
   cd ecommerce-website/backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To start the backend server, run:
```
npm start
```

The server will be running on `http://localhost:5000` (or the port specified in your configuration).

## API Documentation

Refer to the individual route files in the `routes` directory for detailed API documentation and usage.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you'd like to add.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.