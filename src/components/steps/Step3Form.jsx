import {
  REDUCER_ACTIONS,
  useForm,
  useFormDispatch,
} from "../../state/FormContext";
import { Input } from "../form/Input";

// optional: move data into data json
export function Step3Form() {
  const formState = useForm();
  const dispatch = useFormDispatch();

  const handleTextChange = (e) => {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_RESPONSABLE,
      index: 0,
      field: e.target.name,
      payload: e.target.value,
    });
    console.log(formState);
  };

  return (
    <div className="form-container">
      <h2>Responsable</h2>
      <p className="mb-1">Complete los datos del responsable del alumno</p>
      <div className="">
        <Input
          label="Documento de Identidad Civil"
          error={!formState.responsable[0].cedula ? formState.errors.name : ""}
          type="number"
          id="cedula"
          name="cedula"
          onChange={handleTextChange}
          value={formState.responsable[0].cedula}
          placeholder=""
          required
        />
        <Input
          pattern="[0-9]{8}-[1-9]{1}"
          type="text"
          label="Ruc"
          id="ruc"
          name="ruc"
          onChange={handleTextChange}
          value={formState.responsable[0].ruc}
          placeholder=""
        />
        <Input
          label="Nombre"
          error={!formState.responsable[0].nombre ? formState.errors.name : ""}
          type="text"
          id="nombre"
          name="nombre"
          onChange={handleTextChange}
          value={formState.responsable[0].nombre}
          placeholder=""
          required
        />
        <Input
          label="Apellido"
          error={
            !formState.responsable[0].apellido ? formState.errors.name : ""
          }
          type="text"
          id="apellido"
          name="apellido"
          onChange={handleTextChange}
          value={formState.responsable[0].apellido}
          placeholder=""
        />
        <Input
          pattern="[0-9]{4}-[0-9]{6}"
          error={
            !formState.responsable[0].telefono ? formState.errors.name : ""
          }
          type="text"
          label="Telefono"
          id="telefono"
          name="telefono"
          onChange={handleTextChange}
          value={formState.responsable[0].telefono}
          placeholder="Ej: 0981-111555"
          required
        />
        <Input
          label="Correo Electronico"
          type="email"
          id="email"
          name="email"
          onChange={handleTextChange}
          value={formState.responsable[0].email}
          placeholder="ej. juanperez@gmail.com"
        />
        <Input
          label="Dirección"
          type="text"
          id="direccion"
          name="direccion"
          onChange={handleTextChange}
          value={formState.responsable[0].direccion}
          placeholder=""
        />
        <Input
          label="Ocupacion"
          type="text"
          id="ocupacion"
          name="ocupacion"
          onChange={handleTextChange}
          value={formState.responsable[0].ocupacion}
          placeholder=""
        />
        <label htmlFor="genero" className="flex-between">
          Parentezco - Relación
          {!formState.responsable[0].relacion && (
            <span className="text-red font-medium">
              {formState.errors.name}
            </span>
          )}
        </label>
        <select
          required
          id="relacion"
          name="relacion"
          onChange={(e) => handleTextChange(e)}
          value={formState.responsable[0].relacion}
          className={
            !formState.responsable[0].relacion && formState.errors.name
              ? "border-red"
              : ""
          }
        >
          <option></option>
          <option value="Padre">Padre</option>
          <option value="Madre">Madre</option>
          <option value="Responsable">Responsable</option>
        </select>
      </div>
    </div>
  );
}
