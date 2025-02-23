import { useState, useEffect } from 'react';
import Mensaje from './Mensaje';
import CerrarBtn from '../img/cerrar.svg';


const Modal = ({ 
    setModal, 
    animarModal, 
    setAnimarModal, 
    guardarGasto, 
    gastoEditar,
    setGastoEditar

     }) => {

    const [ mensaje, setMensaje ] = useState('');

    const [ nombre, setNombre ] = useState('');
    const [ cantidad, setCantidad ] = useState(0);
    const [ categoria, setCategoria ] = useState('');
    const [ fecha, setFeacha ] = useState('');
    const [ id, setId ] = useState('');


    useEffect(() => {

        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFeacha(gastoEditar.fecha)
        }

    }, [])

    
    const cerrarModal = () => {
        setAnimarModal(false);
        setGastoEditar({});
        setTimeout(() => {
            setModal(false);
        }, 500);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios.');
            setTimeout(() => {
                setMensaje('');
            }, 2500);
            return;
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha});
    }

    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img src={CerrarBtn} 
                     alt="cerrar modal"
                     onClick={cerrarModal} />
            </div>

            <form
                onSubmit={handleSubmit} 
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>

                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>

                {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

                <div className='campo'>
                    <label htmlFor="nombre">Nombre del Gasto</label>
                    <input type="text"
                            id='nombre'
                            placeholder='Añade el Nombre del Gasto'
                            value={nombre}
                            onChange={ e => setNombre(e.target.value)} />
                </div>

                <div className='campo'>
                    <label htmlFor="cantidad">Cantidad</label>
                    <input type="number"
                            id='cantidad'
                            placeholder='Añade la cantidad del Gasto: ej. 300'
                            value={cantidad}
                            onChange={ e => setCantidad(Number(e.target.value))} />
                </div>

                <div className='campo'>
                    <label htmlFor="categoria">Categoria</label>
                    <select id="categoria"
                            value={categoria}
                            onChange={ e => setCategoria(e.target.value) } >
                        <option value="">-- SELECCIONE --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos en General</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit"
                        value={gastoEditar.nombre ? 'Actualizar Gasto' : 'Añadir Gasto'} />
            </form>

        </div>
    )
}

export default Modal


