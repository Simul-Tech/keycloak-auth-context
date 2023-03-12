import { PDFOptions } from "puppeteer";
import { URL } from "url";
import { AnyZodObject } from "zod";

export type Config = {
  baseUrl?: string;
  renderUrl: string;
  pdfOptions?: PDFOptions;
  schemas: { [k: string]: { schema: AnyZodObject; renderPath: string } };
};

export type Keys<T extends Config> = keyof T["schemas"];
