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

  return (
    <div className="form-container">
      <h2>Academico</h2>
      <p className="mb-1">Complete los datos de la matriculación</p>
      <div className="">
        <Input
          label="Fecha de Matriculacion"
          type="date"
          error={
            !formState.matricula.fecha_inscripcion ? formState.errors.name : ""
          }
          id="fecha_inscripcion"
          name="fecha_inscripcion"
          onChange={handleTextChange}
          value={formState.matricula.fecha_inscripcion}
        />
        <label htmlFor="" className="flex-between">
          Año Lectivo
          {!formState.matricula.fecha_inscripcion && (
            <span className="text-red font-medium">
              {formState.errors.name}
            </span>
          )}
        </label>
        <select
          required
          id="anio_lectivo"
          name="anio_lectivo"
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
            <option value={y}>{y}</option>
          ))}
        </select>

        <label htmlFor="" className="flex-between">
          Origen
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
          <option value={true}>Funcación UPC</option>
          <option value={false}>Externo</option>
        </select>

        <label htmlFor="genero" className="flex-between">
          Grado
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
            <option value={grado.id_grado}>{grado.grado}°</option>
          ))}
        </select>

        <Input
          label="Grado"
          type="text"
          readOnly={true}
          value={grado[0].nombre}
        />
        <Input
          label="Nivel"
          type="text"
          readOnly={true}
          value={grado[0].nivel}
        />
        <Input
          label="turno"
          type="text"
          readOnly={true}
          value={grado[0].turno}
        />
      </div>
    </div>
  );
}
