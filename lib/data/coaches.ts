export type Coach = {
  name: string;
  photo: string;
  title: string;
  rating?: string;
  email: string;
  phone: string;
  external?: boolean;
};

export const coaches: Coach[] = [
  {
    name: "DISHANTHAN. V",
    photo: "/images/coaches/disha.jpg",
    title: "ARENA INTERNATIONAL MASTER",
    rating: "1637",
    email: "dishanthangm@gmail.com",
    phone: "+94 77 527 3514",
  },
  {
    name: "THARSIKAN. V",
    photo: "/images/coaches/tharsi.png",
    title: "ARENA FEDERATION MASTER",
    rating: "1527",
    email: "tharsiktharsikan@gmail.com",
    phone: "+94 75 317 5528",
  },
  {
    name: "KOPITH. V",
    photo: "https://ui-avatars.com/api/?name=Kopith+V&background=f59e0b&color=030712&size=200",
    title: "Professional Chess Coach",
    email: "kopith.chess@example.com",
    phone: "+94 77 123 4567",
    external: true,
  },
  {
    name: "KANARASAN. K",
    photo: "https://ui-avatars.com/api/?name=Kanarasan+K&background=3b82f6&color=030712&size=200",
    title: "Professional Chess Coach",
    email: "kanarasan.chess@example.com",
    phone: "+94 76 987 6543",
    external: true,
  },
];
