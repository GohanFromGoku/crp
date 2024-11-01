import { BrowserRouter } from "react-router-dom";
import { Modal } from "@components";
import React from "react";
import { AlertsProvider, ModalProvider, TranslationsProvider } from "./providers";
const App = () => {
  return (
    <BrowserRouter>
      <TranslationsProvider>
        <ModalProvider>
          <AlertsProvider>
            <Modal />
          </AlertsProvider>
        </ModalProvider>
      </TranslationsProvider>
    </BrowserRouter>
  );
};

export default App;
