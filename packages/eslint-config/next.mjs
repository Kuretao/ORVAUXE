import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

import baseConfig from "./base.mjs";

const nextConfig = [...baseConfig, ...nextCoreWebVitals, ...nextTypeScript];

export default nextConfig;
