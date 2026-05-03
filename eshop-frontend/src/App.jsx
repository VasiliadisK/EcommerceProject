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
import OrderConfirmation from './components/checkoutComponents/OrderConfirmation'

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
              </Routes>
            </BrowserRouter>
          </ModalContextProvider>
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
