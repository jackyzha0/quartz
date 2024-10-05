import rehypeImageCaption from "rehype-image-caption";
import { QuartzTransformerPlugin } from "../types";

export const FigureCaptions: QuartzTransformerPlugin = () => {
    return {
        name: "FigureCaptions",
        htmlPlugins() {
            return [[rehypeImageCaption]]
        },
    }
}