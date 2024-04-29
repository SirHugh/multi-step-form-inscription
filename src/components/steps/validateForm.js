// As per the HTML Specification
const emailRegExp =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const defaultError = "Este campo es requerido";

/**
 * a function that validates the step1 form inputs.
 * @param {*} formState
 * @returns
 */
const onValidateStep1 = (formState) => {
  const errors = {
    name: "",
  };

  const { cedula, nombre, apellido, genero, fecha_nac, nacionalidad } =
    formState.alumno;

  if (
    !cedula ||
    !nombre ||
    !apellido ||
    !genero ||
    !fecha_nac ||
    !nacionalidad
  ) {
    errors.name = defaultError;
    console.log(errors);
  }

  const hasError = !!errors.name;
  return { errors, hasError };
};

const onValidateStep2 = (formState) => {
  const errors = {
    name: "",
  };
  const hasError = !!errors.name;
  return { errors, hasError };
};

const onValidateStep3 = (formState) => {
  const errors = {
    name: "",
  };

  const { cedula, nombre, apellido, telefono, tipo_relacion } =
    formState.responsable;

  if (!cedula || !nombre || !apellido || !telefono || !tipo_relacion) {
    errors.name = defaultError;
  }

  const hasError = !!errors.name;
  return { errors, hasError };
};

const onValidateStep4 = (formState) => {
  const errors = {
    name: "",
  };

  const { id_grado, fecha_inscripcion, anio_lectivo, es_interno } =
    formState.matricula;
  if (!id_grado || !fecha_inscripcion || !anio_lectivo || !es_interno) {
    errors.name = defaultError;
  }
  const hasError = !!errors.name;
  return { errors, hasError };
};

export const onValidate = (stepNo, formState) => {
  switch (stepNo) {
    case 1:
      return onValidateStep1(formState);
    case 2:
      return onValidateStep2(formState);
    case 3:
      return onValidateStep3(formState);
    case 4:
      return onValidateStep4(formState);
    default:
      return { errors: {}, hasError: false };
  }
};
