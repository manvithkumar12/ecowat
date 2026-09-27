export const getBgStyle = (resolvedTheme: string | undefined) => ({
  background:
    resolvedTheme === "dark"
      ? "radial-gradient(ellipse 55% 55% at center, rgba(16, 185, 129, 0.22) 0%, rgba(16, 185, 129, 0.05) 50%, rgba(9, 9, 11, 0.6) 80%, #0a0a0a 100%)"
      : "radial-gradient(ellipse 55% 55% at center, rgba(16, 185, 129, 0.25) 0%, rgba(209, 250, 229, 0.5) 50%, rgba(240, 253, 250, 0.2) 80%, #ffffff 100%)",
});
