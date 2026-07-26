import { MongoClient } from "mongodb";

const MONGODB_URI = "mongodb://habbglobal:Senth%40238@72.61.178.198:32768/mkca?authSource=admin";

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
      title: "Mullai Chess Championship 2026",
      description: "Mullaitivu District Chess Event, organized by Magical Knight Chess Academy.",
      date: "2026-08-16",
      time: "7:30 AM",
      venue: "Mu/Venavil Sri Muruganantha Viddiyalayam",
      entryFee: "Rs. 500/- (+Rs. 300/- late fee after 12 Aug 2026)",
      status: "upcoming",
      featured: true,
      registrationOpen: true,
      registrationFormId: "",
      ageCategories: [
        "Under 6 Boys", "Under 6 Girls",
        "Under 8 Boys", "Under 8 Girls",
        "Under 10 Boys", "Under 10 Girls",
        "Under 12 Boys", "Under 12 Girls",
        "Under 14 Boys", "Under 14 Girls",
        "Over 14 Boys", "Over 14 Girls",
        "Parents Event",
      ],
      prizes: "Champion, 1st & 2nd Runner-up: Trophy + Medal + Certificate. 4th & 5th Place: Trophy + Medal + Certificate. 6th-15th Place: Medal + Certificate. Certificates for all participants.",
      pdfUrl: "/pdf/mullai-chess-championship-2026.pdf",
      whatsappLink: "",
      registrationLink: "/register/mullai-chess-championship-2026",
      venueMapLink: "",
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Magical Knight Classic Chess Tournament 2026",
      description: "Northern Province Players Only. Organized by MKCA.",
      date: "2026-04-08",
      time: "8:30 AM",
      venue: "Kilinochchi Maha Vidyalayam",
      entryFee: "Rs. 1000/-",
      status: "completed",
      featured: false,
      registrationOpen: false,
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
    {
      title: "Opening Ceremony — June 2025",
      slug: "opening-ceremony-june-2025",
      content: `<p>MKCA marked the start of a new season with its <strong>Opening Ceremony</strong> in June 2025, bringing together students, coaches, and parents to celebrate the academy's growing chess community.</p>
<img src="/images/gallery/opening-ceremony/IMG-20250608-WA0158.jpg" alt="Opening Ceremony 1" />
<img src="/images/gallery/opening-ceremony/IMG-20250608-WA0161.jpg" alt="Opening Ceremony 2" />
<img src="/images/gallery/opening-ceremony/IMG-20250608-WA0169.jpg" alt="Opening Ceremony 3" />`,
      excerpt: "A look back at MKCA's Opening Ceremony, celebrating the start of a new chess season in Kilinochchi.",
      category: "Academy News",
      image: "/images/gallery/opening-ceremony/IMG-20250608-WA0158.jpg",
      author: "MKCA Admin",
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Rapid Chess Tournament — June 2025",
      slug: "rapid-chess-tournament-june-2025",
      content: `<p>Players from across the academy tested their speed and precision at the <strong>Rapid Chess Tournament</strong> held in June 2025, with fast-paced games and closely fought finishes throughout the day.</p>
<img src="/images/gallery/rapid-tournament-2025/IMG-20250608-WA0039.jpg" alt="Rapid Chess Tournament 1" />
<img src="/images/gallery/rapid-tournament-2025/IMG-20250608-WA0050.jpg" alt="Rapid Chess Tournament 2" />
<img src="/images/gallery/rapid-tournament-2025/IMG-20250608-WA0109.jpg" alt="Rapid Chess Tournament 3" />`,
      excerpt: "Highlights from the Rapid Chess Tournament — fast games and sharp competition at MKCA.",
      category: "Tournament",
      image: "/images/gallery/rapid-tournament-2025/IMG-20250608-WA0039.jpg",
      author: "MKCA Admin",
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Northern Provincial Team Chess Tournament 2025 — Kilinochchi Girls Team Champions",
      slug: "northern-provincial-team-chess-tournament-2025-kilinochchi-girls-team-champions",
      content: `<p>The <strong>Kilinochchi Girls Team</strong>, trained by Magical Knight Chess Academy, were crowned champions of the <strong>Northern Provincial Team Chess Tournament 2025</strong> held in June 2025 — a proud milestone for the academy and for girls' chess in the Northern Province.</p>
<img src="/images/gallery/girls-championship-2025/img-1.jpg" alt="Northern Provincial Team Chess Tournament 2025" />
<img src="/images/gallery/girls-championship-2025/img-2.jpg" alt="Northern Provincial Team Chess Tournament 2025" />
<img src="/images/gallery/girls-championship-2025/img-3.jpg" alt="Northern Provincial Team Chess Tournament 2025" />
<img src="/images/gallery/girls-championship-2025/img-4.jpg" alt="Northern Provincial Team Chess Tournament 2025" />`,
      excerpt: "The Kilinochchi Girls Team, coached by MKCA, won the Northern Provincial Team Chess Tournament 2025.",
      category: "Academy News",
      image: "/images/gallery/girls-championship-2025/img-1.jpg",
      author: "MKCA Admin",
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Mullai Chess Championship 2025",
      slug: "mullai-chess-championship-2025",
      content: `<p>முல்லைத்தீவு மாவட்டத்தின் சதுரங்க வரலாற்றில் புதிய பொற்காலத்தை உருவாக்கிய ஒரு பெரும் நிகழ்வாக, <strong>Magical Knight Chess Academy (MKCA)</strong> பெருமையுடன் நடத்திய முல்லை CHESS சாம்பியன்ஷிப் 2025 மிகுந்த சிறப்புடனும் வெற்றிகரமாகவும் நிறைவடைந்துள்ளது. இது மாவட்ட சதுரங்க வளர்ச்சிக்கு ஒரு மைல்கல்!</p>
<p>Over <strong>350+</strong> talented players took part in the championship, with <strong>4+</strong> media outlets providing live coverage of the event.</p>
<h3>Media Coverage</h3>
<video src="/blog/mcc25/mediaclip/MullaiMedia.mp4" controls></video>
<video src="/blog/mcc25/mediaclip/DanNews.mp4" controls></video>
<h3>Event Gallery</h3>
<img src="/blog/mcc25/image1.jpg" alt="Mullai Chess Championship 2025" />
<img src="/blog/mcc25/image2.jpg" alt="Mullai Chess Championship 2025" />
<img src="/blog/mcc25/image3.jpg" alt="Mullai Chess Championship 2025" />
<img src="/blog/mcc25/image4.jpg" alt="Mullai Chess Championship 2025" />
<img src="/blog/mcc25/image5.jpg" alt="Mullai Chess Championship 2025" />
<img src="/blog/mcc25/image6.jpg" alt="Mullai Chess Championship 2025" />`,
      excerpt: "350+ players competed and 4+ media outlets covered the Mullai Chess Championship 2025 — a milestone for chess in Mullaitivu District.",
      category: "Tournament",
      image: "/blog/mcc25/mcc25.webp",
      author: "MKCA Admin",
      published: true,
      createdAt: now,
      updatedAt: now,
    },
    {
      title: "Magical Knight Classic 2026 — Event Recap",
      slug: "magical-knight-classic-2026-event-recap",
      content: `<p><strong>Magical Knight Classic 2026</strong>, the exclusive provincial-level chess tournament for Northern Province players, was successfully organized by Magical Knight Chess Academy (MKCA) on <strong>08 April 2026</strong> at Kilinochchi Maha Vidyalayam.</p>
<p>The tournament featured categories for Under 6, 8, 10, 12, 14, and Above 14 age groups (Boys/Girls), along with a special chess event for parents — 14 age divisions in total.</p>
<p>A total of <strong>195 winners</strong> (15 from each age group) were awarded trophies, medals, and certificates, with every participant receiving a certificate of participation.</p>
<h3>தமிழில்</h3>
<p>வடமாகாண சதுரங்க வீரர்களுக்கான <strong>MAGICAL KNIGHT CLASSIC</strong> சதுரங்க போட்டியானது 2026.04.08ம் திகதி கிளிநொச்சி மகா வித்தியாலயத்தில் வெற்றிகரமாக நடைபெற்றது.</p>
<p>14 வயதுப் பிரிவுகளில் 195 வெற்றியாளர்களுக்கு வெற்றிக்கிண்ணம், பதக்கம், சான்றிதழ் வழங்கப்பட்டது.</p>`,
      excerpt: "A recap of the Magical Knight Classic 2026 chess tournament — 195 winners across 14 age categories at Kilinochchi Maha Vidyalayam.",
      category: "Tournament",
      image: "/images/mkc26-logo.png",
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
