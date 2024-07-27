import { Input } from "../form/Input";
import {
  getAlumno,
  getMatricula,
  REDUCER_ACTIONS,
  searchAlumno,
  useForm,
  useFormDispatch,
} from "../../state/FormContext";
import { useContext, useEffect } from "react";
import Axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { BiError } from "react-icons/bi";

export function Step1Form() {
  const formState = useForm();
  const dispatch = useFormDispatch();
  const ApiClient = Axios.create({
    baseURL: "http://localhost:8000/",
  });

  //------------------------------------------------
  useEffect(() => {
    const getGrado = async () => {
      try {
        let response = await ApiClient.get("/academico/grados/");
        if (response.status === 200) {
          console.log("Got grados data!");
          dispatch({ type: REDUCER_ACTIONS.RESET_GRADOS });
          response.data.map((data) => {
            dispatch({
              type: REDUCER_ACTIONS.SET_GRADOS,
              index: data.id_grado,
              payload: data,
            });
          });
        } else {
          throw new Error(
            `Error ${response.status}: Could not fetch the grados`
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGrado();
  }, []);

  const renderLabel = (label, required) => {
    return (
      <span>
        {label}
        {required && <span style={{ color: 'red' }}>*</span>}
      </span>
    );
  };
  

  //------------------------------------------------
  const handleTextChange = (e) => {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_ALUMNO,
      field: e.target.name,
      payload: e.target.value,
    });
    console.log(formState.alumno);
  };

  const handdleSearch = async () => {
    if (!formState.alumno.cedula) {
      console.log("no hay cedula");
      return;
    }
    try {
      const res = await searchAlumno(formState.alumno.cedula);
      if (!res.data[0]) {
        console.log("no hay datos");
        return;
      }
      const cedula = res.data[0].cedula;
      const anio_lectivo = new Date().getFullYear();
      const es_activo = true; //activo
      const res2 = await getMatricula(cedula, anio_lectivo, es_activo);
      if (res2.data[0]) {
        dispatch({
          type: REDUCER_ACTIONS.UPDATE_ALUMNO,
          field: "cedula",
          payload: "",
        });
        toast(
          "El numero de cedula corresponde a un alumno que se encuentra activo en el presente año lectivo",

          {
            duration: 5000,
            icon: <BiError color="red" fontSize="5.5em" />,
          }
        );
        return;
      }
      console.log(res2.data[0]);
      const id = res.data[0].id_alumno;
      const res3 = await getAlumno(id);
      console.log(res3.data);
      dispatch({
        type: REDUCER_ACTIONS.INITIALIZE_ALUMNO,
        payload: res3.data,
      });
      dispatch({
        type: REDUCER_ACTIONS.UPDATE_MATRICULA,
        field: "id_alumno",
        payload: res3.data.id_alumno,
      });
      dispatch({
        type: REDUCER_ACTIONS.UPDATE_RESPONSABLE,
        field: "id_alumno",
        payload: res3.data.id_alumno,
      });
    } catch (error) {}
    console.log(formState.alumno);
  };

  return (
    <div className="form-container">
      <Toaster dur />
      <h2>Informacion Del Alumno</h2>
      <p className="mb-1">Favor proveer los siguientes datos del alumno.</p>
  
      <Input
        label={renderLabel('Cedula', true)}
        error={!formState.alumno.cedula ? formState.errors.name : ""}
        type="number"
        name="cedula"
        autoComplete="off"
        placeholder="ej. 5643234"
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.cedula}
        required
        onBlur={() => handdleSearch()}
      />
      <Input
        label={renderLabel('Nombre', true)}
        error={!formState.alumno.nombre ? formState.errors.name : ""}
        type="text"
        name="nombre"
        placeholder="ej. Juan Carlos"
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.nombre}
        required
      />
      <Input
        label={renderLabel('Apellido', true)}
        error={!formState.alumno.apellido ? formState.errors.name : ""}
        type="text"
        name="apellido"
        placeholder="ej. Martinez Ortiz"
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.apellido}
        required
      />
      <Input
        label={renderLabel('Fecha De Nacimiento', true)}
        error={!formState.alumno.fecha_nac ? formState.errors.name : ""}
        type="date"
        name="fecha_nac"
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.fecha_nac}
        required
      />
      <Input
        label={renderLabel('Nacionalidad', true)}
        error={!formState.alumno.nacionalidad ? formState.errors.name : ""}
        type="text"
        name="nacionalidad"
        placeholder="ej. Paraguaya"
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.nacionalidad}
        required
      />
      <label htmlFor="genero" className="flex-between">
        {renderLabel('Sexo', true)}
        {!formState.alumno.genero && (
          <span className="text-red font-medium">{formState.errors.name}</span>
        )}
      </label>
      <select
        label={renderLabel('Nacionalidad', true)}
        required
        id="genero"
        name="genero"
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.genero}
        className={
          !formState.alumno.genero && formState.errors.name ? "border-red" : ""
        }
      >
        <option></option>
        <option value="M">Masculino</option>
        <option value="F">Femenino</option>
      </select>
      <Input
        label={renderLabel('Telefono', false)}
        pattern="[0-9]{4}-[0-9]{6}"
        type="tel"
        name="telefono"
        autoComplete="off"
        placeholder="ej. 0981-565214"
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.telefono}
      />
      <Input
        label={renderLabel('Dirección', false)}
        type="text"
        name="direccion"
        autoComplete="off"
        placeholder="..."
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.direccion}
      />
      <Input
        label={renderLabel('Barrio', false)}
        type="text"
        name="barrio"
        autoComplete="off"
        placeholder="..."
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.barrio}
      />
    </div>
  );  
}
