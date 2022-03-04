import {
  JsonObject,
  JsonProperty,
  PropertyConvertingMode,
} from "json2typescript";
import FileOrBuffer from "../FileOrBuffer";

/**
 * CommonModuleMetadata defines the common properties of a module deployment.
 */
@JsonObject("CommonModuleMetadata")
export class CommonModuleMetadata {
  /**
   * The name of the module.
   */
  @JsonProperty("name", String)
  name = "";

  /**
   * The description of the module.
   */
  @JsonProperty("description", String, PropertyConvertingMode.IGNORE_NULLABLE)
  description?: string = undefined;

  /**
   * An image for the module.
   *
   * If the image is a File or Buffer, it will be uploaded to IPFS.
   * If the image is a string, it will be used as-is (in case you already uploaded it to IPFS
   * and the property is the IPFS hash uri).
   */
  @JsonProperty("image", String, PropertyConvertingMode.IGNORE_NULLABLE)
  image?: string | FileOrBuffer = undefined;

  /**
   * An external link for the module.
   */
  @JsonProperty("external_link", String, PropertyConvertingMode.IGNORE_NULLABLE)
  externalLink?: string = undefined;
}

export default CommonModuleMetadata;
