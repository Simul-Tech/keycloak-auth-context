import { PDFOptions } from "puppeteer";
import { AnyZodObject } from "zod";

export type Config = {
  baseUrl?: string;
  pdfOptions?: PDFOptions;
  schemas: { [k: string]: { schema: AnyZodObject; renderPath: string } };
};

export type Keys<T extends Config> = keyof T["schemas"];
