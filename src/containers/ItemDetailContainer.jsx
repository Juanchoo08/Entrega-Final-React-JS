import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseconfig";
import ItemDetail from "../components/ItemDetail";
import { useParams } from "react-router-dom";

export default function ItemDetailContainer() {
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);

        async function fetchItem() {
            try {
                const docRef = doc(db, "items", id);
                const snapshot = await getDoc(docRef);
                if (!mounted) return;
                if (snapshot.exists()) {
                    setItem({ id: snapshot.id, ...snapshot.data() });
                } else {
                    setItem(null);
                    setError("Producto no encontrado.");
                }
            } catch (err) {
                console.error("ItemDetailContainer error:", err);
                if (mounted) setError("Error al cargar el detalle.");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchItem();

        return () => { mounted = false; };
    }, [id]);

    if (loading) return <div style={{ padding: 24 }}>Cargando detalle...</div>;
    if (error) return <div style={{ padding: 24, color: "crimson" }}>{error}</div>;
    if (!item) return <div style={{ padding: 24 }}>Producto no encontrado.</div>;

    return <ItemDetail item={item} />;
}
