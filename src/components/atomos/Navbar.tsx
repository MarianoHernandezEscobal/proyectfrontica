import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginRegisterModal from "./Modal";
import { FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";

import logo from "../../assets/imgs/logo.png";
import { useAlert } from "../../contexts/AlertContext";
import { useAuth } from "../../contexts/AuthContext"; // <-- Import from AuthContext

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Local UI states
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Refs
  const navRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Contexts
  const { showAlert } = useAlert();
  const { user, isAuthenticated, logoutUser } = useAuth(); // <-- AuthContext

  // Close the modal
  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await logoutUser(); // <-- Calls logout from AuthContext
      setIsNavOpen(false);
      setIsUserMenuOpen(false);
      showAlert("info", "Sesión cerrada correctamente");
      navigate("/home");
    } catch (error) {
      showAlert("error", "Error al cerrar sesión. Intente nuevamente");
      console.error("Error during logout:", error);
    }
  };

  // Toggle user menu or open login modal
  const toggleUserMenu = useCallback(() => {
    if (isAuthenticated) {
      setIsUserMenuOpen((prev) => !prev);
    } else {
      setIsModalOpen(true);
    }
  }, [isAuthenticated]);

  // Close all menus
  const closeMenus = useCallback(() => {
    setIsNavOpen(false);
    setIsUserMenuOpen(false);
  }, []);

  // Close menus if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target as Node) &&
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        closeMenus();
      }
    };

    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [closeMenus]);

  // Close menus on route change
  useEffect(() => {
    closeMenus();
  }, [location, closeMenus]);

  // Utility to determine if a link is active
  const isActive = useCallback(
    (path: string) =>
      location.pathname === path
        ? "text-text-light font-extrabold"
        : " hover:font-extrabold hover:text-text-light",
    [location.pathname]
  );

  // Nav links
  const navLinks = [
    { path: "/home", label: "Inicio" },
    { path: "/properties", label: "Propiedades" },
    { path: "/contact", label: "Contacto" },
    { path: "/properties/create", label: "Publicar Propiedad" },
  ];

  // Items in the user dropdown
  const userMenuItems = [
    { path: "/profile", label: "Perfil" },
    { path: "/properties/created", label: "Mis Propiedades" },
    { path: "/properties/favourites", label: "Mis Favoritas" },
  ];

  // Extra items if user is admin
  const adminMenuItems = [
    ...userMenuItems,
    { path: "/properties/pending-approval", label: "Pendiente de aprobación" },
    { path: "/user/make-admin", label: "Hacer Administrador" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 p-2 pr-3 bg-gradient-to-b from-accent-light to-background-neutral transition-all duration-300 ${(location.pathname === "/home" || location.pathname === "" || location.pathname === "/") && !hasScrolled
        ? "opacity-0 invisible"
        : "opacity-100 visible"
        }`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link to="/home">
          <img src={logo} alt="Logo" width="120" height="50" className="mr-4" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-3 items-center">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              className={`nav-button text-text-light ${isActive(path)} hover:font-bold`}
              to={path}
            >
              {label}
            </Link>
          ))}

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              className={`nav-button text-text-light hover:font-bold transition-text duration-300 flex items-center ${isUserMenuOpen ? "text-text-light" : ""
                }`}
              onClick={toggleUserMenu}
              aria-label="Perfil de usuario"
            >
              <FaUser className="mr-2" />
              {isAuthenticated ? "Mi Cuenta" : "Iniciar Sesión"}
              {isUserMenuOpen ? <FaChevronUp className="ml-2" /> : <FaChevronDown className="ml-2" />}
            </button>

            {/* Dropdown */}
            {isUserMenuOpen && isAuthenticated && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 z-50 bg-background-neutral">
                {user?.admin
                  ? adminMenuItems.map(({ path, label }) => (
                    <Link
                      key={path}
                      className={`block px-4 py-2 z-50  text-sm text-text-primary hover:bg-accent-dark ${isActive(path)}`}
                      to={path}
                      onClick={closeMenus}
                    >
                      {label}
                    </Link>
                  ))
                  : userMenuItems.map(({ path, label }) => (
                    <Link
                      key={path}
                      className={`block px-4 py-2  z-50 text-sm text-text-primary hover:bg-accent-dark ${isActive(path)}`}
                      to={path}
                      onClick={closeMenus}
                    >
                      {label}
                    </Link>
                  ))}
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-text-primary hover:bg-accent-dark"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Button */}
        <button
          className="md:hidden nav-button text-2xl text-text-light"
          onClick={() => setIsNavOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          <HiMenuAlt3 />
        </button>
      </div>

      {/* Mobile Nav Links */}
      {isNavOpen && (
        <div className="md:hidden flex flex-col gap-3 mt-3 text-right justify-end items-end p-4 rounded-md">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              className={`nav-button ${isActive(path)}`}
              to={path}
              onClick={closeMenus}
            >
              {label}
            </Link>
          ))}

          {/* Mobile User Menu Toggle */}
          <button
            className={`nav-button transition-text duration-300 text-right hover:font-bold hover:accent-dark flex items-center ${isUserMenuOpen ? "text-text-light" : ""
              }`}
            onClick={toggleUserMenu}
            aria-label="Perfil de usuario"
          >
            <FaUser className="mr-2" />
            {isAuthenticated ? "Mi Cuenta" : "Iniciar Sesión"}
            <FaChevronDown className="ml-2" />
          </button>

          {/* Mobile Dropdown for Authenticated Users */}
          {isAuthenticated && isUserMenuOpen && (
            <>
              {user?.admin
                ? adminMenuItems.map(({ path, label }) => (
                  <Link
                    key={path}
                    className={`nav-button ${isActive(path)} pl-8`}
                    to={path}
                    onClick={closeMenus}
                  >
                    {label}
                  </Link>
                ))
                : userMenuItems.map(({ path, label }) => (
                  <Link
                    key={path}
                    className={`nav-button ${isActive(path)} pl-8`}
                    to={path}
                    onClick={closeMenus}
                  >
                    {label}
                  </Link>
                ))}

              <button className="nav-button hover:bg-accent-light text-left pl-8" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      )}

      {/* Modal for Login/Register */}
      <LoginRegisterModal isOpen={isModalOpen} onClose={handleModalClose} />
    </nav>
  );
};

export default Navbar;
