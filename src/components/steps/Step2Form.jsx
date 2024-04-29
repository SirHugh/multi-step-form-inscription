import {
  REDUCER_ACTIONS,
  useForm,
  useFormDispatch,
} from "../../state/FormContext";
import { ToggleSwitch } from "../form/ToggleSwitch";
import { Input } from "../form/Input";
import MyImage from "../../assets/photo-upload.png";
import { useRef, useState } from "react";

/**
 * Note this form has radio buttons which will only work if rendered once. If rendered
 * @returns
 */

export function Step2Form() {
  const formState = useForm();
  const dispatch = useFormDispatch();
  const [image, setImage] = useState(formState.alumno.fotocarnet);
  const hiddenFileInput = useRef(null);

  const handleCheckmarkChange = (e) => {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_ALUMNO,
      field: e.target.name,
      payload: e.target.checked,
    });
  };

  const handleTrabajaChange = (e) => {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_MATRICULA,
      field: e.target.name,
      payload: e.target.checked,
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

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_ALUMNO,
      field: event.target.name,
      payload: file,
    });
    console.log(formState.alumno);
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
          label="Cantidad de hermanos/as"
          type="number"
          name="cantidad_hermanos"
          autoComplete="off"
          placeholder="ej. 1"
          onChange={(e) => handleTextChange(e)}
          value={formState.alumno.cantidad_hermanos}
        />
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
          label="Alegico a."
          type="text"
          name="alergico_a"
          autoComplete="off"
          placeholder=""
          onChange={(e) => handleTextChange(e)}
          value={formState.alumno.alergico_a}
        />
        <div>Perfil Psicológico</div>
        <textarea
          label="Perfil Psicologico"
          type="textarea"
          name="perfil_psicologico"
          autoComplete="off"
          placeholder=""
          onChange={(e) => handleTextChange(e)}
          value={formState.alumno.perfil_psicologico}
        />
        <div>¿Trabaja?</div>
        <div className="switch-row">
          <p>NO</p>
          <ToggleSwitch
            name="trabaja"
            checked={formState.matricula.trabaja}
            onChange={handleTrabajaChange}
          />
          <p className="text-primary">SI</p>
        </div>
        <div className="">
          <label htmlFor="fotocarnet" className="image-upload-label">
            Foto Carnet
          </label>
          <div
            onClick={handleClick}
            style={{
              cursor: "pointer",
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
            }}
          >
            {image ? (
              <img
                src={image instanceof File ? URL.createObjectURL(image) : image}
                alt="upload image"
                className="img-display-after"
              />
            ) : (
              <img
                src={MyImage}
                alt="upload image"
                className="img-display-after"
              />
            )}

            <input
              id="fotocarnet"
              name="fotocarnet"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={hiddenFileInput}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
