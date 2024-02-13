import { fileURLToPath } from 'node:url';
import { resolve, basename } from 'pathe';
import sirv from 'sirv';
import { coverageConfigDefaults } from 'vitest/config';

var index = (ctx) => {
  return {
    name: "vitest:ui",
    apply: "serve",
    configureServer(server) {
      const uiOptions = ctx.config;
      const base = uiOptions.uiBase;
      const coverageFolder = resolveCoverageFolder(ctx);
      const coveragePath = coverageFolder ? coverageFolder[1] : void 0;
      if (coveragePath && base === coveragePath)
        throw new Error(`The ui base path and the coverage path cannot be the same: ${base}, change coverage.reportsDirectory`);
      coverageFolder && server.middlewares.use(coveragePath, sirv(coverageFolder[0], {
        single: true,
        dev: true,
        setHeaders: (res) => {
          res.setHeader("Cache-Control", "public,max-age=0,must-revalidate");
        }
      }));
      const clientDist = resolve(fileURLToPath(import.meta.url), "../client");
      server.middlewares.use(base, sirv(clientDist, {
        single: true,
        dev: true
      }));
    }
  };
};
function resolveCoverageFolder(ctx) {
  const options = ctx.config;
  const htmlReporter = options.api?.port && options.coverage?.enabled ? options.coverage.reporter.find((reporter) => {
    if (typeof reporter === "string")
      return reporter === "html";
    return reporter[0] === "html";
  }) : void 0;
  if (!htmlReporter)
    return void 0;
  const root = resolve(
    ctx.config?.root || options.root || process.cwd(),
    options.coverage.reportsDirectory || coverageConfigDefaults.reportsDirectory
  );
  const subdir = Array.isArray(htmlReporter) && htmlReporter.length > 1 && "subdir" in htmlReporter[1] ? htmlReporter[1].subdir : void 0;
  if (!subdir || typeof subdir !== "string")
    return [root, `/${basename(root)}/`];
  return [resolve(root, subdir), `/${basename(root)}/${subdir}/`];
}

export { index as default };
