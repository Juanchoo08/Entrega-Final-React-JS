import React from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

export default function NavBar() {
    return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "12px 24px", borderBottom: "1px solid #ccc" }}>
        <div>
            <Link to="/" style={{ textDecoration: "none", fontSize: "22px", color: "#111", fontWeight: "900" }}>E-Commerce Alvarez</Link>
        </div>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <Link to="/category/coca" style={{ textDecoration: "none", color: "#111" }}>Coca</Link>
            <Link to="/category/sprite" style={{ textDecoration: "none", color: "#111" }}>Sprite</Link>
            <Link to="/category/fanta" style={{ textDecoration: "none", color: "#111" }}>Fanta</Link>
            <div style={{ padding: "2px", backgroundColor: "#eee", border: "1px solid black", borderRadius: "5px" }}>
                <CartWidget />
            </div>
        </div>
    </nav>
    );
}
