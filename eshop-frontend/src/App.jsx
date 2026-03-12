import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTopButton from "./components/sharedComponents/ScrollToTopButton";
import Homepage from "./pages/Home";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import { ModalContextProvider } from "./store/ModalContext";
import { AuthContextProvider } from "./store/AuthContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./http/authRequests";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ModalContextProvider>
          <BrowserRouter>
            <ScrollToTopButton />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </BrowserRouter>
        </ModalContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
