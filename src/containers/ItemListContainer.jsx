import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../services/firebaseconfig";
import ItemList from "../components/ItemList";
import { useParams } from "react-router-dom";

export default function ItemListContainer() {
    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        setError(null);

        async function fetchItems() {
            try {
                const itemsRef = collection(db, "items");
                const q = categoryId ? query(itemsRef, where("category", "==", categoryId)) : itemsRef;
                const snapshot = await getDocs(q);

                if (!mounted) return;
                const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                setItems(data);
            } catch (err) {
                console.error("ItemListContainer error:", err);
                if (mounted) setError("Error al cargar productos.");
            } finally {
                if (mounted) setLoading(false);
            }
        }

        fetchItems();

        return () => { mounted = false; };
    }, [categoryId]);

    if (loading) return <div style={{ padding: 24 }}>Cargando productos...</div>;
    if (error) return <div style={{ padding: 24, color: "crimson" }}>{error}</div>;
    if (!items.length) return <div style={{ padding: 24 }}>No hay productos en esta categoría.</div>;

    return <ItemList items={items} />;
}
