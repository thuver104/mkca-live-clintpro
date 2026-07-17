export type Player = {
  name: string;
  photo: string;
  title: string;
  titleShort: string;
  subtitle: string;
  standard: number | null;
  rapid: number | null;
  blitz: number | null;
  fideId: string;
  arenaProfileUrl: string;
};

export const players: Player[] = [
  {
    name: "Dishanthan V.",
    photo: "/images/players/disha.jpg",
    title: "Arena Int'l Master",
    titleShort: "Arena Int'l Master",
    subtitle: "Born: 2003 | Age: 22",
    standard: 1637,
    rapid: 1504,
    blitz: 1553,
    fideId: "9972951",
    arenaProfileUrl: "https://chessarena.com/profile/887214",
  },
  {
    name: "Tharsikan V.",
    photo: "/images/players/tharsi-arena.jpg",
    title: "Arena Fed Master",
    titleShort: "Arena Fed Master",
    subtitle: "MKCA Head Coach",
    standard: 1527,
    rapid: null,
    blitz: 1403,
    fideId: "29994934",
    arenaProfileUrl: "https://chessarena.com/profile/890486",
  },
  {
    name: "Karthiheyan S.",
    photo: "/images/players/karthikeyans.jpg",
    title: "Arena FIDE Master",
    titleShort: "Arena FIDE Master",
    subtitle: "Rapid Specialist",
    standard: null,
    rapid: 1648,
    blitz: 1491,
    fideId: "80851312",
    arenaProfileUrl: "https://chessarena.com/profile/923552",
  },
  {
    name: "Rajina K.",
    photo: "/images/players/r-ratedplay.jpg",
    title: "Arena FIDE Master",
    titleShort: "Arena FIDE Master",
    subtitle: "Women's Chess Champion",
    standard: 1502,
    rapid: null,
    blitz: null,
    fideId: "9987215",
    arenaProfileUrl: "https://chessarena.com/profile/941145",
  },
];

export const titleCategories = [
  { icon: "🏆", title: "Arena International Masters", label: "Arena Title", count: 1, sub: "Elite Player" },
  { icon: "⭐", title: "Arena FIDE Masters", label: "Arena Title", count: 2, sub: "Advanced Players" },
  { icon: "🎯", title: "Arena Federation Masters", label: "Arena Title", count: 1, sub: "Federation Player" },
];

export const fideRatingCategories = [
  { name: "Grandmaster", value: "2500+" },
  { name: "International Master", value: "2400+" },
  { name: "FIDE Master", value: "2300+" },
  { name: "Candidate Master", value: "2200+" },
];

export const arenaRatingCategories = [
  { name: "Arena International Master", value: "Arena Title" },
  { name: "Arena FIDE Master", value: "Arena Title" },
  { name: "Arena Federation Master", value: "Arena Title" },
  { name: "Class Players", value: "1400-1699" },
];

export const risingStars = [
  { icon: "fa-star", title: "Arena Rated Players", description: "Players actively competing on Chess Arena platform.", count: 4, label: "Active Rated Players" },
  { icon: "fa-trophy", title: "Arena Masters", description: "Players who have achieved Arena titles through competitive play.", count: 4, label: "Titled Players" },
  { icon: "fa-chart-line", title: "Multi-Format Players", description: "Players active in Standard, Rapid, and Blitz formats.", count: 2, label: "All-Format Players" },
  { icon: "fa-female", title: "Women Players", description: "Strong female players making their mark in competitive chess.", count: 1, label: "Rajina K." },
  { icon: "fa-graduation-cap", title: "FIDE Registered", description: "Players with official FIDE registration for international tournaments.", count: 4, label: "FIDE Players" },
  { icon: "fa-medal", title: "Online Champions", description: "Players competing successfully on Chess Arena platform.", count: 4, label: "Arena Players" },
];

export const playerStats = [
  { value: "4", label: "Total rated players in our academy" },
  { value: "1543", label: "Average rating of our players" },
  { value: "June 2025", label: "All players joined MKCA" },
];
