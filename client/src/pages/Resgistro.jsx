import React, { useState } from 'react';

function RegistrationForm() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Aquí llamas a tu endpoint en Node para registrar al usuario
        const response = await fetch('http://127.0.0.1:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        if (data.success) {
            // Hacer algo al registrarse exitosamente, por ejemplo, redireccionar o mostrar mensaje
        } else {
            // Mostrar error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
            />
            <input 
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
            />
            <input 
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
            />
            <select 
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
            >
                <option value="admin">Admin</option>
                <option value="user">User</option>
                {/* Agregar más roles según necesites */}
            </select>
            <button type="submit">Registrar</button>
        </form>
    );
}

export default RegistrationForm;
