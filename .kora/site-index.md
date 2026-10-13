# Site index · format 2
Structure and the names of what each page offers. Values that change often — prices, hours, phone,
address — and body copy are deliberately not recorded here; read the page itself for those.

## index.html → /
title: Frankie & Fanucci's — Wood-Fired Pizza & Italian Kitchen
purpose: The landing page — the restaurant's story and the three things it wants a visitor to do next.
sections:
- `#main` "Frankie & Fanucci's" — the page body, holding the hero and every section below it
- `#home` "Frankie & Fanucci's" — the hero, with the Order Online and View Menu actions and the Best of Westchester claim
- `#heroPoster` — the still image shown before the hero video loads
- `#heroVideo` — the hero's background video
- `#explore` "Dine In, Take Out, Delivery" — the four paths onward: Catering, Group Dining, 2 for 1 Happy Hour, Lunch Special
- rewards strip "Join F&F Fired-Up Rewards and Don't Miss Out." — the combined rewards + sign-up call to action, linking to rewards.html (replaces the old separate newsletter section)
- Visit Us "Find Us in Mamaroneck" — a storefront photo linking to Google Maps directions (no embedded map, by request: the embed showed nearby competitors), with the address and hours
- `#about` "Quality in Every Pie." — the restaurant's story
- `#reviews` "What Our Customers Say" — customer testimonials with 4.4 rating from 618 Google reviews
- `#faq` "Frequently Asked Questions" — eight questions, mirrored in the page's FAQPage JSON-LD; edit both together
- gift-card strip "Share the Love." — directly after the FAQ
- `#instagram-feed` "Share the Goodness" — the live Instagram feed; the four static photos show until the feed loads (or if it fails)
also: The hero claims counts — six Best of Westchester wins, twelve-plus signature pizzas, forty-plus menu items. All three go stale as the menu changes, and nothing recomputes them from menu.html.
also: The newsletter section is repeated on every page except index.html, menu.html, happy-hour.html and lunch-special.html, always with the same field ids. A change to it has to be made on six pages.

## lunch-special.html → /lunch-special
title: Lunch Special — Frankie & Fanucci's | Lunch in Mamaroneck
purpose: The lunch special page — linked from the More dropdown, the mobile menu, the footer and the homepage explore cards.
sections:
- `#main` "Lunch Special" — the page hero with Order Online and Call actions
- `#lunch` "Today's Lunch Special" — the lunch copy; the special's items, price and hours are not yet filled in (see the TODO comment)

## menu.html → /menu
title: Menu — Frankie & Fanucci's | Wood-Fired Pizza & Italian Kitchen
purpose: The full menu — 58 dishes in seven category panels.
sections:
- `#main` "Explore Our Kitchen" — the page body
- `#menu` "Categories" — the category switcher above the panels
- `#panel-antipasti` — 9 priced items: Garlic Bread, Bruschetta, Fried Calamari, Burrata, Mozzarella Sticks, Wood-Fired Cauliflower, Nonna's Meatballs, Wings, Spicy Shrimp
- `#panel-salads` — 6 priced items: Pear & Gorgonzola, Arugula, Caesar, Di Casa, Tuscan, Mozzarella Salad
- `#panel-pizza` — 11 priced items: Margherita, Pepperoni Picante, Spicy Sausage & Onion, Di Parma, Amici, The 'Q', White, Shroom, Giambotta, Popeye, Chicken & Broccoli
- `#panel-pasta` — 10 priced items: Penne alla Vodka, Bolo, Rigatoni & Spicy Sausage, Ravioli Vermouth, Truffled Spaghetti, Spicy Shrimp & Spaghetti, Gnocchi Siciliana, Spaghetti & Meatballs, Lasagna, Cavatelli
- `#panel-entrees` — 8 priced items: Parm, Marsala, Francese, Hanger Steak, Spicy Scarpariello, Paillard, Milanese, Salmon Piccata
- `#panel-heros` — 7 priced items: Parm Hero, Caprese Hero, Milanese 'Wich, Chicken & Bacon 'Wich, Roasted Eggplant 'Wich, The Burger
- `#panel-dessert` — 7 priced items: Cheesecake, Tiramisu, Zeppole, Bomboloni, S'mores Pizza, Lava Cake, Tartufo
also: Eleven dishes are written twice on this site — the antipasti and salads named here appear again on catering.html and inside the group packages on groups.html, each with their own wording. Renaming a dish means finding every copy.
also: Several dish names are single words that also occur in ordinary prose on this page — Parm, White, Popeye, Amici. A change described by name alone can match the wrong text.

## catering.html → /catering
title: Catering — Frankie & Fanucci's | Trays for Events in Mamaroneck
purpose: The catering menu, sold by the tray, with a guide to how much to order.
sections:
- `#main` "Favorites by the Tray" — the page hero, the notice period and the tray-size note
- `#catering` "Ordering Guide" — how many trays to order for a given headcount, then the catering menu by category
- `#catering` Antipasti & Sides — the trays offered: Bruschetta, Meatballs, Garlic Bread, Burrata, Fried Calamari, Wings, Wood-Fired Cauliflower
- `#newsletter-form` — the newsletter sign-up
also: Prices on this page are for half trays only, stated once at the top. A price change here has to preserve that qualifier or every number on the page becomes wrong.

