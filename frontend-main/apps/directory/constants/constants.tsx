import BookClosedIcon from "@repo/ui/components/icons/BookClosedIcon";
import PlayIcon from "@repo/ui/components/icons/PlayIcon";
import StarsIcon from "@repo/ui/components/icons/StarsIcon";

const landingUrl = process.env.NEXT_PUBLIC_LANDING_URL;

export const directoryTopbarLinks = [
  { key: "about", path: `${landingUrl}/about`, label: "About" },
  {
    key: "findCare",
    label: "Find Care",
    subMenuLinks: [
      {
        key: "findBySpeciality",
        path: `/`,
        icon: BookClosedIcon,
        label: "Find by Speciality",
        description: "The latest industry news, updates and info.",
      },
      {
        key: "findByState",
        path: `/`,
        icon: StarsIcon,
        label: "Find by State",
        description: "Learn how our customers are making big changes.",
      },
      {
        key: "findByTherapist",
        path: `/`,
        icon: PlayIcon,
        label: "Find by Therapist",
        description: "Get up and running on new features and techniques.",
      },
    ],
  },
  {
    key: "resources",
    label: "Resources",
    subMenuLinks: [
      {
        key: "ourBlogs",
        path: `${landingUrl}/blog`,
        icon: BookClosedIcon,
        label: "Our Blogs",
        description: "The latest industry news, updates and info.",
      },
      {
        key: "podcasts",
        path: `${landingUrl}/podcast`,
        icon: StarsIcon,
        label: "Podcasts",
        description: "Learn how our customers are making big changes.",
      },
    ],
  },
  {
    key: "forPartners",
    path: `${landingUrl}/for-partners`,
    label: "For Partners",
  },
  {
    key: "forProvider",
    label: "For Providers",
    subMenuLinks: [
      {
        key: "providerBenefits",
        path: `${landingUrl}/provider-benefits`,
        icon: BookClosedIcon,
        label: "Provider Benefits",
        description: "The latest industry news, updates and info.",
      },
      {
        key: "payWhatYouCan",
        path: `${landingUrl}/provider-benefits#pay-what-you-can`,
        icon: StarsIcon,
        label: "Pay What You Can",
        description: "Learn how our customers are making big changes.",
      },
      {
        key: "marketHub",
        path: `/`,
        icon: PlayIcon,
        label: "Market Hub",
        description: "Get up and running on new features and techniques.",
      },
    ],
  },
];

export const directoryTopbarMobileLinks = [
  { key: "home", path: "/", label: "Home" },
  { key: "about", path: `${landingUrl}/about`, label: "About" },
  {
    key: "findCare",
    label: "Find Care",
    subMenuLinks: [
      {
        key: "findBySpeciality",
        path: "/",
        label: "Find by Speciality",
      },
      {
        key: "findByState",
        path: "/",
        label: "Find by State",
      },
      {
        key: "findByTherapist",
        path: "/",
        label: "Find by Therapist",
      },
    ],
  },
  {
    key: "resources",
    label: "Resources",
    subMenuLinks: [
      {
        key: "ourBlog",
        path: `${landingUrl}/blog`,
        label: "Our Blogs",
      },
      {
        key: "podcasts",
        path: `${landingUrl}/podcast`,
        label: "Podcasts",
      },
    ],
  },
  {
    key: "forPartners",
    path: `${landingUrl}/for-partners`,
    label: "For Partners",
  },
  {
    key: "forProvider",
    label: "For Providers",
    subMenuLinks: [
      {
        key: "providerBenefits",
        path: `${landingUrl}/provider-benefits`,
        label: "Provider Benefits",
      },
      {
        key: "payWhatYouCan",
        path: `${landingUrl}/provider-benefits#pay-what-you-can`,
        label: "Pay What You Can",
      },
      {
        key: "marketHub",
        path: `/`,
        label: "Market Hub",
      },
    ],
  },
];
