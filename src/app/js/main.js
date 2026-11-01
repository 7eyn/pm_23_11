function setPersonName(person) {
  document.getElementById("personName").textContent =
    person.firstName + " " + person.lastName;
}

function renderJobs(jobs) {
  var container = document.getElementById("jobsList");
  container.replaceChildren();

  jobs.forEach(function (job) {
    var article = document.createElement("article");
    article.className = "job-item mb-3 pb-1";

    var row = document.createElement("div");
    row.className =
      "d-flex justify-content-between align-items-baseline flex-wrap";

    var title = document.createElement("h3");
    title.className = "job-title text-uppercase fw-bold mb-0";
    title.textContent = job.title;

    var period = document.createElement("span");
    period.className = "job-period fw-bold";
    period.textContent = job.period;

    row.append(title, period);

    var company = document.createElement("p");
    company.className = "job-company fst-italic mb-2";
    company.textContent = job.company;

    var description = document.createElement("p");
    description.className = "job-desc mb-0";
    description.textContent = job.description;

    article.append(row, company, description);
    container.appendChild(article);
  });
}

function renderSkills(skills) {
  var container = document.getElementById("skillsContent");
  container.replaceChildren();

  skills.forEach(function (skill) {
    var column = document.createElement("div");
    column.className = "col-sm-6";

    var row = document.createElement("div");
    row.className = "skill-row";

    var name = document.createElement("span");
    name.className = "skill-name";
    name.textContent = skill.name;

    var track = document.createElement("div");
    track.className = "skill-track";

    var level = Math.max(0, Math.min(100, Number(skill.level) || 0));

    track.setAttribute("role", "progressbar");
    track.setAttribute("aria-label", skill.name);
    track.setAttribute("aria-valuenow", level);
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", "100");

    var fill = document.createElement("div");
    fill.className = "skill-fill";
    fill.dataset.level = level;
    fill.style.width = level + "%";

    track.appendChild(fill);
    row.append(name, track);
    column.appendChild(row);
    container.appendChild(column);
  });
}


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

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.section-toggle').forEach(function(button) { button.addEventListener('click', function() {
    var content = document.getElementById(button.dataset.target); var hidden = content.classList.toggle('is-hidden');
    button.querySelector('.toggle-arrow').classList.toggle('is-rotated', hidden); button.setAttribute('aria-expanded', String(!hidden));
  }); });
  fetch('data.json').then(function(response) { if (!response.ok) throw new Error('HTTP ' + response.status); return response.json(); }).then(function(data) { setPersonName(data.person); document.getElementById('personEmail').textContent = data.person.email; document.getElementById('personPhone').textContent = data.person.phone; document.getElementById('personAddress').textContent = data.person.address; document.getElementById('personSummary').textContent = data.person.summary; renderSkills(data.person.skills); renderJobs(data.jobs); }).catch(function(error) { console.error(error); document.getElementById('dataError').textContent = 'Не вдалося завантажити дані. Запустіть сторінку через локальний сервер.'; });
});
