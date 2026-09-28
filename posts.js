/* ================================================================
   POSTS — this is the only file you edit to publish.

   To add a new essay:
     1. Copy one whole { ... } block below.
     2. Paste it at the TOP of the list (newest first).
     3. Change slug, title, date, tag, excerpt, cover img, and body.
     4. Save. Refresh. Done — it shows up in the fan, the grid,
        and gets its own page automatically.

   Field notes:
     • slug     — lowercase, hyphens only. Becomes the URL:
                  post.html?p=your-slug
     • tag      — one of: MACRO INDIA CITIES MARKETS POLICY
                  (any word works — the site just chips it)
     • date     — YYYY-MM-DD
     • accent   — one word from the title to render in gold italic
                  (leave "" for none)
     • cover    — path to a 3:2-ish landscape image for the story
                  card. Leave "" for a text-only card.
     • body     — an array of blocks, in order:
         { lead:  "opening paragraph, set larger" }
         { p:     "a normal paragraph" }
         { quote: "a pulled line, set big and gold" }
         { img:   "assets/file.jpg", cap: "caption" }
         { note:  "an editorial note, e.g. a missing ending" }
   ================================================================ */

const POSTS = [

  {
    slug: "wars-between-companies",
    title: "Wars aren't between countries. They're between companies.",
    accent: "companies.",
    date: "2026-09-14",
    tag: "POLICY",
    cover: "assets/essay5-corporate-wars.jpg",
    excerpt: "My relative said something at dinner that broke my brain. The economist in me sadly agreed.",
    body: [
      { lead: "My relative said something at dinner that broke my brain: \u201CWars aren't between countries. They're between companies. Governments just do the paperwork.\u201D" },
      { p: "The economist in me sadly agreed." },
      { img: "assets/essay5-corporate-wars.jpg", cap: "Wars aren't between countries. They're between companies." },
      { p: "In 1951, Iran's oil was making Britain richer than Iran. Britain literally collected more in taxes from one oil company than Iran earned from its own oil. Iran's elected PM said \u201Cthis is ours\u201D and took the oil back — but two years later, the CIA overthrew him. After the coup, American oil companies got 40% of Iran's oil, from 0% before." },
      { quote: "That's not politics. That's a business deal with a military budget." },
      { p: "Seventy years later, the US spends $997 billion on defense. The companies making the weapons spend $100M+ lobbying the politicians who approve the spending." },
      { p: "There's a textbook term for this — moral hazard: when you profit from a problem, you lose the incentive to solve it." },
      { p: "It explains why wars start. It also explains why they don't end." },
      { p: "My relative never studied economics. He didn't need to." }
    ]
  },

  {
    slug: "crash-is-the-setup",
    title: "The crash is not the story. The crash is the setup.",
    accent: "setup.",
    date: "2026-09-08",
    tag: "MARKETS",
    cover: "assets/essay-crash-setup-infographic.jpg",
    excerpt: "One day I watched ₹11 lakh crore disappear in 3 hours. What caught my attention was what crashed alongside it.",
    body: [
      { lead: "I study economics. One day I watched \u20B911 lakh crore disappear in 3 hours." },
      { p: "But what caught my attention: gold crashed too, during a war. That's not supposed to happen." },
      { img: "assets/essay-crash-setup-infographic.jpg", cap: "How a margin call turns into a gold rally, in seven steps." },
      { p: "Gold didn't crash because it stopped being safe. Gold crashed because someone got a margin call at 9 AM and their gold ETF was the fastest thing to sell." },
      { p: "When everything crashes together — stocks, gold, silver, bonds — it's not a correction. It's a liquidity crisis." },
      { p: "Here's the pattern: the crash forces central banks to print. That is more currency in circulation, same amount of gold in the ground." },
      { p: "After 2008, gold doubled. After 2020, it rallied 35%. Both times, it crashed first." },
      { quote: "The crash is not the story. The crash is the setup." }
    ]
  },

  {
    slug: "bombay-maps-economic-xrays",
    title: "Bombay's maps, read as economic x-rays",
    accent: "x-rays",
    date: "2026-08-30",
    tag: "CITIES",
    cover: "assets/essay-bombay-maps-lecture.jpg",
    excerpt: "A lecture on colonial cartography, and what a 170-year-old street plan still costs Kalbadevi.",
    body: [
      { lead: "Maps don't just show where you are. They predict whether an economy will survive." },
      { p: "I attended a lecture today by Deepti Anand x Asiatic Society for Social Science Research and left seeing maps completely differently." },
      { img: "assets/essay-bombay-maps-lecture.jpg", cap: "The lecture, hosted by the Asiatic Society for Social Science Research — a 1855 map of the Native Town of Bombay on screen." },
      { p: "This is South Bombay in 1855. Narrow lanes, cramped houses, no drainage, no room for a car. That's Kalbadevi. And it looks exactly the same today. The spatial blueprint drawn 170 years ago became the economic ceiling of an entire neighbourhood. Hand drawn carts still move through the same lanes. Nothing changed because the map never did." },
      { p: "The Portuguese didn't just map India. They decorated it with elephants, palm trees, exotic flora because to European eyes this land was so overwhelmingly rich they drew it smaller deliberately. Geographic knowledge to them was colonial intelligence, closely guarded, fiercely contested and rarely shared." },
      { p: "Vasco da Gama only found India because a Gujarati Kachi sailor showed him the way. That sailor's ship was 3x the size of da Gama's. He navigated by stars, carried scientific texts, understood celestial navigation in ways European explorers simply didn't." },
      { quote: "Da Gama had a compass. We had a system." },
      { p: "It took 70 years to produce the Great Trigonometrical Survey of India. Every well, every fort, every river, every road placed within precise grid lines." },
      { p: "This is economic x-rays to me." }
    ]
  },

  {
    slug: "the-wrong-finish-line",
    title: "The wrong finish line",
    accent: "finish line",
    date: "2026-08-22",
    tag: "MACRO",
    cover: "assets/essay2-wrong-finish-line.jpg",
    excerpt: "Kate Raworth asks a question I haven't been able to shake: what if growth isn't the point?",
    body: [
      { lead: "There's a question Kate Raworth asks in Doughnut Economics that I haven't been able to shake: what if we actually asked whether more growth was still necessary, or even possible, instead of assuming it always is?" },
      { img: "assets/essay2-wrong-finish-line.jpg", cap: "The wrong finish line." },
      { p: "We don't ask that question much anymore. Somewhere along the way, GDP growth stopped being one policy option among many and became something closer to a political requirement, the one number no one in power can afford to see fall." },
      { p: "And once that happens, we quietly start measuring progress by a single line going up, instead of asking whether people are actually doing better." },
      { p: "I don't think growth is the enemy. I just think it's the wrong finish line." },
      { quote: "What we actually need are economies that help us thrive, whether or not they keep growing." },
      { p: "That's not an anti-growth idea. It's a more honest one." },
      { p: "New problems need a new economic mindset, not the same growth story on repeat." }
    ]
  },

  {
    slug: "china-development-story",
    title: "China's development story, and what India can take from it",
    accent: "development story",
    date: "2026-08-15",
    tag: "INDIA",
    cover: "assets/essay1-china-india.jpg",
    excerpt: "China didn't get rich when you think it did. The real turning point came earlier — and it wasn't a policy.",
    body: [
      { lead: "China didn't get rich when you think it did." },
      { img: "assets/essay1-china-india.jpg", cap: "China's development story, and what India can take from it." },
      { p: "Everyone points to 1978 and the economic reforms. But the real turning point came earlier, when China decided to change who its citizens were." },
      { p: "Teach people to read. Make sure they're fed well enough to grow and think clearly. Let them make their own choices about their own lives. That's the whole unglamorous secret." },
      { p: "India, over the same period, had a much harder starting point. Fewer people could read. Health and nutrition lagged behind. And old social structures around caste and family often meant people couldn't just pack up and take a job somewhere else, or sell their labor freely, the way they needed to." },
      { p: "Add to that far fewer women working outside the home, which meant every working Indian was supporting a lot more people who weren't. China simply didn't carry that same weight." },
      { quote: "If a country wants to go from poor to rich, the answer isn't hiding in a growth chart." },
      { p: "It's in whether its people can read, whether they're healthy enough to work, and whether they're actually free to choose their own path." },
      { p: "That's not a footnote to development. It's the whole story." }
    ]
  }

];
