import { defineConfig } from 'astro/config';
import icon from "astro-icon";

import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

export default defineConfig({
  integrations: [icon(), react(), mdx()],
  site: "https://cod.dadyarri.ru",
});