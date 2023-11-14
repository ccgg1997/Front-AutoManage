import React from 'react';
const TableEditDelete = ({ data, editFunc, deleteFunc }) => {
    const columnHeaders = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <table className="border-collapse w-full">
            <thead>
                <tr>
                    {columnHeaders.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((fila, index) => (
                    <tr key={index}>
                        {Object.values(fila).map((value, index) => (
                            <td key={index}>{value}</td>
                        ))}
                        <td>
                            <a href="#" onClick={() => editFunc(fila)} className="text-blue-400 hover:text-blue-600 underline">Edit</a>
                            <a href="#" onClick={() => deleteFunc(fila)} className="text-blue-400 hover:text-blue-600 underline pl-6">Remove</a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableEditDelete;
