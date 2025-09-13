import React, { useState } from "react";

export default function ItemCount({ stock = 10, initial = 1, onAdd }) {
    const [qty, setQty] = useState(initial);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        onAdd(qty);
        setAdded(true);
    };

    if (stock === 0) return <div>Producto sin stock</div>;
    if (added) return <div>Agregado: {qty} unidad(es)</div>;

    return (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button onClick={() => setQty(q => Math.max(1, q - 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty(q => Math.min(stock, q + 1))}>+</button>
            <button onClick={handleAdd}>Agregar al carrito</button>
        </div>
    );
}