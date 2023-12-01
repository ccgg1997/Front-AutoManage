// Tarjet.js
import React from "react";
import {
  WrenchIcon,
  BookmarkIcon,
  StarIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { TextField,Box } from '@mui/material';
import { useState } from "react";

const Tarjet = ({
  iconType,
  title = "Título predeterminado",
  description = "Descripción predeterminada"
}) => {
  const Icon =
    {
      wrench: WrenchIcon,
      bookmark: BookmarkIcon,
      star: StarIcon,
      arrowRight: ArrowRightIcon,
    }[iconType] || WrenchIcon; // Default Icon

    const [input, setInput] = useState("")

    const onCheckout = () => {console.log(input)}
    const inputChange = (e) => {
        setInput(e.target.value)
        }

  return (
    <div className="bg-white rounded-3xl p-4 shadow-xl w-full h-auto">
      <div className="flex justify-center items-center gap-4 mb-6 p-4 flex-col">
        <div className="bg-amber-500/10 flex items-center justify-center rounded-full w-12 h-12">
          <Icon className="h-16 w-16 text-amber-500" />
        </div>
        <div>
          <h2 className="font-medium">{title}</h2>
          <p className="text-sm text-neutral-500">{description}</p>
        </div>
      </div>

      <div className="flex justify-start p-2 items-start"> <h3  className="font-medium"> Ingrese el numero de orden</h3>  </div>

      <div className="flex justify-center items-center flex-col mt-1">
        <Box
          sx={{
            width: 100,
            minWidth: "100%",
          }}
        >
          <TextField fullWidth label="No. Orden" id="fullWidth" onChange={inputChange} value={input} ></TextField>
        </Box>
        <button
          type="button"
          className="flex items-center gap-2 p-2  mt-10 rounded-lg hover:bg-white transition-colors"
          onClick={onCheckout}
        >
          Consultar <ArrowRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Tarjet;
