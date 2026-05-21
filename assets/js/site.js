(function () {
  const builders = window.CAPSULE_BUILDERS || [];
  const inBuildersFolder = window.location.pathname.toLowerCase().includes("/builders/");
  const prefix = inBuildersFolder ? "../" : "";
  const builderPrefix = inBuildersFolder ? "" : "builders/";
  const pageTrail = [
    { page: "home", title: "Home", href: "index.html" },
    { page: "metrics", title: "Metrics", href: "metrics.html" },
    { page: "funding", title: "Funding", href: "funding.html" },
    { page: "compute", title: "Compute", href: "compute.html" },
    { page: "simulations", title: "Simulations", href: "simulations.html" },
    { page: "health", title: "Health Surge", href: "health-surge.html" },
    { page: "builders", title: "Builders", href: "builders/index.html" },
    { page: "boundaries", title: "Boundaries", href: "boundaries.html" },
    { page: "sources", title: "Sources", href: "sources.html" }
  ];

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function renderHeader() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;
    const current = document.body.dataset.page || "";
    header.innerHTML = `
      <div class="nav-shell">
        <a class="brand" href="${prefix}index.html" aria-label="Straddie Capsule Surge Lab home">
          <span class="brand-mark" aria-hidden="true"></span>
          <span>Capsule Surge Lab</span>
        </a>
        <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="site-nav">
          <span></span><span></span><span></span>
          <span class="sr-only">Menu</span>
        </button>
        <nav class="site-nav" id="site-nav" data-site-nav>
          <a href="${prefix}index.html" ${current === "home" ? 'aria-current="page"' : ""}>Home</a>
          <a href="${prefix}metrics.html" ${current === "metrics" ? 'aria-current="page"' : ""}>Metrics</a>
          <a href="${prefix}funding.html" ${current === "funding" ? 'aria-current="page"' : ""}>Funding</a>
          <a href="${prefix}compute.html" ${current === "compute" ? 'aria-current="page"' : ""}>Compute</a>
          <a href="${prefix}simulations.html" ${current === "simulations" ? 'aria-current="page"' : ""}>Simulations</a>
          <a href="${prefix}health-surge.html" ${current === "health" ? 'aria-current="page"' : ""}>Health Surge</a>
          <a href="${prefix}builders/index.html" ${current === "builders" || current === "builder" ? 'aria-current="page"' : ""}>Builders</a>
          <a href="${prefix}boundaries.html" ${current === "boundaries" ? 'aria-current="page"' : ""}>Boundaries</a>
          <a href="${prefix}sources.html" ${current === "sources" ? 'aria-current="page"' : ""}>Sources</a>
        </nav>
      </div>
    `;
  }

  function renderFooter() {
    const footer = document.querySelector("[data-site-footer]");
    if (!footer) return;
    footer.innerHTML = `
      <div class="footer-inner">
        <p>Site-neutral concept only. No address is chosen or implied.</p>
        <p>Not-for-profit community infrastructure planning for civic simulation, health-surge logistics, compute and agent-readable Markdown handoff.</p>
      </div>
    `;
  }

  function setupNav() {
    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.querySelector("[data-site-nav]");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  function setupTopButton() {
    const button = document.createElement("button");
    button.className = "top-button";
    button.type = "button";
    button.title = "Back to top";
    button.setAttribute("aria-label", "Back to top");
    button.innerHTML = "&uarr;";
    button.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    document.body.appendChild(button);
  }

  function renderPagePager() {
    const current = document.body.dataset.page || "";
    if (current === "builder") return;
    const footer = document.querySelector("[data-site-footer]");
    if (!footer || document.querySelector("[data-site-pager]")) return;
    const index = pageTrail.findIndex((page) => page.page === current);
    if (index < 0) return;
    const previous = pageTrail[(index - 1 + pageTrail.length) % pageTrail.length];
    const next = pageTrail[(index + 1) % pageTrail.length];
    const nav = document.createElement("nav");
    nav.className = "site-pager";
    nav.setAttribute("aria-label", "Page sequence");
    nav.setAttribute("data-site-pager", "");
    nav.innerHTML = `
      <a class="pager-link" href="${prefix}${previous.href}"><span>Previous</span><strong>${escapeHtml(previous.title)}</strong></a>
      <a class="pager-link next" href="${prefix}${next.href}"><span>Next</span><strong>${escapeHtml(next.title)}</strong></a>
    `;
    document.body.insertBefore(nav, footer);
  }

  function renderBuilderCards() {
    document.querySelectorAll("[data-builder-cards]").forEach((target) => {
      target.innerHTML = builders.map((builder, index) => `
        <a class="builder-card" href="${builderPrefix}${builder.page}">
          <span class="step-label">${String(index + 1).padStart(2, "0")}</span>
          <h3>${escapeHtml(builder.title)}</h3>
          <p>${escapeHtml(builder.description)}</p>
          <span class="builder-file">${escapeHtml(builder.file)}</span>
        </a>
      `).join("");
    });
  }

  function fieldId(field) {
    return `field-${field.name}`;
  }

  function fieldHints(field) {
    const hints = [];
    if (field.placeholder) hints.push(`<span><strong>Prompt:</strong> ${escapeHtml(field.placeholder)}</span>`);
    return hints.length ? `<small class="field-hints">${hints.join("")}</small>` : "";
  }

  function fieldMarkup(field) {
    const id = fieldId(field);
    const privateFlag = field.private ? `<span class="field-flag">Private / approval-gated</span>` : "";
    if (field.type === "textarea") {
      return `
        <label class="field field-wide" for="${id}">
          <span>${escapeHtml(field.label)}${privateFlag}</span>
          <textarea id="${id}" name="${field.name}" rows="${field.rows || 4}"></textarea>
          ${fieldHints(field)}
        </label>
      `;
    }
    if (field.type === "select") {
      return `
        <label class="field" for="${id}">
          <span>${escapeHtml(field.label)}${privateFlag}</span>
          <select id="${id}" name="${field.name}">
            ${(field.options || []).map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join("")}
          </select>
        </label>
      `;
    }
    if (field.type === "checkbox-group") {
      return `
        <fieldset class="field field-wide checkbox-group" data-field-name="${field.name}">
          <legend>${escapeHtml(field.label)}${privateFlag}</legend>
          <div class="checkbox-grid">
            ${(field.options || []).map(([value, label]) => `
              <label><input type="checkbox" name="${field.name}" value="${escapeHtml(value)}"> ${escapeHtml(label)}</label>
            `).join("")}
          </div>
        </fieldset>
      `;
    }
    const type = field.type || "text";
    return `
      <label class="field" for="${id}">
        <span>${escapeHtml(field.label)}${privateFlag}</span>
        <input id="${id}" name="${field.name}" type="${type}">
        ${fieldHints(field)}
      </label>
    `;
  }

  function groupFields(fields) {
    return fields.reduce((groups, field) => {
      const group = field.group || "Details";
      if (!groups[group]) groups[group] = [];
      groups[group].push(field);
      return groups;
    }, {});
  }

  function renderBuilderShell() {
    const shell = document.querySelector("[data-builder-shell]");
    if (!shell) return;
    const id = document.body.dataset.builderPage;
    const builder = builders.find((item) => item.id === id);
    if (!builder) {
      shell.innerHTML = `<section class="page-intro"><h1>Builder not found</h1><p class="lede">Return to the builder directory and choose an available builder.</p></section>`;
      return;
    }
    const groups = groupFields(builder.fields);
    const index = builders.indexOf(builder);
    const previous = builders[index - 1];
    const next = builders[index + 1];
    shell.innerHTML = `
      <section class="page-intro">
        <p class="step-label">Builder ${String(index + 1).padStart(2, "0")} of ${builders.length}</p>
        <h1>${escapeHtml(builder.title)}</h1>
        <p class="lede">${escapeHtml(builder.description)}</p>
        <p class="claim-boundary">${escapeHtml(builder.claimBoundary)}</p>
      </section>
      <section class="builder-layout">
        <form class="builder-form" data-builder-form>
          ${Object.entries(groups).map(([group, fields]) => `
            <fieldset>
              <legend>${escapeHtml(group)}</legend>
              <div class="form-grid">
                ${fields.map(fieldMarkup).join("")}
              </div>
            </fieldset>
          `).join("")}
          <div class="builder-actions">
            <button class="button primary" type="button" data-generate>Refresh preview</button>
            <button class="button secondary" type="button" data-copy>Copy Markdown</button>
            <button class="button secondary" type="button" data-download>Download .md</button>
            <button class="button quiet" type="button" data-clear>Reset</button>
          </div>
          <p class="status-line" data-status>Draft preview is generated locally in this browser.</p>
        </form>
        <aside class="preview-panel" aria-label="Markdown preview">
          <div class="preview-head">
            <h2>Markdown Preview</h2>
            <span>${escapeHtml(builder.file)}</span>
          </div>
          <textarea data-markdown-output spellcheck="false" aria-label="Generated Markdown"></textarea>
        </aside>
      </section>
      <nav class="builder-pager" aria-label="Builder sequence">
        ${previous ? `<a class="pager-link" href="${previous.page}">Previous: ${escapeHtml(previous.title)}</a>` : `<a class="pager-link" href="index.html">Builder directory</a>`}
        ${next ? `<a class="pager-link next" href="${next.page}">Next: ${escapeHtml(next.title)}</a>` : `<a class="pager-link next" href="index.html">Builder directory</a>`}
      </nav>
    `;
    setupBuilderForm(builder);
  }

  function valuesFromForm(builder, form) {
    const values = {};
    builder.fields.forEach((field) => {
      if (field.type === "checkbox-group") {
        values[field.name] = Array.from(form.querySelectorAll(`input[name="${field.name}"]:checked`)).map((input) => input.parentElement.textContent.trim());
      } else {
        const input = form.elements[field.name];
        values[field.name] = input ? input.value.trim() : "";
      }
    });
    return values;
  }

  function markdownLine(label, value) {
    if (Array.isArray(value)) return value.length ? `- **${label}:** ${value.join(", ")}` : "";
    return value ? `- **${label}:** ${value}` : "";
  }

  function makeMarkdown(builder, values) {
    const lines = [
      `# ${builder.title.replace(" Builder", "")}`,
      "",
      `- **Generated:** ${today()}`,
      `- **Draft status:** ${values.draftStatus || "Draft - needs review"}`,
      `- **Source date:** ${values.sourceDate || "Not supplied"}`,
      `- **Prepared by:** ${values.preparedBy || "Not supplied"}`,
      `- **Needs review by:** ${values.reviewBy || "Not supplied"}`,
      "",
      `> ${builder.claimBoundary}`,
      ""
    ];
    const groups = groupFields(builder.fields.filter((field) => !["draftStatus", "preparedBy", "sourceDate", "reviewBy"].includes(field.name)));
    Object.entries(groups).forEach(([group, fields]) => {
      const body = fields.map((field) => markdownLine(field.label, values[field.name])).filter(Boolean);
      if (body.length) {
        lines.push(`## ${group}`, "", ...body, "");
      }
    });
    lines.push(
      "## Public / Private Boundary",
      "",
      "- Public pages can discuss the concept, metrics, site criteria and review pathway.",
      "- Exact site candidates, unapproved addresses, raw health data, family context and commercial negotiations stay private until explicitly approved.",
      "",
      "## Related Builders",
      "",
      "- Aura builder: https://auraofintelligence.github.io/sbt_aura_builder/",
      "- P4A housing simulations: https://auraofintelligence.github.io/p4a_xyz/pages/housing-simulations.html",
      "- Straddie Vitality builders: https://auraofintelligence.github.io/straddie-vitality-network-builders/builders/",
      "- Straddie Content Assets Kit: https://auraofintelligence.github.io/straddie-content-assets-kit/",
      "- Straddie Disaster Kiosks: https://auraofintelligence.github.io/straddie-disaster-kiosks/",
      "- Straddie Noticeboard Network: https://auraofintelligence.github.io/straddie-noticeboard-network/",
      "- Capsule Surge Lab public site: https://auraofintelligence.github.io/straddie-capsule-surge-lab/",
      "- Capsule Surge Lab repo: https://github.com/auraofintelligence/straddie-capsule-surge-lab",
      "- Mineral Moonshots capsule card: https://auraofintelligence.github.io/mineral-moonshots/briefs/capsule-hotels.html",
      "- Mineral Moonshots repo: https://github.com/auraofintelligence/mineral-moonshots"
    );
    return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
  }

  function setupBuilderForm(builder) {
    const form = document.querySelector("[data-builder-form]");
    const output = document.querySelector("[data-markdown-output]");
    const status = document.querySelector("[data-status]");
    if (!form || !output) return;

    const generate = () => {
      const values = valuesFromForm(builder, form);
      output.value = makeMarkdown(builder, values);
      if (status) status.textContent = "Preview refreshed locally. Nothing has been uploaded.";
    };

    form.addEventListener("input", generate);
    form.querySelector("[data-generate]")?.addEventListener("click", generate);
    form.querySelector("[data-clear]")?.addEventListener("click", () => {
      form.reset();
      generate();
      if (status) status.textContent = "Form reset. Draft preview rebuilt.";
    });
    form.querySelector("[data-copy]")?.addEventListener("click", async () => {
      generate();
      try {
        await navigator.clipboard.writeText(output.value);
        if (status) status.textContent = "Markdown copied.";
      } catch (error) {
        output.select();
        if (status) status.textContent = "Select the preview and copy manually.";
      }
    });
    form.querySelector("[data-download]")?.addEventListener("click", () => {
      generate();
      const blob = new Blob([output.value], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = builder.file;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      if (status) status.textContent = `Downloaded ${builder.file}.`;
    });
    generate();
  }

  function setupScenario() {
    const panel = document.querySelector("[data-scenario]");
    if (!panel) return;
    const fields = {
      capsules: panel.querySelector("[name='capsules']"),
      occupancy: panel.querySelector("[name='occupancy']"),
      nightly: panel.querySelector("[name='nightly']"),
      podHours: panel.querySelector("[name='podHours']"),
      gpus: panel.querySelector("[name='gpus']"),
      idleComputeHours: panel.querySelector("[name='idleComputeHours']")
    };
    const output = panel.querySelector("[data-scenario-output]");
    const formatCurrency = (value) => new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(value);
    const render = () => {
      const capsules = Number(fields.capsules.value || 0);
      const occupancy = Number(fields.occupancy.value || 0) / 100;
      const nightly = Number(fields.nightly.value || 0);
      const podHours = Number(fields.podHours.value || 0);
      const gpus = Number(fields.gpus.value || 0);
      const idleComputeHours = Number(fields.idleComputeHours.value || 0);
      const nights = capsules * 365 * occupancy;
      const stayRevenue = nights * nightly;
      const requestedSimulationHours = podHours * 365;
      const minimumSimulationHours = nights * 2.5;
      const simulationHours = Math.max(requestedSimulationHours, minimumSimulationHours);
      const idleCapsuleDays = capsules * 365 * Math.max(0, 1 - occupancy);
      const idleGpuHours = idleCapsuleDays * gpus * idleComputeHours;
      const hourlyRevenue = simulationHours * 85;
      const total = stayRevenue + hourlyRevenue;
      const publicBlocks = Math.round(nights * 0.08);
      output.innerHTML = `
        <div><span>Annual capsule nights</span><strong>${Math.round(nights).toLocaleString("en-AU")}</strong></div>
        <div><span>Stay revenue range point</span><strong>${formatCurrency(stayRevenue)}</strong></div>
        <div><span>Simulation hours</span><strong>${Math.round(simulationHours).toLocaleString("en-AU")}</strong></div>
        <div><span>Simulation value</span><strong>${formatCurrency(hourlyRevenue)}</strong></div>
        <div><span>Idle GPU-hours</span><strong>${Math.round(idleGpuHours).toLocaleString("en-AU")}</strong></div>
        <div><span>Capsule GPUs online</span><strong>${Math.round(capsules * gpus).toLocaleString("en-AU")}</strong></div>
        <div><span>Community access nights</span><strong>${publicBlocks.toLocaleString("en-AU")}</strong></div>
        <p class="metric-note"><strong>Planning note:</strong> Scenario total ${formatCurrency(total)} excludes operating costs, finance, rack purchase and community returns. Simulation uses the greater of daily capacity or 2.5h per occupied night; idle GPU-hours count only vacant capsule capacity.</p>
      `;
    };
    Object.values(fields).forEach((field) => field.addEventListener("input", render));
    render();
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    setupNav();
    setupTopButton();
    renderBuilderCards();
    renderBuilderShell();
    setupScenario();
    renderPagePager();
  });
})();
