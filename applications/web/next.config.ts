import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: ["@ecowat/shared"],
  reactCompiler: true,
  allowedDevOrigins: ["192.168.0.3"],
};

export default withNextIntl(nextConfig);
