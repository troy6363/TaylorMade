const PRODUCTS = [
  {
    "id": "p1",
    "name": "Juneteenth Beaded Crossbody",
    "price": 10,
    "category": "accessories",
    "image": "assets/accessories/ChatGPT Image Jun 8, 2026, 07_39_52 PM.png",
    "images": [
      "assets/accessories/ChatGPT Image Jun 8, 2026, 07_39_52 PM.png",
      "assets/accessories/ChatGPT Image Jun 8, 2026, 07_41_01 PM.png"
    ],
    "description": "A beautiful handcrafted black canvas crossbody, decorated with a vibrant red, yellow, green, and black beaded border. Features a convenient zippered compartment and a detailed center illustration celebrating Juneteenth.",
    "rating": 4.8,
    "reviewsCount": 14
  },
  {
    "id": "p2",
    "name": "Custom Photo Memorial Glass Plaque",
    "price": 25,
    "category": "accessories",
    "image": "assets/accessories/ChatGPT Image Jun 8, 2026, 07_59_15 PM.png",
    "images": [
      "assets/accessories/ChatGPT Image Jun 8, 2026, 07_59_15 PM.png",
      "assets/accessories/ChatGPT Image Jun 8, 2026, 09_16_38 PM.png"
    ],
    "description": "Honor your loved ones with this customized high-definition sublimation glass memorial plaque. Features a beautiful red staircase-to-heaven theme with white doves and angel wings, personalized with names, dates, and portrait photos. Stands on two sleek support pegs.",
    "rating": 5,
    "reviewsCount": 26
  },
  {
    "id": "p3",
    "name": "Pink & Black Custom Beaded Waist Chain",
    "price": 15,
    "category": "accessories",
    "image": "assets/accessories/ChatGPT Image Jun 8, 2026, 09_44_43 PM.png",
    "images": [
      "assets/accessories/ChatGPT Image Jun 8, 2026, 09_44_43 PM.png",
      "assets/accessories/ChatGPT Image Jun 8, 2026, 09_42_40 PM.png"
    ],
    "description": "Accentuate your style with this custom-made pink and black beaded belly chain. Crafted with high-quality alternating seed beads and finished with a delicate silver star outline charm drop.",
    "rating": 4.7,
    "reviewsCount": 19
  },
  {
    "id": "p4",
    "name": "Dainty Silver Ball Chain Waist Chain",
    "price": 15,
    "category": "accessories",
    "image": "assets/accessories/ChatGPT Image Jun 8, 2026, 09_50_13 PM.png",
    "images": [
      "assets/accessories/ChatGPT Image Jun 8, 2026, 09_50_13 PM.png",
      "assets/accessories/ChatGPT Image Jun 8, 2026, 09_50_31 PM.png"
    ],
    "description": "A minimalist, dainty waist chain featuring ultra-fine silver ball chain beads and a clean center drop. Perfect for layering or wearing with crop tops and summer wear.",
    "rating": 4.6,
    "reviewsCount": 11
  },
  {
    "id": "p5",
    "name": "NFL Fleece Tie Blanket",
    "price": 70,
    "category": "blankets",
    "teamOptions": true,
    "image": "assets/blankets/ChatGPT Image Jun 8, 2026, 05_47_40 PM.png",
    "images": [
      "assets/blankets/ChatGPT Image Jun 8, 2026, 05_47_40 PM.png",
      "assets/blankets/ChatGPT Image Jun 8, 2026, 05_47_43 PM.png",
      "assets/blankets/ChatGPT Image Jun 8, 2026, 05_49_52 PM.png"
    ],
    "description": "Keep cozy on game day with this handmade NFL fleece blanket. Shown here in Pittsburgh Steelers colors — features the team logo print on a classic team-color plaid background, finished with a comfortable double-layered hand-tied fringe border. ✦ Available in ALL 32 NFL teams — select your team above!",
    "rating": 4.9,
    "reviewsCount": 32
  },
  {
    "id": "p6",
    "name": "NFL Fleece Tie Blanket",
    "price": 70,
    "category": "blankets",
    "teamOptions": true,
    "image": "assets/blankets/ChatGPT Image Jun 8, 2026, 07_13_52 PM.png",
    "images": [
      "assets/blankets/ChatGPT Image Jun 8, 2026, 07_13_52 PM.png",
      "assets/blankets/4990dab2-3815-4167-bd75-e7cde62e63ee.png"
    ],
    "description": "Snuggle up under this custom hand-tied NFL fleece blanket. Shown here in Dallas Cowboys colors — showcases the team helmet and logo printed across a team-color background, complete with a cozy hand-knotted double fleece fringe. ✦ Available in ALL 32 NFL teams — select your team above!",
    "rating": 4.8,
    "reviewsCount": 24
  },
  {
    "id": "p7",
    "name": "Zeta Phi Beta 'Z & B' Rhinestone Bead Bracelet",
    "price": 7,
    "category": "jewelry",
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_16_07 PM.png",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_16_07 PM.png",
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_17_42 PM.png"
    ],
    "description": "Show your sorority pride with this custom Zeta Phi Beta pave rhinestone clay bead bracelet. Hand-strung with alternating royal blue and shimmering iridescent white disco-ball beads, finished with dangling silver 'Z' and 'B' initial charms.",
    "rating": 5,
    "reviewsCount": 18
  },
  {
    "id": "p8",
    "name": "Feng Shui Black Obsidian Double Pi Xiu Bracelet (Classic)",
    "price": 7,
    "category": "jewelry",
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_24_17 PM.png",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_24_17 PM.png",
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_25_24 PM.png"
    ],
    "description": "Attract wealth, good luck, and protection with this classic Feng Shui bracelet. Crafted with highly polished black obsidian beads, accented by two gold-plated Pi Xiu mythical beasts guarding a central gold sphere.",
    "rating": 4.7,
    "reviewsCount": 22
  },
  {
    "id": "p9",
    "name": "Feng Shui Black Obsidian Double Pi Xiu Bracelet (Ornate Mantra)",
    "price": 7,
    "category": "jewelry",
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_26_22 PM.png",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_26_22 PM.png",
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_29_08 PM.png"
    ],
    "description": "An ornate variant of the wealth-attracting Feng Shui bracelet. Features black obsidian beads etched with the golden 'Om Mani Padme Hum' Sanskrit mantra, gold-plated Pi Xiu charms, and decorative cylindrical gold spacer rings.",
    "rating": 4.9,
    "reviewsCount": 15
  },
  {
    "id": "p10",
    "name": "Zeta Phi Beta 'Phi' Greek Letter Rhinestone Bracelet",
    "price": 7,
    "category": "jewelry",
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_52_54 PM.png",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_52_54 PM.png",
      "assets/bracelets/zeta_phi_beta_worn.png"
    ],
    "description": "Celebrate sisterhood with this elegant Zeta Phi Beta pave rhinestone bead bracelet. Alternates between royal blue and crystal white pave beads, completed by a gorgeous dangling Greek letter 'Phi' (Φ) charm inlaid with blue rhinestones.",
    "rating": 4.8,
    "reviewsCount": 20
  },
  {
    "id": "p11",
    "name": "Sigma Gamma Rho 'SGR' Rhinestone Bead Bracelet",
    "price": 7,
    "category": "jewelry",
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_56_57 PM.png",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_56_57 PM.png",
      "assets/bracelets/sgr_step_dance.jpg"
    ],
    "description": "A premium Sigma Gamma Rho themed pave rhinestone clay bead bracelet. Alternates between royal blue and gold disco beads, featuring a central gold-plated 'ΣΓΡ' lettering and poodle charm drop.",
    "rating": 4.9,
    "reviewsCount": 14
  },
  {
    "id": "p12",
    "name": "Blue Ocean Gradient Pave Rhinestone Bracelet",
    "price": 5,
    "category": "jewelry",
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_59_50 PM.png",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_59_50 PM.png",
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_01_03 PM.png"
    ],
    "description": "A vibrant, elegant pave rhinestone stretch bracelet featuring a beautiful gradient pattern of royal blue, cyan, turquoise, and aquamarine rhinestone clay beads. Glittering and stretch-fit for easy daily wear.",
    "rating": 4.7,
    "reviewsCount": 17
  },
  {
    "id": "p13",
    "name": "Delta Sigma Theta Elephant Charm Rhinestone Bracelet",
    "price": 7,
    "category": "jewelry",
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_02_04 PM.png",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_02_04 PM.png",
      "assets/bracelets/dst_elephant_worn.jpg"
    ],
    "description": "Celebrate Delta Sigma Theta with this crimson and cream pave rhinestone bead bracelet. Combines alternating red and white pave beads with an elegant silver elephant charm (representing the DST trunk-up elephant mascot) set with a red gemstone body.",
    "rating": 5,
    "reviewsCount": 29
  },
  {
    "id": "p14",
    "name": "Delta Sigma Theta Deluxe Red Rhinestone Elephant Bracelet",
    "price": 7,
    "category": "jewelry",
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_04_25 PM.png",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_04_25 PM.png",
      "assets/bracelets/dst_elephant_worn.jpg"
    ],
    "description": "A deluxe Delta Sigma Theta theme pave bead bracelet. Features rich red and white pave clay beads separated by custom rhinestone-encrusted silver ring spacers, finished with a heavy trunk-up elephant charm covered in sparkling red rhinestones.",
    "rating": 4.9,
    "reviewsCount": 31
  },
  {
    "id": "p15",
    "name": "Feng Shui Black Obsidian Single Pi Xiu Bracelet",
    "price": 7,
    "category": "jewelry",
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_07_44 PM.png",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_07_44 PM.png",
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_10_05 PM.png"
    ],
    "description": "A sleek Feng Shui bracelet designed with polished black obsidian beads and a single gold Pi Xiu charm representing wealth preservation. Features two gold-etched mantra beads flanking the Pi Xiu for enhanced spiritual power.",
    "rating": 4.6,
    "reviewsCount": 12
  },
  {
    "id": "p16",
    "name": "Boston Celtics Scarf & Knit Beanie Set",
    "price": 20,
    "category": "accessories",
    "image": "assets/clothing/ChatGPT Image Jun 8, 2026, 06_02_59 PM.png",
    "images": [
      "assets/clothing/ChatGPT Image Jun 8, 2026, 06_02_59 PM.png",
      "assets/clothing/ChatGPT Image Jun 8, 2026, 06_03_50 PM.png"
    ],
    "description": "Get ready for the NBA season with this cozy Boston Celtics outdoor set. Includes a snug black knit beanie cap embroidered with 'BOSTON' and a basketball, and a matching orange/black plaid fleece scarf decorated with Celtics logos and black fringes.",
    "rating": 4.8,
    "reviewsCount": 15
  },
  {
    "id": "p17",
    "name": "Juneteenth 1865 Forest Green Graphic Tee",
    "price": 15,
    "category": "tshirts",
    "image": "assets/clothing/ChatGPT Image Jun 8, 2026, 07_18_20 PM.png",
    "images": [
      "assets/clothing/ChatGPT Image Jun 8, 2026, 07_18_20 PM.png",
      "assets/clothing/ChatGPT Image Jun 8, 2026, 07_18_33 PM.png"
    ],
    "description": "Celebrate freedom and history with this premium forest green cotton graphic t-shirt. Features a vibrant, professionally printed circle design reading '1865 Juneteenth' in red, yellow, and green colors with polka-dot styling. Comfy, breathable, and durable.",
    "rating": 4.9,
    "reviewsCount": 21
  },
  {
    "id": "p18",
    "name": "4th of July Independence Day Red Tee & Shorts Set",
    "price": 35,
    "category": "tshirts",
    "image": "assets/clothing/ChatGPT Image Jun 8, 2026, 07_54_23 PM.png",
    "images": [
      "assets/clothing/ChatGPT Image Jun 8, 2026, 07_54_23 PM.png",
      "assets/clothing/ChatGPT Image Jun 8, 2026, 07_57_04 PM.png"
    ],
    "description": "Show your patriotic spirit in comfort. This matching red two-piece loungewear set includes a lightweight short-sleeve crewneck t-shirt and matching drawstring shorts. Features a custom '4th July Happy Independence Day' skyline graphic with an American flag peace sign.",
    "rating": 4.7,
    "reviewsCount": 18
  },
  {
    "id": "p19",
    "name": "Los Angeles Lakers Scalloped Gold Resin Coaster Set (4-Piece)",
    "price": 20,
    "category": "coasters",
    "image": "assets/coasters/ChatGPT Image Jun 8, 2026, 07_28_52 PM.png",
    "images": [
      "assets/coasters/ChatGPT Image Jun 8, 2026, 07_28_52 PM.png"
    ],
    "description": "Elevate your coffee table or bar setup with this handcrafted set of 4 epoxy resin coasters. Features a stunning gold sparkly glitter resin finish, a deep purple base, scalloped wavy borders, and the iconic Lakers 'L' logo centered on each piece. Heat-resistant and durable.",
    "rating": 4.9,
    "reviewsCount": 14
  },
  {
    "id": "p20",
    "name": "Tennessee Titans Scalloped Red Resin Coaster Set (4-Piece)",
    "price": 20,
    "category": "coasters",
    "image": "assets/coasters/ChatGPT Image Jun 8, 2026, 07_29_40 PM.png",
    "images": [
      "assets/coasters/ChatGPT Image Jun 8, 2026, 07_29_40 PM.png",
      "assets/coasters/ChatGPT Image Jun 8, 2026, 07_37_06 PM.png"
    ],
    "description": "Show off your Titans fandom with these premium scalloped coasters. This 4-piece set is hand-cast in glossy red resin with a navy blue backing layer and scalloped edges, featuring the Tennessee Titans sword logo in high detail. Perfect gift for game days.",
    "rating": 4.8,
    "reviewsCount": 19
  },
  {
    "id": "p21",
    "name": "NFL Cupped Hands Resin Dish",
    "price": 35,
    "category": "coasters",
    "teamOptions": true,
    "image": "assets/coasters/ChatGPT Image Jun 8, 2026, 07_35_31 PM.png",
    "images": [
      "assets/coasters/ChatGPT Image Jun 8, 2026, 07_35_31 PM.png",
      "assets/coasters/tn_titans_backside.jpg"
    ],
    "description": "A unique piece of sports fan décor. This glossy resin tray is hand-cast in team colors, shaped in the form of two cupped hands — with your chosen NFL team logo featured on the reverse side. Perfect as a key dish, jewelry holder, or desk organizer. Shown here in Tennessee Titans colors. ✦ Available in ALL 32 NFL teams — select your team above!",
    "rating": 5,
    "reviewsCount": 26
  },
  {
    "id": "p22",
    "name": "Breast Cancer Awareness Pink Leopard Pajama Set",
    "price": 35,
    "category": "pajamas",
    "image": "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_47_54 PM.png",
    "images": [
      "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_47_54 PM.png",
      "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_48_03 PM.png",
      "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_48_06 PM.png",
      "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_50_53 PM.png"
    ],
    "description": "Support the cause in comfort with this soft, custom-designed two-piece sleepwear set. Includes a cozy black crewneck tee featuring a pink leopard print rainbow and butterfly ribbon ('faith hope cure'), and matching pink/black leopard print lounge pants with 'BREAST CANCER' text down the left leg.",
    "rating": 4.9,
    "reviewsCount": 35
  },
  {
    "id": "p23",
    "name": "Chicago Bears Orange & Navy Plaid Pajama Set",
    "price": 35,
    "category": "pajamas",
    "image": "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_52_54 PM.png",
    "images": [
      "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_52_54 PM.png",
      "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_52_00 PM.png"
    ],
    "description": "Sleep in game-day comfort with this Chicago Bears sleep set. Includes a bright orange crewneck tee with a large Bears helmet and claw graphics, paired with navy, orange, and white plaid fleece pajama pants finished with 'BEARS' lettering on the lower leg.",
    "rating": 4.8,
    "reviewsCount": 22
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PRODUCTS;
}
