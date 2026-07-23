import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import SellerDashboard from './pages/SellerDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AddProductModal from './components/AddProductModal';
import { getUserProfile } from './services/api';

export default function App() {
  const [userRole, setUserRole] = useState(() => localStorage.getItem('user_role') || 'buyer');
  const [currentUser, setCurrentUser] = useState(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!(
      localStorage.getItem('access') ||
      localStorage.getItem('accessToken') ||
      localStorage.getItem('token')
    );
  });

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const checkRole = async () => {
    const token =
      localStorage.getItem('access') ||
      localStorage.getItem('accessToken') ||
      localStorage.getItem('token');

    if (!token) {
      setIsAuthenticated(false);
      setUserRole('buyer');
      setCurrentUser(null);
      return;
    }

    setIsAuthenticated(true);
    const storedRole = localStorage.getItem('user_role');

    try {
      const data = await getUserProfile();
      if (data) {
        setCurrentUser(data.user || data);
      }

      const fetchedRole =
        data?.profile?.role ||
        data?.role ||
        data?.user?.role ||
        data?.user_type ||
        (data?.is_seller === true ? 'seller' : null);

      if (fetchedRole === 'seller' || (!storedRole && fetchedRole)) {
        const cleanRole = fetchedRole.toLowerCase();
        setUserRole(cleanRole);
        localStorage.setItem('user_role', cleanRole);
      } else if (storedRole) {
        setUserRole(storedRole.toLowerCase());
      }
    } catch (err) {
      if (storedRole) {
        setUserRole(storedRole.toLowerCase());
      }
    }
  };

  useEffect(() => {
    checkRole();
  }, []);

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    setCartItems([]);
    setIsAuthenticated(false);
    setUserRole('buyer');
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans">
      <Navbar
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        currentUser={currentUser}
        cartCount={cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)}
        onLogout={handleLogout}
        onOpenAddProduct={() => setIsAddProductOpen(true)}
      />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home onAddToCart={handleAddToCart} userRole={userRole} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/checkout" element={<Checkout cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/login" element={<Login onLoginSuccess={checkRole} />} />
          <Route path="/register" element={<Register onRegisterSuccess={checkRole} />} />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/profile"
              element={<div className="text-center text-white mt-20">Welcome to your profile!</div>}
            />
            <Route path="/seller" element={<SellerDashboard />} />
          </Route>
        </Routes>
      </main>

      <AddProductModal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
        onProductAdded={() => {
          // Trigger catalog reload or toast notice if applicable
          window.location.reload();
        }}
      />

      <Footer />
    </div>
  );
}