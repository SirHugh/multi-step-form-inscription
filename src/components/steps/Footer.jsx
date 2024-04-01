import Axios from "axios";
import {
  useForm,
  useFormDispatch,
  REDUCER_ACTIONS,
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
  const ApiClient = Axios.create({
    baseURL: "http://localhost:8000/academico/",
  });

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

  const sendData = () => {
    const alumnoFormData = new FormData();
    const alumno = formState.alumno;

    for (var key in alumno) {
      alumnoFormData.append(key, alumno[key]);
    }

    async function CreateAlumno() {
      try {
        const res = await ApiClient.post("/alumnos/", alumnoFormData);

        if (res.status === 201) {
          const value = res.data.id_alumno;
          const matricula = formState.matricula;
          matricula.id_alumno = value;

          const cliente = {
            cedula: formState.responsable[0].cedula,
            ruc: formState.responsable[0].ruc,
            nombre: formState.responsable[0].nombre,
            apellido: formState.responsable[0].apellido,
            telefono: formState.responsable[0].telefono,
            email: formState.responsable[0].email,
            direccion: formState.responsable[0].direccion,
            tipo: "F",
          };

          const res_cliente = await ApiClient.post("/cliente/", cliente);

          if (res_cliente.status === 201) {
            const responsable = {
              cliente: res_cliente.data.id,
              alumno: res.data.id_alumno,
              ocupacion: formState.responsable[0].ocupacion,
              tipo_relacion: formState.responsable[0].relacion,
              es_activo: "True",
            };

            const res_responsable = await ApiClient.post(
              "/responsable/",
              responsable
            );
            if (res_responsable.status === 201) {
              const res_matricula = await ApiClient.post(
                "/matricula/",
                matricula
              );
              console.log("Matricula: ", matricula);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    CreateAlumno();
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
