/**
 * generateSmartReply(subscriberReply, subscriberData)
 *
 * Analyzes an email reply from a FitFeky subscriber, classifies its intent,
 * and returns a marketing-optimized reply with a personalized subject,
 * plain-text body, product recommendation and urgency score.
 *
 * subscriberData = {
 *   name: "Margaret",                       // string
 *   age: 58,                                // number (optional)
 *   lastEmailOpened: "2026-07-28T09:00:00"  // ISO date/timestamp (optional — recent opens boost urgency)
 *   productsViewed: ["walking_pad", "resistance_bands"],  // array of product ids (optional)
 *   source: "checklist"                     // checklist | quiz | popup | facebook (optional)
 * }
 *
 * Returns: { subject, body, recommendedProduct, urgencyScore }
 *
 * Works in the browser and in Node (used from email automations,
 * webhooks or support tools). No dependencies.
 */

(function (root) {
  "use strict";

  /* ===================== Product library ===================== */

  var PRODUCT_LIBRARY = [
    {
      id: "walking_pad",
      name: "SuperFit Folding Walking Pad",
      price: 299,
      jointFriendly: 5,
      budget: false,
      quality: 94,
      guide: "https://fitfeky.com/blog/best-walking-pads-for-women-over-50",
      amazon: "https://www.amazon.com/dp/B0B9XX0001?tag=fitfeky-20",
    },
    {
      id: "resistance_bands",
      name: "FitSimplify Pro Loop Bands Set",
      price: 25,
      jointFriendly: 5,
      budget: true,
      quality: 88,
      guide: "https://fitfeky.com/reviews/resistance-bands",
      amazon: "https://www.amazon.com/dp/B0B9XX0003?tag=fitfeky-20",
    },
    {
      id: "yoga_mat",
      name: "Liforme Yoga Mat",
      price: 130,
      jointFriendly: 4,
      budget: false,
      quality: 91,
      guide: "https://fitfeky.com/reviews/yoga-mats",
      amazon: "https://www.amazon.com/dp/B0B9XX0004?tag=fitfeky-20",
    },
    {
      id: "smart_scale",
      name: "Etekcity Smart Body Scale",
      price: 40,
      jointFriendly: 5,
      budget: true,
      quality: 85,
      guide: "https://fitfeky.com/reviews/smart-scales",
      amazon: "https://www.amazon.com/dp/B0B9XX0005?tag=fitfeky-20",
    },
    {
      id: "massage_gun",
      name: "Theragun Mini 2 Massage Gun",
      price: 150,
      jointFriendly: 3,
      budget: false,
      quality: 89,
      guide: "https://fitfeky.com/reviews/massage-guns",
      amazon: "https://www.amazon.com/dp/B0B9XX0006?tag=fitfeky-20",
    },
  ];

  /* ===================== Intent classification ===================== */

  // Order matters: on a tie, the first intent wins.
  var INTENT_ORDER = ["engagement", "pain", "objection", "skepticism", "gratitude"];

  var INTENT_KEYWORDS = {
    gratitude: [
      "thank", "thanks", "thx", "love it", "loved it", "helpful", "appreciate",
      "so great", "great", "perfect", "awesome", "amazing", "excited", "happy",
      "can't wait", "cant wait", "wonderful", "exactly what i needed",
    ],
    pain: [
      "pain", "knee", "knees", "hip", "hips", "back hurts", "shoulder",
      "joint", "joints", "sore", "aching", "ache", "hurt", "hurts",
      "arthritis", "stiff", "stiffness", "can't walk", "cant walk",
      "difficulty", "surgery", "replacement", "swelling",
    ],
    objection: [
      "expensive", "too much", "price", "prices", "cost", "costs", "cheap",
      "budget", "can't afford", "cant afford", "afford", "not worth",
      "waste", "waste of money", "overpriced", "worth it", "money",
    ],
    engagement: [
      "recommend", "recommendation", "suggest", "suggestion", "which",
      "what should", "best", "vs", "versus", "advice", "opinion",
      "help me", "should i", "start", "begin", "routine", "plan",
      "how do i", "where do i", "guide", "trying", "looking for",
      "interested", "worth it", "question",
    ],
    skepticism: [
      "really work", "does it work", "gimmick", "scam", "fake", "marketing",
      "commission", "affiliate", "biased", "paid placement", "too good to be true",
      "prove", "proof", "guarantee", "doubt", "skeptical", "skeptic",
      "don't trust", "dont trust", "trust you", "real review", "honest review",
    ],
  };

  // Strong signals outrank casual mentions of the same weight.
  var STRONG_KEYWORDS = {
    gratitude: [],
    pain: ["pain", "hurt", "surgery", "knee", "arthritis"],
    objection: ["can't afford", "cant afford", "overpriced", "waste of money"],
    engagement: [
      "recommend", "which", "what should", "should i", "advice",
      "help me", "how do i", "where do i", "looking for",
    ],
    skepticism: ["scam", "gimmick", "biased", "paid placement", "really work"],
  };

  function classifyIntent(reply) {
    var scores = {};
    var i, intent, keywords, j, kw, hits;

    for (i = 0; i < INTENT_ORDER.length; i++) {
      intent = INTENT_ORDER[i];
      keywords = INTENT_KEYWORDS[intent];
      hits = 0;
      for (j = 0; j < keywords.length; j++) {
        kw = keywords[j];
        if (reply.indexOf(kw) !== -1) {
          hits += STRONG_KEYWORDS[intent].indexOf(kw) !== -1 ? 2 : 1;
        }
      }
      scores[intent] = hits;
    }

    var best = INTENT_ORDER[0];
    for (i = 1; i < INTENT_ORDER.length; i++) {
      if (scores[INTENT_ORDER[i]] > scores[best]) best = INTENT_ORDER[i];
    }
    if (scores[best] === 0) return "engagement"; // default: answer a question, start a dialogue
    return best;
  }

  /* ===================== Reply templates ===================== */

  var TEMPLATES = {
    gratitude: {
      subject: "You're so welcome, {{name}}!",
      urgency: 20,
      body:
        "Hi {{name}},\n" +
        "\n" +
        "That means a lot — thank you. It's exactly why I built FitFeky {{sourcePhrase}}: honest, hype-free gear advice for women {{ageContext}}.\n" +
        "\n" +
        "If you're loving {{productLine}}, keep going. Consistency beats intensity {{ageContext}}, and it sounds like you're off to a great start.\n" +
        "\n" +
        "Whenever you're ready for the next step, the full Joint-Friendly Home Gym Checklist has all 7 essentials ranked: https://fitfeky.com/checklist\n" +
        "\n" +
        "And if anything ever feels off — a product that doesn't deliver, or a joint that's talking back — just reply. I read everything.\n" +
        "\n" +
        "Warmly,\n" +
        "[Your name]\n" +
        "FitFeky",
    },

    pain: {
      subject: "I'm sorry you're dealing with that, {{name}}",
      urgency: 80,
      body:
        "Hi {{name}},\n" +
        "\n" +
        "I read your note{{quote}} and I'm really sorry you're dealing with that. Pain after 45 isn't a sign you're weak — it's your body asking for a smarter kind of movement.\n" +
        "\n" +
        "The good news: you don't have to push through it. Low-impact gear was built for exactly this — which is why our readers love walking pads and resistance bands. Both build strength without jarring your joints.\n" +
        "\n" +
        "My honest recommendation for you: {{productLine}}\n" +
        "\n" +
        "Take it slow — two short sessions a week is plenty to start. And if the pain is sharp or new, please check with your doctor first. I'm an affiliate site, not a physio, and I'd rather you be safe than sorry.\n" +
        "\n" +
        "Reply anytime. I'm here.\n" +
        "\n" +
        "Warmly,\n" +
        "[Your name]",
    },

    objection: {
      subject: "Totally fair question, {{name}}",
      urgency: 65,
      body:
        "Hi {{name}},\n" +
        "\n" +
        "Totally fair question — I'd ask the same thing.\n" +
        "\n" +
        "Here's the honest version: FitFeky earns a small commission if you buy through our links, and the price you see on Amazon is the real price — we never inflate it. What we won't do is take money from brands for placement. If a product scores well, it's because we tested it, not because someone paid us.\n" +
        "\n" +
        "That said, you don't need the most expensive gear to start. Some of our best-scoring picks are genuinely affordable: {{productLine}}\n" +
        "\n" +
        "Quality matters most in the two things that support your body — shoes and joints — but everything else can start small and grow with you.\n" +
        "\n" +
        "No pressure at all. If you'd like, reply with your budget and I'll point you to the best options in it.\n" +
        "\n" +
        "Warmly,\n" +
        "[Your name]",
    },

    engagement: {
      subject: "Great question, {{name}}!",
      urgency: 55,
      body:
        "Hi {{name}},\n" +
        "\n" +
        "Great question — and you're not alone in asking it. It's the #1 thing readers ask me about fitness {{ageContext}}.\n" +
        "\n" +
        "The short answer: {{productLine}}\n" +
        "\n" +
        "A few things I'd keep in mind {{ageContext}}:\n" +
        "- Low-impact beats high-impact for long-term joint health\n" +
        "- Start with two short sessions a week and build slowly\n" +
        "- Pick gear that fits your space and budget — the right equipment removes excuses\n" +
        "\n" +
        "If you want the full breakdown, our buying guides cover the details: https://fitfeky.com/#catalog\n" +
        "\n" +
        "Tell me a little more about your setup (space? budget? joints?) and I'll narrow it down further.\n" +
        "\n" +
        "Warmly,\n" +
        "[Your name]",
    },

    skepticism: {
      subject: "I appreciate you asking, {{name}}",
      urgency: 30,
      body:
        "Hi {{name}},\n" +
        "\n" +
        "I appreciate you asking — skepticism is healthy, and you deserve to know exactly who you're talking to.\n" +
        "\n" +
        "The short version: FitFeky is an affiliate site. If you buy through our Amazon links, we earn a small commission — at no extra cost to you. Brands can't pay us to be featured, and we've never accepted a paid placement. Every product gets a transparent 0–100 quality score based on joint safety, build quality, ease of use and real customer feedback.\n" +
        "\n" +
        "You can read the full methodology here: https://fitfeky.com/#how-we-test\n" +
        "\n" +
        "I also try to be honest about the downsides — every review includes what we don't love. No product is perfect, and I won't pretend otherwise.\n" +
        "\n" +
        "If you're still on the fence, that's fine. The checklist costs nothing and gives you everything you need to make your own call: https://fitfeky.com/checklist\n" +
        "\n" +
        "Questions? Fire away — I'll give you a straight answer.\n" +
        "\n" +
        "Warmly,\n" +
        "[Your name]",
    },
  };

  /* ===================== Personalization helpers ===================== */

  var SOURCE_PHRASES = {
    checklist: "ever since you grabbed the Joint-Friendly Home Gym Checklist",
    quiz: "ever since you took the Personalized Gear Quiz",
    popup: "ever since you stopped by for the checklist",
    facebook: "since we connected over the community",
  };

  function safeName(name) {
    var s = String(name == null ? "" : name).trim().replace(/[<>&"']/g, "").slice(0, 30);
    return s || "friend";
  }

  function ageContext(age) {
    var a = Number(age);
    if (!isFinite(a) || a <= 0) return "after 45";
    if (a >= 70) return "in your 70s and beyond";
    if (a >= 60) return "in your 60s";
    if (a >= 50) return "in your 50s";
    if (a >= 45) return "in your 40s";
    return "before 45";
  }

  function sourcePhrase(source) {
    var key = String(source || "").toLowerCase();
    return SOURCE_PHRASES[key] || "since you joined us";
  }

  function excerpt(reply, max) {
    var s = String(reply || "").trim().replace(/\s+/g, " ");
    if (!s) return "";
    if (s.length <= max) return " — \"" + s + "\"";
    return " — \"" + s.slice(0, max).replace(/[^a-z0-9 ]+$/i, "") + "…\"";
  }

  function resolveProducts(productsViewed) {
    var viewed = Array.isArray(productsViewed) ? productsViewed : [];
    return PRODUCT_LIBRARY.filter(function (p) {
      return viewed.indexOf(p.id) !== -1;
    });
  }

  // If the reply names a product type, it outranks generic scoring.
  var PRODUCT_KEYWORDS = [
    { id: "walking_pad", words: ["walking pad", "walk pad", "treadmill", "desk treadmill"] },
    { id: "resistance_bands", words: ["resistance band", "loop band", "band set", "bands", "band"] },
    { id: "yoga_mat", words: ["yoga mat", "mat"] },
    { id: "smart_scale", words: ["smart scale", "body scale", "scale"] },
    { id: "massage_gun", words: ["massage gun", "massager", "theragun", "percussion"] },
  ];

  function mentionedProductId(reply) {
    var i, j;
    for (i = 0; i < PRODUCT_KEYWORDS.length; i++) {
      for (j = 0; j < PRODUCT_KEYWORDS[i].words.length; j++) {
        if (reply.indexOf(PRODUCT_KEYWORDS[i].words[j]) !== -1) {
          return PRODUCT_KEYWORDS[i].id;
        }
      }
    }
    return null;
  }

  /* ===================== Product selection ===================== */

  function selectProduct(intent, productsViewed, reply) {
    if (intent === "skepticism") return null;

    var viewed = resolveProducts(productsViewed);
    var mentioned = mentionedProductId(reply);
    var candidates = PRODUCT_LIBRARY.map(function (p) {
      var score = 0;
      var isViewed = viewed.indexOf(p) !== -1;
      if (mentioned === p.id) score += 10;
      if (intent === "pain") {
        score += p.jointFriendly * 2 + (isViewed ? 4 : 0);
      } else if (intent === "objection") {
        score += (p.budget ? 5 + Math.round(50 / p.price) : 0) + (isViewed ? 4 : 0);
      } else if (intent === "engagement") {
        score += (isViewed ? 6 : 0) + p.quality / 10 + p.jointFriendly;
      } else {
        // gratitude — gentle nudge toward something they already browsed
        score += (isViewed ? 6 : 0) + p.quality / 10;
      }
      return { product: p, score: score };
    });

    candidates.sort(function (a, b) { return b.score - a.score; });
    return candidates[0] && candidates[0].score > 0 ? candidates[0].product : null;
  }

  function productLine(product) {
    if (!product) return "browse our full catalog — every pick is quality-scored: https://fitfeky.com/#catalog";
    return product.name + " — scores " + product.quality + "/100 on joint safety and build quality. Full review: " + product.guide;
  }

  /* ===================== Render + main function ===================== */

  function fillTemplate(template, values) {
    var out = template;
    for (var key in values) {
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        out = out.split("{{" + key + "}}").join(values[key]);
      }
    }
    return out;
  }

  function generateSmartReply(subscriberReply, subscriberData) {
    var data = subscriberData || {};
    var rawReply = String(subscriberReply || "").trim();
    var reply = rawReply.toLowerCase();
    var name = safeName(data.name);
    var intent = classifyIntent(reply);
    var product = selectProduct(intent, data.productsViewed, reply);
    var template = TEMPLATES[intent];

    var values = {
      name: name,
      ageContext: ageContext(data.age),
      sourcePhrase: sourcePhrase(data.source),
      quote: excerpt(rawReply, 80),
      productLine: productLine(product),
    };

    var urgency = template.urgency;

    // Recent email opens mean the subscriber is warm — bump urgency slightly.
    var opened = Date.parse(data.lastEmailOpened);
    if (isFinite(opened) && Date.now() - opened < 3 * 24 * 60 * 60 * 1000) {
      urgency = Math.min(100, urgency + 10);
    }

    return {
      subject: fillTemplate(template.subject, values),
      body: fillTemplate(template.body, values),
      recommendedProduct: product,
      urgencyScore: urgency,
    };
  }

  var api = { generateSmartReply: generateSmartReply, classifyIntent: classifyIntent };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  root.generateSmartReply = generateSmartReply;
  if (typeof root.classifyIntent === "undefined") root.classifyIntent = classifyIntent;
})(typeof window !== "undefined" ? window : globalThis);
