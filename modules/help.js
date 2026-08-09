(() => {
  "use strict";

  const modal = document.getElementById("helpModal200");
  const backdrop = document.getElementById("helpBackdrop200");
  const closeButton = document.getElementById("closeHelpButton200");
  const searchInput = document.getElementById("helpSearch200");
  const results = document.getElementById("helpResults200");
  const detail = document.getElementById("helpDetail200");
  const context = document.getElementById("helpContext200");
  const generalButton = document.getElementById("openHelpButton");
  const bakingButton = document.getElementById("openBakingHelpButton");
  const topics = Array.isArray(window.KUECHENKUMPEL_HELP_TOPICS) ? window.KUECHENKUMPEL_HELP_TOPICS : [];
  let currentRecipe = null;

  const normalizeText = (value) => String(value || "")
    .toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss").replace(/[^a-z0-9\s-]/g, " ").replace(/\s+/g, " ").trim();

  function distance(a, b) {
    a = normalizeText(a); b = normalizeText(b);
    if (!a) return b.length; if (!b) return a.length;
    const row = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i++) {
      let prev = row[0]; row[0] = i;
      for (let j = 1; j <= b.length; j++) {
        const tmp = row[j];
        row[j] = Math.min(row[j] + 1, row[j - 1] + 1, prev + (a[i - 1] === b[j - 1] ? 0 : 1));
        prev = tmp;
      }
    }
    return row[b.length];
  }

  function recipeContextTags(recipe) {
    if (!recipe) return [];
    return [
      ...(recipe.baking?.helpTags || []), ...(recipe.tags || []), ...(recipe.categories || []),
      recipe.baking?.method || "", recipe.title || recipe.name || ""
    ].map(normalizeText).filter(Boolean);
  }

  function scoreTopic(topic, query = "") {
    const q = normalizeText(query);
    const hay = normalizeText([topic.title, ...(topic.keywords || []), ...(topic.tags || [])].join(" "));
    let score = 0;
    if (!q) score = 20;
    else if (normalizeText(topic.title) === q) score = 1000;
    else if (normalizeText(topic.title).includes(q)) score = 800;
    else if (hay.includes(q)) score = 650;
    else if (q.length >= 4 && hay.split(/\s+/).some((word) => Math.abs(word.length - q.length) <= 2 && distance(word, q) <= (q.length >= 8 ? 2 : 1))) score = 420;
    if (currentRecipe) {
      const ctx = recipeContextTags(currentRecipe);
      const topicTags = (topic.tags || []).map(normalizeText);
      if (topicTags.some((tag) => ctx.some((c) => c.includes(tag) || tag.includes(c)))) score += 250;
    }
    return score;
  }

  function openTopic(id) {
    const topic = topics.find((item) => item.id === id);
    if (!topic || !detail) return;
    detail.innerHTML = `
      <button class="help-back-200 text-button" type="button">← Zur Übersicht</button>
      <article class="help-answer-card-200">
        <span class="eyebrow">Geprüfte Hilfe</span>
        <h4>${escapeHtml(topic.title)}</h4>
        <p>${escapeHtml(topic.answer)}</p>
      </article>`;
    detail.classList.remove("hidden");
    results?.classList.add("hidden");
    detail.querySelector(".help-back-200")?.addEventListener("click", () => {
      detail.classList.add("hidden");
      results?.classList.remove("hidden");
      searchInput?.focus();
    });
  }

  function render(query = "") {
    if (!results) return;
    const ranked = topics.map((topic) => ({ topic, score: scoreTopic(topic, query) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.topic.title.localeCompare(b.topic.title, "de"))
      .slice(0, query ? 8 : 10);
    results.classList.remove("hidden");
    detail?.classList.add("hidden");
    results.innerHTML = ranked.length ? ranked.map(({ topic }) => `
      <button class="help-topic-200" type="button" data-help-topic="${escapeHtml(topic.id)}">
        <strong>${escapeHtml(topic.title)}</strong>
        <span>${escapeHtml(String(topic.answer).split(".")[0] + ".")}</span>
      </button>`).join("") : `<div class="empty-state">Dazu habe ich keine geprüfte Hilfe hinterlegt. Versuch einen anderen Begriff.</div>`;
    results.querySelectorAll("[data-help-topic]").forEach((button) => button.addEventListener("click", () => openTopic(button.dataset.helpTopic)));
  }

  function open(options = {}) {
    if (!modal) return;
    currentRecipe = options.recipe || null;
    const recipeName = currentRecipe?.title || currentRecipe?.name || "";
    if (context) context.textContent = recipeName ? `Hilfe passend zu „${recipeName}“. Nur fest hinterlegte, geprüfte Hinweise.` : "Such nach einem Problem oder wähle ein geprüftes Hilfethema aus.";
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    if (searchInput) searchInput.value = options.query || "";
    render(options.query || "");
    setTimeout(() => searchInput?.focus(), 0);
  }

  function close() {
    modal?.classList.add("hidden");
    modal?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    currentRecipe = null;
  }

  searchInput?.addEventListener("input", () => render(searchInput.value));
  closeButton?.addEventListener("click", close);
  backdrop?.addEventListener("click", close);
  generalButton?.addEventListener("click", () => open());
  bakingButton?.addEventListener("click", () => open({ query: "backen" }));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modal && !modal.classList.contains("hidden")) close(); });

  window.KK_HELP_200 = { open, close, render };
})();
