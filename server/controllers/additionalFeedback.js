
const additionalFeedback = [
  {
    name: "Lucas Turner",
    email: "lucas.turner@example.com",
    category: "product",
    feedback: "The build quality is impressive and the product feels reliable. I would appreciate a longer warranty.",
    rating: 5,
    createdAt: new Date("2026-08-03")
  },
  {
    name: "Megan Phillips",
    email: "megan.phillips@example.com",
    category: "service",
    feedback: "The representative listened carefully and explained the available options. The resolution took a little longer than expected.",
    rating: 4,
    createdAt: new Date("2026-08-06")
  },
  {
    name: "Jack Campbell",
    email: "jack.campbell@example.com",
    category: "app",
    feedback: "Useful features, but the search function sometimes returns unrelated results.",
    rating: 3,
    createdAt: new Date("2026-08-09")
  },
  {
    name: "Ava Parker",
    email: "ava.parker@example.com",
    category: "food",
    feedback: "The meal was fresh and flavourful. The menu could include clearer descriptions of allergens.",
    rating: 5,
    createdAt: new Date("2026-08-11")
  },
  {
    name: "Samuel Evans",
    email: "samuel.evans@example.com",
    category: "travel",
    feedback: "The itinerary was well planned and the guide was knowledgeable. Transport between locations could be more comfortable.",
    rating: 4,
    createdAt: new Date("2026-08-14")
  },
  {
    name: "Hannah Edwards",
    email: "hannah.edwards@example.com",
    category: "shopping",
    feedback: "Checkout was straightforward, but I had difficulty finding the return policy.",
    rating: 3,
    createdAt: new Date("2026-08-17")
  },
  {
    name: "Leo Stewart",
    email: "leo.stewart@example.com",
    category: "education",
    feedback: "The lessons were engaging and the examples were practical. More downloadable notes would be helpful.",
    rating: 4,
    createdAt: new Date("2026-08-20")
  },
  {
    name: "Zoe Morris",
    email: "zoe.morris@example.com",
    category: "entertainment",
    feedback: "The show was entertaining and started on time. The sound quality in the back rows could be improved.",
    rating: 4,
    createdAt: new Date("2026-08-23")
  },
  {
    name: "Gabriel Rogers",
    email: "gabriel.rogers@example.com",
    category: "other",
    feedback: "The overall process was simple. A short getting-started guide would make it easier for new users.",
    rating: 4,
    createdAt: new Date("2026-08-26")
  },
  {
    name: "Nora Reed",
    email: "nora.reed@example.com",
    category: "product",
    feedback: "The item did not match the colour shown online, and the instructions were difficult to follow.",
    rating: 2,
    createdAt: new Date("2026-08-29")
  },
  {
    name: "Isaac Cook",
    email: "isaac.cook@example.com",
    category: "service",
    feedback: "I received a helpful response on my first contact. The follow-up message was also clear and timely.",
    rating: 5,
    createdAt: new Date("2026-09-01")
  },
  {
    name: "Lucy Morgan",
    email: "lucy.morgan@example.com",
    category: "app",
    feedback: "The layout is attractive, but some buttons are too small on a mobile screen.",
    rating: 3,
    createdAt: new Date("2026-09-04")
  },
  {
    name: "Owen Bell",
    email: "owen.bell@example.com",
    category: "food",
    feedback: "Good portion sizes and attentive staff. The dessert selection was limited.",
    rating: 4,
    createdAt: new Date("2026-09-07")
  },
  {
    name: "Stella Murphy",
    email: "stella.murphy@example.com",
    category: "travel",
    feedback: "The accommodation was clean and close to major attractions. The check-out instructions were unclear.",
    rating: 4,
    createdAt: new Date("2026-09-10")
  },
  {
    name: "Dylan Bailey",
    email: "dylan.bailey@example.com",
    category: "shopping",
    feedback: "My order arrived earlier than expected and was packed securely. I would like more payment options.",
    rating: 5,
    createdAt: new Date("2026-09-13")
  },
  {
    name: "Violet Rivera",
    email: "violet.rivera@example.com",
    category: "education",
    feedback: "The material was easy to follow, although a few lessons moved too quickly for beginners.",
    rating: 3,
    createdAt: new Date("2026-09-16")
  },
  {
    name: "Nathan Cooper",
    email: "nathan.cooper@example.com",
    category: "entertainment",
    feedback: "A great evening with friendly organisers. The queue at the entrance moved very slowly.",
    rating: 4,
    createdAt: new Date("2026-09-19")
  },
  {
    name: "Ruby Richardson",
    email: "ruby.richardson@example.com",
    category: "product",
    feedback: "The product works consistently and setup was simple. It has become useful in my daily routine.",
    rating: 5,
    createdAt: new Date("2026-09-22")
  },
  {
    name: "Caleb Cox",
    email: "caleb.cox@example.com",
    category: "service",
    feedback: "I had to repeat my issue to multiple people before it was resolved. The final outcome was acceptable.",
    rating: 2,
    createdAt: new Date("2026-09-25")
  },
  {
    name: "Alice Howard",
    email: "alice.howard@example.com",
    category: "other",
    feedback: "The instructions were clear and the experience was positive. It would be useful to have a contact option for urgent questions.",
    rating: 4,
    createdAt: new Date("2026-09-28")
  },
  {
    name: "Thomas Ward",
    email: "thomas.ward@example.com",
    category: "app",
    feedback: "The app loads quickly and is easy to navigate. I occasionally lose my progress when the connection drops.",
    rating: 4,
    createdAt: new Date("2026-10-02")
  },
  {
    name: "Sarah Peterson",
    email: "sarah.peterson@example.com",
    category: "food",
    feedback: "The flavours were balanced and the presentation was lovely. Service was a little slow during the busy period.",
    rating: 4,
    createdAt: new Date("2026-10-05")
  },
  {
    name: "Adrian Gray",
    email: "adrian.gray@example.com",
    category: "travel",
    feedback: "The booking confirmation arrived immediately, but changing the reservation required several steps.",
    rating: 3,
    createdAt: new Date("2026-10-08")
  },
  {
    name: "Layla James",
    email: "layla.james@example.com",
    category: "shopping",
    feedback: "The product range was good and the size guide was accurate. Delivery updates could be more frequent.",
    rating: 4,
    createdAt: new Date("2026-10-11")
  },
  {
    name: "Eli Watson",
    email: "eli.watson@example.com",
    category: "education",
    feedback: "The exercises helped me apply what I learned. I would benefit from seeing worked solutions after each quiz.",
    rating: 5,
    createdAt: new Date("2026-10-14")
  },
  {
    name: "Claire Brooks",
    email: "claire.brooks@example.com",
    category: "entertainment",
    feedback: "The venue was comfortable and the programme was enjoyable. Refreshment options were limited.",
    rating: 3,
    createdAt: new Date("2026-10-17")
  },
  {
    name: "Aaron Kelly",
    email: "aaron.kelly@example.com",
    category: "product",
    feedback: "The product stopped charging after a week. Customer support has not yet provided a satisfactory solution.",
    rating: 1,
    createdAt: new Date("2026-10-20")
  },
  {
    name: "Madeline Sanders",
    email: "madeline.sanders@example.com",
    category: "service",
    feedback: "The staff handled my request professionally and kept me informed. I am happy with the resolution.",
    rating: 5,
    createdAt: new Date("2026-10-23")
  },
  {
    name: "Peter Price",
    email: "peter.price@example.com",
    category: "app",
    feedback: "The main features work well, but the latest update made the settings page harder to use.",
    rating: 2,
    createdAt: new Date("2026-10-26")
  },
  {
    name: "Naomi Bennett",
    email: "naomi.bennett@example.com",
    category: "food",
    feedback: "A pleasant experience with fresh ingredients and friendly service. I would happily return.",
    rating: 5,
    createdAt: new Date("2026-10-30")
  }
];

export default additionalFeedback;
