import Axios from "axios";
import {
  useForm,
  useFormDispatch,
  REDUCER_ACTIONS,
  updateAlumnoById,
  newAlumno,
  updateClienteById,
  updateResponsableById,
  newCliente,
  newResponsable,
  newMatricula,
} from "../../state/FormContext";
import { SubmitButton } from "../form/SubmitButton";
import { onValidate } from "./validateForm";

/**
 * Returns a jsx element or undefined based on step number
 * @returns {JSX.Element | undefined}
 */
export const Footer = () => {
  const formState = useForm();
  const dispatch = useFormDispatch();
  const currentStep = formState.currentStep;

  const updateError = (errors) => {
    dispatch({
      type: REDUCER_ACTIONS.SET_ERROR,
      payload: errors,
    });
  };

  const setStep = (step) => {
    dispatch({
      type: REDUCER_ACTIONS.SET_STEP,
      payload: step,
    });
  };

  const onNextStep = () => {
    const { errors, hasError } = onValidate(currentStep, formState);
    updateError(errors); // will update or clear errors
    if (!hasError) {
      setStep(Math.min(currentStep + 1, 6));
    }
    if (currentStep === 5) {
      sendData();
    }
  };

  const onBackStep = () => {
    setStep(Math.max(currentStep - 1, 1));
  };

  function alumnoData() {
    const alumnoFormData = new FormData();
    const alumno = formState.alumno;

    for (var key in alumno) {
      if (key === "fotocarnet") {
        alumno[key] instanceof File
          ? alumnoFormData.append(key, alumno[key])
          : "";
      } else alumnoFormData.append(key, alumno[key] ? alumno[key] : "");
    }
    return alumnoFormData;
  }

  function cliente() {
    return {
      id_cliente: formState.responsable.id_cliente,
      cedula: formState.responsable.cedula,
      ruc: formState.responsable.ruc,
      nombre: formState.responsable.nombre,
      apellido: formState.responsable.apellido,
      telefono: formState.responsable.telefono,
      email: formState.responsable.email,
      direccion: formState.responsable.direccion,
      tipo: formState.responsable.tipo,
    };
  }

  const responsable = {
    id_responsable: formState.responsable.id_responsable,
    id_cliente: formState.responsable.id_cliente,
    id_alumno: formState.responsable.id_alumno,
    ocupacion: formState.responsable.ocupacion,
    tipo_relacion: formState.responsable.tipo_relacion,
    es_activo: formState.responsable.es_activo,
  };

  const matricula = formState.matricula;

  async function sendAlumno() {
    const id = formState.alumno.id_alumno;
    if (id) {
      try {
        const res = await updateAlumnoById(id, alumnoData());
        console.log("Alumno Updated: ", res.data);
        return true;
      } catch (error) {
        console.error(error);
      }
    }
    try {
      const res = await newAlumno(alumnoData());
      responsable.id_alumno = res.data.id_alumno;
      matricula.id_alumno = res.data.id_alumno;
      console.log("Alumno Created: ", res.data);
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  async function sendCliente() {
    if (cliente().id_cliente) {
      try {
        const res = await updateClienteById(cliente().id_cliente, cliente());
        console.log("Cliente Updated: ", res.data);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    try {
      const res = await newCliente(cliente());
      responsable.id_cliente = res.data.id_cliente;
      console.log("Cliente Created: ", res.data);
      return true;
    } catch (error) {
      console.error(error);
    }
  }

  async function sendResponsable() {
    if (responsable.id_responsable) {
      try {
        const res = await updateResponsableById(
          responsable.id_responsable,
          responsable
        );
        console.log("Responsable Updated: ", res.data);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
    try {
      const res = await newResponsable(responsable);
      console.log("Responsable Created: ", res.data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async function sendMatricula() {
    try {
      const res = await newMatricula(matricula);
      console.log("Matricula Created: ", res.data);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  const sendData = async () => {
    sendAlumno().then(() =>
      sendCliente().then(() => {
        sendResponsable().then(() => {
          sendMatricula();
        });
      })
    );
  };

  if (currentStep <= 6) {
    return (
      <footer className="absolute pr-2">
        <SubmitButton
          stepNo={currentStep}
          onNextStep={onNextStep}
          onBackStep={onBackStep}
        />
      </footer>
    );
  }

  return undefined;
};
