import React, { useState, useEffect } from 'react';
import { db } from './service/Firebase';
import Formulario from './components/Formulario';
import Citas from './components/Citas';
function App() {
	const [turnos, setTurnos] = useState([]);
	const [activo, setActivo] = useState(true);

	useEffect(() => {
		const getTurnos = async () => {
			try {
				const data = await db.collection('mensajes').get();
				const arrayData = await data.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));

				setTurnos(arrayData);

				if (turnos.length === 0) {
					setActivo(false);
				} else {
					setActivo(true);
				}
			} catch (e) {
				console.log(e);
			}
		};
		getTurnos();
	}, [turnos]);

	const crearTurnos = async (cita) => {
		const data = await db.collection('mensajes').add(cita);
		setTurnos([...turnos, { ...cita, id: data.id }]);
	};

	const eliminarTurno = (id) => {
		db.collection('mensajes').doc(id).delete();
		const nuevosTurnos = turnos.filter((item) => item.id !== id);
		setTurnos(nuevosTurnos);
	};

	return (
		<div>
			<h1>App de turnos de veterinario </h1>
			<div className='container'>
				<div className='row'>
					<div className='one-half column'>
						<Formulario crearTurnos={crearTurnos} />
					</div>
					<div className='one-half column'>
						<h2>Turnos asignados</h2>
						{turnos.length === 0 && activo === false ? (
							<div className='alert alert-warning text-center mt-3 '>
								<h4 className='alert-heading'>No hay turnos asignados </h4>
								<p>
									<i className='fas fa-exclamation-circle   fa-2x'></i>
								</p>
							</div>
						) : turnos.length > 0 ? (
							turnos.map((item) => (
								<Citas
									eliminarTurno={eliminarTurno}
									key={item.id}
									item={item}
								/>
							))
						) : (
							<div className='alert alert-primary text-center mt-3 '>
								<h4 className='alert-heading'>Cargando... </h4>
								<div class='spinner-border text-primary mt-2' role='status'>
									<span class='visually-hidden'></span>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
