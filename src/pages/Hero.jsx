import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import Chart from "../components/Chart.jsx";
import CardContent from "@mui/material/CardContent";
import {
  getInventario,
  getPiezas,
  getCotizaciones,
  getVentas,
  getUsuarios,
} from "../components/api/adress";
import { useSelector } from "react-redux";
/**
 * Hero component
 * @component
 * @example
 * return (
 *  <Hero />
 * )
 */
const Hero = () => {
  const { token } = useSelector((state) => state.auth);
  const [cantidadInventario, setCantidadInventario] = React.useState(0);
  const [cantidadPiezas, setCantidadPiezas] = React.useState(0);
  const [cantidadCotizaciones, setCantidadCotizaciones] = React.useState(0);
  const [cantidadVentas, setCantidadVentas] = React.useState(0);
  const [totalVentas, setTotalVentas] = React.useState(0);

  const [cantidadJefeTaller, setCantidadJefeTaller] = React.useState(0);
  const [cantidadVendedores, setCantidadVendedores] = React.useState(0);
  const [cantidadGerentes, setCantidadGerentes] = React.useState(0);
  const [cantidadClientes, setCantidadClientes] = React.useState(0);
  const [arregloVentasUltimoMes, setArregloVentasUltimoMes] = React.useState([]);
  const [arregloVentasUltimoMesFechas, setArregloVentasUltimoMesFechas] =React.useState([])
  const obtenerNombreMes = () => {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const fechaActual = new Date();
    return meses[fechaActual.getMonth()];
  };
  const nombreMesActual = obtenerNombreMes();  

  const [sucursales, setSucursales] = React.useState("");

  function filtrarYAgruparVentas(ventas) {
    // Obtener la fecha actual
    const fechaActual = new Date();

    // Obtener el mes y año actual
    const mesActual = fechaActual.getMonth();
    const añoActual = fechaActual.getFullYear();

    // Filtrar las ventas del mes actual
    const ventasMesActual = ventas.filter((venta) => {
        const fechaVenta = new Date(venta.fecha_creacion);
        return fechaVenta.getMonth() === mesActual && fechaVenta.getFullYear() === añoActual;
    });
    setTotalVentas(ventasMesActual.reduce((total, venta) => {
        return total + parseFloat(venta.valor_total);
    }, 0))

    // Crear objetos para agrupar las ventas por día
    const ventasAgrupadas = {};
    ventasMesActual.forEach((venta) => {
        const fechaVenta = new Date(venta.fecha_creacion);
        const fechaKey = fechaVenta.toISOString().slice(0, 10); // Formatea la fecha como "YYYY-MM-DD"
        if (!ventasAgrupadas[fechaKey]) {
            ventasAgrupadas[fechaKey] = 0;
        }
        ventasAgrupadas[fechaKey] += parseFloat(venta.valor_total);
    });

    const ventasTotales = ventasMesActual.reduce((total, venta) => {
        return total + parseFloat(venta.valor_total);
    }, 0);
    

    // Obtener arreglos de fechas y valores totales
    const fechas = Object.keys(ventasAgrupadas);
    const valoresTotales = fechas.map((fecha) => ventasAgrupadas[fecha]);

    return { ventasMesActual, fechas, valoresTotales };
}

  

  useEffect(() => {
    const inventarioInfo = async () => {
      const res = await getInventario(token);
      setCantidadInventario(res.length);
      // Crear un objeto para almacenar la cantidad de inventario por sucursal
      const cantidadPorSucursal = {};

      // Filtrar y acumular la cantidad de acuerdo a la sucursal
      res.forEach((item) => {
        const { nombre } = item.sucursal;
        if (cantidadPorSucursal[nombre]) {
          cantidadPorSucursal[nombre] += 1;
        } else {
          cantidadPorSucursal[nombre] = 1;
        }
      });

      // Actualizar el estado de las sucursales y la cantidad total de inventario
      setSucursales(cantidadPorSucursal);
    };

    const piezasInfo = async () => {
      const res = await getPiezas(token);
      setCantidadPiezas(res.length);
    };

    const cotizacionInfo = async () => {
      const res = await getCotizaciones(token);
      setCantidadCotizaciones(res.length);
    };

    const ventasInfo = async () => {
      const res = await getVentas(token);
      let total = 0;
      const { fechas, valoresTotales } = filtrarYAgruparVentas(res);
      setArregloVentasUltimoMes(valoresTotales);
      setArregloVentasUltimoMesFechas(fechas);
      res.map((venta) => {
        let precio = parseFloat(venta.valor_total);
        total += precio;
      });
      
      setCantidadVentas(res.length);
    };

    const getUsuariosInfo = async () => {
      const res = await getUsuarios(token);
      setCantidadJefeTaller(
        res.filter((user) => user.rol.nombre === "Jefe_Taller").length
      );
      setCantidadVendedores(
        res.filter((user) => user.rol.nombre === "Vendedor").length
      );
      setCantidadGerentes(
        res.filter((user) => user.rol.nombre === "Gerente").length
      );
      setCantidadClientes(
        res.filter((user) => user.rol.nombre === "Cliente").length
      );
    };

    getUsuariosInfo();
    ventasInfo();
    cotizacionInfo();
    piezasInfo();
    inventarioInfo();
  }, []);

  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6 p-6">
      <aside className="flex flex-col gap-6 font-bold ">
      <Card className="p-3 dark:bg-sky-950 dark:text-white">
          <div className="text-xl">Ventas</div>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{totalVentas.toLocaleString('es-CO')}</span>
              <span className="text-sm text-zinc-700 dark:text-zinc-400">
                Total Ingresos del mes
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="p-3 dark:bg-sky-950 dark:text-white">
          <div className="text-xl">Ventas</div>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{cantidadVentas}</span>
              <span className="text-sm text-zinc-700 dark:text-zinc-400">
                Cantidad completadas
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="p-3 dark:bg-sky-950 dark:text-white">
          <div className="text-xl">Inventario</div>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{cantidadInventario}</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-400">
                  Carros Disponibles
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{cantidadPiezas}</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-400">
                  Piezas
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="p-3 dark:bg-sky-950 dark:text-white">
          <div className="text-xl">Cotizaciones</div>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">{cantidadCotizaciones}</span>
              <span className="text-sm text-zinc-700 dark:text-zinc-400">
                Cotizaciones totales
              </span>
            </div>
          </CardContent>
        </Card>
      </aside>
      <div className="flex flex-col gap-6 font-bold ">
        <Card className=" flex flex-col p-3  dark:bg-slate-10 ">
          <div className="flex text-2xl content-center justify-center"> Análisis de Ventas Diarias {nombreMesActual} </div>
          <CardContent className="flex content-center justify-center">
            <Chart data={{ axisArray: arregloVentasUltimoMesFechas, seriesArray: arregloVentasUltimoMes }} />
          </CardContent>
        </Card>
        
        <Card className="p-3 dark:bg-sky-950 dark:text-white">
          <div className="text-xl">Usuarios</div>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{cantidadJefeTaller}</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-400">
                  Jefes de taller
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{cantidadVendedores}</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-400">
                  Vendedores
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{cantidadGerentes}</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-400">
                  Gerentes
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">{cantidadClientes}</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-400">
                  Clientes
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Hero;
