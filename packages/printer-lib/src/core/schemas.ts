import { PDFOptions } from "puppeteer";
import { URL } from "url";
import { AnyZodObject } from "zod";

export type Config<
  T = { [k: string]: { schema: AnyZodObject; renderPath: string } }
> = {
  baseUrl?: string;
  renderUrl: string;
  pdfOptions?: PDFOptions;
  schemas: T;
};

export type Keys<T extends Config> = keyof T["schemas"];
