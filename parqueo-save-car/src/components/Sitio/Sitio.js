import React, { useState } from 'react'
import './Sitio.css'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import EntradaInput from './EntradasModal/EntradaInput';
import DisplayComponent from './DisplayComponent';
import { ref, set } from "firebase/database";
import { database } from '../../conexion/firebase';
//import BtnComponent from './BtnComponent';
const Sitio = (props) => {
  const [estado,setEstado]=useState(props.estado)

  const [modalEstado,setModalEstado]= useState(false);
  const [modalTerminar,setModalTerminar]= useState(false);
  const [modalHabilitar,setModalHabilitar]= useState(false);
  const [modalReserva,setModalReserva]= useState(false);
  //mensajes
  const [mostrarMensajePlaca,setMostrarMensajePlaca]=useState(false);
  const [mostrarMensajeCi,setMostrarMensajeCi]=useState(false);
  const [mostrarMensajeCelular,setMostrarMensajeCelular]=useState(false);
  const [mostrarMensajeMotivo,setMostrarMensajeMotivo]=useState(false);
  const [mensajePlaca,setMensajePlaca]=useState('');
  const [mensajeCi,setMensajeCi]=useState('');
  const [mensajeCelular,setMensajeCelular]=useState('');
  const [mensajeMotivo,setMensajeMotivo]=useState('');
  //mostrar cronometro
  const [mostrarCronometro,setMostrarCronometro]=useState(false)
  //valores de los inputs
  const [values, setValues] = useState({
    placa:'',
    ci:'',
    celular:'',
    motivo:''
  });
  const onChange = (e)=>{
    setValues({ ...values, [e.target.name]: e.target.value });
  }
  //colores
  const cardColors ={
    active: '#00FF38',
    inactive: '#BC0000',
    pending: '#FC6901',
    completed: '#0050C8'
  };
  const escogerColor=()=>{
    let colorElegido=''
    let estado=props.estado;
    if(estado==='disponible'){
      colorElegido=cardColors.active
    }else if(estado==='ocupado'){
      colorElegido=cardColors.completed
    }
    return colorElegido;
  }
  const [cardColor,setCardColor] = useState(escogerColor());
  //const [color, setColor] = useState('#00FF38');
  //mostrarInputs
  const [placa,setPlaca]=useState(true)
  const [ci,setCi]=useState(true)
  const [celular,setCelular]=useState(true)
  const [motivo,setMotivo]=useState(true)
  
  /*const cambiarColor = (newColor) => {
    setColor(newColor);
  };  */
  //Tiempo
  
  const cambiarEstado=()=>{
    if(estado==='disponible'){
      setPlaca(true)
      setCi(true)
      setCelular(true)
      setMotivo(false)
      setModalEstado(true)
    }else if(estado==='ocupado'){
      stop()
      setModalTerminar(!modalTerminar)
      calcularMonto()
    }else if(estado==='deshabilitado'){
      setModalHabilitar(!modalHabilitar)
    }else if(estado==='reservar'){
      setModalReserva(!modalReserva)
      stopTemp()
    }
  }
  const validarInputPlaca=(contenido,mostrar,mensajeAlerta,regla,min,max)=>{
    let esInvalido=false;
    let tam=contenido.length
      if(!contenido.trim()){
        setMostrarMensajePlaca(mostrar)
        setMensajePlaca('El campo no puede estar vacío')
        esInvalido=true
      }else if(tam<min||tam>max){
        setMostrarMensajePlaca(mostrar)
        setMensajePlaca('El campo tiene límite mínimo de '+min+' carácteres y un máximo de '+max+' carácteres')
        esInvalido=true
      }else if(!regla.test(contenido)){
        setMostrarMensajePlaca(mostrar)
        setMensajePlaca(mensajeAlerta)
        esInvalido=true
      }else{
        setMostrarMensajePlaca(false)
        //setMensajePlaca(null)
      }
      return esInvalido;}
  const validarInputCi=(contenido,mostrar,mensajeAlerta,regla,min,max)=>{
    let esInvalido=false;
    let tam=contenido.length
      if(!contenido.trim()){
        setMostrarMensajeCi(mostrar)
        setMensajeCi('El campo no puede estar vacío')
        esInvalido=true
      }else if(tam<min||tam>max){
        setMostrarMensajeCi(mostrar)
        setMensajeCi('El campo tiene límite mínimo de '+min+' carácteres y un máximo de '+max+' carácteres')
        esInvalido=true
      }else if(!regla.test(contenido)){
        setMostrarMensajeCi(mostrar)
        setMensajeCi(mensajeAlerta)
        esInvalido=true
      }else{
        setMostrarMensajeCi(false)
        //setMensajeCi(null)
      }
      return esInvalido;}
  const validarInputCelular=(contenido,mostrar,mensajeAlerta,regla,min,max)=>{
    let esInvalido=false;
    let tam=contenido.length
      if(!contenido.trim()){
        setMostrarMensajeCelular(mostrar)
        setMensajeCelular('El campo no puede estar vacío')
        esInvalido=true
      }else if(tam<min||tam>max){
        setMostrarMensajeCelular(mostrar)
        setMensajeCelular('El campo tiene límite mínimo de '+min+' carácteres y un máximo de '+max+' carácteres')
        esInvalido=true
      }else if(!regla.test(contenido)){
        setMostrarMensajeCelular(mostrar)
        setMensajeCelular(mensajeAlerta)
        esInvalido=true
      }else{
        setMostrarMensajeCelular(false)
        //setMensajeCelular(null)
      }
      return esInvalido;
    }
  const validarInputMotivo=(contenido,mostrar,mensajeAlerta,regla,min,max)=>{
    let esInvalido=false;
    let tam=contenido.length
      if(!contenido.trim()){
        setMostrarMensajeMotivo(mostrar)
        setMensajeMotivo('El campo no puede estar vacío')
        esInvalido=true
      }else if(tam<min||tam>max){
        setMostrarMensajeMotivo(mostrar)
        setMensajeMotivo('El campo tiene límite mínimo de '+min+' carácteres y un máximo de '+max+ 'carácteres')
        esInvalido=true
      }else if(!regla.test(contenido)){
        setMostrarMensajeMotivo(mostrar)
        setMensajeMotivo(mensajeAlerta)
        esInvalido=true
      }else{
        setMostrarMensajeMotivo(false)
        //setMensajeMotivo(null)
      }
    return esInvalido;
  }
  const ejecutarAccion=()=>{
    //formato
    const regexAll = /^[0-9A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    const regexNumber = /^[0-9]+$/;
    const regexPlaca = /^[0-9A-ZÑÁÉÍÓÚÜ\s]+$/;
    //mensajes alertas
    let alertaPlaca='Solo se permiten carácteres alfanuméricos y mayúsculas'
    let alertaCi='Solo se permiten carácteres numéricos'
    let alertaCelular='Solo se permiten carácteres numéricos'
    let alertaMotivo='Solo se permiten carácteres alfanuméricos'
    if(accSel==='ocupar'){
      let validarPlaca=!validarInputPlaca(values.placa,true,alertaPlaca,regexPlaca,6,8)
      let validarCi=!validarInputCi(values.ci,true,alertaCi,regexNumber,6,9)
      let validarCelular=!validarInputCelular(values.celular,true,alertaCelular,regexNumber,7,8)
      let validar=validarPlaca&&validarCi&&validarCelular
      if(validar===true){
        setModalEstado(false)
        setEstado('ocupado')
        setCardColor(cardColors.completed)
        setMostrarCronometro(true)
        start()
      }
    }else if(accSel==='reservar'){
      let validarPlaca=!validarInputPlaca(values.placa,true,alertaPlaca,regexPlaca)
      let validarCi=!validarInputCi(values.ci,true,alertaCi,regexNumber)
      let validarCelular=!validarInputCelular(values.celular,true,alertaCelular,regexNumber)
      let validar=validarPlaca&&validarCi&&validarCelular
      if(validar===true){
        setModalEstado(false)
        setEstado('reservar')
        setCardColor(cardColors.pending)
        clearInterval(intert);
        updatedS=10;updatedTM=0;
        setTimeTemp({tms:0, ts:updatedS, tm:updatedTM, th:0})
        startTemp()
      }
    }else if(accSel==='deshabilitar'){
      if(!validarInputMotivo(values.motivo,true,alertaMotivo,regexAll,3,50)){
        setModalEstado(false)
        setEstado('deshabilitado')
        setCardColor(cardColors.inactive)
      }
    }
  }
  const cancelarAccion=()=>{
    quitarMensajesError()
    setModalEstado(false)
  }
  const habilitarSitio=()=>{
    setModalHabilitar(!modalHabilitar)
    //cambiarColor('#00FF38')
    setEstado('disponible')
    setCardColor(cardColors.active)
    setAccSel('ocupar')
  }
  const disponerSitio=()=>{
    setModalTerminar(!modalTerminar)
    //cambiarColor('#00FF38')
    setEstado('disponible')
    setCardColor(cardColors.active)
    setMostrarCronometro(false)
    reset()
    let fecha=new Date()
    let fechaAct=fecha.toDateString();
    let ingreso={monto:monto,fecha:fechaAct}
    console.log(ingreso)
    set(ref(database, "ingresos/"+(1)), ingreso);
  }
  const cancelarHabilitar=()=>{
    setModalHabilitar(!modalHabilitar)
  }
  const cancelarDisponer=()=>{
    resume()
    setModalTerminar(!modalTerminar)
  }
  //let accionSeleccionada='ocupar'
  const [accSel,setAccSel]=useState('ocupar')
  //quitar mensajes error
  const quitarMensajesError=()=>{
    setMostrarMensajePlaca(false)
    setMostrarMensajeCi(false)
    setMostrarMensajeCelular(false)
    setMostrarMensajeMotivo(false)
  }
  const registrarCambio=(e)=>{
    //accionSeleccionada=e.target.value;
    quitarMensajesError()
    setAccSel(e.target.value)
    if(e.target.value==='ocupar'){
      setPlaca(true)
      setCi(true)
      setCelular(true)
      setMotivo(false)
    }else if(e.target.value==='reservar'){
      resetTemp()
      setPlaca(true)
      setCi(true)
      setCelular(true)
      setMotivo(false)
    }else if(e.target.value==='deshabilitar'){
      setPlaca(false)
      setCi(false)
      setCelular(false)
      setMotivo(true)
    }
  }
  //Reservar
  const ocuparSitio=()=>{
    //setModalHabilitar(!modalHabilitar)
    resetTemp()
    setModalReserva(!modalReserva)
    setEstado('ocupado')
    setCardColor(cardColors.completed)

  }
  const cancelarReserva=()=>{
    resumeTemp()
    setModalReserva(!modalReserva)
  }
  const terminarReserva=()=>{
    setEstado('disponible')
    setCardColor(cardColors.active)
  }
  //cronometro
  const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  //const [status, setStatus] = useState(0);
  const start = () => {
    run();
    //setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs === 100){
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  };

  const stop = () => {
    clearInterval(interv);
    //setStatus(2);
  };

  const reset = () => {
    clearInterval(interv);
    //setStatus(0);
    setTime({ms:0, s:0, m:0, h:0})
  };

  const resume = () => start();
  const [monto,setMonto]=useState(0.0)
  const calcularMonto=()=>{
    if(time.m<=1){
      setMonto(3.0)
    }else if(time.m>1&&time.m<=4){
      setMonto(6.0)
    }else if(time.m>4){
      setMonto(10.0)
    }
  }
  //Temporizador
  const [timeTemp, setTimeTemp] = useState({tms:0, ts:10, tm:0, th:0});
  const [intert, setIntert] = useState();
  const startTemp = () => {
    //updatedTS = timeTemp.ts; updatedTM = timeTemp.tm;
    if(updatedTM === 0 && updatedTS === 0){
      console.log('verde')
      
      setIntert(clearInterval(intert));
      //console.log('verde')
    }else{
      runTemp();
      setIntert(setInterval(runTemp, 1000));
    }
   // let interval=setInterval()
  };
  var updatedTS = timeTemp.ts, updatedTM = timeTemp.tm;

  const runTemp = () => {
    //let continuar=true;
    if(updatedTM === 0 && updatedTS === 0){
      //clearInterval(intert);
      //setTimeTemp({ ts:0, tm:1});
      //continuar=false;
      stopTemp()
      resetTemp()
      
      console.log('verde')
      terminarReserva()
      setTimeTemp({ ts:10, tm:0});
      //stopTemp()
      clearInterval(intert)
    }else if(updatedTS === 0){
      updatedTM--;
      updatedTS = 60;
    }
    if(updatedTM >= 0 && updatedTS >= 0){
    updatedTS--;
  }
    return setTimeTemp({ ts:updatedTS, tm:updatedTM});
  
  };
  const stopTemp = () => {
    clearInterval(intert);
    setTimeTemp({tms:0, ts:updatedTS, tm:updatedTM, th:0})
  };

  const resetTemp = () => {
    clearInterval(intert);
    setTimeTemp({tms:0, ts:10, tm:0, th:0})
  };

  const resumeTemp = () => startTemp();
  
  return (
    
    <div>
        <div className='sitio' onClick={cambiarEstado} style={{ backgroundColor: cardColor}}>
            <h2>{props.nombre}</h2>
            {mostrarCronometro &&<div className='cronometroSitio'>
              <DisplayComponent time={time}/>
            </div>}
        </div>
        
        <Modal isOpen={modalEstado} centered={true}>
          <div className='modalHeader'>
          <ModalHeader >
            <p className='asig'>Asignar sitio</p>
            <p className='asig'>{props.nombre}</p>
          </ModalHeader>
          </div>
          <ModalBody>
            <select onChange={(e)=>registrarCambio(e)}>
              <option value='ocupar' selected>OCUPAR</option>
              <option value='reservar'>RESERVAR</option>
              <option value='deshabilitar'>DESHABILITAR</option>
            </select>
            {placa&&<EntradaInput
              titulo="Placa"
              nombre='placa'
              cambio={onChange}
              mostrarMensaje={mostrarMensajePlaca} 
              mensaje={mensajePlaca}
            /> }
              {ci&&<EntradaInput
              titulo="CI"
              nombre='ci'
              cambio={onChange}
              mostrarMensaje={mostrarMensajeCi} 
              mensaje={mensajeCi}
            />}
              {celular&&<EntradaInput
              titulo="Celular"
              nombre='celular'
              cambio={onChange}
              mostrarMensaje={mostrarMensajeCelular}
              mensaje={mensajeCelular} 
            />}
            {motivo&&<EntradaInput
              titulo="Motivo"
              nombre='motivo'
              cambio={onChange}
              mostrarMensaje={mostrarMensajeMotivo}
              mensaje={mensajeMotivo}
            />}
          </ModalBody>
          <div className='modalFooter'>
          <ModalFooter>
            <div className='botonesModalSitio'>
          <Button onClick={ejecutarAccion} className='botonModal' style={{
              ...StyleSheet.buttonModal,padding:'6px 26px',
            }}>Aplicar</Button>
            </div>
          <Button onClick={cancelarAccion} className='botonModal' style={{
              ...StyleSheet.buttonModal,padding:'6px 20px',
            }}>Cancelar</Button>
            
          </ModalFooter>
          </div>
        </Modal>
        <Modal isOpen={modalTerminar} centered={true}>
          <ModalHeader>
            <h2>Terminar</h2>
          </ModalHeader>
          <ModalBody>
            <h3>{props.nombre}</h3>
            <DisplayComponent time={time}/>
            <div>{monto} Bs.</div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={disponerSitio} style={{
              ...StyleSheet.buttonModal,
              backgroundColor:"#00B9BC"
            }}>Aplicar</Button>
            <Button onClick={cancelarDisponer} style={{
              ...StyleSheet.buttonModal,
              backgroundColor:"#F46D21",
            }}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalHabilitar} centered={true}>
          <ModalHeader>
            <h2>Habilitar Sitio</h2>
          </ModalHeader>
          <ModalBody>
            <h3>{props.nombre}</h3>
            
          </ModalBody>
          <ModalFooter>
            <Button onClick={habilitarSitio} style={{
              ...StyleSheet.buttonModal,
              backgroundColor:"#00B9BC"
            }}>Aplicar</Button>
            <Button onClick={cancelarHabilitar} style={{
              ...StyleSheet.buttonModal,
              backgroundColor:"#F46D21",
            }}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={modalReserva} >
          <ModalHeader>
            <h2>Ocupar</h2>
          </ModalHeader>
          <ModalBody>
            <h3>A3</h3>
          </ModalBody>
          <ModalFooter>
            <Button onClick={ocuparSitio} style={{
              ...StyleSheet.buttonModal,
              backgroundColor:"#00B9BC"
            }}>Aplicar</Button>
            <Button onClick={cancelarReserva} style={{
              ...StyleSheet.buttonModal,
              backgroundColor:"#F46D21",
            }}>Cancelar</Button>
          </ModalFooter>
        </Modal>
    </div>
  )
}

export default Sitio