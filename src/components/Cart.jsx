import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
    const { cartItems, totalPrice, clearCart } = useContext(CartContext);

    if (!cartItems.length) {
        return (
            <div style={{ padding: 24 }}>
                <h2>Carrito vacío</h2>
                <button>
                    <Link to="/" style={{ color: "white", textDecoration: "none" }}>Regreso al catálogo</Link>
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: 24 }}>
            <h2>Tu carrito</h2>
            <div style={{ display: "grid", gap: 12 }}>
                {cartItems.map(ci => <CartItem key={ci.id} item={ci} />)}
            </div>

            <div style={{ marginTop: 16 }}>
                <p>Total (sin IVA): <strong>${totalPrice}</strong></p>
                <button onClick={() => clearCart()} style={{ marginRight: 8 }}>Vaciar el carrito</button>
                <Link to="/checkout"><button>Finalizar compra</button></Link>
            </div>
        </div>
    );
}
