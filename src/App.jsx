import "./App.css";
import { FormProvider } from "./state/FormContext";
import { MobileLayout } from "./layout/MobileLayout";
import { DesktopLayout } from "./layout/DesktopLayout";

import useIsMobile from "./useIsMobile";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Axios } from "axios";

/**
 * Top level App component includes the Form Provider which includes form dispatch and formState in FormContext
 * @returns
 */
function App() {
  const isMobile = useIsMobile();
  return (
    <FormProvider>
      <div className="app">
        {isMobile ? <MobileLayout /> : <DesktopLayout />}
      </div>
    </FormProvider>
  );
}

export default App;
