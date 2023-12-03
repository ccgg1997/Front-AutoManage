// ModalComponent.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import CloseIcon from "@mui/icons-material/Close";
import Table from "./Table.jsx";
import { getUsuarios } from "../components/api/adress.js"

const usuariosRaw = [
    {
        "id": 2,
        "email": "admin@admin.com",
        "nombre": "administrador",
        "apellido": "",
        "rol": {
            "id": 2,
            "nombre": "Gerente"
        },
        "estado": null,
        "is_active": true,
        "is_admin": false,
        "is_staff": true,
        "date_joined": "2023-10-14T02:32:50.756290Z",
        "identificacion": "6",
        "sucursal": {
            "id": 1,
            "nombre": "Principal",
            "direccion": "Cra 1 Calle 1",
            "fecha_creacion": "2023-10-19T22:09:00Z"
        },
        "password": "pbkdf2_sha256$600000$JTWlQ2UcapWDg0Y2gFs5qT$JJyEfVyDhNt7R/eMH8TBH9zVC4I0cIsIOuRn472yVIg=",
        "last_login": "2023-10-23T15:41:56.582128Z",
        "is_superuser": false
    },
    {
        "id": 17,
        "email": "vendedor@vendedor.com",
        "nombre": "Vendedor",
        "apellido": "1",
        "rol": {
            "id": 3,
            "nombre": "Vendedor"
        },
        "estado": null,
        "is_active": true,
        "is_admin": false,
        "is_staff": false,
        "date_joined": "2023-11-20T13:07:24.842132Z",
        "identificacion": "1234321",
        "sucursal": {
            "id": 1,
            "nombre": "Principal",
            "direccion": "Cra 1 Calle 1",
            "fecha_creacion": "2023-10-19T22:09:00Z"
        },
        "password": "pbkdf2_sha256$600000$hRCaNj7twEQsTfpSj3knIL$0nd3ksZwW87D3Xg56PvllI3fsb+ZsDP4tzh3pkycjso=",
        "last_login": null,
        "is_superuser": false
    },
    {
        "id": 18,
        "email": "abcd@gmail.com",
        "nombre": "Jose Manuel",
        "apellido": "Bravo",
        "rol": {
            "id": 5,
            "nombre": "Cliente"
        },
        "estado": null,
        "is_active": true,
        "is_admin": false,
        "is_staff": false,
        "date_joined": "2023-11-20T16:44:22.329225Z",
        "identificacion": "123456",
        "sucursal": {
            "id": 1,
            "nombre": "Principal",
            "direccion": "Cra 1 Calle 1",
            "fecha_creacion": "2023-10-19T22:09:00Z"
        },
        "password": "pbkdf2_sha256$600000$14RwOAD4UrGL9k23Rw6xJf$mU1mGhC7kgdOwszuFjMfFHdnZW3JCNsNpfKa5uPSw4w=",
        "last_login": null,
        "is_superuser": false
    },
    {
        "id": 25,
        "email": "valsua04@gmail.com",
        "nombre": "val",
        "apellido": "sua",
        "rol": {
            "id": 4,
            "nombre": "Jefe_Taller"
        },
        "estado": null,
        "is_active": false,
        "is_admin": false,
        "is_staff": false,
        "date_joined": "2023-11-20T20:10:26.226305Z",
        "identificacion": "1006052790",
        "sucursal": {
            "id": 1,
            "nombre": "Principal",
            "direccion": "Cra 1 Calle 1",
            "fecha_creacion": "2023-10-19T22:09:00Z"
        },
        "password": "pbkdf2_sha256$600000$SwEpHzu1M9kYdn9woqv9LL$2LkVWqficj4JrZ+vjAhpf6LG998kc1DX0+ObdIZgRPo=",
        "last_login": null,
        "is_superuser": false
    },
    {
        "id": 26,
        "email": "ana@gmail.com",
        "nombre": "ana",
        "apellido": "perez",
        "rol": {
            "id": 5,
            "nombre": "Cliente"
        },
        "estado": null,
        "is_active": true,
        "is_admin": false,
        "is_staff": false,
        "date_joined": "2023-11-21T19:39:19.294461Z",
        "identificacion": "1241234231",
        "sucursal": {
            "id": 1,
            "nombre": "Principal",
            "direccion": "Cra 1 Calle 1",
            "fecha_creacion": "2023-10-19T22:09:00Z"
        },
        "password": "pbkdf2_sha256$600000$fClUgBxTd5EznRiFUSaypg$OrrGa5GqwYY0Ugg38BfWMfS/0QU6CI451ljv04LhQkU=",
        "last_login": null,
        "is_superuser": false
    },
    {
        "id": 27,
        "email": "jose@mendez.com",
        "nombre": "jose",
        "apellido": "Mendez",
        "rol": {
            "id": 5,
            "nombre": "Cliente"
        },
        "estado": null,
        "is_active": true,
        "is_admin": false,
        "is_staff": false,
        "date_joined": "2023-11-21T19:59:23.092557Z",
        "identificacion": "0000000000",
        "sucursal": {
            "id": 1,
            "nombre": "Principal",
            "direccion": "Cra 1 Calle 1",
            "fecha_creacion": "2023-10-19T22:09:00Z"
        },
        "password": "pbkdf2_sha256$600000$lj1BhUEKdz5gmOs9oL0Wn4$EsOsrGhgjhOvHzHps4QZU2oEFEiF/dpEkFF23fg8gQA=",
        "last_login": null,
        "is_superuser": false
    },
    {
        "id": 28,
        "email": "milena@perez.com",
        "nombre": "milena",
        "apellido": "perez",
        "rol": {
            "id": 3,
            "nombre": "Vendedor"
        },
        "estado": null,
        "is_active": true,
        "is_admin": false,
        "is_staff": false,
        "date_joined": "2023-11-21T20:02:55.074428Z",
        "identificacion": "213123",
        "sucursal": {
            "id": 1,
            "nombre": "Principal",
            "direccion": "Cra 1 Calle 1",
            "fecha_creacion": "2023-10-19T22:09:00Z"
        },
        "password": "pbkdf2_sha256$600000$T9FKWe7wogufKcr92iaZD9$iyCL1i9u5CAtoPLYfg4hEhqmvjVTjOqQa9nvbnRpCLY=",
        "last_login": null,
        "is_superuser": false
    },
    {
        "id": 29,
        "email": "pepito@gmail.com",
        "nombre": "pepito",
        "apellido": "perez",
        "rol": {
            "id": 5,
            "nombre": "Cliente"
        },
        "estado": null,
        "is_active": true,
        "is_admin": false,
        "is_staff": false,
        "date_joined": "2023-11-21T20:10:41.230404Z",
        "identificacion": "32423434",
        "sucursal": {
            "id": 1,
            "nombre": "Principal",
            "direccion": "Cra 1 Calle 1",
            "fecha_creacion": "2023-10-19T22:09:00Z"
        },
        "password": "pbkdf2_sha256$600000$A12xuUs15s8zsZtXsUNyjS$886vlEbV4ziy6jCSzAMEJS3AFAmmKOR52RkMpm8wREY=",
        "last_login": null,
        "is_superuser": false
    },
    {
        "id": 30,
        "email": "isa@perez.com",
        "nombre": "isabela",
        "apellido": "perez",
        "rol": {
            "id": 5,
            "nombre": "Cliente"
        },
        "estado": null,
        "is_active": true,
        "is_admin": false,
        "is_staff": false,
        "date_joined": "2023-11-21T20:45:05.368169Z",
        "identificacion": "323324",
        "sucursal": {
            "id": 1,
            "nombre": "Principal",
            "direccion": "Cra 1 Calle 1",
            "fecha_creacion": "2023-10-19T22:09:00Z"
        },
        "password": "pbkdf2_sha256$600000$VVyoZ8bItDrr8mq8kYYuwY$xB/Z/Vibin6T+Yrpz6AoEzDnlOFe498HjDInvAsXC5g=",
        "last_login": null,
        "is_superuser": false
    },
    {
        "id": 16,
        "email": "valeria.ibarra@correounivalle.edu.co",
        "nombre": "valeria",
        "apellido": "suarez",
        "rol": {
            "id": 4,
            "nombre": "Jefe_Taller"
        },
        "estado": null,
        "is_active": false,
        "is_admin": false,
        "is_staff": false,
        "date_joined": "2023-11-18T23:18:09.427779Z",
        "identificacion": "1234",
        "sucursal": {
            "id": 1,
            "nombre": "Principal",
            "direccion": "Cra 1 Calle 1",
            "fecha_creacion": "2023-10-19T22:09:00Z"
        },
        "password": "pbkdf2_sha256$600000$Ujov7PWpv8xRov9XKO4DSA$QxDQF2U8D747KITomGHbEEGfmvxh7MP9XnRAZvlXXxA=",
        "last_login": null,
        "is_superuser": false
    },
    {
        "id": 31,
        "email": "admin2@admin2.com",
        "nombre": "camilo",
        "apellido": "galvis",
        "rol": {
            "id": 5,
            "nombre": "Cliente"
        },
        "estado": null,
        "is_active": true,
        "is_admin": false,
        "is_staff": false,
        "date_joined": "2023-12-02T04:27:04.708771Z",
        "identificacion": "1143885214",
        "sucursal": {
            "id": 1,
            "nombre": "Principal",
            "direccion": "Cra 1 Calle 1",
            "fecha_creacion": "2023-10-19T22:09:00Z"
        },
        "password": "pbkdf2_sha256$600000$fN6QSNWTojhfyQ4uemxWoV$WldWagfg3UquAIXV0221/zRLZjWg+YAXKowBo2EeQhQ=",
        "last_login": null,
        "is_superuser": false
    },
    {
        "id": 1,
        "email": "test@test.com",
        "nombre": "admin",
        "apellido": "",
        "rol": {
            "id": 1,
            "nombre": "Admin"
        },
        "estado": null,
        "is_active": false,
        "is_admin": true,
        "is_staff": true,
        "date_joined": "2023-10-09T00:03:45.438109Z",
        "identificacion": "3",
        "sucursal": null,
        "password": "pbkdf2_sha256$600000$Fa147klihDxIPYtJIyf7b2$XXzisqxaO1qYJDIlIdxRiFD9lMgqATRbrALAg5BpXKA=",
        "last_login": null,
        "is_superuser": false
    },
    {
        "id": 99,
        "email": "admin1@admin.com",
        "nombre": "administrador",
        "apellido": "admin",
        "rol": {
            "id": 1,
            "nombre": "Admin"
        },
        "estado": null,
        "is_active": true,
        "is_admin": true,
        "is_staff": true,
        "date_joined": "2023-10-14T02:32:50.756000Z",
        "identificacion": "1",
        "sucursal": null,
        "password": "pbkdf2_sha256$600000$JTWlQ2UcapWDg0Y2gFs5qT$JJyEfVyDhNt7R/eMH8TBH9zVC4I0cIsIOuRn472yVIg=",
        "last_login": null,
        "is_superuser": true
    },
    {
        "id": 5,
        "email": "malo@malo.com",
        "nombre": "Prueba Real",
        "apellido": "Real",
        "rol": {
            "id": 2,
            "nombre": "Gerente"
        },
        "estado": "ACTIVO",
        "is_active": true,
        "is_admin": false,
        "is_staff": false,
        "date_joined": "2023-10-16T16:27:28.859319Z",
        "identificacion": "4",
        "sucursal": null,
        "password": "admin",
        "last_login": null,
        "is_superuser": true
    },
    {
        "id": 9,
        "email": "postman24@test.com",
        "nombre": "Prueba Real",
        "apellido": "Real",
        "rol": {
            "id": 2,
            "nombre": "Gerente"
        },
        "estado": "ACTIVO",
        "is_active": true,
        "is_admin": false,
        "is_staff": false,
        "date_joined": "2023-10-16T16:27:28.859319Z",
        "identificacion": "5",
        "sucursal": null,
        "password": "pbkdf2_sha256$600000$FFjn9Yy3QJUDeOhh44RRPo$RGIEfDEUINHIEwilZFfGvsNGWIplGe/IVYSe+NBuHVM=",
        "last_login": null,
        "is_superuser": true
    }
]

