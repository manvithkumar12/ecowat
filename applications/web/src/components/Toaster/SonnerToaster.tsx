"use client";

import { Toaster } from "sonner";
import { useEffect, useState } from "react";

export function ResponsiveToaster() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024); // tablet + phone
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <Toaster
      position={isMobile ? "top-right" : "bottom-right"}
      richColors
      closeButton
    />
  );
}
