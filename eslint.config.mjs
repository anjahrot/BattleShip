import globals from "globals";
import {pluginJs, describe, test, expect} from "@eslint/js";


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
];