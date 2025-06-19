import React from "react";
import OrderManagement from "./components/OrderManagement/OrderManagement";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

function App() {
  return (
    <HeroUIProvider>
      <ToastProvider />
      <div className="w-full flex items-start justify-center p-8 pt-16">
        <OrderManagement className="w-full max-w-7xl" />
      </div>
    </HeroUIProvider>
  );
}

export default App;
