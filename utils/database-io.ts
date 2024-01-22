import { Database, Result } from "../store/types";
import { Converters } from "./converters";

export class DBIO {
  public static handleImport = (
    strategy:
      | { type: "csv"; data: string; delimiter: string; hasHeader?: boolean }
      | { type: "txt"; data: string }
      | { type: "json"; data: string }
  ): Result<Database> => {
    switch (strategy.type) {
      case "csv":
        return {
          verdict: "success",
          data: Converters["csv -> database"](
            strategy.data,
            strategy.delimiter,
            strategy.hasHeader
          ),
        };
      case "txt":
        return {
          verdict: "success",
          data: Converters["txt -> database"](strategy.data),
        };
      case "json":
        return Converters["json -> database"](strategy.data);
      default:
        return { verdict: "error", error: { message: "Unknown import type" } };
    }
  };

  public static handleExport = (
    database: Database,
    strategy:
      | { type: "json"; pretty?: boolean }
      | { type: "csv"; delimiter: string; header?: boolean }
      | { type: "txt" }
  ): Result<string> => {
    switch (strategy.type) {
      case "csv":
        return {
          verdict: "success",
          data: Converters["database -> csv"](
            database,
            strategy.delimiter,
            strategy.header
          ),
        };
      case "txt":
        return {
          verdict: "success",
          data: Converters["database -> txt"](database),
        };
      case "json":
        return {
          verdict: "success",
          data: Converters["database -> json"](database, strategy.pretty),
        };
      default:
        return { verdict: "error", error: { message: "Unknown import type" } };
    }
  };
}
