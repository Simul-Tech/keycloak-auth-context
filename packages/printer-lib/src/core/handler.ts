import { NextApiRequest, NextApiResponse } from "next";
import stream from "stream";
import { promisify } from "util";
import { Config, Keys } from "./schemas";
import { Utils } from "./utils";

export const PDFHandler = ({ config }: { config: Config }) => {
  const pipeline = promisify(stream.pipeline);
  const utils = new Utils(config);

  return async function handler(req: NextApiRequest, res: NextApiResponse) {

    const template_id = req.query?.template_id
      ? (req.query.template_id as Keys<typeof config>)
      : null;

    if (!template_id) {
      console.log("Template not defined");
      return res.status(400).send({
        error: "template_id_undefined",
        message: `Template not defined`,
      });
    }

    const currentSchema = utils.getConfig(template_id!);

    if (!currentSchema) {
      console.log(`Template ${template_id} not found`);

      return res.status(400).send({
        error: "template_not_found",
        message: `Template ${template_id} not found`,
      });
    }

    const validationResponse = currentSchema["schema"].safeParse(req.body);

    if (!validationResponse.success) {
      console.log(validationResponse.error);
      return res.status(400).send({
        error: validationResponse.error,
        message: `Bad payload!`,
      });
    }

    const response = await fetch(config.renderUrl, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        data: req.body,
        pdfOptions: config.pdfOptions,
        fullUrl: `${config.baseUrl}/${currentSchema["renderPath"]}`,
      }),
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=dummy.pdf");
    await pipeline<any, any>(response.body, res);
  };
};
