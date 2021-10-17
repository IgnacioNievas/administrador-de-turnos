import React from 'react';
import PropTypes from 'prop-types';

const Citas = ({ item, eliminarTurno }) => {
	const turno = new Date(item.reserva).toLocaleString();

	return (
		<div>
			<div className='cita'>
				<p>Nombre de la mascota :</p>
				<span>{item.mascota}</span>
				<p>Pertenece a :</p>
				<span>{item.dueño}</span>
				<p>Día del turno :</p>
				<span>{turno}</span>
				<p>Sus sintomas son :</p>
				<span>{item.sintomas}</span>
				<button
					className='btn btn-outline-danger u-full-width'
					onClick={() => eliminarTurno(item.id)}>
					&times; Eliminar
				</button>
			</div>
		</div>
	);
};

Citas.propTypes = {
	eliminarTurno: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired,
};

export default Citas;
