import React from "react";
import { Link } from "react-router-dom";

export default function Item({ item }) {
    return (
        <div style={{ border: "1px solid #e3e3e3", borderRadius: 8, padding: 12 }}>
            <div style={{ height: 140, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {item.img ? <img src={item.img} alt={item.title} style={{ maxWidth: "100%", maxHeight: "100%" }} /> : <div style={{ color: "#888" }}>No hay imagen</div>}
            </div>
            <h3 style={{ margin: "8px 0" }}>{item.title}</h3>
            <p style={{ margin: "4px 0" }}>{item.category}</p>
            <p style={{ fontWeight: "700" }}>${item.price}</p>
            <Link to={`/item/${item.id}`}>
                <button style={{ marginTop: 8 }}>Ver detalle</button>
            </Link>
        </div>
    );
}
