import { JsonObject } from "json2typescript";
import { CommonModuleMetadata } from "./CommonModuleMetadata";

@JsonObject("DatastoreModuleMetadata")
export class DatastoreModuleMetadata extends CommonModuleMetadata {}

export default DatastoreModuleMetadata;
