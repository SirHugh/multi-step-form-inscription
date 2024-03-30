import { useForm } from "../../state/FormContext";

const STEPS = {
  step1: {
    number: 1,
    title: "PASO 1",
    description: "INFORMACION PERSONAL",
  },
  step2: {
    number: 2,
    title: "PASO 2",
    description: "INFORMACION ADICIONAL",
  },
  step3: {
    number: 3,
    title: "PASO 3",
    description: "RESPONSABLES",
  },
  step4: {
    number: 4,
    title: "PASO 4",
    description: "ACADEMICO",
  },
  step5: {
    number: 5,
    title: "PASO 4",
    description: "RESUMEN",
  },
};

const STEPS_ARRAY = [
  STEPS.step1,
  STEPS.step2,
  STEPS.step3,
  STEPS.step4,
  STEPS.step5,
];
const MAX_STEP = STEPS_ARRAY.length;

// Mobile Sidebar Icons rendered at the top
export function StepsSidebar() {
  const formState = useForm();
  const activeStep = Math.min(formState.currentStep, MAX_STEP);

  return (
    <div className="step-container">
      {STEPS_ARRAY.map((step) => {
        const classString = step.number === activeStep ? "step active" : "step";
        return (
          <div key={step.number} className="flex gap-1 desktop-sidebar">
            <div key={step.number} className={classString}>
              {step.number}
            </div>
            <div className="desktop-only flex-col">
              <p>{step.title}</p>
              <p className="text-white font-semibold">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
