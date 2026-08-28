export const THEME_STORAGE_KEY = "theme";

/**
 * Runs synchronously while the browser parses <head>, so the resolved theme is
 * on <html> before the first paint. Anything deferred to an effect would show
 * the server's default theme first and then snap.
 *
 * The stored value may be "light", "dark" or "system"; only a resolved value is
 * ever written to the attribute.
 */
const script = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var t=s==="light"||s==="dark"?s:(d?"dark":"light");document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
