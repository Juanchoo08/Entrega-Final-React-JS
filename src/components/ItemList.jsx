import React from "react";
import Item from "./Item";

export default function ItemList({ items }) {
    return (
    <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", padding: 16 }}>
        {items.map(item => <Item key={item.id} item={item} />)}
    </div>
    );
}
