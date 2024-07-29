import { useEffect, useState } from "react";
import {
  REDUCER_ACTIONS,
  useForm,
  useFormDispatch,
} from "../../state/FormContext";
import { Input } from "../form/Input";

// optional: move data into data json
export function Step4Form() {
  const formState = useForm();
  const dispatch = useFormDispatch();
  const [grado, setGrado] = useState([
    {
      id_grado: "",
      nombre: "",
      nivel: "",
      turno: "",
    },
  ]); // array
  const [years, setYears] = useState([]);

  //------------------------------------------------
  useEffect(() => {
    if (formState.matricula.id_grado) {
      const filtered = formState.grados.filter(
        (g) => g.id_grado == formState.matricula.id_grado
      );
      setGrado(filtered);
    }
    const thisYear = new Date().getFullYear();
    const y = [];
    for (let i = 0; i <= 20; i++) {
      const year = thisYear - i;
      y.push(year);
    }
    setYears(y);
    console.log(years);
  }, []);

  //------------------------------------------------

  const handleGradoChange = (e) => {
    const value = e.target.value;
    const filtered = formState.grados.filter((g) => g.id_grado == value);
    setGrado(filtered);
    handleTextChange(e);
  };

  const handleTextChange = (e) => {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_MATRICULA,
      field: e.target.name,
      payload: e.target.value,
    });
    console.log(formState);
  };

  const renderLabel = (label, required) => {
    return (
      <span>
        {label}
        {required && <span style={{ color: 'red' }}>*</span>}
      </span>
    );
  };

  return (
    <div className="form-container">
      <h2>Academico</h2>
      <p className="mb-1">Complete los datos de la matriculación</p>
      <div className="">
        <Input
          label={renderLabel('Fecha de matriculación', true)}
          type="text"
          disabled
          error={
            !formState.matricula.fecha_inscripcion ? formState.errors.name : ""
          }
          id="fecha_inscripcion"
          name="fecha_inscripcion"
          onChange={handleTextChange}
          value={formState.matricula.fecha_inscripcion}
        />
        <label htmlFor="" className="flex-between">
        {renderLabel('Año lectivo', true)}
          {!formState.matricula.anio_lectivo && (
            <span className="text-red font-medium">
              {formState.errors.name}
            </span>
          )}
        </label>
        <select
          required
          id="anio_lectivo"
          name="anio_lectivo"
          disabled
          onChange={(e) => handleTextChange(e)}
          value={formState.matricula.anio_lectivo}
          className={
            !formState.matricula.anio_lectivo && formState.errors.name
              ? "border-red"
              : ""
          }
        >
          <option></option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <label htmlFor="" className="flex-between">
        {renderLabel('Origen', true)}
          {!formState.matricula.es_interno && (
            <span className="text-red font-medium">
              {formState.errors.name}
            </span>
          )}
        </label>
        <select
          required
          id="es_interno"
          name="es_interno"
          onChange={(e) => handleTextChange(e)}
          value={formState.matricula.es_interno}
          className={
            !formState.matricula.es_interno && formState.errors.name
              ? "border-red"
              : ""
          }
        >
          <option></option>
          <option value={true}>Fundación UPC</option>
          <option value={false}>Externo</option>
        </select>

        <label htmlFor="genero" className="flex-between">
        {renderLabel('Grado', true)}
          {!formState.matricula.id_grado && (
            <span className="text-red font-medium">
              {formState.errors.name}
            </span>
          )}
        </label>
        <select
          required
          id="id_grado"
          name="id_grado"
          onChange={(e) => handleGradoChange(e)}
          value={formState.matricula.id_grado}
          className={
            !formState.matricula.id_grado && formState.errors.name
              ? "border-red"
              : ""
          }
        >
          <option></option>
          {formState.grados.map((grado) => (
            <option key={grado.id_grado} value={grado.id_grado}>
              {grado.nombre + " Seccion " + grado.seccion + " Turno " + grado.turno}
            </option>
          ))}
        </select>

        <Input
          label={renderLabel('Grado', true)}
          type="text"
          readOnly={true}
          value={grado[0].nombre}
        />
        <Input
          label={renderLabel('Nivel', true)}
          type="text"
          readOnly={true}
          value={grado[0].nivel}
        />
        <Input
          label={renderLabel('Turno', true)}
          type="text"
          readOnly={true}
          value={grado[0].turno}
        />
      </div>
    </div>
  );
}