const Fade = React.forwardRef(function Fade(props, ref) {
    const {
        children,
        in: open,
        onClick,
        onEnter,
        onExited,
        ownerState,
        ...other
    } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter(null, true);
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited(null, true);
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {React.cloneElement(children, { onClick })}
        </animated.div>
    );
});

Fade.propTypes = {
    children: PropTypes.element.isRequired,
    in: PropTypes.bool,
    onClick: PropTypes.any,
    onEnter: PropTypes.func,
    onExited: PropTypes.func,
    ownerState: PropTypes.any,
};

// const useStyles = makeStyles({
//     root: {
//         '& .MuiDataGrid-row': {
//             maxHeight: 50, // Establece el alto máximo deseado para las filas
//         },
//     },
// });

const BuscarClienteModal = ({ open, handleClose, handleSelection }) => {
    // const classes = useStyles();
    const { token } = useSelector((state) => state.auth);
    const [dataUsuarios, setDataUsuarios] = useState([]);
    const titles = [
        { field: "identificacion", headerName: "Identificación", maxWidth: 130 },
        { field: "nombre", headerName: "Nombre" },
        { field: "email", headerName: "Email" },
        {
            field: "accion",
            headerName: "Acción",
            maxWidth: 140,
            renderCell: (params) => (
                <div>
                    <button
                        className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded justify-center items-center"
                        onClick={() => handleSelection(params.row)}
                    >
                        Seleccionar
                    </button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            let usuariosBd = await getUsuarios(token);
            const usuarios = usuariosBd.map((usuario) => {
                return {
                    id: usuario.id,
                    email: usuario.email,
                    nombre: usuario.nombre + " " + usuario.apellido,
                    identificacion: usuario.identificacion
                }
            });
            setDataUsuarios(usuarios);
        };
        fetchData();
    }, []);

    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    TransitionComponent: Fade,
                },
            }}
            className="fixed inset-0 bg-gray-500 bg-opacity-75"
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 3,
                        width: "55%", // Ancho del 50%
                        height: "80%", // Alto del 50%
                        overflowY: "auto", // Para el desplazamiento si el contenido excede el alto
                    }}
                    className="flex "
                >

                    <div className="w-full">
                        <Button
                            onClick={handleClose}
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                            }}
                        >
                            <CloseIcon />
                        </Button>
                        <div className='flex justify-center'>
                            <Typography id="spring-modal-title" variant="h6" component="h2">
                                Buscar Cliente
                            </Typography>
                        </div>
                        <div className='flex justify-center items-center mt-4'>
                            <Table data={dataUsuarios} titles={titles} />

                        </div>
                    </div>
                </Box>
            </Fade>
        </Modal>
    );
};

export default BuscarClienteModal;
