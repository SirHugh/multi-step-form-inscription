import { Input } from "../form/Input";
import {
  REDUCER_ACTIONS,
  useForm,
  useFormDispatch,
} from "../../state/FormContext";

export function Step1Form() {
  const formState = useForm();
  const dispatch = useFormDispatch();

  const handleTextChange = (e) => {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_ALUMNO,
      field: e.target.name,
      payload: e.target.value,
    });
    console.log(formState);
  };

  return (
    <div className="form-container">
      <h2>Informacion Personal</h2>
      <p className="mb-1">Favor proveer los siguientes datos del alumno.</p>

      <Input
        label="Cedula"
        error={!formState.alumno.cedula ? formState.errors.name : ""}
        type="number"
        name="cedula"
        autoComplete="off"
        placeholder="ej. 5643234"
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.cedula}
        required
      />
      <Input
        label="Nombre"
        error={!formState.alumno.nombre ? formState.errors.name : ""}
        type="text"
        name="nombre"
        placeholder="ej. Juan Carlos"
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.nombre}
        required
      />
      <Input
        label="Apellido"
        error={!formState.alumno.apellido ? formState.errors.name : ""}
        type="text"
        name="apellido"
        placeholder="ej. Martinez Ortiz"
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.apellido}
      />
      <Input
        label="Fecha De Nacimiento"
        error={!formState.alumno.fecha_nac ? formState.errors.name : ""}
        type="date"
        name="fecha_nac"
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.fecha_nac}
      />
      <Input
        label="Nacionalidad"
        error={!formState.alumno.nacionalidad ? formState.errors.name : ""}
        type="text"
        name="nacionalidad"
        placeholder="ej. Paraguaya"
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.nacionalidad}
      />
      <label htmlFor="genero" className="flex-between">
        Sexo
        {!formState.alumno.genero && (
          <span className="text-red font-medium">{formState.errors.name}</span>
        )}
      </label>
      <select
        required
        id="genero"
        name="genero"
        onChange={(e) => handleTextChange(e)}
        value={formState.alumno.genero}
        className=""
      >
        <option></option>
        <option value="M">Masculino</option>
        <option value="F">Femenino</option>
      </select>
    </div>
  );
}
