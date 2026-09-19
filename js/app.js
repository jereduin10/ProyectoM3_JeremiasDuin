import { router, navigate } from "./router.js";

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-link]");

  if (!link) return;

  navigate(event, link);
});

window.addEventListener("popstate", router);

router();