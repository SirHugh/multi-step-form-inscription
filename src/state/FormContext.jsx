import axios from "axios";
import { createContext, useContext, useReducer } from "react";

const FormContext = createContext(null);
const FormDispatchContext = createContext(null);

// custom hook to allow us to access formState
export function useForm() {
  return useContext(FormContext);
}

// custom hook to allow us to access formDispatch
export function useFormDispatch() {
  return useContext(FormDispatchContext);
}

const ApiClient = axios.create({
  baseURL: "http://localhost:8000/",
});

export const searchAlumno = (cedula) => {
  return ApiClient.get(`/academico/alumnos/?cedula=${cedula}`);
};

export const getMatricula = (cedula, anio, value, page) =>
  ApiClient.get(
    `/academico/matricula/?search=${cedula}&anio_lectivo=${anio}&es_activo=${value}&page=${
      page ? page : ""
    }`
  );

export const getAlumno = (id) => {
  return ApiClient.get(`/academico/alumnos/${id}/`);
};

export const newAlumno = (data) => {
  return ApiClient.post(`/academico/alumnos/`, data);
};

export const updateAlumnoById = (id, data) => {
  return ApiClient.patch(`/academico/alumnos/${id}/`, data);
};

export const getCliente = (cedula) => {
  return ApiClient.get(`/academico/cliente/?cedula=${cedula}`);
};

export const newCliente = (data) => {
  return ApiClient.post(`/academico/cliente/`, data);
};

export const updateClienteById = (id, data) => {
  return ApiClient.put(`/academico/cliente/${id}/`, data);
};

export const getResponsable = (cliente, alumno) => {
  return ApiClient.get(
    `/academico/responsable/find/?id_cliente=${cliente}&id_alumno=${alumno}`
  );
};

export const newResponsable = (data) => {
  return ApiClient.post(`/academico/responsable/`, data);
};

export const updateResponsableById = (id, data) => {
  return ApiClient.put(`/academico/responsable/${id}/`, data);
};

export const newMatricula = (data) => {
  return ApiClient.post(`/academico/matricula/`, data);
};

// actions stored in ENUM for future action support
export const REDUCER_ACTIONS = {
  INITIALIZE_ALUMNO: "INITIALIZE_ALUMNO",
  INITIALIZE_RESPONSABLE: "INITIALIZE_RESPONSABLE",
  UPDATE_ALUMNO: "UPDATE_ALUMNO",
  UPDATE_RESPONSABLE: "UPDATE_RESPONSABLE",
  UPDATE_MATRICULA: "UPDATE_MATRICULA",
  UPDATE_INPUT: "UPDATE_INPUT",
  SET_STEP: "SET_STEP",
  SET_ERROR: "SET_ERROR",
  SET_GRADOS: "SET_GRADOS",
  RESET_GRADOS: "RESET_GRADOS",
  GET_GRADO: "GET_GRADO",
};

const initialFormState = {
  alumno: {
    id_alumno: "",
    cedula: "",
    nombre: "",
    apellido: "",
    genero: "",
    fecha_nac: "",
    telefono: "",
    nacionalidad: "",
    direccion: "",
    barrio: "",
    alergico_a: "",
    edad_primer_grado: "",
    curso_jardin: false,
    perfil_psicologico: "",
    cantidad_hermanos: "",
    fotocarnet: "",
  },

  responsable: {
    id_responsable: "",
    id_cliente: "",
    id_alumno: "",
    cedula: "",
    ruc: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    direccion: "",
    tipo: "F",
    tipo_relacion: "",
    ocupacion: "",
    es_activo: true,
  },

  matricula: {
    id_alumno: "",
    id_grado: "",
    fecha_inscripcion: "",
    anio_lectivo: "",
    es_activo: false,
    trabaja: false,
    es_interno: "",
  },

  grados: [],

  currentStep: 1,

  errors: {
    name: undefined,
  },
};

/**
 * Reducers are functions that take the current state and an action as arguments,
 * and return a new state result. (immutable)
 * 
 * @param {*} state -- see initialFormState above
 * @param {*} action 
 * 
 * {
    type: REDUCER_ACTIONS.UPDATE_TEXT_INPUT,
    field: e.target.name,
    payload: e.target.value,
    }
 * 
 * @returns new state
 * 
 * Example Form Reducers
 * https://medium.com/swlh/usereducer-form-example-16675fa60229
 * https://itnext.io/handling-complex-form-state-using-react-hooks-45370515e47
 *     
 */
const formReducer = (state, action) => {
  switch (action.type) {
    case REDUCER_ACTIONS.INITIALIZE_ALUMNO:
      return {
        ...state,
        alumno: { ...action.payload },
      };
    case REDUCER_ACTIONS.INITIALIZE_RESPONSABLE:
      return {
        ...state,
        responsable: { ...state.responsable, ...action.payload },
      };
    case REDUCER_ACTIONS.UPDATE_ALUMNO:
      return {
        ...state,
        alumno: { ...state.alumno, [action.field]: action.payload },
      };
    case REDUCER_ACTIONS.UPDATE_RESPONSABLE:
      return {
        ...state,
        responsable: {
          ...state.responsable,
          [action.field]: action.payload,
        }, // Add to existing array of objects
      };
    case REDUCER_ACTIONS.UPDATE_MATRICULA:
      return {
        ...state,
        matricula: { ...state.matricula, [action.field]: action.payload },
      };

    case REDUCER_ACTIONS.SET_GRADOS:
      return { ...state, grados: [...state.grados, action.payload] };
    case REDUCER_ACTIONS.RESET_GRADOS:
      return { ...state, grados: [] };

    case REDUCER_ACTIONS.UPDATE_INPUT:
      return {
        ...state,
        [action.field]: action.payload,
      };
    case REDUCER_ACTIONS.SET_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          ...action.payload,
        },
      };
    case REDUCER_ACTIONS.SET_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };
    default:
      return state;
  }
};

/**
 * We use a FormProvider: reducer and context paradigm to allow form state
 * to be shared across different steps. This shared state allows us to revist
 * state.
 * @param {*} param0
 * @returns
 *
 * BOILERPLATE from reducer and context react docs:
 * https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context
 *
 */
import { useEffect, useState } from "react";
import { Axios } from "axios";

export function FormProvider({ children }) {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);
  const [authenticated, setAuthenticated] = useState(false);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const token = urlParams.get("auth");

  // const token = new URLSearchParams(location.search).get("token");

  useEffect(() => {
    // Check the local storage for the authentication token

    if (token) {
      // If the token is present, send it on each request to the backend server
      // Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthenticated(true);
    } else {
      // If the token is not present, the user is not authenticated
      setAuthenticated(false);
    }
  }, []);
  return (
    <FormContext.Provider value={formState}>
      <FormDispatchContext.Provider value={dispatch}>
        {!authenticated ? <h1 className="center">Loging please</h1> : children}
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  );
}
