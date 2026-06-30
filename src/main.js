const state = {
  view: "audit",
  selectedAudit: 0,
  selectedPractice: 0
};

const data = {
  audit: {
    kicker: "Agency Audit",
    title: "Who is steering?",
    thesis: {
      title: "VEDA helps you catch decisional autopilot before it quietly becomes your life.",
      body: "The defining challenge is not more information. It is the ability to intentionally direct your choices amid complexity, distraction, expectations, and automation."
    },
    prompts: [
      {
        label: "Automatic",
        question: "Where am I going through the motions?",
        signal: "A routine still consumes attention, but no longer clearly serves the destination."
      },
      {
        label: "Deferred",
        question: "Which decision have I let stay blurry?",
        signal: "The same unresolved choice keeps resurfacing as stress, avoidance, or vague dissatisfaction."
      },
      {
        label: "Inherited",
        question: "Whose expectation is steering this?",
        signal: "The path looks responsible from the outside, but does not feel fully chosen from the inside."
      },
      {
        label: "Fear-led",
        question: "What am I protecting myself from?",
        signal: "A past disappointment or imagined consequence has become the hidden constraint."
      }
    ],
    queue: [
      "Is the direction I am moving still the one I truly want?",
      "What assumption did I accept without questioning it?",
      "Where do I need to stop the car and look at the map again?"
    ]
  },
  direction: {
    kicker: "Direction Map",
    title: "Where do I actually want to go?",
    domains: [
      { name: "Self", purpose: "Energy, identity, health, values, and the person I am becoming.", drift: "Running on obligation while losing contact with desire." },
      { name: "Work", purpose: "Projects, craft, contribution, money, and the work worth choosing.", drift: "Mistaking motion, urgency, or approval for meaningful progress." },
      { name: "People", purpose: "Relationships, care, promises, repair, and shared context.", drift: "Letting important relationships depend on memory and accident." },
      { name: "Home", purpose: "Place, household rhythms, environment, and daily stability.", drift: "Allowing friction to become normal because it is familiar." },
      { name: "Knowledge", purpose: "Notes, sources, beliefs, principles, and hard-won memory.", drift: "Collecting inputs without converting them into direction." },
      { name: "Future", purpose: "Dreams, risks, capabilities, and roads that could open next.", drift: "Letting old versions of myself overrule emerging possibilities." }
    ]
  },
  practice: {
    kicker: "Agency Practice",
    title: "Take hold of the wheel",
    rituals: [
      {
        name: "Wake Up",
        time: "4 min",
        body: "Name the part of life that feels automatic, off-course, or quietly avoided."
      },
      {
        name: "Look at the Map",
        time: "8 min",
        body: "Compare the current path with the direction that still matters."
      },
      {
        name: "Choose Again",
        time: "6 min",
        body: "Turn one vague tension into a specific decision or next step."
      },
      {
        name: "Review the Road",
        time: "10 min",
        body: "Notice what changed, what resisted, and what tomorrow should protect."
      }
    ]
  },
  pulse: {
    kicker: "Agency Pulse",
    title: "Am I living by intention?",
    signals: [
      { label: "Clarity", value: 72, note: "Do I know what matters now?" },
      { label: "Agency", value: 64, note: "Do my choices feel chosen?" },
      { label: "Alignment", value: 51, note: "Does the path match the destination?" },
      { label: "Capacity", value: 43, note: "Do I have room to respond well?" }
    ],
    log: [
      "Agency thesis added to VEDA.",
      "Audit prompts now expose decisional autopilot.",
      "Direction map reframes life domains by drift and purpose.",
      "Durable GitHub Pages deployment is live."
    ]
  }
};

const root = document.querySelector("#view-root");
const kicker = document.querySelector("#view-kicker");
const title = document.querySelector("#view-title");
const navItems = [...document.querySelectorAll(".nav-item")];
const focusAction = document.querySelector("#focus-action");

function render() {
  const viewData = data[state.view];
  kicker.textContent = viewData.kicker;
  title.textContent = viewData.title;
  navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.view === state.view));

  if (state.view === "audit") renderAudit();
  if (state.view === "direction") renderDirection();
  if (state.view === "practice") renderPractice();
  if (state.view === "pulse") renderPulse();
}

