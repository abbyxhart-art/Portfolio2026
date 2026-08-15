
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  // Let the app's own scroll-to-top-on-navigate logic (RootLayout in
  // routes.tsx) be authoritative instead of the browser restoring whatever
  // scroll position a page was left at on back/forward navigation.
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  createRoot(document.getElementById("root")!).render(<App />);
