/**
 * Renders the form submit and back button based on step number.
 * @param {*} param0
 * @returns
 */
export function SubmitButton({ stepNo, onNextStep, onBackStep }) {
  return (
    <>
      <button
        className={stepNo === 5 ? "bg-color-secondary" : undefined}
        type="submit"
        onClick={onNextStep}
      >
        {stepNo < 5 ? "Siguiente" : "Confirmar"}
      </button>
      {stepNo > 1 && (
        <button className="back-button" onClick={onBackStep}>
          Volver
        </button>
      )}
    </>
  );
}
