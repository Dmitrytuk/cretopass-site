// Copy buttons for the install commands. No dependencies, no analytics.
(function () {
  "use strict";

  function label(button, text) {
    var original = button.dataset.label || button.textContent;
    button.dataset.label = original;
    button.textContent = text;
    button.classList.add("done");
    window.setTimeout(function () {
      button.textContent = original;
      button.classList.remove("done");
    }, 1600);
  }

  document.querySelectorAll(".cmd").forEach(function (block) {
    var text = block.querySelector("code");
    if (!text) return;

    var button = document.createElement("button");
    button.type = "button";
    button.className = "copy";
    button.textContent = "copy";
    button.setAttribute("aria-label", "Copy command");

    button.addEventListener("click", function () {
      var value = text.textContent.trim();
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(value).then(function () {
          label(button, "copied");
        });
        return;
      }
      var area = document.createElement("textarea");
      area.value = value;
      area.setAttribute("readonly", "");
      area.style.position = "absolute";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand("copy");
        label(button, "copied");
      } catch (error) {
        label(button, "failed");
      }
      document.body.removeChild(area);
    });

    block.appendChild(button);
  });
})();
