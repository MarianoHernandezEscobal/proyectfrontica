import "./App.css";
import Navbar from "./components/atomos/Navbar";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";
import { PropertyProvider } from "./contexts/PropertyContext";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/Home";
import LoginRegisterModal from "./components/atomos/Modal";
import ApprovePropertiesPage from "./pages/PropertyApproval";
import Profile from "./pages/Profile";
import Propiedades from "./pages/Propiedades";
import PropertyDetails from "./pages/PropertyDetails";
import ForgotPassword from "./components/atomos/ForgotPassword";
import ResetPassword from "./components/atomos/ResetPassword";
import PublicarProp from "./pages/PublicarProp";
import { Footer } from "./components/atomos/Footer";
import Contacto from "./pages/Contacto";
import { MisPropiedades } from "./pages/MisPropiedades";
import { MisFavoritas } from "./pages/MisFavoritas";
import { MakeAdmin } from "./pages/MakeAdmin";
import EditProperty from "./pages/EditProperty";
import { useEffect, useState } from "react";

function AppContent() {
  const location = useLocation();
  const [navbarHeight, setNavbarHeight] = useState(true);

  useEffect(() => {
    // Cambia dinámicamente el navbarHeight según la ruta
    if (location.pathname === "/home") {
      setNavbarHeight(false); // Oculta el espacio del navbar en el home
    } else {
      setNavbarHeight(true); // Espacio normal en otras rutas
    }
  }, [location]);

  return (
    <div className={navbarHeight ? "main-content" : ""}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginRegisterModal />} />
        <Route path="/user/make-admin" element={<MakeAdmin />} />
        <Route
          path="/properties/pending-approval"
          element={<ApprovePropertiesPage />}
        />
        <Route path="/properties/edit/:id" element={<EditProperty />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword isOpen={true} onClose={() => {}} />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/properties" element={<Propiedades />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/properties/created" element={<MisPropiedades />} />
        <Route path="/properties/favourites" element={<MisFavoritas />} />
        <Route path="/contact" element={<Contacto />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/properties/create" element={<PublicarProp />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <PropertyProvider>
          <Router>
            <AppContent />
          </Router>
        </PropertyProvider>
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
