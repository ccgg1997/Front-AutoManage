
import React from "react";
import Tabs from '../components/Tabs.jsx';

export default function Venta() {
  const tabs = [
    { label: 'Cotizacion', content: <Cotizacion /> },
    { label: 'Venta', content: 'Contenido del Item Two' },
  ];
  return (
    <div className="min-h-screen dark:text-white">
      <Tabs className="h-full" tabs={tabs} />
    </div>
  );
}


function Cotizacion() {
  const modelo = useField({ type: "text"});
  const year = useField({ type: "text" });
  const kilometraje = useField({ type: "text"});
  return (
    <div className="dark:text-white min-h-screen">
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Introduzca los detalles del auto</h2>
        <p className="mt-1 text-sm leading-6 mb-2 text-gray-600 dark:text-slate-300">
          Bienvenido a la seccion de cotizaciones de vehiculos, por favor ingrese informacion
          completa.
        </p>
        <form className="space-y-4">
        <label
          htmlFor="marca"
          className="text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
        >
          Modelo
        </label>
        <div className="mt-2">
          <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
            <input
              {...modelo}
              id="modelo"
              autoComplete="modelo"
              required
              className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 
                focus:ring-0 sm:text-sm sm:leading-6  dark:text-white"
            />
          </div>
        </div>

          <div className="mt-2">
            <label
              htmlFor="year"
              className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
            >
              Año
            </label>
            <div className="mt-2">
              <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md ">
                <input
                  {...year}
                  id="year"
                  autoComplete="year"
                  required
                  className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="kilometraje"
                className=" text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
              >
                Kilometraje
              </label>
              <div className="mt-2 mb-2">
                <div className="mx-auto flex rounded-md ring-1 ring-inset ring-gray-300  sm:max-w-md">
                  <input
                    {...kilometraje}
                    id="kilometraje"
                    autoComplete="kilometraje"
                    required
                    className="text-center flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
           <button className=" p-2 text-black border dark:text-white border-gray-300 rounded" type="submit">
            Obtener cotización
          </button>
        </form>
      </main>
      <section className="p-6 ">
        <h2 className="text-2xl font-bold mb-4">Resultados de la cotización</h2>
        <div className="p-4 border border-gray-300 rounded">
          <p className="text-lg">Aqui va la cotizacion</p>
        </div>
      </section>
    </div>
  )
}

const useField = ({ type, placeholder }) => {
  const [value, setValue] = React.useState("");
  const onChange = ({ target }) => {
    setValue(target.value);
  };
  return { type, placeholder, value, onChange };
};

