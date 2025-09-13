import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartItem({ item }) {
    const { removeItem } = useContext(CartContext);

    return (
        <div style={{ display: "flex", gap: 12, alignItems: "center", border: "1px solid #eee", padding: 12, borderRadius: 6 }}>
            <div style={{ width: 80, height: 80, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.img ? <img src={item.img} alt={item.title} style={{ maxWidth: "100%", maxHeight: "100%" }} /> : <div style={{ color: "#999" }}>sin img</div>}
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <h4 style={{ margin: 0 }}>{item.title}</h4>
                        <p style={{ margin: 0 }}>x{item.qty}  —  ${item.price} c/u</p>
                    </div>
                    <div>
                        <p style={{ margin: 0, fontWeight: 700 }}>${item.qty * item.price}</p>
                        <button onClick={() => removeItem(item.id)} style={{ marginTop: 8 }}>Eliminar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
