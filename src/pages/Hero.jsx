import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
/**
 * Hero component
 * @component
 * @example
 * return (
 *  <Hero />
 * )
 */
const Hero = () => {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6 p-6">
      <aside className="flex flex-col gap-6 font-bold ">
        <Card className="p-3">
          <div className="text-xl">Inventario</div>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">150</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-400">
                  Cars Available
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-3xl font-bold">500</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-400">
                  Parts in Stock
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="p-3 ">
          <div className="text-xl">Cotizaciones</div>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">20</span>
              <span className="text-sm text-zinc-700 dark:text-zinc-400">
                Pending Quotes
              </span>
            </div>
          </CardContent>
        </Card>
        <Card className="p-3">
          <div className="text-xl">Ventas</div>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold">45</span>
              <span className="text-sm text-zinc-700 dark:text-zinc-400">
                Completed Sales
              </span>
            </div>
          </CardContent>
        </Card>
        <Button className="w-full">Agregar nuevo producto</Button>
      </aside>
      <div className="flex flex-col gap-6 font-bold ">
        <Card className="p-3">
          <div className="text-xl">Empleados</div>
          <CardContent>
            <div className="flex items-center gap-4">
              <img
                alt="Employee image"
                className="rounded-full"
                height="64"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "64/64",
                  objectFit: "cover",
                }}
                width="64"
              />
              <div>
                <span className="font-semibold">John Doe</span>
                <span className="text-sm text-zinc-700 dark:text-zinc-400">
                  {" "}
                  Recent activities
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="p-3">
          <div className="text-xl">Notificaciones</div>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-zinc-700 dark:text-zinc-400">
                No new notifications
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="p-3">
          <div className="text-xl">Alertas</div>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-zinc-700 dark:text-zinc-400">
                No new alerts
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Hero;
