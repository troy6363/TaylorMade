const PRODUCTS = [
  {
    "id": "p1",
    "name": "Juneteenth Beaded Crossbody",
    "price": 10,
    "category": "bags",
    "image": "assets/accessories/ChatGPT Image Jun 8, 2026, 07_39_52 PM_result.webp",
    "images": [
      "assets/accessories/ChatGPT Image Jun 8, 2026, 07_39_52 PM_result.webp",
      "assets/accessories/ChatGPT Image Jun 8, 2026, 07_41_01 PM_result.webp"
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
    "image": "assets/accessories/ChatGPT Image Jun 8, 2026, 07_59_15 PM_result.webp",
    "images": [
      "assets/accessories/ChatGPT Image Jun 8, 2026, 07_59_15 PM_result.webp",
      "assets/accessories/ChatGPT Image Jun 8, 2026, 09_16_38 PM_result.webp"
    ],
    "description": "Honor your loved ones with this customized high-definition sublimation glass memorial plaque. Features a beautiful red staircase-to-heaven theme with white doves and angel wings, personalized with names, dates, and portrait photos. Stands on two sleek support pegs.",
    "rating": 5,
    "reviewsCount": 26
  },
  {
    "id": "p3",
    "name": "Pink & Black Custom Beaded Waist Chain",
    "price": 15,
    "category": "jewelry",
    "image": "assets/accessories/ChatGPT Image Jun 8, 2026, 09_44_43 PM_result.webp",
    "images": [
      "assets/accessories/ChatGPT Image Jun 8, 2026, 09_44_43 PM_result.webp",
      "assets/accessories/ChatGPT Image Jun 8, 2026, 09_42_40 PM_result.webp"
    ],
    "description": "Accentuate your style with this custom-made pink and black beaded belly chain. Crafted with high-quality alternating seed beads and finished with a delicate silver star outline charm drop.",
    "rating": 4.7,
    "reviewsCount": 19
  },
  {
    "id": "p4",
    "name": "Dainty Silver Ball Chain Waist Chain",
    "price": 15,
    "category": "jewelry",
    "image": "assets/accessories/ChatGPT Image Jun 8, 2026, 09_50_13 PM_result.webp",
    "images": [
      "assets/accessories/ChatGPT Image Jun 8, 2026, 09_50_13 PM_result.webp",
      "assets/accessories/ChatGPT Image Jun 8, 2026, 09_50_31 PM_result.webp"
    ],
    "description": "A minimalist, dainty waist chain featuring ultra-fine silver ball chain beads and a clean center drop. Perfect for layering or wearing with crop tops and summer wear.",
    "rating": 4.6,
    "reviewsCount": 11
  },
  {
    "id": "p5",
    "name": "NFL Fleece Blanket",
    "price": 70,
    "category": "blankets",
    "teamOptions": true,
    "image": "assets/blankets/ChatGPT Image Jun 8, 2026, 05_47_40 PM_result.webp",
    "images": [
      "assets/blankets/ChatGPT Image Jun 8, 2026, 05_47_40 PM_result.webp",
      "assets/blankets/ChatGPT Image Jun 8, 2026, 05_47_43 PM_result.webp",
      "assets/blankets/ChatGPT Image Jun 8, 2026, 05_49_52 PM_result.webp"
    ],
    "description": "Keep cozy on game day with this handmade NFL fleece blanket. Shown here in Pittsburgh Steelers colors — features the team logo print on a classic team-color plaid background, finished with a comfortable double-layered hand-tied fringe border. ✦ Available in ALL 32 NFL teams — select your team above!",
    "rating": 4.9,
    "reviewsCount": 32
  },
  {
    "id": "p6",
    "name": "NFL Fleece Blanket",
    "price": 70,
    "category": "blankets",
    "teamOptions": true,
    "image": "assets/blankets/ChatGPT Image Jun 8, 2026, 07_13_52 PM_result.webp",
    "images": [
      "assets/blankets/ChatGPT Image Jun 8, 2026, 07_13_52 PM_result.webp",
      "assets/blankets/4990dab2-3815-4167-bd75-e7cde62e63ee_result.webp"
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
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_16_07 PM_result.webp",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_16_07 PM_result.webp",
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_17_42 PM_result.webp"
    ],
    "description": "Show your sorority pride with this custom Zeta Phi Beta pave rhinestone clay bead bracelet. Hand-strung with alternating royal blue and shimmering iridescent white disco-ball beads, finished with dangling silver 'Z' and 'B' initial charms.",
    "rating": 5,
    "reviewsCount": 18
  },
  {
    "id": "p8",
    "name": "Feng Shui Black Obsidian Double Pi Xiu Bracelet (Classic)",
    "price": 10,
    "category": "jewelry",
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_24_17 PM_result.webp",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_24_17 PM_result.webp",
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_25_24 PM_result.webp"
    ],
    "description": "Attract wealth, good luck, and protection with this classic Feng Shui bracelet. Crafted with highly polished black obsidian beads, accented by two gold-plated Pi Xiu mythical beasts guarding a central gold sphere.",
    "rating": 4.7,
    "reviewsCount": 22
  },
  {
    "id": "p9",
    "name": "Feng Shui Black Obsidian Double Pi Xiu Bracelet (Ornate Mantra)",
    "price": 10,
    "category": "jewelry",
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_26_22 PM_result.webp",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_26_22 PM_result.webp",
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_29_08 PM_result.webp"
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
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_52_54 PM_result.webp",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_52_54 PM_result.webp",
      "assets/bracelets/zeta_phi_beta_worn_result.webp"
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
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_56_57 PM_result.webp",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_56_57 PM_result.webp",
      "assets/bracelets/sgr_step_dance_result.webp"
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
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_59_50 PM_result.webp",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 09_59_50 PM_result.webp",
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_01_03 PM_result.webp"
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
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_02_04 PM_result.webp",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_02_04 PM_result.webp",
      "assets/bracelets/dst_elephant_worn_result.webp"
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
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_04_25 PM_result.webp",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_04_25 PM_result.webp",
      "assets/bracelets/dst_elephant_worn_result.webp"
    ],
    "description": "A deluxe Delta Sigma Theta theme pave bead bracelet. Features rich red and white pave clay beads separated by custom rhinestone-encrusted silver ring spacers, finished with a heavy trunk-up elephant charm covered in sparkling red rhinestones.",
    "rating": 4.9,
    "reviewsCount": 31
  },
  {
    "id": "p15",
    "name": "Feng Shui Black Obsidian Single Pi Xiu Bracelet",
    "price": 10,
    "category": "jewelry",
    "image": "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_07_44 PM_result.webp",
    "images": [
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_07_44 PM_result.webp",
      "assets/bracelets/ChatGPT Image Jun 8, 2026, 10_10_05 PM_result.webp"
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
    "image": "assets/clothing/ChatGPT Image Jun 8, 2026, 06_02_59 PM_result.webp",
    "images": [
      "assets/clothing/ChatGPT Image Jun 8, 2026, 06_02_59 PM_result.webp",
      "assets/clothing/ChatGPT Image Jun 8, 2026, 06_03_50 PM_result.webp"
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
    "image": "assets/clothing/ChatGPT Image Jun 8, 2026, 07_18_20 PM_result.webp",
    "images": [
      "assets/clothing/ChatGPT Image Jun 8, 2026, 07_18_20 PM_result.webp",
      "assets/clothing/ChatGPT Image Jun 8, 2026, 07_18_33 PM_result.webp"
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
    "image": "assets/clothing/ChatGPT Image Jun 8, 2026, 07_54_23 PM_result.webp",
    "images": [
      "assets/clothing/ChatGPT Image Jun 8, 2026, 07_54_23 PM_result.webp",
      "assets/clothing/ChatGPT Image Jun 8, 2026, 07_57_04 PM_result.webp"
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
    "image": "assets/coasters/ChatGPT Image Jun 8, 2026, 07_28_52 PM_result.webp",
    "images": [
      "assets/coasters/ChatGPT Image Jun 8, 2026, 07_28_52 PM_result.webp"
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
    "image": "assets/coasters/ChatGPT Image Jun 8, 2026, 07_29_40 PM_result.webp",
    "images": [
      "assets/coasters/ChatGPT Image Jun 8, 2026, 07_29_40 PM_result.webp",
      "assets/coasters/ChatGPT Image Jun 8, 2026, 07_37_06 PM_result.webp"
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
    "image": "assets/coasters/ChatGPT Image Jun 8, 2026, 07_35_31 PM_result.webp",
    "images": [
      "assets/coasters/ChatGPT Image Jun 8, 2026, 07_35_31 PM_result.webp",
      "assets/coasters/tn_titans_backside_result.webp",
      "assets/coasters/bears_cupped_hands_dish_1.webp",
      "assets/coasters/bears_cupped_hands_dish_2.webp"
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
    "image": "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_47_54 PM_result.webp",
    "images": [
      "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_47_54 PM_result.webp",
      "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_48_03 PM_result.webp",
      "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_48_06 PM_result.webp",
      "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_50_53 PM_result.webp"
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
    "image": "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_52_54 PM_result.webp",
    "images": [
      "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_52_54 PM_result.webp",
      "assets/pajamas/ChatGPT Image Jun 8, 2026, 07_52_00 PM_result.webp"
    ],
    "description": "Sleep in game-day comfort with this Chicago Bears sleep set. Includes a bright orange crewneck tee with a large Bears helmet and claw graphics, paired with navy, orange, and white plaid fleece pajama pants finished with 'BEARS' lettering on the lower leg.",
    "rating": 4.8,
    "reviewsCount": 22
  },
  {
    "id": "p24",
    "name": "Multicolor Fringe Crossbody Bag",
    "price": 10,
    "category": "bags",
    "image": "assets/accessories/multicolor_fringe_crossbody_1.webp",
    "images": [
      "assets/accessories/multicolor_fringe_crossbody_1.webp",
      "assets/accessories/multicolor_fringe_crossbody_2.webp"
    ],
    "description": "A beautiful handcrafted black canvas crossbody bag featuring a vibrant multicolor pink, orange, yellow, and blue fringe border. Designed with a convenient zipper pocket, detailed golden trim, and a long black cord strap.",
    "rating": 4.8,
    "reviewsCount": 12
  },
  {
    "id": "p25",
    "name": "Green & Gold Resin Cupped Hands Dish",
    "price": 35,
    "category": "coasters",
    "image": "assets/coasters/green_gold_cupped_hands_1.webp",
    "images": [
      "assets/coasters/green_gold_cupped_hands_1.webp",
      "assets/coasters/green_gold_cupped_hands_2.webp"
    ],
    "description": "A beautiful custom resin catch-all tray shaped in the form of two cupped hands. Hand-cast with a glossy marbled green and black exterior and a rich gold-pigmented interior. Perfect for holding keys, jewelry, or desk accessories.",
    "rating": 4.9,
    "reviewsCount": 16
  },
  {
    "id": "p26",
    "name": "NFL Scalloped Resin Coaster Set (4-Piece)",
    "price": 10,
    "category": "coasters",
    "teamOptions": true,
    "image": "assets/coasters/49ers_scalloped_coasters_1.webp",
    "images": [
      "assets/coasters/49ers_scalloped_coasters_1.webp",
      "assets/coasters/49ers_scalloped_coasters_2.webp"
    ],
    "description": "Elevate your game day with this handcrafted 4-piece set of NFL coasters. Shown here in San Francisco 49ers colors — cast in glossy gold/orange resin with a rich red backing layer featuring a detailed floral pattern, finished with scalloped borders and the team logo centered on each piece. ✦ Available in ALL 32 NFL teams — select your team above!",
    "rating": 4.9,
    "reviewsCount": 18
  },
  {
    "id": "p27",
    "name": "'Kiss Me' Lips Polymer Clay Bead Bracelet",
    "price": 7,
    "category": "jewelry",
    "image": "assets/bracelets/kiss_me_lips_bracelet_1.webp",
    "images": [
      "assets/bracelets/kiss_me_lips_bracelet_1.webp",
      "assets/bracelets/kiss_me_lips_bracelet_2.webp"
    ],
    "description": "Express yourself with this handcrafted polymer clay bead bracelet. Features vibrant pink, red, orange, and white clay disc beads, gold spacers, red accent beads, white heart beads, and a dangling pink lip charm with the message 'KISS ME'.",
    "rating": 4.8,
    "reviewsCount": 14
  },
  {
    "id": "p28",
    "name": "'Gift Box' Present Polymer Clay Bead Bracelet",
    "price": 7,
    "category": "jewelry",
    "image": "assets/bracelets/christmas_present_bracelet_1.webp",
    "images": [
      "assets/bracelets/christmas_present_bracelet_1.webp",
      "assets/bracelets/christmas_present_bracelet_2.webp"
    ],
    "description": "Add a playful touch to your accessories with this handcrafted polymer clay bead bracelet. Features alternating red, pink, orange, and white clay disc beads highlighted by gold spacers, a red fruit slice wheel, a white heart bead, and a cute dangling red and white polka-dot gift box charm.",
    "rating": 4.7,
    "reviewsCount": 11
  },
  {
    "id": "p29",
    "name": "Breast Cancer Awareness 'Be Strong' Zipper Pouch",
    "price": 5,
    "category": "bags",
    "image": "assets/accessories/breast_cancer_zipper_pouch_1.webp",
    "images": [
      "assets/accessories/breast_cancer_zipper_pouch_1.webp",
      "assets/accessories/breast_cancer_zipper_pouch_2.webp"
    ],
    "description": "Show support and carry your essentials in this breast cancer awareness themed black canvas zippered pouch. Features a vibrant print with a pink ribbon flanked by pink boxing gloves and the message 'BE STRONG AND FIGHT ON'. Perfect as a makeup bag or travel organizer.",
    "rating": 4.9,
    "reviewsCount": 15
  },
  {
    "id": "p30",
    "name": "Metallic Gold Scalloped Resin Coaster Set (4-Piece)",
    "price": 10,
    "category": "coasters",
    "image": "assets/coasters/gold_scalloped_coasters_1.webp",
    "images": [
      "assets/coasters/gold_scalloped_coasters_1.webp",
      "assets/coasters/gold_scalloped_coasters_2.webp"
    ],
    "description": "A stunning, minimalist set of 4 scalloped coasters cast in a solid shimmering metallic gold resin. Sleek, elegant, heat-resistant, and perfect for adding a touch of high-fashion glamour to any coffee table or bar setup.",
    "rating": 4.8,
    "reviewsCount": 13
  },
  {
    "id": "p31",
    "name": "Purple Ribbon 'Hope' Watercolor Zipper Pouch",
    "price": 5,
    "category": "bags",
    "image": "assets/accessories/purple_ribbon_hope_pouch_1.webp",
    "images": [
      "assets/accessories/purple_ribbon_hope_pouch_1.webp",
      "assets/accessories/purple_ribbon_hope_pouch_2.webp"
    ],
    "description": "Raise awareness and inspire hope with this white canvas zippered cosmetic pouch. Displays a beautiful purple ribbon graphic on a soft purple watercolor splash background next to elegant 'Hope' script. Excellent for organizing makeup, pens, or daily items.",
    "rating": 4.9,
    "reviewsCount": 17
  },
  {
    "id": "p32",
    "name": "Purple Ribbon 'Faith Over Fear' Zipper Pouch",
    "price": 5,
    "category": "bags",
    "image": "assets/accessories/purple_ribbon_faith_pouch_1.webp",
    "images": [
      "assets/accessories/purple_ribbon_faith_pouch_1.webp",
      "assets/accessories/purple_ribbon_faith_pouch_2.webp"
    ],
    "description": "Stay strong in faith with this lavender canvas zippered pouch. Features a bold purple ribbon graphic alongside the inspiring words 'FAITH over fear' set against a faded purple world map background with floating butterfly accents.",
    "rating": 4.9,
    "reviewsCount": 19
  },
  {
    "id": "p33",
    "name": "Breast Cancer Awareness 'Pink in October' Pajama Set",
    "price": 35,
    "category": "pajamas",
    "image": "assets/pajamas/pink_october_pajamas_1.webp",
    "images": [
      "assets/pajamas/pink_october_pajamas_1.webp",
      "assets/pajamas/pink_october_pajamas_2.webp"
    ],
    "description": "Support breast cancer awareness in absolute comfort with this soft two-piece pajama set. Includes a cozy black short-sleeve crewneck tee printed with 'PINK October' alongside pumpkins wearing pink ribbon decals, paired with light blue lounge pants featuring a matching black leopard and purple butterfly print with 'BREAST CANCER' text on the leg.",
    "rating": 4.9,
    "reviewsCount": 21
  },
  {
    "id": "p34",
    "name": "Pink Flamingo Knit Ankle Socks",
    "price": 3,
    "category": "socks",
    "image": "assets/clothing/flamingo_socks_1.webp",
    "images": [
      "assets/clothing/flamingo_socks_1.webp"
    ],
    "description": "Cozy, low-cut black ankle socks featuring a vibrant hot pink flamingo silhouette on the side, accented by a matching hot pink heel, toe, and ankle cuff. Soft, breathable, and perfect for daily casual wear.",
    "rating": 4.8,
    "reviewsCount": 9
  },
  {
    "id": "p35",
    "name": "Pac-Man Retro Arcade Knit Ankle Socks",
    "price": 3,
    "category": "socks",
    "image": "assets/clothing/pacman_socks_1.webp",
    "images": [
      "assets/clothing/pacman_socks_1.webp"
    ],
    "description": "Bring back the 80s with these retro Pac-Man themed black ankle socks. Knit with colorful game sprites of Pac-Man, ghosts (Blinky, Pinky, Inky, Clyde), and game dots, finished with comfortable light blue heels, toes, and ankle cuffs.",
    "rating": 4.8,
    "reviewsCount": 11
  },
  {
    "id": "p36",
    "name": "Custom Superhero Cartoon Crew Socks",
    "price": 3,
    "category": "socks",
    "image": "assets/clothing/superhero_socks_1.webp",
    "images": [
      "assets/clothing/superhero_socks_1.webp",
      "assets/clothing/superhero_socks_2.webp"
    ],
    "description": "Stand tall with these custom-printed crew socks featuring a retro cartoon superhero in a red suit and yellow cape posing against a pink background. Fun, colorful, and comfortable for all-day wear.",
    "rating": 4.7,
    "reviewsCount": 8
  },
  {
    "id": "p37",
    "name": "Golden Helmet Superhero Crew Socks",
    "price": 3,
    "category": "socks",
    "image": "assets/clothing/gold_helmet_socks_1.webp",
    "images": [
      "assets/clothing/gold_helmet_socks_1.webp",
      "assets/clothing/gold_helmet_socks_2.webp"
    ],
    "description": "Unleash your inner hero with these black crew socks featuring a bold comic book superhero in a blue suit, red cape, and detailed golden helmet. Sturdy, warm, and highly stylized.",
    "rating": 4.7,
    "reviewsCount": 6
  },
  {
    "id": "p38",
    "name": "Pink & Blue Rhinestone Clay Bead Stanley Tumbler Charm",
    "price": 5,
    "category": "accessories",
    "image": "assets/accessories/pink_blue_tumbler_charm_1.webp",
    "images": [
      "assets/accessories/pink_blue_tumbler_charm_1.webp",
      "assets/accessories/pink_blue_tumbler_charm_2.webp"
    ],
    "description": "Add a touch of sparkle to your daily hydration. This custom tumbler charm features a strong silver lobster clasp that hooks onto your tumbler's handle, dangling a row of four glittering pave rhinestone disco beads in alternating royal pink and sky blue colors.",
    "rating": 4.9,
    "reviewsCount": 12
  },
  {
    "id": "p39",
    "name": "Breast Cancer Awareness 'In October We Wear Pink' Pajama Set",
    "price": 35,
    "category": "pajamas",
    "image": "assets/pajamas/october_wear_pink_pajamas_1.webp",
    "images": [
      "assets/pajamas/october_wear_pink_pajamas_1.webp",
      "assets/pajamas/october_wear_pink_pajamas_2.webp",
      "assets/pajamas/october_wear_pink_pajamas_3.webp"
    ],
    "description": "Sleep in comfort while supporting a great cause. This soft two-piece pajama set features a clean white t-shirt with a pink rainbow design reading 'in October we wear pink', paired with bright pink lounge pants covered in a pattern of overlapping pink ribbon silhouettes.",
    "rating": 4.9,
    "reviewsCount": 23
  },
  {
    "id": "p40",
    "name": "Bronze & Blue Rhinestone Clay Bead Tumbler Charm",
    "price": 5,
    "category": "accessories",
    "image": "assets/accessories/bronze_blue_tumbler_charm_1.webp",
    "images": [
      "assets/accessories/bronze_blue_tumbler_charm_1.webp",
      "assets/accessories/bronze_blue_tumbler_charm_2.webp"
    ],
    "description": "Personalize your drinkware with this beautiful sparkling tumbler charm. Hand-strung with alternating bronze-orange and turquoise-blue pave rhinestone clay beads, finished with a sturdy silver clasp and a lower keyring loop.",
    "rating": 4.8,
    "reviewsCount": 5
  },
  {
    "id": "p41",
    "name": "Mickey Mouse Fleece Blanket",
    "price": 40,
    "category": "blankets",
    "image": "assets/blankets/mickey_mouse_blanket_2.webp",
    "images": [
      "assets/blankets/mickey_mouse_blanket_2.webp",
      "assets/blankets/mickey_mouse_blanket_1.webp",
      "assets/blankets/mickey_mouse_blanket_3.webp"
    ],
    "description": "Perfect for kids and Disney lovers, this cozy handmade Mickey Mouse fleece blanket features a classic repeating pattern of Mickey Mouse faces and character outlines on a vibrant red background, completed by a double-layered hand-tied red fleece fringe border.",
    "rating": 4.9,
    "reviewsCount": 15
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PRODUCTS;
}
