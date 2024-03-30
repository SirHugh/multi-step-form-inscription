import {
  REDUCER_ACTIONS,
  useForm,
  useFormDispatch,
} from "../../state/FormContext";
import { RadioButton } from "../form/RadioButton";
import { ToggleSwitch } from "../form/ToggleSwitch";
import { PLAN } from "../../constants";
import { Input } from "../form/Input";

import { formatCost } from "./utility";

/**
 * Note this form has radio buttons which will only work if rendered once. If rendered
 * @returns
 */

export function Step2Form() {
  const formState = useForm();
  const dispatch = useFormDispatch();
  const curso_jardin = formState.alumno.curso_jardin;

  const handleCheckmarkChange = (e) => {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_ALUMNO,
      field: e.target.name,
      payload: e.target.checked,
    });
  };

  const handleRadioChange = (e) => {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_ALUMNO,
      field: e.target.name,
      payload: e.target.value,
    });
  };

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
      <h2>Información Adicional</h2>
      <p>Agrega la informacion Adicional</p>

      <div id="form-container">
        <div>Curso Jardin</div>
        <div className="switch-row">
          <p>NO</p>
          <ToggleSwitch
            name="curso_jardin"
            checked={formState.alumno.curso_jardin}
            onChange={handleCheckmarkChange}
          />
          <p className="text-primary">SI</p>
        </div>

        <Input
          label="Edad Primer Grado"
          type="number"
          name="edad_primer_grado"
          autoComplete="off"
          placeholder="ej. 5"
          onChange={(e) => handleTextChange(e)}
          value={formState.alumno.edad_primer_grado}
        />
        <Input
          label="Alegia a."
          type="text"
          name="edad_primer_grado"
          autoComplete="off"
          placeholder=""
          onChange={(e) => handleTextChange(e)}
          value={formState.alumno.edad_primer_grado}
        />
        <Input
          label="Perfil Psicologico"
          type="text"
          name="edad_primer_grado"
          autoComplete="off"
          placeholder=""
          onChange={(e) => handleTextChange(e)}
          value={formState.alumno.perfil_psicologico}
        />
      </div>
    </div>
  );
}
