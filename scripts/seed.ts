import { MongoClient } from "mongodb";

const MONGODB_URI = "mongodb://root:root@72.61.178.198:32768/mkca?authSource=admin";

async function seed() {
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db("mkca");

  console.log("Seeding database...");

  // Clear existing data
  await db.collection("players").deleteMany({});
  await db.collection("coaches").deleteMany({});
  await db.collection("tournaments").deleteMany({});
  await db.collection("blogs").deleteMany({});
  await db.collection("forms").deleteMany({});
  await db.collection("submissions").deleteMany({});

  const now = new Date().toISOString();

  // Seed Players
  const players = [
    { name: "Dishanthan V.", photo: "/images/players/disha.jpg", title: "Arena Int'l Master", titleShort: "Arena Int'l Master", subtitle: "Born: 2003 | Age: 22", standard: 1637, rapid: 1504, blitz: 1553, fideId: "9972951", arenaProfileUrl: "https://chessarena.com/profile/887214", order: 1, createdAt: now, updatedAt: now },
    { name: "Tharsikan V.", photo: "/images/players/tharsi-arena.jpg", title: "Arena Fed Master", titleShort: "Arena Fed Master", subtitle: "MKCA Head Coach", standard: 1527, rapid: null, blitz: 1403, fideId: "29994934", arenaProfileUrl: "https://chessarena.com/profile/890486", order: 2, createdAt: now, updatedAt: now },
    { name: "Karthiheyan S.", photo: "/images/players/karthikeyans.jpg", title: "Arena FIDE Master", titleShort: "Arena FIDE Master", subtitle: "Rapid Specialist", standard: null, rapid: 1648, blitz: 1491, fideId: "80851312", arenaProfileUrl: "https://chessarena.com/profile/923552", order: 3, createdAt: now, updatedAt: now },
    { name: "Rajina K.", photo: "/images/players/r-ratedplay.jpg", title: "Arena FIDE Master", titleShort: "Arena FIDE Master", subtitle: "Women's Chess Champion", standard: 1502, rapid: null, blitz: null, fideId: "9987215", arenaProfileUrl: "https://chessarena.com/profile/941145", order: 4, createdAt: now, updatedAt: now },
  ];
  await db.collection("players").insertMany(players);
  console.log(`Seeded ${players.length} players`);

  // Seed Coaches
  const coaches = [
    { name: "DISHANTHAN. V", photo: "/images/coaches/disha.jpg", title: "ARENA INTERNATIONAL MASTER", rating: "1637", email: "dishanthangm@gmail.com", phone: "+94 77 527 3514", external: false, order: 1, createdAt: now, updatedAt: now },
    { name: "THARSIKAN. V", photo: "/images/coaches/tharsi.png", title: "ARENA FEDERATION MASTER", rating: "1527", email: "tharsiktharsikan@gmail.com", phone: "+94 75 317 5528", external: false, order: 2, createdAt: now, updatedAt: now },
    { name: "KOPITH. V", photo: "https://ui-avatars.com/api/?name=Kopith+V&background=f59e0b&color=030712&size=200", title: "Professional Chess Coach", rating: "", email: "kopith.chess@example.com", phone: "+94 77 123 4567", external: true, order: 3, createdAt: now, updatedAt: now },
    { name: "KANARASAN. K", photo: "https://ui-avatars.com/api/?name=Kanarasan+K&background=3b82f6&color=030712&size=200", title: "Professional Chess Coach", rating: "", email: "kanarasan.chess@example.com", phone: "+94 76 987 6543", external: true, order: 4, createdAt: now, updatedAt: now },
  ];
  await db.collection("coaches").insertMany(coaches);
  console.log(`Seeded ${coaches.length} coaches`);

  // Seed Tournaments
  const tournaments = [
    {
      title: "Magical Knight Classic Chess Tournament 2026",
      description: "Northern Province Players Only. Organized by MKCA.",
      date: "2026-04-08",
      time: "8:30 AM",
      venue: "Kilinochchi Maha Vidyalayam",
      entryFee: "Rs. 1000/-",
      status: "upcoming",
      featured: true,
      registrationOpen: true,
      ageCategories: ["Under 6", "Under 8", "Under 10", "Under 12", "Under 14", "Above 14"],
      prizes: "195 winners across all categories",
      pdfUrl: "/pdf/magical-knight-classic-chess-tournament-2026.pdf",
      whatsappLink: "https://chat.whatsapp.com/FDmyZ3aIyO6JkM67TVJZ6t?mode=gi_t",
      registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSfVslF3X-SlvlaXh2MDXf9yGmlXu-yPIR23mtNhusEAguwq5Q/viewform?usp=header",
      venueMapLink: "https://maps.app.goo.gl/dcpZejA6bcFdtbQq5",
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Mullai Chess Championship 2025",
      description: "Organized by Magical Knight Chess Academy",
      date: "2025-09-27",
      time: "8:00 AM",
      venue: "Puthukkudiyiruppu Central College Auditorium",
      entryFee: "400-600 LKR",
      status: "completed",
      featured: false,
      registrationOpen: false,
      ageCategories: ["Under 6", "Under 8", "Under 10", "Under 12", "Under 14", "Over 14"],
      prizes: "180 Total Prizes",
      pdfUrl: "/pdf/Mullai_Chess_Championship_2025_Updated.pdf",
      whatsappLink: "",
      registrationLink: "",
      venueMapLink: "",
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "2nd Rapid Championship",
      description: "Open Tournament",
      date: "2025-07-10",
      time: "9:00 AM",
      venue: "MKCA, Kilinochchi",
      entryFee: "LKR 300.00",
      status: "completed",
      featured: false,
      registrationOpen: false,
      ageCategories: [],
      prizes: "",
      pdfUrl: "",
      whatsappLink: "",
      registrationLink: "",
      venueMapLink: "",
      createdAt: now,
      updatedAt: now,
    },
  ];
  await db.collection("tournaments").insertMany(tournaments);
  console.log(`Seeded ${tournaments.length} tournaments`);

  // Seed Blogs
  const blogs = [
    {
      title: "Welcome to MKCA Blog",
      slug: "welcome-to-mkca-blog",
      content: "Welcome to the Magical Knight Chess Academy blog! Stay tuned for tournament announcements, tactical insights, and stories from our chess community.",
      excerpt: "Welcome to the MKCA blog.",
      category: "News",
      image: "",
      author: "MKCA Admin",
      published: true,
      createdAt: now,
      updatedAt: now,
    },
  ];
  await db.collection("blogs").insertMany(blogs);
  console.log(`Seeded ${blogs.length} blogs`);

  console.log("\nSeed complete!");
  await client.close();
}

seed().catch(console.error);