## groups.html → /groups
title: Groups & Events — Frankie & Fanucci's | Private Dining Mamaroneck
purpose: The private-dining page — three per-person packages for groups.
sections:
- `#main` "Host Your Next Event at F&F" — the page hero, the guest limit and the contact actions
- `#groups` "Choose Your Menu" — the three packages, each with a per-person price, an event length and its courses: Pizza Party, Italian Classic, Italian Deluxe
- `#newsletter-form` — the newsletter sign-up
also: Each package lists the dishes a guest may select, naming salads, appetizers and pizzas that also appear on menu.html. A dish removed from the menu stays selectable here unless it is removed from all three packages too.

## happy-hour.html → /happy-hour
title: Happy Hour — Frankie & Fanucci's | 2 for 1 Cocktails Mamaroneck
purpose: The bar page — the happy-hour offer and the full bar list.
sections:
- `#main` "2 for 1 Happy Hour" — the page hero and the terms of the offer
- `#happyhour` "Full Bar Menu" — the bar list, 30 drinks across cocktails, wines and beers: Aperol Spritz, Strawberry Lover, Doppio Espresso Martini, Ginger Agave, Spicy Italian Margarita, Negroni, Violet Haze, Maple Bourbon Sour, Red Sangria, White Sangria, Prosecco, Rosé, Pinot Grigio, Sauvignon Blanc, Chardonnay, Montepulciano, Malbec, Pinot Noir, Cabernet Sauvignon, Brooklyn Seasonal, Birra Peroni Nastro Azzurro, Night Shift Nite Lite, Von Trapp, Catskill Nightshine, Allagash White, Threes All or Nothing, Brooklyn Pulp Art, Coors Light, Corona, Heineken
also: The page says the tap list rotates and directs the visitor to the in-store menu for current selection and pricing, so the beers named here are not guaranteed to be pouring.
also: This page has no newsletter form, unlike every other page except menu.html.

## delivery.html → /delivery
title: Delivery & Pickup — Frankie & Fanucci's | Mamaroneck, Larchmont & More
purpose: The delivery and pickup page — the zones served, the delivery window, the fee, and how curbside works.
sections:
- `#main` "Delivery & Pickup" — the page body, holding the delivery block and the curbside block
- `#main` Delivery Zones — the areas served: Mamaroneck, Larchmont, Harrison South of I-95, Rye South of Osborn Rd / Oakland Beach Ave, Scarsdale East of Bronx River Pkwy, New Rochelle
- `#main` Curbside Pickup — the three-step pickup instructions and the pickup address
- `#newsletter-form` — the newsletter sign-up
also: The delivery window is stated twice on this page, once beside the fee and once under Delivery Hours. Changing one leaves the other contradicting it.
also: The New Rochelle zone is described by three boundary streets rather than a name, so it does not read like the other five and a change to the zone list can easily drop it.

## contact.html → /contact
title: Find Us — Frankie & Fanucci's | Hours, Map & Contact
purpose: The contact page — the address, phone, email, hours, gift cards and the newsletter sign-up.
sections:
- `#main` "Find Us" — the page hero with the Get Directions and Order Online actions
- `#location` "Hours & Contact" — the address, phone, email and the opening hours by day
- `#main` "Gift Cards Available" — the gift-card block
- `#newsletter-form` — the newsletter sign-up
also: The address is written here and again on delivery.html as the curbside address, and the two are different — 301 Mamaroneck Avenue here, 300 Phillips Park Road there. Both are correct and neither page explains the difference, so a change made to "the address" can easily be made to the wrong one.

## rewards.html → /rewards
title: F&F Fired-Up Rewards — Frankie & Fanucci's | Earn Points & Perks
purpose: The loyalty programme page — how points are earned and what the member perks are.
sections:
- `#main` "F&F Fired-Up Rewards" — the page hero and the sign-up action
- `#main` "Earn Points, Get Rewarded" — the three earning rules, covering the spend rate, the reward threshold and the absence of a points limit
- `#main` "Special Bonuses" — the member perks: Signup Bonus, Birthday Bonus, Exclusive Offers
- `#newsletter-form` — the newsletter sign-up
also: Every rule on this page is a number — the spend per point, the points per reward, the signup bonus, the birthday reward. All of them are programme terms rather than page structure, so any change here is a change to the offer itself.

## support files
Files that are not pages. A line marked [content] holds words or data a visitor reads, so a
change to the site's content can land there; the rest only make the site work or look right.
- `llms.txt` — a plain-text summary of the business for AI crawlers — derived from the site by the deploy, not written by hand
- `robots.txt` — crawler rules and the sitemap link — derived from the site by the deploy, not written by hand
- `sitemap.xml` — the list of page URLs — derived from the site by the deploy, not written by hand
- `assets/site.css` — the site's styling, brand colours and type scale
- `js/includes.js` — THE BUSINESS'S OWN DETAILS AND LINKS used across every page — the phone number, email, ordering, gift cards, Instagram and map links  [content]
- `js/main.js` — scroll and motion behaviour

## shared (every page)
The desktop nav is Menu, Catering, Groups, Gift Cards, a More dropdown (the full page list, same as the mobile menu — both come from `fullNav()` in js/includes.js) and Order Online; on mobile the bar shows Call and Order Online buttons beside the hamburger.
The header, navigation, mobile menu and footer are propagated from index.html to every other page by
`shell_propagation`. A change to any of them is made on index.html alone and copied automatically.
