(() => {
  const translations = {
  "Finde deinen": "Find your",
  "nächsten Zug.": "next move.",
  "Eröffnungen": "Openings",
  "Klassische Variante": "Classical Variation",
  "Die Dame kommt früh nach h5": "The queen comes out early to h5",
  "Frühe Damenentwicklung": "Early Queen Development",
  "Zurück zum Trainingsraum": "Back to the training room",
"← Zurück zum Trainingsraum": "← Back to the training room",
  "ERÖFFNUNGS-LABOR / SCHWARZ": "OPENING LAB / BLACK",
  "Verteidigung.": "Defense.",
  "ist gespielt. Lerne die typischen Pläne kennen und spiele die wichtigsten Varianten Zug für Zug durch.": "has been played. Learn the typical plans and play through the key variations move by move.",
  "WIEDERHOLEN & FESTIGEN": "REVIEW & IMPROVE",
  "Karteikarten": "Flashcards",
  "Teste dein Wissen zu den Caro-Kann-Varianten. Spiele die Züge auf dem Brett und bewerte danach, ob du die Variante schon kannst.": "Test your knowledge of Caro-Kann variations. Play the moves on the board and rate how well you know each variation.",
  "Karteikarten öffnen": "Open flashcards",
  "SPIELE DIE IDEEN": "PLAY THE IDEAS",
  "Variantenbibliothek": "Variation library",
  "Wähle eine Stellung und spiele die Züge auf dem Brett nach.": "Choose a position and replay the moves on the board.",
  "Neustart": "Restart",
"↺ Neustart": "↺ Restart",
"Zug zeigen →": "Show move →",
"Eröffnung abgeschlossen! ✓": "Opening completed! ✓",
"Figur zieht …": "Piece moving …",
  "Zug zeigen": "Show move",
  "Runde geschafft!": "Round complete!",
  "Die schwierigen Varianten kannst du direkt nochmal spielen.": "You can practise the difficult variations again right away.",
  "Nochmal üben": "Practise again",
  "Neue Runde": "New round",
  "Noch üben": "Practise again",
  "Kann ich": "I know this",
  "Bewerte die Variante nach dem Spielen. Schwierige Varianten kommen später erneut.": "Rate the variation after playing. Difficult variations will appear again later.",
  "TAKTIK-LABOR / TRAINING 01": "TACTICS LAB / TRAINING 01",
  "Early Queen Development kontern": "Counter Early Queen Development",
  "Die weiße Dame kommt früh ins Spiel. Deine Aufgabe: Entwickle Figuren mit Tempo, sichere deinen König und nutze taktische Chancen.": "White brings the queen out early. Your task: develop with tempo, keep your king safe, and use tactical opportunities.",
  "Schachtraining": "Chess Training",
  "Mattabwehr": "Defending Against Mate",
  "Springergabel": "Knight Fork",
  "Greif die Dame mit Tempo an.": "Attack the queen while developing.",
  "Neu starten": "Restart",
  "DEINE AUFGABE": "YOUR TASK",
  "Entwickle eine Figur und greife dabei die weiße Dame an.": "Develop a piece while attacking the white queen.",
  "SPIELSTATUS": "GAME STATUS",
  "Schwarz am Zug": "Black to move",
  "HILFE": "HELP",
  "Tipp anzeigen": "Show hint",
  "Zug aufdecken": "Reveal move",
  "ERÖFFNUNGS-LABOR": "OPENING LAB",
  "Schwarz am Zug.": "Black to move.",
  "Weiß am Zug.": "White to move.",
  "Eröffnung abgeschlossen!": "Opening completed!",
  "Alle Züge dieser Variante geschafft!": "All moves in this variation completed!",
  "Entwickle deine Figuren und achte auf das Zentrum.": "Develop your pieces and watch the centre.",
  "Nicht automatisch ...e6 vor der Läuferentwicklung spielen – das kann den Läufer c8 einsperren.": "Do not automatically play ...e6 before developing the bishop — it can trap the bishop on c8.",
  "Schlage den Bauern auf e4.": "Capture the pawn on e4.",
  "Entwickle deinen Läufer nach f5.": "Develop your bishop to f5.",
  "Zieh den angegriffenen Läufer zurück.": "Move the attacked bishop back.",
  "Entwickle den Springer nach d7.": "Develop the knight to d7.",
  "Entwickle den Läufer nach f5.": "Develop the bishop to f5.",
  "Stütze d5 mit dem e-Bauern.": "Support d5 with the e-pawn.",
  "Greife den Bauern d4 mit c5 an.": "Attack the pawn on d4 with c5.",
  "Entwickle den Springer nach c6.": "Develop the knight to c6.",
  "Nimm mit dem c-Bauern zurück.": "Recapture with the c-pawn.",
  "Entwickle den Springer nach f6.": "Develop the knight to f6.",
  "Greife das Zentrum mit e5 an.": "Strike at the centre with e5.",
  "Schlage den Bauern auf d4.": "Capture the pawn on d4.",
  "Greife den Springer e4 mit Nf6 an.": "Attack the knight on e4 with Nf6.",
  "Nimm mit dem e-Bauern zurück.": "Recapture with the e-pawn.",
  "Stütze d5 mit e6.": "Support d5 with e6.",
  "Greife mit d5 das Zentrum an.": "Challenge the centre with d5."
};
  const reverse = Object.fromEntries(Object.entries(translations).map(([de,en])=>[en,de]));
  const key = "chess-trap-lab-language";
  let language = "de";
  try { language = localStorage.getItem(key) === "en" ? "en" : "de"; } catch {}
  function translateNode(node) {
    if (!node || node.nodeType !== Node.TEXT_NODE) return;
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    if (!trimmed) return;
    const dict = language === "en" ? translations : reverse;
    if (dict[trimmed]) node.nodeValue = raw.replace(trimmed, dict[trimmed]);
  }
  function applyLanguage() {
    document.documentElement.lang = language;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) translateNode(node);
    document.querySelectorAll("[data-language-choice]").forEach(button => {
      const selected = button.dataset.languageChoice === language;
      button.setAttribute("aria-pressed", String(selected));
    });
    document.title = language === "en"
      ? document.title.replace("Verteidigung", "Defense").replace("Training", "Training")
      : document.title.replace("Defense", "Verteidigung");
  }
  function setLanguage(next) {
    if (next === language) return;
    const old = language;
    const from = old === "de" ? translations : reverse;
    const to = next === "en" ? translations : reverse;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const raw = node.nodeValue, trimmed = raw.trim();
      if (from[trimmed]) node.nodeValue = raw.replace(trimmed, to[trimmed] || trimmed);
    }
    language = next;
    try { localStorage.setItem(key, language); } catch {}
    applyLanguage();
  }
  function addSwitcher() {
    const header = document.querySelector("header");
    if (!header || header.querySelector(".language-switch")) return;
    const group = document.createElement("div");
    group.className = "language-switch";
    group.setAttribute("aria-label", "Choose language");
    group.innerHTML = '<button type="button" data-language-choice="de" aria-label="Deutsch"><span aria-hidden="true">🇩🇪</span> DE</button><button type="button" data-language-choice="en" aria-label="English"><span aria-hidden="true">🇬🇧</span> EN</button>';
    group.addEventListener("click", event => {
      const button = event.target.closest("[data-language-choice]");
      if (button) setLanguage(button.dataset.languageChoice);
    });
    header.append(group);
  }
  function start() {
    addSwitcher();
    applyLanguage();
    const observer = new MutationObserver(records => {
      for (const record of records) {
        if (record.type === "characterData") translateNode(record.target);
        record.addedNodes && record.addedNodes.forEach(added => {
          if (added.nodeType === Node.TEXT_NODE) translateNode(added);
          else if (added.nodeType === Node.ELEMENT_NODE) {
            const walker = document.createTreeWalker(added, NodeFilter.SHOW_TEXT);
            let node; while ((node = walker.nextNode())) translateNode(node);
          }
        });
      }
    });
    observer.observe(document.body, {subtree:true,childList:true,characterData:true});
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, {once:true});
  else start();
})();