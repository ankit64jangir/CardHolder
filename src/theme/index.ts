import { createBox, createText } from "@shopify/restyle";

import theme, { Theme } from "./theme";

export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export default theme;
