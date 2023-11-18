import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const navigation = [
  { name: "Inventario", href: "/Inventario" },
  { name: "Ordenes Trabajo", href: "/Ordenes" },
  { name: "Ventas", href: "/Ventas" },
  { name: "Usuarios", href: "/Usuarios" },
  { name: "Productos", href: "/Productos" },
  { name: "Home", href: "/" },
  { name: "Piezas", href: "/Piezas" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar({ logOut }) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const [currentNavItem, setCurrentNavItem] = useState("Home");

  const handleChangeTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleNavClick = (e, name, href) => {
    e.preventDefault();
    setCurrentNavItem(name);
    navigate(href);
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              {/* Mobile menu button */}
              {/* ... resto del JSX para el botón del menú móvil y el logo */}
              
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.name, item.href)}
                      className={classNames(
                        currentNavItem === item.name
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                      )}
                      aria-current={currentNavItem === item.name ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>

              {/* Otros elementos de la barra de navegación */}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.name, item.href)}
                  className={classNames(
                    currentNavItem === item.name
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium cursor-pointer"
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
