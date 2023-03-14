import { useEffect, useState } from "react";
import { z } from "zod";
import { Config } from "./schemas";

export function usePrintData<T extends Config, K extends keyof T["schemas"]>(
  config: T,
  key: K
) {
  type dataType = z.infer<T["schemas"][K]["schema"]>;

  const [data, setData] = useState<dataType>();

  useEffect(() => {
    setData(window.PDF_DATA);
  }, []);

  const print = async (data: dataType) => {
    const response = await fetch(`/api/pdf?template_id=${String(key)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const file = await response.blob();
    const fileURL = URL.createObjectURL(file);
    const pdfWindow = window.open();
    if (pdfWindow) pdfWindow.location.href = fileURL;
  };

  return { data, print };
}

export function usePrintHelper<T extends Config, K extends keyof T["schemas"]>(
  config: T,
  key: K
) {
  type dataType = z.infer<T["schemas"][K]["schema"]>;

  const print = async (data: dataType) => {
    const response = await fetch(`/api/pdf?template_id=${String(key)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const file = await response.blob();
    const fileURL = URL.createObjectURL(file);
    const pdfWindow = window.open();
    if (pdfWindow) pdfWindow.location.href = fileURL;
  };

  return { print };
}
