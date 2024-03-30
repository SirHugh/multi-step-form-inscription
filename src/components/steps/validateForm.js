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
  const { name, email, phone } = formState;
  // default: empty strings
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
  const { plan_id } = formState;
  const errors = {
    plan_id: undefined,
  };

  // if (plan_id == undefined) {
  //   errors.plan_id = "You must select an option.";
  // }

  const hasError = !!errors.plan_id;
  return { errors, hasError };
};

export const onValidate = (stepNo, formState) => {
  switch (stepNo) {
    case 1:
      return onValidateStep1(formState);
    case 2:
      return onValidateStep2(formState);
    default:
      return { errors: {}, hasError: false };
  }
};
