(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var toggleAvatarBtn = document.getElementById("toggleAvatarBtn");
    var avatarContainer = document.getElementById("avatarContainer");
    var avatarCircle = document.getElementById("avatarCircle");
    var animateSkillsBtn = document.getElementById("animateSkillsBtn");
    var printResumeBtn = document.getElementById("printResumeBtn");

    function toggleAvatarStyle() {
      if (!avatarCircle) {
        return;
      }
      avatarCircle.classList.toggle("show-silhouette");
    }

    if (toggleAvatarBtn) {
      toggleAvatarBtn.addEventListener("click", toggleAvatarStyle);
    }

    if (avatarContainer) {
      avatarContainer.addEventListener("click", toggleAvatarStyle);
    }

    if (animateSkillsBtn) {
      animateSkillsBtn.addEventListener("click", function () {
        var fills = document.querySelectorAll(".skill-fill");
        var i;
        for (i = 0; i < fills.length; i++) {
          fills[i].style.width = "0%";
        }
        setTimeout(function () {
          var j;
          for (j = 0; j < fills.length; j++) {
            var target = fills[j].getAttribute("data-level") || "70";
            fills[j].style.width = target + "%";
          }
        }, 180);
      });
    }

    if (printResumeBtn) {
      printResumeBtn.addEventListener("click", function () {
        window.print();
      });
    }
  });
})();
