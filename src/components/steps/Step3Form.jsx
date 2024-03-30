import {
  REDUCER_ACTIONS,
  useForm,
  useFormDispatch,
} from "../../state/FormContext";
import { ADD_ONS } from "../../constants";
import { CheckmarkButton } from "../form/CheckMarkButton";
import { formatCost } from "./utility";
import { Input } from "../form/Input";

// optional: move data into data json
export function Step3Form() {
  const formState = useForm();
  const dispatch = useFormDispatch();
  const isYearly = formState.isYearly;
  const HAS_PLUS = true; // adds plus sign to cost

  const handleCheckmarkChange = (e) => {
    dispatch({
      type: REDUCER_ACTIONS.UPDATE_INPUT,
      field: e.target.name,
      payload: e.target.checked,
    });
  };

  return (
    <div className="form-container">
      <h2>Pick add-ons</h2>
      <p className="mb-1">Add-ons help enhance your gaming experience</p>
      <div id="select-add-ons">
        {/* <CheckmarkButton
          name="add_on_multiplayer"
          title={ADD_ONS.add_on_multiplayer.title}
          description={ADD_ONS.add_on_multiplayer.description}
          value={ADD_ONS.add_on_multiplayer.value}
          cost={
            isYearly
              ? formatCost(
                  ADD_ONS.add_on_multiplayer.cost.yearly,
                  isYearly,
                  HAS_PLUS
                )
              : formatCost(
                  ADD_ONS.add_on_multiplayer.cost.monthly,
                  isYearly,
                  HAS_PLUS
                )
          }
          checked={formState.add_on_multiplayer}
          onChange={handleCheckmarkChange}
        />
        <CheckmarkButton
          name="add_on_storage"
          title={ADD_ONS.add_on_storage.title}
          description={ADD_ONS.add_on_storage.description}
          value={ADD_ONS.add_on_storage.value}
          cost={
            isYearly
              ? formatCost(
                  ADD_ONS.add_on_storage.cost.yearly,
                  isYearly,
                  HAS_PLUS
                )
              : formatCost(
                  ADD_ONS.add_on_storage.cost.monthly,
                  isYearly,
                  HAS_PLUS
                )
          }
          checked={formState.add_on_storage}
          onChange={handleCheckmarkChange}
        />
        <CheckmarkButton
          name="add_on_profile"
          title={ADD_ONS.add_on_profile.title}
          description={ADD_ONS.add_on_profile.description}
          value={ADD_ONS.add_on_profile.value}
          cost={
            isYearly
              ? formatCost(
                  ADD_ONS.add_on_profile.cost.yearly,
                  isYearly,
                  HAS_PLUS
                )
              : formatCost(
                  ADD_ONS.add_on_profile.cost.monthly,
                  isYearly,
                  HAS_PLUS
                )
          }
          checked={formState.add_on_profile}
          onChange={handleCheckmarkChange}
        /> */}
        <div className=" grid grid-flow-col items-end gap-6 mb-6 md:grid-cols-3">
          <div className="relative mt-3">
            <Input
              label="Documento de Identidad Civil"
              type="number"
              id="cedula"
              name="cedula"
              onChange={handleCheckmarkChange}
              placeholder=""
              required
            />
          </div>

          <div className="relative mt-3">
            <Input
              pattern="[0-9]{8}-[1-9]{1}"
              type="text"
              label="Ruc"
              id="Ruc"
              name="Ruc"
              onChange={handleCheckmarkChange}
              placeholder=""
            />
          </div>
          <div className="relative mt-3">
            <Input
              pattern="[0-9]{4}-[0-9]{6}"
              type="text"
              label="Ej: 0981-111555"
              id="telefono"
              name="telefono"
              onChange={handleCheckmarkChange}
              placeholder=""
              required
            />
          </div>
        </div>
        <div className="relative mt-3">
          <Input
            label="Nombre"
            type="text"
            id="nombre"
            name="nombre"
            onChange={handleCheckmarkChange}
            placeholder=""
            required
          />
        </div>
        <div className="relative mt-3">
          <Input
            label="Apellido"
            type="text"
            id="apellido"
            name="apellido"
            onChange={handleCheckmarkChange}
            placeholder=""
          />
        </div>
        <div className="relative mt-3">
          <Input
            label="Correo Electronico"
            type="email"
            id="email"
            name="email"
            onChange={handleCheckmarkChange}
            placeholder=""
          />
        </div>
        <div className="relative mt-3">
          <Input
            label="Dirección"
            type="text"
            id="direccion"
            name="direccion"
            onChange={handleCheckmarkChange}
            placeholder=""
          />
        </div>

        <div className=" grid grid-flow-col items-end gap-6 mb-6 md:grid-cols-3">
          <div className="relative mt-3">
            <Input
              label="Ocupacion"
              type="text"
              id="ocupacion"
              name="ocupacion"
              onChange={handleCheckmarkChange}
              placeholder=""
            />
          </div>

          <div className="relative mt-3">
            <Input
              label="Parentezco - Relación"
              type="text"
              id="relacion"
              name="relacion"
              onChange={handleCheckmarkChange}
              placeholder=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
