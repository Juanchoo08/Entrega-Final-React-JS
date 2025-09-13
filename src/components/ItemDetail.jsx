import React, { useContext } from "react";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/CartContext";

export default function ItemDetail({ item }) {
    const { addItem } = useContext(CartContext);

    const handleAdd = (qty) => {
        addItem({
            id: item.id,
            title: item.title,
            price: item.price,
            stock: item.stock ?? 0,
            img: item.img ?? null
        }, qty);
    };

    return (
        <div style={{ padding: 16 }}>
            <div style={{ display: "flex", gap: 24 }}>
                <div style={{ flex: 1 }}>
                    {item.img ? <img src={item.img} alt={item.title} style={{ width: "100%", maxWidth: 420 }} /> : <div style={{ width: 420, height: 300, background: "#f3f3f3" }} />}
                </div>
                <div style={{ flex: 1 }}>
                    <h2>{item.title}</h2>
                    <p>{item.category}</p>
                    <p style={{ fontWeight: 700 }}>Precio: ${item.price}</p>
                    <p>En Stock: {item.stock ?? "—"}</p>

                    <div style={{ marginTop: 12 }}>
                        <ItemCount stock={item.stock ?? 0} initial={1} onAdd={handleAdd} />
                    </div>
                </div>
            </div>
        </div>
    );
}
