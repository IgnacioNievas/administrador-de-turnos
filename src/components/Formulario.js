import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';

const Formulario = ({ crearTurnos }) => {
	const [cita, setCita] = useState({
		mascota: '',
		dueño: '',
		reserva: '',
		sintomas: '',
		email: '',
	});

	const actualizarCitas = (e) => {
		setCita({ ...cita, [e.target.name]: e.target.value });
	};
	const { mascota, dueño, reserva, sintomas, email } = cita;

	const submitCita = async (e) => {
		e.preventDefault();

		const localFullYear = new Date().getUTCFullYear();
		const localMilis = Date.now();

		const userFullYear = new Date(reserva).getUTCFullYear();
		const userHora = new Date(reserva).getHours();
		const userMinutes = new Date(reserva).getMinutes();
		const userMilis = new Date(reserva).getTime();

		if (
			!mascota.trim() ||
			!dueño.trim() ||
			!reserva.trim() ||
			!sintomas.trim() ||
			!email.trim()
		) {
			Swal.fire({
				title: 'Todos los campos son Obligatarios',
				text: 'Llenarlos por favor',
				icon: 'warning',
				timer: 3000,
				timerProgressBar: true,
				allowEnterKey: false,
				allowEscapeKey: false,
				allowOutsideClick: false,
				showConfirmButton: false,
			});
			return;
		}

		if (mascota.length > 50 || dueño.length > 50) {
			Swal.fire({
				title:
					'El nombre de la mascota o del dueño debe contener menos de 20 caracteres',
				text: 'Intente sin muchos espacios',
				icon: 'warning',
				timer: 3000,
				timerProgressBar: true,
				allowEnterKey: false,
				allowEscapeKey: false,
				allowOutsideClick: false,
				showConfirmButton: false,
			});
			return;
		}

		const expReg =
			/^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,63}$/i;
		if (!expReg.test(email)) {
			Swal.fire({
				title: ' verifique el email',
				text: 'que contenga @ , un .com o el que sea , por ejemplo uno correcto: nacho@gmail.com',
				icon: 'warning',
				timer: 3000,
				timerProgressBar: true,
				allowEnterKey: false,
				allowEscapeKey: false,
				allowOutsideClick: false,
				showConfirmButton: false,
			});
			return;
		}

		if (sintomas.length > 500) {
			Swal.fire({
				title: ' Debe contener menos de 500 caracteres',
				text: 'Intente sin muchos espacios',
				icon: 'warning',
				timer: 3000,
				timerProgressBar: true,
				allowEnterKey: false,
				allowEscapeKey: false,
				allowOutsideClick: false,
				showConfirmButton: false,
			});
			return;
		}

		if (userFullYear < localFullYear) {
			Swal.fire({
				title: 'Introduzca bien el año, por favor gracias',
				icon: 'warning',
				timer: 3000,
				timerProgressBar: true,
				allowEnterKey: false,
				allowEscapeKey: false,
				allowOutsideClick: false,
				showConfirmButton: false,
			});
			return;
		} else if (userHora < 10 || (userHora >= 18 && userMinutes >= 0)) {
			Swal.fire({
				title: 'La veterinaria abre de 10 a 19hs',
				text: 'Pero los turnos se otorgan de 10 a 18hs',
				icon: 'warning',
				timer: 3000,
				timerProgressBar: true,
				allowEnterKey: false,
				allowEscapeKey: false,
				allowOutsideClick: false,
				showConfirmButton: false,
			});
			return;
		} else if (localMilis > userMilis) {
			Swal.fire({
				title: 'Verifique que el Día  o la hora del turno, por favor gracias',
				icon: 'warning',
				timer: 3000,
				timerProgressBar: true,
				allowEnterKey: false,
				allowEscapeKey: false,
				allowOutsideClick: false,
				showConfirmButton: false,
			});
			return;
		}

		crearTurnos(cita);

		setCita({ mascota: '', dueño: '', reserva: '', sintomas: '', email: '' });
	};
	return (
		<div>
			<h2>Crear Turno</h2>
			<form>
				<label htmlFor='mascota'> *Nombre de mascota</label>
				<input
					type='text'
					name='mascota'
					className='u-full-width'
					placeholder='Nombre de la mascota'
					onChange={actualizarCitas}
					value={mascota}
				/>
				<label htmlFor='dueño'>* Nombre del dueño </label>
				<input
					type='text'
					name='dueño'
					className='u-full-width'
					placeholder='Nombre del dueño de la mascota'
					onChange={actualizarCitas}
					value={dueño}
				/>

				<label htmlFor='email'>* Email del dueño </label>
				<input
					type='email'
					name='email'
					className='u-full-width'
					placeholder='Email'
					onChange={actualizarCitas}
					value={email}
					required
				/>

				<label htmlFor='reserva'>*Reserve el dia y la hora</label>
				<input
					type='datetime-local'
					name='reserva'
					className='u-full-width'
					onChange={actualizarCitas}
					value={reserva}
				/>
				<label htmlFor='sintomas'>*Sintomas</label>

				<textarea
					name='sintomas'
					className='u-full-width'
					onChange={actualizarCitas}
					value={sintomas}></textarea>

				<button
					type='submit'
					className='u-full-width button-primary'
					onClick={submitCita}>
					Agregar
				</button>
			</form>
		</div>
	);
};

Formulario.propTypes = {
	crearTurnos: PropTypes.func.isRequired,
};

export default Formulario;
