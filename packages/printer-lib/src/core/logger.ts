import pino, { Logger } from "pino";
import pretty from "pino-pretty";

export function getLogLevel(logger: string): string {
  return "info";
}

const stream = pretty({
  levelFirst: true,
  colorize: true,
  ignore: "time,hostname,pid",
});

export function getLogger(name: string): Logger {
  return pino(
    {
      name,

      level: "info",
    },
    stream
  );
}
