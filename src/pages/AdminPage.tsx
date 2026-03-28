import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link, Navigate } from "react-router-dom";
import { ChevronLeft, Plus, Pencil, Trash2, Package, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Product {
  id: string; name: string; slug: string; price: number; original_price: number | null;
  image_url: string | null; badge: string | null; category: string | null; in_stock: boolean;
  description: string | null; ingredients: string | null; weight: string | null;
  benefits: string[]; nutrition: any[];
}

interface Order {
  id: string; total: number; status: string; created_at: string;
  shipping_address: string | null; phone: string | null; user_id: string;
}

const AdminPage = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [tab, setTab] = useState<"products" | "orders">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editProduct, setEditProduct] = useState<Partial<Product> | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isAdmin) { fetchProducts(); fetchOrders(); }
  }, [isAdmin]);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (data) setProducts(data as Product[]);
  };

  const fetchOrders = async () => {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    if (data) setOrders(data as Order[]);
  };

  const saveProduct = async () => {
    if (!editProduct?.name || !editProduct?.slug || !editProduct?.price) {
      toast.error("Name, slug, and price are required"); return;
    }
    setSaving(true);
    const payload = {
      name: editProduct.name,
      slug: editProduct.slug,
      price: editProduct.price,
      original_price: editProduct.original_price || null,
      description: editProduct.description || null,
      ingredients: editProduct.ingredients || null,
      image_url: editProduct.image_url || null,
      badge: editProduct.badge || null,
      category: editProduct.category || null,
      weight: editProduct.weight || "100g",
      benefits: editProduct.benefits || [],
      nutrition: editProduct.nutrition || [],
      in_stock: editProduct.in_stock ?? true,
    };

    if (editProduct.id) {
      const { error } = await supabase.from("products").update(payload).eq("id", editProduct.id);
      if (error) toast.error(error.message); else toast.success("Product updated!");
    } else {
      const { error } = await supabase.from("products").insert(payload);
      if (error) toast.error(error.message); else toast.success("Product added!");
    }
    setEditProduct(null);
    setSaving(false);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    toast.success("Product deleted");
    fetchProducts();
  };

  const updateOrderStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    toast.success("Order status updated");
    fetchOrders();
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-muted-foreground">You don't have admin access.</p>
      <Link to="/" className="text-primary hover:underline">Go Home</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16 container mx-auto px-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
          <ChevronLeft size={16} /> Back to Shop
        </Link>
        <h1 className="text-3xl font-display font-bold text-foreground mb-8">Admin Dashboard</h1>

        <div className="flex gap-2 mb-8">
          <button onClick={() => setTab("products")} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "products" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            <Package size={16} className="inline mr-2" />Products
          </button>
          <button onClick={() => setTab("orders")} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "orders" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
            <ShoppingBag size={16} className="inline mr-2" />Orders
          </button>
        </div>

        {tab === "products" && (
          <div>
            <button onClick={() => setEditProduct({ in_stock: true, benefits: [], nutrition: [] })} className="mb-6 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm flex items-center gap-2">
              <Plus size={16} /> Add Product
            </button>

            {editProduct && (
              <div className="bg-card rounded-2xl p-6 shadow-card mb-8 space-y-4">
                <h3 className="font-display font-bold text-foreground">{editProduct.id ? "Edit Product" : "New Product"}</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input placeholder="Product Name" value={editProduct.name || ""} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} className="px-4 py-3 rounded-xl border border-border bg-background text-foreground" />
                  <input placeholder="Slug (e.g. masala-blast)" value={editProduct.slug || ""} onChange={(e) => setEditProduct({ ...editProduct, slug: e.target.value })} className="px-4 py-3 rounded-xl border border-border bg-background text-foreground" />
                  <input placeholder="Price" type="number" value={editProduct.price || ""} onChange={(e) => setEditProduct({ ...editProduct, price: Number(e.target.value) })} className="px-4 py-3 rounded-xl border border-border bg-background text-foreground" />
                  <input placeholder="Original Price" type="number" value={editProduct.original_price || ""} onChange={(e) => setEditProduct({ ...editProduct, original_price: Number(e.target.value) })} className="px-4 py-3 rounded-xl border border-border bg-background text-foreground" />
                  <input placeholder="Image URL" value={editProduct.image_url || ""} onChange={(e) => setEditProduct({ ...editProduct, image_url: e.target.value })} className="px-4 py-3 rounded-xl border border-border bg-background text-foreground" />
                  <input placeholder="Badge (e.g. Best Seller)" value={editProduct.badge || ""} onChange={(e) => setEditProduct({ ...editProduct, badge: e.target.value })} className="px-4 py-3 rounded-xl border border-border bg-background text-foreground" />
                  <input placeholder="Category" value={editProduct.category || ""} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} className="px-4 py-3 rounded-xl border border-border bg-background text-foreground" />
                  <input placeholder="Weight" value={editProduct.weight || "100g"} onChange={(e) => setEditProduct({ ...editProduct, weight: e.target.value })} className="px-4 py-3 rounded-xl border border-border bg-background text-foreground" />
                </div>
                <textarea placeholder="Description" value={editProduct.description || ""} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground" />
                <textarea placeholder="Ingredients" value={editProduct.ingredients || ""} onChange={(e) => setEditProduct({ ...editProduct, ingredients: e.target.value })} rows={2} className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground" />
                <div className="flex gap-3">
                  <button onClick={saveProduct} disabled={saving} className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium text-sm disabled:opacity-50">
                    {saving ? "Saving..." : "Save Product"}
                  </button>
                  <button onClick={() => setEditProduct(null)} className="px-6 py-2 rounded-full bg-muted text-muted-foreground text-sm">Cancel</button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="flex items-center gap-4 p-4 bg-card rounded-xl shadow-card">
                  {p.image_url && <img src={p.image_url} alt={p.name} className="w-14 h-14 rounded-lg object-cover" />}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground truncate">{p.name}</h4>
                    <p className="text-sm text-muted-foreground">₹{p.price} · {p.category} · {p.in_stock ? "In Stock" : "Out of Stock"}</p>
                  </div>
                  <button onClick={() => setEditProduct(p)} className="p-2 text-muted-foreground hover:text-primary"><Pencil size={16} /></button>
                  <button onClick={() => deleteProduct(p.id)} className="p-2 text-muted-foreground hover:text-destructive"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "orders" && (
          <div className="space-y-4">
            {orders.length === 0 && <p className="text-muted-foreground">No orders yet.</p>}
            {orders.map((o) => (
              <div key={o.id} className="bg-card rounded-xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Order #{o.id.slice(0, 8)}</span>
                  <span className="text-sm text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">₹{o.total}</span>
                  <select
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                    className="px-3 py-1.5 rounded-lg border border-border bg-background text-foreground text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;
