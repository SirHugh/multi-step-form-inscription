import thankyouLogo from "../../assets/images/icon-thank-you.svg";

export function Step6Form() {
  return (
    <div className="form-container column-flex-center gap-1">
      <img className="thank-you-logo" src={thankyouLogo} alt="thank you logo" />
      <h2 className="text-center">Inscripcion Registrada</h2>
      <p className="mb-1 text-center">
        Gracias por confirmar su inscripcions! Esperamos que el preoceso haya
        sido satisfactorio. <br />
        Siguiente paso: Solicitar inpresion del contrato con la informacion
        registrada, favor comuniquese con secretaria.
      </p>
    </div>
  );
}
