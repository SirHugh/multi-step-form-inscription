import { useEffect, useState } from "react";
import questionmark5838 from "../../assets/images/question-mark-5838.svg";
import {
  REDUCER_ACTIONS,
  useForm,
  useFormDispatch,
} from "../../state/FormContext";
import { Input } from "../form/Input";
import Axios from "axios";

// optional: move data into data json
export function Step5Form() {
  const formState = useForm();
  const dispatch = useFormDispatch();

  const ApiClient = Axios.create({
    baseURL: "http://localhost:8000/",
  });

  //------------------------------------------------
  useEffect(() => {}, []);

  //------------------------------------------------

  const handleTextChange = (e) => {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_MATRICULA,
      field: e.target.name,
      payload: e.target.value,
    });
    console.log(formState);
  };

  return (
    <div className="form-container column-flex-center gap-1">
      <img
        className="thank-you-logo"
        src={questionmark5838}
        alt="thank you logo"
      />
      <h2 className="text-center">Confrimar Información</h2>
      <big className="mb-1 text-center">
        Esta seguro/a de que desea comfirmar los datos de la matriculacion.{" "}
        <br />
      </big>
    </div>
  );
}
