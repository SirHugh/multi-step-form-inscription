import {
  getCliente,
  getResponsable,
  REDUCER_ACTIONS,
  useForm,
  useFormDispatch,
} from "../../state/FormContext";
import { Input } from "../form/Input";

const renderLabel = (label, required) => {
  return (
    <span>
      {label}
      {required && <span style={{ color: 'red' }}>*</span>}
    </span>
  );
};

// optional: move data into data json
export function Step3Form() {
  const formState = useForm();
  const dispatch = useFormDispatch();

  const handleTextChange = (e) => {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_RESPONSABLE,
      field: e.target.name,
      payload: e.target.value,
    });
    console.log(formState);
  };

  const handdleSearch = async () => {
    if (!formState.responsable.cedula) {
      console.log("no hay cedula");
      return;
    }
    try {
      const res = await getCliente(formState.responsable.cedula);
      if (!res.data[0]) {
        console.log("Sin Cliente con el nro. ci");
        return;
      }
      const id_cliente = res.data[0].id_cliente;
      dispatch({
        type: REDUCER_ACTIONS.INITIALIZE_RESPONSABLE,
        payload: res.data[0],
      });
      if (!formState.alumno.id_alumno) {
        console.log("no hay id_alumno");
        return;
      }
      const res1 = await getResponsable(id_cliente, formState.alumno.id_alumno);
      if (!(res1.data.length > 0)) {
        console.log("no es responsable del alumno: ", res.data);
        return;
      }
      console.log("es responsable del alumno", res1.data);
      dispatch({
        type: REDUCER_ACTIONS.INITIALIZE_RESPONSABLE,
        payload: res1.data[0],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-container">
      <h2>Responsable</h2>
      <p className="mb-1">Complete los datos del responsable del alumno</p>
      <div className="">
        <Input
          label={renderLabel('Cedula', true)}
          autoComplete="off"
          error={!formState.responsable.cedula ? formState.errors.name : ""}
          type="number"
          id="cedula"
          name="cedula"
          onChange={handleTextChange}
          value={formState.responsable.cedula}
          placeholder=""
          required
          onBlur={() => handdleSearch()}
        />
        <Input
          pattern="[0-9]{8}-[1-9]{1}"
          type="tel"
          label="Ruc"
          id="ruc"
          name="ruc"
          onChange={handleTextChange}
          value={formState.responsable.ruc}
          placeholder=""
        />
        <Input
          label={renderLabel('Nombre', true)}
          error={!formState.responsable.nombre ? formState.errors.name : ""}
          type="text"
          id="nombre"
          name="nombre"
          onChange={handleTextChange}
          value={formState.responsable.nombre}
          placeholder=""
          required
        />
        <Input
          label={renderLabel('Apellido', true)}
          error={!formState.responsable.apellido ? formState.errors.name : ""}
          type="text"
          id="apellido"
          name="apellido"
          onChange={handleTextChange}
          value={formState.responsable.apellido}
          placeholder=""
        />
        <Input
          pattern="[0-9]{4}-[0-9]{6}"
          error={!formState.responsable.telefono ? formState.errors.name : ""}
          type="text"
          label={renderLabel('Teléfono', true)}
          id="telefono"
          name="telefono"
          onChange={handleTextChange}
          value={formState.responsable.telefono}
          placeholder="Ej: 0981-111555"
          required
        />
        <Input
          label="Correo Electronico"
          type="email"
          id="email"
          name="email"
          onChange={handleTextChange}
          value={formState.responsable.email}
          placeholder="ej. juanperez@gmail.com"
        />
        <Input
          label="Dirección"
          type="text"
          id="direccion"
          name="direccion"
          onChange={handleTextChange}
          value={formState.responsable.direccion}
          placeholder=""
        />
        <Input
          label="Ocupacion"
          type="text"
          id="ocupacion"
          name="ocupacion"
          onChange={handleTextChange}
          value={formState.responsable.ocupacion}
          placeholder=""
        />
        <label htmlFor="tipo_relacion" className="flex-between">
          {renderLabel('Parentezco - Relación', true)}
          {!formState.responsable.tipo_relacion && (
            <span className="text-red font-medium">
              {formState.errors.name}
            </span>
          )}
        </label>
        <select
          required
          id="tipo_relacion"
          name="tipo_relacion"
          onChange={(e) => handleTextChange(e)}
          value={formState.responsable.tipo_relacion}
          className={
            !formState.responsable.tipo_relacion && formState.errors.name
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
