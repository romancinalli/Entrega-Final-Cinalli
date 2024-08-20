

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarritoContext } from "./Context";
import './checkout.css';

function Checkout() {
    const { carrito, vaciarCarrito } = useContext(CarritoContext);
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [dni, setDni] = useState('');
    const navigate = useNavigate();

    const total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

    const handleConfirmarCompra = async (e) => {
        e.preventDefault();

        const formData = {
            nombre,
            telefono,
            direccion,
            dni,
            carrito: carrito.map((producto) => `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio}`).join(", "),
            total: `$${total}`,
        };

        try {
            const response = await fetch('https://formspree.io/f/xzzpavpe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Gracias por su compra. El vendedor se comunicará con usted a la brevedad.');
                vaciarCarrito();
                navigate('/');
            } else {
                alert('Hubo un problema al enviar el formulario. Intente nuevamente.');
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            alert('Hubo un problema al enviar el formulario. Intente nuevamente.');
        }
        console.log('Datos enviados:', formData);

    };

    const handleAnularCompra = () => {
        vaciarCarrito();
        navigate('/');
    };

    return (
        <div className='formContainer'>
            <h2>Checkout</h2>
            <ul>
                {carrito.map((producto, index) => (
                    <li key={index}>
                        {producto.nombre} - Cantidad: {producto.cantidad} - Precio: ${producto.precio}
                    </li>
                ))}
            </ul>
            <h3>Total: ${total}</h3>

            <div >
                <h3>Datos del comprador</h3>
                <input className='input'
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input className='input'
                    type="text"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                />
                <input className='input'
                    type="text"
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                />
                <input className='input'
                    type="text"
                    placeholder="DNI"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                />
            </div>

            <button onClick={handleConfirmarCompra}>Confirmar Compra</button>
            <button onClick={handleAnularCompra}>Anular Compra</button>
        </div>
    );
}

export default Checkout;
