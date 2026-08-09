(() => {
  "use strict";
  const params = new URLSearchParams(location.search);
  if (params.get("admin") !== "1") return;
  const panel = document.getElementById("adminPanel200");
  if (!panel) return;
  const logs = [];
  window.addEventListener("error", (event) => logs.push(`${event.message} (${event.filename || "?"}:${event.lineno || 0})`));
  window.addEventListener("unhandledrejection", (event) => logs.push(`Promise: ${String(event.reason || "unbekannt")}`));

  function duplicates(list) {
    const seen = new Set(), dup = new Set(); list.forEach((x)=>seen.has(x)?dup.add(x):seen.add(x)); return [...dup];
  }
  async function missingImages(items) {
    const checks = items.map((recipe)=>new Promise((resolve)=>{
      const img=new Image(); img.onload=()=>resolve(null); img.onerror=()=>resolve(recipe.slug || recipe.title); img.src=getRecipeImagePath(recipe)+`?diag=${Date.now()}`;
    }));
    return (await Promise.all(checks)).filter(Boolean);
  }
  function malformedIngredient(recipe) {
    return (recipe.ingredients || []).some((i)=>{
      if (!i.name || i.amount === undefined || !i.unit) return true;
      if (i.optional && (i.amount === null || i.amount === "")) return false;
      return !i.canonical || !Number.isFinite(Number(i.grams));
    });
  }
  function incompleteBaking(recipe) {
    const b=recipe.baking; if (!b) return false;
    return !b.form || !b.bakeTime || !b.doneness || !b.consistency || !b.rack || !b.heat || !b.temperature;
  }
  function row(label,value,status="ok") { return `<div class="admin-row-200 ${status}"><span>${escapeHtml(label)}</span><strong>${escapeHtml(String(value))}</strong></div>`; }

  async function run() {
    panel.classList.remove("hidden");
    panel.innerHTML=`<div class="admin-card-200"><div class="admin-head-200"><div><span class="eyebrow">Nur intern</span><h2>Küchenkumpel Diagnose</h2></div><button id="adminRefresh200" type="button" class="ghost-button">Neu prüfen</button></div><p>Prüfung läuft …</p></div>`;
    document.getElementById("adminRefresh200")?.addEventListener("click",run);
    const all=recipes || []; const back=all.filter((r)=>r.baking);
    const dupIds=duplicates(all.map((r)=>r.id)); const dupSlugs=duplicates(all.map((r)=>r.slug));
    const noNutrition=all.filter((r)=>!r.nutrition?.perPortion?.kcal).length;
    const badIngredients=all.filter(malformedIngredient).length;
    const noSteps=all.filter((r)=>!(r.quality?.stepDetails || r.steps || []).length).length;
    const incompleteBack=back.filter(incompleteBaking).length;
    const missing=await missingImages(all);
    let localKeys=0; try { localKeys=Object.keys(localStorage).length; } catch {}
    const html=[
      row("Version",window.KUECHENKUMPEL_VERSION?.app || "?"), row("Rezepte gesamt",all.length,all.length===340?"ok":"bad"), row("Backrezepte",back.length,back.length===100?"ok":"bad"),
      row("Doppelte IDs",dupIds.length,dupIds.length?"bad":"ok"), row("Doppelte Slugs",dupSlugs.length,dupSlugs.length?"bad":"ok"), row("Fehlende Bilder",missing.length,missing.length?"bad":"ok"),
      row("Fehlende Nährwerte",noNutrition,noNutrition?"warn":"ok"), row("Unvollständige Zutatenstrukturen",badIngredients,badIngredients?"warn":"ok"), row("Rezepte ohne Schritte",noSteps,noSteps?"bad":"ok"),
      row("Unvollständige Backangaben",incompleteBack,incompleteBack?"warn":"ok"), row("Lokale Speicherstände",localKeys), row("JS-Fehler im Diagnosefenster",logs.length,logs.length?"bad":"ok")
    ].join("");
    panel.querySelector(".admin-card-200").innerHTML=`<div class="admin-head-200"><div><span class="eyebrow">Nur intern</span><h2>Küchenkumpel Diagnose</h2></div><button id="adminRefresh200" type="button" class="ghost-button">Neu prüfen</button></div><div class="admin-grid-200">${html}</div>${logs.length?`<details><summary>Fehlerprotokoll</summary><pre>${escapeHtml(logs.join("\n"))}</pre></details>`:""}`;
    document.getElementById("adminRefresh200")?.addEventListener("click",run);
  }
  setTimeout(run,250);
})();
