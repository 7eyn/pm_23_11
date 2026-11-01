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

document.addEventListener("DOMContentLoaded", function () {
  var person = {
    firstName: "Олександр",
    lastName: "Луговий",
    email: "oleksandr.luhoviy@lpnu.ua",
    phone: "88005553535",
    address: "123 Main St, Anytown, USA",
    summary:
      "Experienced web designer with a passion for creating visually appealing and user-friendly websites. Skilled in HTML, CSS, JavaScript, and various design tools.",
    skills: [
      { name: "HTML/CSS", level: 100 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 75 },
      { name: "UI/UX Design", level: 85 },
      { name: "Adobe Photoshop", level: 70 },
    ],
  };

  var jobs = [
    {
      title: "Senior Web Designer",
      period: "2020 - Present",
      company: "Creative Agency / Chicago",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since 1500s, when unknown printer took a galley of type.",
    },
    {
      title: "Graphic Designer",
      period: "2015 - 2020",
      company: "Creative Market / Chicago",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since 1500s, when unknown printer took a galley of type.",
    },
    {
      title: "Marketing Manager",
      period: "2013 - 2015",
      company: "Manufacturing Agency / NJ",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since 1500s, when unknown printer took a galley of type.",
    },
  ];

  document.querySelectorAll(".section-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      var content = document.getElementById(button.dataset.target);
      var hidden = content.classList.toggle("is-hidden");

      button
        .querySelector(".toggle-arrow")
        .classList.toggle("is-rotated", hidden);
      button.setAttribute("aria-expanded", String(!hidden));
    });
  });

  setPersonName(person);

  document.getElementById("personEmail").textContent = person.email;
  document.getElementById("personPhone").textContent = person.phone;
  document.getElementById("personAddress").textContent = person.address;
  document.getElementById("personSummary").textContent = person.summary;

  renderSkills(person.skills);
  renderJobs(jobs);
});