function renderAudit() {
  const viewData = data.audit;
  const selectedPrompt = viewData.prompts[state.selectedAudit];

  root.innerHTML = `
    <section class="manifesto-band">
      <div>
        <p class="panel-label">Manifesto Premise</p>
        <h3>${viewData.thesis.title}</h3>
        <p>${viewData.thesis.body}</p>
      </div>
      <div class="steering-card">
        <span>Active Question</span>
        <strong>${selectedPrompt.question}</strong>
        <p>${selectedPrompt.signal}</p>
      </div>
    </section>

    <section class="content-grid">
      <div class="module">
        <div class="module-header">
          <h3>Autopilot Scan</h3>
          <span>${viewData.prompts.length} lenses</span>
        </div>
        <ol class="audit-list">
          ${viewData.prompts.map((prompt, index) => `
            <li class="${index === state.selectedAudit ? "is-selected" : ""}">
              <button data-audit-index="${index}">
                <span>${prompt.label}</span>
                <strong>${prompt.question}</strong>
              </button>
            </li>
          `).join("")}
        </ol>
      </div>

      <div class="module">
        <div class="module-header">
          <h3>Agency Audit</h3>
          <span>Now</span>
        </div>
        <div class="audit-result">
          <span>${selectedPrompt.label}</span>
          <h3>${selectedPrompt.question}</h3>
          <p>${selectedPrompt.signal}</p>
          <button data-view-jump="practice">Turn this into a practice</button>
        </div>
      </div>

      <div class="module module-wide">
        <div class="module-header">
          <h3>Questions Worth Slowing Down For</h3>
          <span>${viewData.queue.length} open</span>
        </div>
        <div class="decision-list">
          ${viewData.queue.map((decision) => `<p>${decision}</p>`).join("")}
        </div>
      </div>
    </section>
  `;

  root.querySelectorAll("[data-audit-index]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedAudit = Number(button.dataset.auditIndex);
      render();
    });
  });

  root.querySelector("[data-view-jump]").addEventListener("click", () => {
    state.view = "practice";
    render();
  });
}

function renderDirection() {
  root.innerHTML = `
    <section class="domain-grid">
      ${data.direction.domains.map((domain) => `
        <article class="domain-card">
          <span>${domain.name.slice(0, 2).toUpperCase()}</span>
          <h3>${domain.name}</h3>
          <p>${domain.purpose}</p>
          <small>${domain.drift}</small>
        </article>
      `).join("")}
    </section>
  `;
}

function renderPractice() {
  const selected = data.practice.rituals[state.selectedPractice];

  root.innerHTML = `
    <section class="practice-layout">
      <div class="module practice-panel">
        <p class="panel-label">Daily Agency Loop</p>
        <h3>${selected.name}</h3>
        <p>${selected.body}</p>
        <strong>${selected.time}</strong>
      </div>
      <div class="module">
        <div class="module-header">
          <h3>Ritual Sequence</h3>
          <span>${data.practice.rituals.length} steps</span>
        </div>
        <div class="ritual-list">
          ${data.practice.rituals.map((ritual, index) => `
            <button class="${index === state.selectedPractice ? "is-selected" : ""}" data-practice-index="${index}">
              <span>${ritual.time}</span>
              <strong>${ritual.name}</strong>
              <p>${ritual.body}</p>
            </button>
          `).join("")}
        </div>
      </div>
    </section>
  `;

  root.querySelectorAll("[data-practice-index]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedPractice = Number(button.dataset.practiceIndex);
      render();
    });
  });
}

function renderPulse() {
  root.innerHTML = `
    <section class="pulse-layout">
      <div class="signal-grid">
        ${data.pulse.signals.map((signal) => `
          <article class="signal">
            <div class="dial" style="--value: ${signal.value}%">
              <span>${signal.value}</span>
            </div>
            <strong>${signal.label}</strong>
            <p>${signal.note}</p>
          </article>
        `).join("")}
      </div>
      <div class="module">
        <div class="module-header">
          <h3>Build Log</h3>
          <span>Now</span>
        </div>
        <div class="log-list">
          ${data.pulse.log.map((entry) => `<p>${entry}</p>`).join("")}
        </div>
      </div>
    </section>
  `;
}

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    state.view = item.dataset.view;
    render();
  });
});

focusAction.addEventListener("click", () => {
  state.view = "audit";
  state.selectedAudit = (state.selectedAudit + 1) % data.audit.prompts.length;
  render();
});

render();
