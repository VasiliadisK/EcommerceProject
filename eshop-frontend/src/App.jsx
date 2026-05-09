import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTopButton from "./components/sharedComponents/ScrollToTopButton";
import Homepage from "./pages/Home";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import { ModalContextProvider } from "./store/ModalContext";
import { AuthContextProvider } from "./store/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./http/queryClient";
import { Toaster } from 'react-hot-toast';
import ProfilePage from "./pages/ProfilePage";
import Products from "./pages/Products";
import { CartContextProvider } from "./store/CartContext";
import CheckoutPage from "./pages/Checkout";
import OrderConfirmation from './components/checkoutComponents/OrderConfirmation';
import ProtectedAdminRoute from "./components/sharedComponents/ProtectedAdminRoute";
import AdminLayout from "./components/adminPanelComponents/AdminLayout";
import AdminProducts from "./components/adminPanelComponents/adminProducts/AdminProducts";
import AdminCategories from "./components/adminPanelComponents/adminCategories/AdminCategories";
import AdminUsers from "./components/adminPanelComponents/adminUsers/AdminUsers"
import AdminOrders from "./components/adminPanelComponents/adminOrders/AdminOrders"
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <CartContextProvider>
          <ModalContextProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
            <BrowserRouter>
              <ScrollToTopButton />
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-confirm" element={<OrderConfirmation />} />
                <Route path="/admin" element={
                  <ProtectedAdminRoute>
                    <AdminLayout />
                  </ProtectedAdminRoute>
                }>
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </ModalContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
