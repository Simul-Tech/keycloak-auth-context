import htmlParse from "html-react-parser";
import { Config, Keys } from "./schemas";

export class Utils {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  getConfig = (templateId: Keys<typeof this.config>) =>
    this.config["schemas"][templateId!];

  getSchemaByTemplateId = (templateId: Keys<typeof this.config>) =>
    this.config["schemas"][templateId!]["schema"];

  safeParseSchemaByTemplateId = (
    templateId: Keys<typeof this.config>,
    body: any
  ) => this.getSchemaByTemplateId(templateId).safeParse(body);

  getPdfOptions = () => this.config.pdfOptions;
}

export const parse = (val?: string) => (val ? htmlParse(val) : null);
