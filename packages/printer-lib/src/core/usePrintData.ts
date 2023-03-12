import { useEffect, useState } from "react";
import { z } from "zod";
import { Config } from "./schemas";

export function usePrintData<T extends Config, K extends keyof T["schemas"]>(
  config?: T,
  key?: K
) {
  const [data, setData] = useState<z.infer<T["schemas"][K]["schema"]>>();

  useEffect(() => {
    setData(window.PDF_DATA);
  }, []);

  return data;
}
