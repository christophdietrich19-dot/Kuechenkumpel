window.KUECHENKUMPEL_UPDATE = {
  version: "1.3.1",

  badge: "UPDATE",

  title: "Neu bei Küchenkumpel",

  subtitle: "Ein kleines Update für deinen Küchenbuddy.",

  image: "assets/images/update-pinup.png",

  imageAlt: "Neu bei Küchenkumpel – Update-Pinup mit Küchenkumpel",

  items: [
    {
      icon: "♥",
      title: "Favoriten speichern",
      text: "Merke dir Rezepte, die du nochmal kochen willst."
    },
    {
      icon: "☀",
      title: "Tageszeit-Modus",
      text: "Morgens, mittags und abends fühlt sich Küchenkumpel jetzt passender an."
    },
    {
      icon: "🍂",
      title: "Saison-Themes",
      text: "Standard, Weihnachten, Halloween, Ostern, Frühling, Sommer und Herbst sind jetzt direkt wählbar."
    },
    {
      icon: "⌂",
      title: "Mehr Übersicht",
      text: "Die Startseite ist aufgeräumter und angenehmer zu bedienen."
    },
    {
      icon: "✦",
      title: "Küchenkumpel verbessert",
      text: "Mehr Stimmung, mehr Persönlichkeit und ein schönerer Start."
    }
  ],

  buttonText: "Alles klar, loskochen",

  laterText: "Später nochmal anschauen"
};

