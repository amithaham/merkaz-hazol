import { FormEvent, useEffect, useMemo, useState } from "react";
import "./Admin.css";
import {
  createProduct,
  deleteProduct,
  getProducts,
  loginAdmin,
  updateProduct,
  type ApiProduct,
  type ProductInput,
} from "./api";

const emptyProduct: ProductInput = {
  name: "",
  category: "",
  description: "",
  imageUrl: "",
  inStock: true,
  featured: false,
  displayOrder: 1,
};

export default function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem("adminToken") ?? "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductInput>(emptyProduct);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.displayOrder - b.displayOrder),
    [products],
  );

  useEffect(() => {
    if (!token) return;
    void refreshProducts();
  }, [token]);

  async function refreshProducts() {
    try {
      const result = await getProducts();
      setProducts(result);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to load products");
    }
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await loginAdmin(email, password);
      localStorage.setItem("adminToken", result.accessToken);
      setToken(result.accessToken);
      setPassword("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("adminToken");
    setToken("");
    setProducts([]);
    setEditingId(null);
    setForm(emptyProduct);
  }

  function startEdit(product: ApiProduct) {
    setEditingId(product._id);
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      imageUrl: product.imageUrl,
      inStock: product.inStock,
      featured: product.featured,
      displayOrder: product.displayOrder,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyProduct);
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (editingId) {
        await updateProduct(token, editingId, form);
        setMessage("המוצר עודכן בהצלחה");
      } else {
        await createProduct(token, form);
        setMessage("המוצר נוסף בהצלחה");
      }

      resetForm();
      await refreshProducts();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(product: ApiProduct) {
    if (!window.confirm(`למחוק את "${product.name}"?`)) return;

    try {
      await deleteProduct(token, product._id);
      await refreshProducts();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed");
    }
  }

  async function toggleStock(product: ApiProduct) {
    try {
      await updateProduct(token, product._id, {
        inStock: !product.inStock,
      });
      await refreshProducts();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Update failed");
    }
  }

  if (!token) {
    return (
      <main className="admin-page" dir="rtl">
        <section className="admin-login">
          <a className="admin-brand" href="/">מרכז הזול</a>
          <h1>כניסת מנהל</h1>
          <p>ניהול קטלוג המוצרים</p>

          <form onSubmit={handleLogin}>
            <label>
              אימייל
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label>
              סיסמה
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            <button disabled={loading} type="submit">
              {loading ? "מתחבר..." : "כניסה"}
            </button>
          </form>

          {message && <p className="admin-message error">{message}</p>}
          <a className="back-link" href="/">חזרה לאתר</a>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page" dir="rtl">
      <header className="admin-header">
        <div>
          <a className="admin-brand" href="/">מרכז הזול</a>
          <span>ניהול מוצרים</span>
        </div>
        <div className="admin-header-actions">
          <a href="/" target="_blank" rel="noreferrer">פתיחת האתר</a>
          <button type="button" onClick={logout}>התנתקות</button>
        </div>
      </header>

      <div className="admin-layout">
        <section className="product-form-card">
          <div className="admin-section-title">
            <div>
              <span>{editingId ? "עריכת מוצר" : "מוצר חדש"}</span>
              <h1>{editingId ? "עדכון פרטי מוצר" : "הוספת מוצר לקטלוג"}</h1>
            </div>
            {editingId && (
              <button className="text-button" type="button" onClick={resetForm}>
                ביטול עריכה
              </button>
            )}
          </div>

          <form className="product-form" onSubmit={handleSave}>
            <label>
              שם המוצר
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                required
              />
            </label>

            <label>
              קטגוריה
              <input
                value={form.category}
                onChange={(event) => setForm({ ...form, category: event.target.value })}
                required
              />
            </label>

            <label className="full-field">
              תיאור
              <textarea
                value={form.description}
                onChange={(event) =>
                  setForm({ ...form, description: event.target.value })
                }
                required
              />
            </label>

            <label className="full-field">
              כתובת תמונה
              <input
                type="url"
                value={form.imageUrl}
                onChange={(event) => setForm({ ...form, imageUrl: event.target.value })}
                required
              />
            </label>

            <label>
              סדר תצוגה
              <input
                type="number"
                min="0"
                value={form.displayOrder}
                onChange={(event) =>
                  setForm({ ...form, displayOrder: Number(event.target.value) })
                }
                required
              />
            </label>

            <div className="checkboxes">
              <label>
                <input
                  type="checkbox"
                  checked={form.inStock}
                  onChange={(event) =>
                    setForm({ ...form, inStock: event.target.checked })
                  }
                />
                במלאי
              </label>

              <label>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) =>
                    setForm({ ...form, featured: event.target.checked })
                  }
                />
                מוצר ראשי
              </label>
            </div>

            <button className="save-button" disabled={loading} type="submit">
              {loading ? "שומר..." : editingId ? "שמור שינויים" : "הוסף מוצר"}
            </button>
          </form>

          {message && <p className="admin-message">{message}</p>}
        </section>

        <section className="products-card">
          <div className="admin-section-title">
            <div>
              <span>קטלוג</span>
              <h2>{products.length} מוצרים</h2>
            </div>
            <button className="text-button" type="button" onClick={() => void refreshProducts()}>
              רענון
            </button>
          </div>

          <div className="products-table">
            {sortedProducts.map((product) => (
              <article className="admin-product-row" key={product._id}>
                <img src={product.imageUrl} alt="" />

                <div className="admin-product-info">
                  <strong>{product.name}</strong>
                  <span>{product.category}</span>
                </div>

                <div className="admin-badges">
                  {product.featured && <span>ראשי</span>}
                  <button
                    className={product.inStock ? "stock-on" : "stock-off"}
                    type="button"
                    onClick={() => void toggleStock(product)}
                  >
                    {product.inStock ? "במלאי" : "לא במלאי"}
                  </button>
                </div>

                <div className="row-actions">
                  <button type="button" onClick={() => startEdit(product)}>עריכה</button>
                  <button
                    className="danger"
                    type="button"
                    onClick={() => void handleDelete(product)}
                  >
                    מחיקה
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
