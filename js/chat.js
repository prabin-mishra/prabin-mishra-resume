/* ============================================================
   "Ask my résumé" — chat panel.

   Default: a fully client-side retrieval engine over the
   knowledge base in js/kb.js. No network, no API key, no backend.

   Optional LLM upgrade: set window.RESUME_CHAT_CONFIG before this
   script loads (or call ResumeChat.configure at runtime):

     window.RESUME_CHAT_CONFIG = {
       provider: "anthropic",            // "local" | "anthropic" | "openai"
       apiKey: "sk-...",
       model: ""                          // optional override
     };

   The LLM is instructed to answer ONLY from the same knowledge
   base, and any API failure falls back to the local engine.
   ============================================================ */

(function () {
  "use strict";

  const KB = window.RESUME_KB;
  if (!KB) return;

  const config = Object.assign(
    { provider: "local", apiKey: "", model: "" },
    window.RESUME_CHAT_CONFIG || {}
  );

  /* ---------------- Local retrieval engine ---------------- */

  const STOPWORDS = new Set(("a an and are as at be but by can did do does for from has have he him his how i in is it its me my of on or s so that the their them they this to was we what when where which who whose why will with you your".split(" ")));

  function tokenize(q) {
    return q
      .toLowerCase()
      .replace(/[^a-z0-9\s.-]/g, " ")
      .split(/\s+/)
      .filter(t => t && !STOPWORDS.has(t))
      .map(t => {
        const clean = t.replace(/[.-]+$/g, "");
        return KB.synonyms[clean] || clean;
      });
  }

  /* Pre-tokenize fact text once for scoring. */
  const factIndex = KB.facts.map(f => ({
    fact: f,
    tags: new Set(f.tags),
    words: new Set(tokenize(f.text))
  }));
  const factById = {};
  KB.facts.forEach(f => { factById[f.id] = f; });

  function retrieve(question) {
    const tokens = tokenize(question);
    if (!tokens.length) return [];
    const scored = factIndex.map(entry => {
      let score = 0;
      for (const t of tokens) {
        if (entry.tags.has(t)) score += 3;
        else if (entry.words.has(t)) score += 1;
        else {
          const singular = t.replace(/s$/, "");
          if (singular !== t && (entry.tags.has(singular) || entry.words.has(singular))) score += 1;
        }
      }
      return { fact: entry.fact, score };
    }).filter(x => x.score >= 3);
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, 3).map(x => x.fact);
  }

  function composeAnswer(lead, facts, note) {
    const parts = [];
    if (lead) parts.push(lead);
    facts.forEach(f => parts.push(f.text));
    if (note) parts.push(note);
    return {
      text: parts.join("\n\n"),
      anchor: facts.length ? facts[0].anchor : null
    };
  }

  function localAnswer(question) {
    const q = question.toLowerCase();

    for (const intent of KB.intents) {
      if (intent.match.test(q)) {
        if (intent.lead === null) break; // honest "not in KB" intents (e.g. salary)
        const facts = intent.facts.map(id => factById[id]).filter(Boolean);
        const note = typeof intent.note === "function" ? intent.note(q) : null;
        return composeAnswer(intent.lead, facts, note);
      }
    }

    const facts = retrieve(question);
    if (facts.length) return composeAnswer("From the profile:", facts, null);

    return { text: KB.responses.noAnswer, anchor: "#contact" };
  }

  /* ---------------- Optional LLM providers ---------------- */

  const history = []; // {role, content} — used only by LLM providers

  function systemPrompt() {
    return [
      "You are the 'Ask my résumé' assistant on Prabin Mishra's personal resume website.",
      "Visitors are recruiters and hiring managers. Answer their questions about Prabin.",
      "STRICT RULES:",
      "1. Answer ONLY with information present in the JSON knowledge base below. Never invent, estimate or extrapolate facts, numbers, dates, titles or employers.",
      "2. If the knowledge base does not cover the question, say so plainly and point the visitor to prabinmishra87@gmail.com.",
      "3. Keep answers under 120 words, plain text, no markdown headers.",
      "4. Refer to Prabin in third person.",
      "KNOWLEDGE BASE:",
      JSON.stringify(KB.facts)
    ].join("\n");
  }

  async function anthropicAnswer(question) {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": config.apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify({
        model: config.model || "claude-haiku-4-5-20251001",
        max_tokens: 500,
        system: systemPrompt(),
        messages: history.concat([{ role: "user", content: question }])
      })
    });
    if (!res.ok) throw new Error("Anthropic API error " + res.status);
    const data = await res.json();
    return { text: data.content[0].text, anchor: null };
  }

  async function openaiAnswer(question) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization": "Bearer " + config.apiKey
      },
      body: JSON.stringify({
        model: config.model || "gpt-4o-mini",
        messages: [{ role: "system", content: systemPrompt() }]
          .concat(history)
          .concat([{ role: "user", content: question }])
      })
    });
    if (!res.ok) throw new Error("OpenAI API error " + res.status);
    const data = await res.json();
    return { text: data.choices[0].message.content, anchor: null };
  }

  async function getAnswer(question) {
    if (config.apiKey && (config.provider === "anthropic" || config.provider === "openai")) {
      try {
        const fn = config.provider === "anthropic" ? anthropicAnswer : openaiAnswer;
        const answer = await fn(question);
        history.push({ role: "user", content: question });
        history.push({ role: "assistant", content: answer.text });
        if (history.length > 12) history.splice(0, history.length - 12);
        return answer;
      } catch (err) {
        // API unreachable or misconfigured — degrade to the local engine.
        return localAnswer(question);
      }
    }
    return localAnswer(question);
  }

  /* ---------------- UI ---------------- */

  const fab = document.getElementById("chat-fab");
  const panel = document.getElementById("chat-panel");
  const closeBtn = document.getElementById("chat-close");
  const messagesEl = document.getElementById("chat-messages");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const chips = document.getElementById("chat-chips");
  const statusEl = document.getElementById("chat-status");
  const openers = [fab, document.getElementById("chat-open-nav"), document.getElementById("chat-open-hero")].filter(Boolean);

  let seeded = false;
  let busy = false;

  function updateStatus() {
    if (!statusEl) return;
    statusEl.textContent = config.apiKey && config.provider !== "local"
      ? "AI mode (" + config.provider + ") — grounded in the on-page profile only."
      : "Runs in your browser — answers only from the verified profile on this page.";
  }

  /* KB text is trusted; linkify emails + known profile URLs safely via DOM APIs. */
  function renderRich(el, text) {
    const pattern = /(prabinmishra87@gmail\.com|(?:github|linkedin)\.com\/[^\s),.]+)/g;
    let last = 0, m;
    while ((m = pattern.exec(text)) !== null) {
      el.appendChild(document.createTextNode(text.slice(last, m.index)));
      const a = document.createElement("a");
      const raw = m[0];
      a.href = raw.includes("@") ? "mailto:" + raw : "https://" + (raw.startsWith("linkedin") ? "www." + raw : raw);
      if (!raw.includes("@")) { a.target = "_blank"; a.rel = "noopener"; }
      a.textContent = raw;
      el.appendChild(a);
      last = m.index + raw.length;
    }
    el.appendChild(document.createTextNode(text.slice(last)));
  }

  function addMessage(kind, text, anchor) {
    const el = document.createElement("div");
    el.className = "msg msg-" + kind;
    if (kind === "bot") renderRich(el, text);
    else el.textContent = text;

    if (kind === "bot" && anchor && KB.anchors[anchor]) {
      const jump = document.createElement("a");
      jump.className = "msg-jump";
      jump.href = anchor;
      jump.textContent = "↳ " + KB.anchors[anchor];
      el.appendChild(document.createElement("br"));
      el.appendChild(jump);
    }
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function addTyping() {
    const el = document.createElement("div");
    el.className = "msg msg-bot msg-typing";
    el.setAttribute("aria-label", "Assistant is typing");
    el.innerHTML = "<i></i><i></i><i></i>";
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return el;
  }

  function openPanel() {
    panel.hidden = false;
    panel.classList.add("is-opening");
    setTimeout(() => panel.classList.remove("is-opening"), 260);
    fab.classList.add("is-hidden");
    openers.forEach(b => b.setAttribute("aria-expanded", "true"));
    if (!seeded) {
      seeded = true;
      addMessage("bot", KB.responses.seed, null);
    }
    updateStatus();
    input.focus();
  }

  function closePanel() {
    panel.hidden = true;
    fab.classList.remove("is-hidden");
    openers.forEach(b => b.setAttribute("aria-expanded", "false"));
    fab.focus();
  }

  async function ask(question) {
    if (busy || !question.trim()) return;
    busy = true;
    addMessage("user", question.trim());
    input.value = "";
    const typing = addTyping();
    const started = Date.now();

    const answer = await getAnswer(question.trim());

    /* Local answers are instant; a short beat keeps the exchange readable. */
    const minDelay = config.apiKey && config.provider !== "local" ? 0 : 420;
    const wait = Math.max(0, minDelay - (Date.now() - started));
    setTimeout(() => {
      typing.remove();
      addMessage("bot", answer.text, answer.anchor);
      busy = false;
    }, wait);
  }

  openers.forEach(btn => btn.addEventListener("click", () => {
    if (panel.hidden) openPanel(); else closePanel();
  }));
  closeBtn.addEventListener("click", closePanel);
  panel.addEventListener("keydown", e => {
    if (e.key === "Escape") closePanel();
  });

  form.addEventListener("submit", e => {
    e.preventDefault();
    ask(input.value);
  });

  chips.addEventListener("click", e => {
    const btn = e.target.closest("button[data-q]");
    if (btn) ask(btn.dataset.q);
  });

  /* Public hook for wiring a real LLM later without editing source. */
  window.ResumeChat = {
    configure(opts) {
      Object.assign(config, opts || {});
      updateStatus();
    },
    ask,
    open: openPanel
  };
})();
