import React, { useContext, useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebaseconfig";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
    const { cartItems, totalPrice, clearCart } = useContext(CartContext);
    const [buyer, setBuyer] = useState({ name: "", email: "", phone: "" });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [submitError, setSubmitError] = useState(null);
    const navigate = useNavigate();

    // Validaciones simples
    const validate = () => {
        const e = {};
        if (!buyer.name || buyer.name.trim().length < 3) e.name = "Ingresa un nombre (mín 3 caracteres).";
        if (!buyer.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email)) e.email = "Ingresa un email válido.";
        if (buyer.phone && !/^[0-9+\s()-]{6,20}$/.test(buyer.phone)) e.phone = "Teléfono inválido.";
        if (!cartItems.length) e.cart = "El carrito está vacío.";
        return e;
    };

    const handleChange = (e) => {
        setBuyer(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors(prev => ({ ...prev, [e.target.name]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);
        const v = validate();
        setErrors(v);
        if (Object.keys(v).length) return;

        setLoading(true);
        try {
            const ordersRef = collection(db, "orders");
            const orderPayload = {
                buyer,
                items: cartItems.map(ci => ({ id: ci.id, title: ci.title, price: ci.price, qty: ci.qty })),
                total: totalPrice,
                createdAt: serverTimestamp()
            };

            const docRef = await addDoc(ordersRef, orderPayload);
            setOrderId(docRef.id);
            clearCart();
            // opcional: navegar a / gracias o similar
            // navigate(`/order-confirmation/${docRef.id}`);
        } catch (err) {
            console.error("Error creando orden:", err);
            setSubmitError("Ocurrió un error al generar la orden. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    if (orderId) {
        return (
            <div style={{ padding: 24 }}>
                <h2>Compra confirmada ✅</h2>
                <p>Tu número de orden es: <strong>{orderId}</strong></p>
                <p>Recibirás un correo de confirmación (si ingresaste email).</p>
                <button onClick={() => navigate("/")}>Volver al inicio</button>
            </div>
        );
    }

    return (
        <div style={{ padding: 24, maxWidth: 720 }}>
            <h2>Finalizar compra</h2>

            {errors.cart && <div style={{ color: "crimson" }}>{errors.cart}</div>}

            <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: "grid", gap: 8, marginBottom: 8 }}>
                    <label>
                        Nombre completo: 
                        <input name="name" value={buyer.name} onChange={handleChange} placeholder="Tu nombre" />
                        {errors.name && <div style={{ color: "crimson" }}>{errors.name}</div>}
                    </label>

                    <label>
                        Email: 
                        <input name="email" value={buyer.email} onChange={handleChange} placeholder="ejemplo@email.com" />
                        {errors.email && <div style={{ color: "crimson" }}>{errors.email}</div>}
                    </label>

                    <label>
                        Teléfono (opcional):
                        <input name="phone" value={buyer.phone} onChange={handleChange} placeholder="+54 9 11..." />
                        {errors.phone && <div style={{ color: "crimson" }}>{errors.phone}</div>}
                    </label>
                </div>

                <div style={{ marginTop: 12 }}>
                    <p>Total a pagar: <strong>${totalPrice}</strong></p>
                </div>

                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                    <button type="submit" disabled={loading}>{loading ? "Procesando..." : "Confirmar compra"}</button>
                    <button type="button" onClick={() => navigate("/cart")}>Regreso al carrito</button>
                </div>

                {submitError && <div style={{ marginTop: 12, color: "crimson" }}>{submitError}</div>}
            </form>
        </div>
    );
}
