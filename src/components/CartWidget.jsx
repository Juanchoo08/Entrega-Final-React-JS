import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function CartWidget() {
    const { totalItems } = useContext(CartContext);

    return (
    <Link to="/cart" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "#222" }}>
        <span style={{ marginRight: 8 }}>🛒</span>
        <span>{totalItems}</span>
    </Link>
    );
}
