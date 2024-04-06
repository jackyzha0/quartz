import { Root, Paragraph } from "mdast"
import { visit } from "unist-util-visit"
import { VFile } from "vfile"

const extendedTaskItemRegex = /^\[([^\[\]])\] (.*)/gm;

export const customTaskStatusPlugin = () => {
  return (tree: Root, _file: VFile) => {
    visit(tree, "listItem", (node) => {
      // we either have a GFM type checkbox (with a space or x), or a normal list item
      if (typeof node.checked === "boolean") {
        node.data = {
          ...node.data,
          hProperties: {
            dataTask: node.checked ? "x" : " ",
          },
        }
      } else {
        const paragraph = node.children[0] as Paragraph;
        if (paragraph?.type !== "paragraph") return;

        const text = paragraph.children?.[0];
        if (text.type !== 'text') return;

        extendedTaskItemRegex.lastIndex = 0;
        const result = extendedTaskItemRegex.exec(text.value);

        if (result) {
          node.checked = true;
          node.data = {
            ...node.data,
            hProperties: {
              dataTask: result[1],
            },
          };
          text.value = result[2];
        }
      }
    });
  };
}
