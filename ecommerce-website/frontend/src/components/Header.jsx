import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

const Header = () => {
  const { user, logout, cart } = useApp();
  const cartCount = cart
    ? cart.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <header
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid #F1F1F2",
        padding: "10px 0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        {/* Branding Logo */}
        <div className="logo" style={{ fontSize: "22px", fontWeight: "bold" }}>
          <Link
            to="/"
            style={{
              color: "#F68B1E",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            🧡 Loris E-9
          </Link>
        </div>

        {/* Main Product Navigation Categories */}
        <nav style={{ background: "transparent", padding: "0", margin: "0" }}>
          <ul
            style={{
              display: "flex",
              listStyle: "none",
              margin: "0",
              padding: "0",
              gap: "5px",
            }}
          >
            <li>
              <Link
                to="/products"
                style={{
                  color: "#313131",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                All Products
              </Link>
            </li>
            <li>
              <Link
                to="/electronics"
                style={{
                  color: "#313131",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                to="/clothes"
                style={{
                  color: "#313131",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Clothes
              </Link>
            </li>
            <li>
              <Link
                to="/shoes"
                style={{
                  color: "#313131",
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Shoes
              </Link>
            </li>
          </ul>
        </nav>

        {/* Header Profile & Cart Utility Actions */}
        <div
          className="header-actions"
          style={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <Link
            to="/cart"
            style={{
              color: "#313131",
              textDecoration: "none",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            🛒 Cart{" "}
            <span
              style={{
                backgroundColor: "#F68B1E",
                color: "#FFFFFF",
                padding: "2px 8px",
                borderRadius: "20px",
                fontSize: "12px",
              }}
            >
              {cartCount}
            </span>
          </Link>

          {user ? (
            <div
              className="user-menu"
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <span
                className="user-name"
                style={{ fontSize: "14px", color: "#313131" }}
              >
                👤 {user.username}
              </span>
              <button
                onClick={logout}
                style={{
                  background: "none",
                  color: "#D62929",
                  border: "none",
                  padding: "0",
                  fontSize: "14px",
                  fontWeight: "bold",
                  width: "auto",
                  cursor: "pointer",
                  textTransform: "none",
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              style={{
                color: "#313131",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Sign In
            </Link>
          )}

          <Link
            to="/admin"
            style={{
              color: "#75757A",
              textDecoration: "none",
              fontSize: "13px",
            }}
          >
            Admin
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
