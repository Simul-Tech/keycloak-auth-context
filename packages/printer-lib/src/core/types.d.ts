import { z } from "zod";
import { Config, Keys, SchemeDefinitions } from "./schemas";

export declare global {
  interface Window {
    PDF_DATA: z.infer<Config["schemas"][Keys]["schema"]>;
  }
}
