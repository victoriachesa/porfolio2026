(function () {
  var open = false;
  try {
    open = sessionStorage.getItem("project-pin") === "ok";
  } catch (e) {}
  if (open) return;
  var file = (location.pathname.split("/").pop() || "").split("?")[0];
  if (!/^single-project-[A-Za-z0-9-]+\.html$/.test(file)) return;
  location.replace("index.html?pin=" + encodeURIComponent(file));
})();