(function rebuildKuechenkumpelUpdateFlyer() {
  const update = window.KUECHENKUMPEL_UPDATE;
  const imagePath = update.image || "assets/images/update-pinup.png";

  const oldFlyer = document.getElementById("updateFlyer");

  if (oldFlyer) {
    oldFlyer.remove();
  }

  const style = document.createElement("style");
  style.id = "kuechenkumpel-update-pinup-style";

  const oldStyle = document.getElementById(style.id);

  if (oldStyle) {
    oldStyle.remove();
  }

  style.textContent = `
    .update-flyer {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: grid;
      place-items: center;
      padding: 18px;
    }

    .update-flyer.hidden {
      display: none;
    }

    .update-flyer-backdrop {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 18% 10%, rgba(229, 111, 34, 0.22), transparent 34%),
        radial-gradient(circle at 84% 88%, rgba(54, 88, 59, 0.16), transparent 34%),
        rgba(38, 53, 42, 0.52);
      backdrop-filter: blur(10px);
    }

    .update-pinup-card {
      position: relative;
      z-index: 1;
      width: min(100%, 520px);
      max-height: min(92vh, 760px);
      overflow: auto;
      border-radius: 34px;
      padding: 18px;
      background:
        radial-gradient(circle at top left, rgba(255, 255, 255, 0.95), transparent 38%),
        linear-gradient(145deg, rgba(255, 250, 240, 0.96), rgba(255, 247, 237, 0.9));
      border: 1px solid rgba(214, 157, 85, 0.32);
      box-shadow:
        0 34px 92px rgba(67, 43, 24, 0.26),
        inset 0 1px 0 rgba(255, 255, 255, 0.72);
    }

    .update-close-button {
      position: absolute;
      z-index: 3;
      right: 18px;
      top: 18px;
      width: 42px;
      height: 42px;
      display: grid;
      place-items: center;
      border-radius: 999px;
      background: rgba(255, 250, 240, 0.96);
      border: 1px solid rgba(214, 157, 85, 0.32);
      color: #9a1f1f;
      font-size: 1.45rem;
      font-weight: 900;
      line-height: 1;
      box-shadow: 0 10px 22px rgba(67, 43, 24, 0.14);
      cursor: pointer;
    }

    .update-pinup-image-wrap {
      display: grid;
      place-items: center;
      padding: 8px 8px 16px;
    }

    .update-pinup-image {
      display: block;
      width: min(100%, 430px);
      height: auto;
      border-radius: 26px;
      box-shadow:
        0 20px 46px rgba(67, 43, 24, 0.16),
        0 0 0 1px rgba(255, 255, 255, 0.58);
    }

    .update-flyer-hidden-content {
      display: none;
    }

    .update-flyer-actions {
      display: grid;
      gap: 10px;
      padding: 0 8px 4px;
    }

    .update-main-button {
      width: 100%;
      min-height: 54px;
      border-radius: 999px;
      border: none;
      background: linear-gradient(135deg, #dc2626, #ef4444);
      color: #ffffff;
      font-weight: 900;
      font-size: 1.02rem;
      box-shadow:
        0 16px 32px rgba(185, 28, 28, 0.22),
        inset 0 1px 0 rgba(255, 255, 255, 0.28);
      cursor: pointer;
    }

    .update-later-button {
      min-height: 42px;
      border-radius: 999px;
      border: none;
      background: transparent;
      color: #6f756b;
      font-weight: 900;
      cursor: pointer;
    }

    .update-later-button:hover {
      background: rgba(255, 250, 240, 0.68);
    }

    body[data-theme="halloween"] .update-flyer-backdrop {
      background:
        radial-gradient(circle at 18% 10%, rgba(249, 115, 22, 0.28), transparent 34%),
        radial-gradient(circle at 84% 88%, rgba(124, 58, 237, 0.24), transparent 34%),
        rgba(15, 10, 20, 0.74);
    }

    body[data-theme="halloween"] .update-pinup-card {
      background:
        radial-gradient(circle at top left, rgba(255, 255, 255, 0.09), transparent 38%),
        linear-gradient(145deg, rgba(59, 40, 72, 0.98), rgba(34, 24, 43, 0.94));
      border-color: rgba(249, 115, 22, 0.35);
    }

    body[data-theme="halloween"] .update-close-button {
      background: rgba(255, 255, 255, 0.08);
      color: #ffedd5;
      border-color: rgba(249, 115, 22, 0.32);
    }

    body[data-theme="halloween"] .update-later-button {
      color: #d8c8b4;
    }

    @media (max-width: 620px) {
      .update-flyer {
        padding: 10px;
      }

      .update-pinup-card {
        width: min(100%, 430px);
        max-height: min(92vh, 760px);
        border-radius: 30px;
        padding: 14px;
      }

      .update-close-button {
        right: 14px;
        top: 14px;
        width: 38px;
        height: 38px;
      }

      .update-pinup-image-wrap {
        padding: 6px 4px 14px;
      }

      .update-pinup-image {
        width: min(100%, 360px);
        border-radius: 22px;
      }

      .update-main-button {
        min-height: 52px;
        font-size: 0.98rem;
      }
    }

    @media (max-width: 380px) {
      .update-pinup-card {
        padding: 12px;
      }

      .update-pinup-image {
        width: min(100%, 320px);
      }
    }
  `;

  document.head.appendChild(style);

  const flyer = document.createElement("div");
  flyer.id = "updateFlyer";
  flyer.className = "update-flyer hidden";
  flyer.setAttribute("role", "dialog");
  flyer.setAttribute("aria-modal", "true");
  flyer.setAttribute("aria-labelledby", "updateFlyerTitle");

  flyer.innerHTML = `
    <div id="updateFlyerBackdrop" class="update-flyer-backdrop"></div>

    <article class="update-pinup-card">
      <button
        id="closeUpdateFlyerButton"
        class="update-close-button"
        type="button"
        aria-label="Update-Hinweis schließen"
      >
        ×
      </button>

      <div class="update-pinup-image-wrap">
        <img
          id="updateFlyerImage"
          class="update-pinup-image"
          src="${imagePath}"
          alt="${update.imageAlt || "Neu bei Küchenkumpel"}"
        />
      </div>

      <div class="update-flyer-hidden-content">
        <span id="updateFlyerBadge">${update.badge || "UPDATE"}</span>
        <h2 id="updateFlyerTitle">${update.title || "Neu bei Küchenkumpel"}</h2>
        <p id="updateFlyerSubtitle">${update.subtitle || ""}</p>
        <div id="updateFlyerItems"></div>
      </div>

      <div class="update-flyer-actions">
        <button
          id="confirmUpdateFlyerButton"
          class="update-main-button"
          type="button"
        >
          ${update.buttonText || "Alles klar, loskochen"}
        </button>

        <button
          id="showUpdateLaterButton"
          class="update-later-button"
          type="button"
        >
          ${update.laterText || "Später nochmal anschauen"}
        </button>
      </div>
    </article>
  `;

  document.body.appendChild(flyer);
})();