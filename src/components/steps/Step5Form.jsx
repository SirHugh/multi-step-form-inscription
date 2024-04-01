import { useEffect, useState } from "react";
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
    <div className="form-container">
      <h2>Resumen</h2>
      <p className="mb-1">Datos a confirmar sobre la matriculacion</p>
      <div className=""></div>
    </div>
  );
}
