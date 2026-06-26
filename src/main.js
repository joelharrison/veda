const state = {
  view: "today",
  selectedAction: 0
};

const data = {
  today: {
    kicker: "Today",
    title: "Morning command surface",
    focus: {
      title: "Define the first VEDA loop",
      body: "Move from ambition to a repeatable daily operating ritual: orient, decide, execute, reflect."
    },
    actions: [
      "Name the core modules and what each one owns.",
      "Draft the first daily review ritual.",
      "Create a local-first prototype before adding accounts or sync.",
      "Capture open questions as decisions, not vague notes."
    ],
    rituals: [
      { name: "Morning orientation", status: "Ready", time: "8 min" },
      { name: "Decision clearing", status: "Queued", time: "15 min" },
      { name: "Evening review", status: "Later", time: "10 min" }
    ],
    decisions: [
      "What is the atomic unit of VEDA: day, domain, project, or commitment?",
      "Should AI suggestions be proactive on the home surface?",
      "Which data must remain local-only in the first release?"
    ]
  },
  map: {
    kicker: "System Map",
    title: "The operating domains",
    domains: [
      { name: "Self", purpose: "Energy, health, attention, values, and reflection." },
      { name: "Work", purpose: "Projects, tasks, decisions, shipping cadence, and commitments." },
      { name: "Knowledge", purpose: "Notes, source material, principles, memory, and synthesis." },
      { name: "People", purpose: "Relationships, follow-ups, shared context, and care." },
      { name: "Money", purpose: "Runway, spending, revenue, goals, and risk." },
      { name: "Home", purpose: "Household rhythms, maintenance, logistics, and environment." }
    ]
  },
  pulse: {
    kicker: "Pulse",
    title: "Momentum and system health",
    signals: [
      { label: "Clarity", value: 72 },
      { label: "Momentum", value: 54 },
      { label: "Load", value: 61 },
      { label: "Recovery", value: 38 }
    ],
    log: [
      "Foundation repo started.",
      "Product brief drafted.",
      "Static OS shell created.",
      "Remote repository access still pending."
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

  if (state.view === "today") renderToday();
  if (state.view === "map") renderMap();
  if (state.view === "pulse") renderPulse();
}

function renderToday() {
  const viewData = data.today;
  root.innerHTML = `
    <section class="focus-band">
      <div>
        <p class="panel-label">Primary Focus</p>
        <h3>${viewData.focus.title}</h3>
        <p>${viewData.focus.body}</p>
      </div>
      <div class="next-move">
        <span>Next move</span>
        <strong>${viewData.actions[state.selectedAction]}</strong>
      </div>
    </section>

    <section class="content-grid">
      <div class="module">
        <div class="module-header">
          <h3>Actions</h3>
          <span>${viewData.actions.length}</span>
        </div>
        <ol class="action-list">
          ${viewData.actions.map((action, index) => `
            <li class="${index === state.selectedAction ? "is-selected" : ""}">
              <button data-action-index="${index}">${action}</button>
            </li>
          `).join("")}
        </ol>
      </div>

      <div class="module">
        <div class="module-header">
          <h3>Rituals</h3>
          <span>Daily</span>
        </div>
        <div class="ritual-list">
          ${viewData.rituals.map((ritual) => `
            <article>
              <strong>${ritual.name}</strong>
              <span>${ritual.status} · ${ritual.time}</span>
            </article>
          `).join("")}
        </div>
      </div>

      <div class="module module-wide">
        <div class="module-header">
          <h3>Decision Queue</h3>
          <span>${viewData.decisions.length} open</span>
        </div>
        <div class="decision-list">
          ${viewData.decisions.map((decision) => `<p>${decision}</p>`).join("")}
        </div>
      </div>
    </section>
  `;

  root.querySelectorAll("[data-action-index]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedAction = Number(button.dataset.actionIndex);
      render();
    });
  });
}

function renderMap() {
  root.innerHTML = `
    <section class="domain-grid">
      ${data.map.domains.map((domain) => `
        <article class="domain-card">
          <span>${domain.name.slice(0, 2).toUpperCase()}</span>
          <h3>${domain.name}</h3>
          <p>${domain.purpose}</p>
        </article>
      `).join("")}
    </section>
  `;
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
  state.view = "today";
  state.selectedAction = (state.selectedAction + 1) % data.today.actions.length;
  render();
});

render();
