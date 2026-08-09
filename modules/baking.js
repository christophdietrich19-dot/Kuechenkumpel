(() => {
  "use strict";

  const panel = document.getElementById("bakingPanel");
  const subButtons = Array.from(document.querySelectorAll("[data-baking-sub]"));
  const tagButtons = Array.from(document.querySelectorAll("[data-baking-tag]"));
  const difficultySelect = document.getElementById("bakingDifficultySelect");
  const timeSelect = document.getElementById("bakingTimeSelect");
  const todayButton = document.getElementById("todayBakeButton");
  const todayResult = document.getElementById("todayBakeResult");
  let activeSub = "all";
  const activeTags = new Set();
  let lastBakeIds = [];
  let backTimers = [];
  let backTimerInterval = null;

  const normalizeText = (value) => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ß/g,"ss").replace(/[^a-z0-9\s&-]/g," ").replace(/\s+/g," ").trim();
  const isBakingRecipe = (recipe) => Boolean(recipe?.baking || (recipe?.categories || []).some((c) => normalizeText(c) === "backen") || (recipe?.tags || []).some((t) => normalizeText(t) === "backen"));
  const allRecipeTags = (recipe) => [...(recipe.tags || []), ...(recipe.categories || []), recipe.baking?.subCategory || ""].map(normalizeText);
  const minuteValue = (recipe) => Number(String(recipe.timeTotal || recipe.time || "").match(/\d+/)?.[0] || 999);

  function matchesBakingControls(recipe) {
    if (!isBakingRecipe(recipe)) return false;
    const tags = allRecipeTags(recipe);
    if (activeSub !== "all" && !tags.includes(normalizeText(activeSub))) return false;
    for (const tag of activeTags) {
      if (tag === "vegan") { if (!(recipe.vegan || recipe.diet?.vegan)) return false; continue; }
      if (tag === "glutenfrei möglich") { if (!(recipe.glutenFreePossible || recipe.diet?.glutenFreePossible)) return false; continue; }
      if (!tags.includes(normalizeText(tag))) return false;
    }
    const difficulty = difficultySelect?.value || "all";
    if (difficulty !== "all" && (recipe.quality?.difficulty || recipe.difficulty) !== difficulty) return false;
    const maxTime = Number(timeSelect?.value || 0);
    if (maxTime && minuteValue(recipe) > maxTime) return false;
    return true;
  }

  function renderControls() {
    panel?.classList.toggle("hidden", activeFilter !== "backen");
    subButtons.forEach((button) => {
      const active = (button.dataset.bakingSub || "all") === activeSub;
      button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active));
    });
    tagButtons.forEach((button) => {
      const active = activeTags.has(button.dataset.bakingTag || "");
      button.classList.toggle("active", active); button.setAttribute("aria-pressed", String(active));
    });
  }

  const previousRecipeMatchesActiveFilter = recipeMatchesActiveFilter;
  recipeMatchesActiveFilter = function recipeMatchesActiveFilter200(recipe) {
    if (activeFilter === "backen") return matchesBakingControls(recipe);
    return previousRecipeMatchesActiveFilter(recipe);
  };

  const previousSetActiveFilter = setActiveFilter;
  setActiveFilter = function setActiveFilter200(filter) {
    previousSetActiveFilter(filter);
    renderControls();
    if (filter === "backen") {
      moreRecipesVisible = true;
      setTimeout(() => panel?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  };

  const previousRenderAll = renderAll;
  renderAll = function renderAll200() {
    previousRenderAll();
    renderControls();
  };

  subButtons.forEach((button) => button.addEventListener("click", () => {
    activeSub = button.dataset.bakingSub || "all";
    rescueModeActive = false; moreRecipesVisible = true; renderAll();
  }));
  tagButtons.forEach((button) => button.addEventListener("click", () => {
    const tag = button.dataset.bakingTag || "";
    activeTags.has(tag) ? activeTags.delete(tag) : activeTags.add(tag);
    rescueModeActive = false; moreRecipesVisible = true; renderAll();
  }));
  difficultySelect?.addEventListener("change", () => { moreRecipesVisible = true; renderAll(); });
  timeSelect?.addEventListener("change", () => { moreRecipesVisible = true; renderAll(); });

  function selectedIngredientBonus(recipe) {
    try {
      const selected = getSelectedNames();
      if (!selected.length) return 0;
      const names = getRecipeIngredientNames(recipe);
      return selected.reduce((sum, item) => sum + (names.some((name) => isExactIngredientMatch(name, item)) ? 4 : 0), 0);
    } catch { return 0; }
  }

  function pickTodayBake() {
    let pool = recipes.filter(matchesBakingControls);
    if (!pool.length) pool = recipes.filter(isBakingRecipe);
    const avoid = new Set(lastBakeIds);
    let candidates = pool.filter((r) => !avoid.has(r.id));
    if (!candidates.length) candidates = pool;
    const ranked = candidates.map((recipe) => ({ recipe, rank: Math.random() + selectedIngredientBonus(recipe) * 0.04 - Math.max(0, minuteValue(recipe) - 90) * 0.0005 }))
      .sort((a,b) => b.rank-a.rank);
    const recipe = ranked[0]?.recipe;
    if (!recipe || !todayResult) return;
    lastBakeIds = [recipe.id, ...lastBakeIds].slice(0,5);
    todayResult.innerHTML = `
      <article class="today-bake-card-200">
        <img src="${escapeHtml(getRecipeImagePath(recipe))}" alt="${escapeHtml(recipe.imageAlt || recipe.title || recipe.name)}" loading="lazy" decoding="async">
        <div><span class="eyebrow">Heute backen</span><h4>${escapeHtml(recipe.title || recipe.name)}</h4><p>${escapeHtml(recipe.time || recipe.timeTotal || "")} · ${escapeHtml(recipe.quality?.difficulty || recipe.difficulty || "Einfach")}</p><button class="primary-button" type="button" data-open-today-bake="${recipe.id}">Rezept öffnen</button></div>
      </article>`;
    todayResult.classList.remove("hidden");
    todayResult.querySelector("[data-open-today-bake]")?.addEventListener("click", () => openRecipeModal(recipe.id));
  }
  todayButton?.addEventListener("click", pickTodayBake);

  function bakingFactsMarkup(recipe) {
    const b = recipe.baking || {};
    const facts = [
      ["Vorheizen", b.preheat ? "Ja" : "Nein"],
      ["Temperatur", b.temperature ? `${b.temperature} °C · ${b.heat || ""}`.trim() : "nach Rezept"],
      ["Einschub", b.rack], ["Form / Blech", b.form], ["Backzeit", b.bakeTime],
      ["Ruhe / Gehzeit", b.restTime], ["Abkühlen", b.coolTime]
    ].filter(([,v]) => v);
    return `<section class="baking-facts-200"><div class="baking-section-head-200"><span class="eyebrow">Back-Check</span><h4>Damit du nicht raten musst</h4></div><div class="baking-facts-grid-200">${facts.map(([k,v])=>`<div><small>${escapeHtml(k)}</small><strong>${escapeHtml(String(v))}</strong></div>`).join("")}</div>${b.doneness ? `<p><strong>Garprobe:</strong> ${escapeHtml(b.doneness)}</p>`:""}${b.consistency ? `<p><strong>Konsistenz:</strong> ${escapeHtml(b.consistency)}</p>`:""}${b.formHelp ? `<details><summary>Teig- / Form-Hilfe</summary><p>${escapeHtml(b.formHelp)}</p></details>`:""}</section>`;
  }

  function troubleshootingMarkup(recipe) {
    const list = recipe.baking?.troubleshooting || [];
    if (!list.length) return "";
    return `<details class="recipe-detail-accordion baking-trouble-200"><summary><span><strong>Wenn’s hakt</strong><small>Geprüfte Hilfe zu typischen Problemen</small></span><span>öffnen</span></summary><ul>${list.map((x)=>`<li>${escapeHtml(x)}</li>`).join("")}</ul><button class="ghost-button" type="button" data-open-baking-help="${recipe.id}">Problem beim Backen?</button></details>`;
  }

  const previousRenderRecipeModal = renderRecipeModal;
  renderRecipeModal = function renderRecipeModal200(recipe) {
    previousRenderRecipeModal(recipe);
    if (!isBakingRecipe(recipe)) return;
    const effective = typeof getCurrentModalRecipe114 === "function" ? getCurrentModalRecipe114(recipe) : recipe;
    const nutrition = modalContent?.querySelector("#modalNutritionPanel");
    if (nutrition && !modalContent.querySelector(".baking-facts-200")) nutrition.insertAdjacentHTML("beforebegin", bakingFactsMarkup(effective));
    if (!modalContent?.querySelector(".baking-trouble-200")) modalContent?.insertAdjacentHTML("beforeend", troubleshootingMarkup(effective));
    const cookToggle = modalContent?.querySelector("[data-toggle-cook-mode], #toggleCookModeButton, .cook-mode-toggle");
    if (cookToggle) cookToggle.textContent = "Backmodus";
    const panelTitle = modalContent?.querySelector("#cookModePanel .cook-mode-head strong");
    if (panelTitle) panelTitle.textContent = "Backmodus";
    const endButton = modalContent?.querySelector("#endCookModeButton115");
    if (endButton) endButton.textContent = "Backmodus beenden";
    modalContent?.querySelector("[data-open-baking-help]")?.addEventListener("click", () => window.KK_HELP_200?.open({ recipe: effective }));
    enhanceBackMode(effective);
  };

  function timerLabelFromStep(step, recipe) {
    const text = normalizeText(step?.text || "");
    if (text.includes("geh") || text.includes("ruhe")) return "Geh- / Ruhezeit";
    if (text.includes("vorheiz")) return "Vorheizen";
    if (text.includes("abkuehl")) return "Abkühlen";
    return (recipe?.title || recipe?.name) ? `Backen · ${recipe.title || recipe.name}` : "Backzeit";
  }

  function ensureTimerPanel(recipe) {
    const cookPanel = document.getElementById("cookModePanel");
    if (!cookPanel) return null;
    let timerPanel = document.getElementById("backTimerPanel200");
    if (!timerPanel) {
      timerPanel = document.createElement("section");
      timerPanel.id = "backTimerPanel200";
      timerPanel.className = "back-timers-200 hidden";
      const navigation = cookPanel.querySelector(".cook-mode-navigation") || cookPanel.lastElementChild;
      navigation?.insertAdjacentElement("beforebegin", timerPanel);
    }
    return timerPanel;
  }

  function renderBackTimers(recipe) {
    const panel = ensureTimerPanel(recipe); if (!panel) return;
    if (!backTimers.length) { panel.classList.add("hidden"); panel.innerHTML=""; return; }
    panel.classList.remove("hidden");
    panel.innerHTML = `<div class="back-timer-head-200"><strong>Back-Timer</strong><span>${backTimers.length}/3 aktiv</span></div>${backTimers.map((t)=>`<div class="back-timer-row-200"><span>${escapeHtml(t.label)}</span><strong>${String(Math.floor(t.seconds/60)).padStart(2,"0")}:${String(t.seconds%60).padStart(2,"0")}</strong><button type="button" class="ghost-button" data-stop-back-timer="${t.id}">Stop</button></div>`).join("")}`;
    panel.querySelectorAll("[data-stop-back-timer]").forEach((button)=>button.addEventListener("click",()=>{ backTimers=backTimers.filter((t)=>String(t.id)!==button.dataset.stopBackTimer); renderBackTimers(recipe); }));
  }

  function startBackTimer(minutes, label, recipe) {
    if (backTimers.length >= 3) { updateBuddyTextOnly("Drei Back-Timer laufen schon. Erst einen beenden, dann passt wieder einer rein."); return; }
    const secs = Math.max(1, Math.round(Number(minutes)||1) * 60);
    backTimers.push({ id: Date.now()+Math.random(), seconds: secs, label: label || "Back-Timer" });
    renderBackTimers(recipe);
    if (!backTimerInterval) backTimerInterval = window.setInterval(()=>{
      let finished=[];
      backTimers.forEach((t)=>{ t.seconds -= 1; if (t.seconds<=0) finished.push(t); });
      if (finished.length) { backTimers=backTimers.filter((t)=>t.seconds>0); updateBuddyTextOnly(`${finished[0].label} ist fertig. Schau nach deinem Backgut.`); }
      renderBackTimers(recipe);
      if (!backTimers.length) { clearInterval(backTimerInterval); backTimerInterval=null; }
    },1000);
  }

  function enhanceBackMode(recipe) {
    const cookPanel = document.getElementById("cookModePanel"); if (!cookPanel) return;
    cookPanel.classList.add("back-mode-200");
    let help = document.getElementById("backModeHelpButton200");
    if (!help) {
      help=document.createElement("button"); help.id="backModeHelpButton200"; help.type="button"; help.className="ghost-button back-help-button-200"; help.textContent="Problem beim Backen?";
      cookPanel.querySelector(".cook-tools-115")?.appendChild(help);
    }
    help.onclick=()=>window.KK_HELP_200?.open({recipe});
    ensureTimerPanel(recipe);
  }

  const previousRenderCookModeStep = renderCookModeStep;
  renderCookModeStep = function renderCookModeStep200(recipe) {
    previousRenderCookModeStep(recipe);
    if (!isBakingRecipe(recipe)) return;
    enhanceBackMode(recipe);
    const steps = getDetailedSteps(recipe); const step = steps[cookingStepIndex];
    const timerButton = document.getElementById("cookStepTimerButton115");
    if (timerButton && step?.timerMinutes) timerButton.onclick = () => startBackTimer(step.timerMinutes, timerLabelFromStep(step, recipe), recipe);
  };

  // Capture inline step timers for baking recipes so they can run in parallel.
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-step-timer]");
    if (!button || !currentModalRecipeId) return;
    const recipe = recipes.find((r)=>r.id===currentModalRecipeId);
    if (!isBakingRecipe(recipe)) return;
    event.preventDefault(); event.stopImmediatePropagation();
    startBackTimer(Number(button.dataset.stepTimer)||1, "Back-Timer", recipe);
  }, true);

  const previousCloseRecipeModal = closeRecipeModal;
  closeRecipeModal = function closeRecipeModal200() {
    backTimers=[]; if (backTimerInterval) { clearInterval(backTimerInterval); backTimerInterval=null; }
    document.getElementById("backTimerPanel200")?.remove();
    document.getElementById("cookModePanel")?.classList.remove("back-mode-200");
    document.getElementById("backModeHelpButton200")?.remove();
    previousCloseRecipeModal();
  };

  renderControls();
  window.KK_BAKING_200 = { matchesBakingControls, isBakingRecipe, pickTodayBake };
})();
