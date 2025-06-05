import { defineConfig } from 'astro/config';
import icon from "astro-icon";

export default defineConfig({
  integrations: [icon()],
  site: "https://cod.dadyarri.ru",
});
