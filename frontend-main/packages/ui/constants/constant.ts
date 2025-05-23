import pp1 from "@repo/ui/assets/about/team-member/pp-1.webp";
import pp2 from "@repo/ui/assets/about/team-member/pp-2.webp";
import decoriveBouquet from "@repo/ui/assets/latesarticles/decorative-bouquet.webp";
import devAsangbam from "@repo/ui/assets/latesarticles/dev-asangbam.webp";
import kelly from "@repo/ui/assets/latesarticles/kelly.webp";
import peopleMedical from "@repo/ui/assets/latesarticles/people-medical.webp";
import providerPanelAppointments from "@repo/ui/assets/provider-panel-sidebar/appointments.webp";
import providerPanelAnalytics from "@repo/ui/assets/provider-panel-sidebar/chart.webp";
import providerBilling from "@repo/ui/assets/provider-panel-sidebar/provider-billing.webp";
import providerPanelDashboard from "@repo/ui/assets/provider-panel-sidebar/dashboard.webp";
import providerPanelHomePage from "@repo/ui/assets/provider-panel-sidebar/home.webp";
import providerLogout from "@repo/ui/assets/provider-panel-sidebar/logouttight.webp";
import providerPanelNotifications from "@repo/ui/assets/provider-panel-sidebar/notification.webp";
import providerPanelProfileManagement from "@repo/ui/assets/provider-panel-sidebar/profile-management.webp";
import BookClosedIcon from "@repo/ui/components/icons/BookClosedIcon";
import StarsIcon from "@repo/ui/components/icons/StarsIcon";
import aetna from "../assets/insurance/aetna.webp";
import blueCrossShield from "../assets/insurance/blue-cross-shield.webp";
import cigna from "../assets/insurance/cigna.webp";
import medicare from "../assets/insurance/medicare.webp";
import oscar from "../assets/insurance/oscar.webp";
import unitedHealthcare from "../assets/insurance/united-healthcare.webp";
import facebook from "../assets/socialmedia/facebook.webp";
import instagram from "../assets/socialmedia/instagram.webp";
import linkedin from "../assets/socialmedia/linkedin.webp";
import youtube from "../assets/socialmedia/youtube.webp";
import drugaddiction from "../assets/specialties/drugaddiction.webp";
import headache from "../assets/specialties/headache.webp";
import mentalhealth1 from "../assets/specialties/mentalhealth1.webp";
import mentalhealth2 from "../assets/specialties/mentalhealth2.webp";
import calendar from "../assets/whychoosetelewellness/calendar.webp";
import comment from "../assets/whychoosetelewellness/comment.webp";
import play from "../assets/whychoosetelewellness/play.webp";
import AnalyticsIcon from "../components/icons/AnalyticsIcon";
import GuardCheckIcon from "../components/icons/GuardCheckIcon";
import HtmlTagIcon from "../components/icons/HtmlTagIcon";
import LineStatsIcon from "../components/icons/LineStatsIcon";
import NetworkStatsIcon from "../components/icons/NetworkStatsIcon";
import PhoneCheckIcon from "../components/icons/PhoneCheckIcon";
import PremiumPlanIcon from "../components/icons/PremiumPlanIcon";
import StarterPlanIcon from "../components/icons/StarterPlanIcon";
import TagFileIcon from "../components/icons/TagFileIcon";
import WindowPlusIcon from "../components/icons/WindowPlusIcon";
import { TermsSection } from "../utils/type";
import BookIcon from "../components/icons/BookIcon";
import CalendarIcon from "../components/icons/CalendarIcon";
import PlayIcon from "../components/icons/PlayIcon";
import ChatBubbleIcon from "../components/icons/ChatBubbleIcon";
import SearchLineIcon from "../components/icons/SearchLineIcon";
import CalendarCheckIcon from "../components/icons/CalendarCheckIcon";
import WifiIcon from "../components/icons/WifiIcon";
import CalendarEditIcon from "../components/icons/CalendarEditIcon";
import HexagonUserIcon from "../components/icons/HexagonUserIcon";
import EyeIcon from "../components/icons/EyeIcon";
import FileBookIcon from "../components/icons/FileBookIcon";
import NetworkIcon from "../components/icons/NetworkIcon";

const landingUrl = process.env.NEXT_PUBLIC_LANDING_URL;
const directoryUrl = process.env.NEXT_PUBLIC_DIRECTORY_URL;

export const socialLink = [
  {
    href: "https://www.instagram.com/telewellness_hub/",
    label: "Instagram",
    src: instagram.src,
  },
  {
    href: "https://www.youtube.com/channel/UCbU2J7FvLiY57dxlOx7Cmlg",
    label: "YouTube",
    src: youtube.src,
  },
  {
    href: "https://www.facebook.com/telewellnesshub/",
    label: "Facebook",
    src: facebook.src,
  },
  {
    href: "https://www.linkedin.com/company/telewellnesshub",
    label: "LinkedIn",
    src: linkedin.src,
  },
];

export const chooseBox = [
  {
    header: "Instant Access to Wellness Resources",
    text: "Explore a library of digital downloads, products, videos, and podcasts from licensed providers.",
    icon: BookIcon,
  },
  {
    header: "Direct Scheduling with Providers",
    text: "Book sessions with providers seamlessly from their profiles.",
    icon: CalendarIcon,
  },
  {
    header: "Message Providers Directly",
    text: "Message mental health professionals directly to find the support you need.",
    icon: ChatBubbleIcon,
  },
  {
    header: "On-Demand Media",
    text: "Watch videos, listen to podcasts, and read articles tailored to your wellness needs.",
    icon: PlayIcon,
  },
  {
    header: "No Registration Needed",
    text: "Start exploring for free, no signup required, and enjoy easy access to all resources.",
    icon: BookIcon,
  },
];

export const landingFooterLink = [
  {
    title: "Company",
    links: [
      { label: "About", path: "/about" },
      { label: "Podcast", path: "/podcast" },
      { label: "Blog", path: "/blog" },
      { label: "For Partners", path: "/for-partners" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", path: "/contact-us" },
      { label: "Terms & Conditions", path: "/terms-conditions" },
      { label: "FAQ", path: "/faq" },
      { label: "Privacy Policy", path: "/privacy" },
    ],
  },
  {
    title: "For Providers",
    links: [
      { label: "Learn more", path: "/provider-benefits" },
      { label: "Join us", path: `${directoryUrl}/provider-sign-in` },
      // { label: "Refer a Provider", path: "/refer-provider" },
      // { label: "Provider Portal", path: "/provider-portal" },
    ],
  },
  {
    title: "Get Care",
    links: [
      { label: "Alabama Providers", path: "/providers/alabama" },
      { label: "Alaska Providers", path: "/providers/alaska" },
      { label: "Arizona Providers", path: "/providers/arizona" },
      { label: "Arkansas Providers", path: "/providers/arkansas" },
      { label: "California Providers", path: "/providers/california" },
    ],
  },
];

export const directoryFooterLink = [
  {
    title: "Company",
    links: [
      { label: "About", path: `${landingUrl}/about` },
      { label: "Podcast", path: `${landingUrl}/podcast` },
      { label: "Blog", path: `${landingUrl}/blog` },
      { label: "For Partners", path: `${landingUrl}/for-partners` },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact us", path: "/contact-us" },
      { label: "Terms & Conditions", path: "/terms-conditions" },
      { label: "FAQ", path: "/faq" },
      { label: "Privacy Policy", path: "/privacy" },
    ],
  },
  {
    title: "For Providers",
    links: [
      { label: "Learn more", path: "/provider-benefits" },
      { label: "Join us", path: `${directoryUrl}/provider-sign-in` },
      // { label: "Refer a Provider", path: "/refer-provider" },
      // { label: "Provider Portal", path: "/provider-portal" },
    ],
  },
  {
    title: "Get Care",
    links: [
      { label: "Alabama Providers", path: "/providers/alabama" },
      { label: "Alaska Providers", path: "/providers/alaska" },
      { label: "Arizona Providers", path: "/providers/arizona" },
      { label: "Arkansas Providers", path: "/providers/arkansas" },
      { label: "California Providers", path: "/providers/california" },
    ],
  },
];

export const insurance = [
  {
    title: "aetna",
    image: aetna.src,
  },
  {
    title: "cigna",
    image: cigna.src,
  },
  {
    title: "medicare",
    image: medicare.src,
  },
  {
    title: "blue-cross-blue-shield",
    image: blueCrossShield.src,
  },
  {
    title: "united-healthcare",
    image: unitedHealthcare.src,
  },
  {
    title: "oscar",
    image: oscar.src,
  },
];

export const howItWorks = [
  {
    header: "Find Wellness Providers and Resources",
    text: "Search our directory for licensed providers, browse their resources, videos, and more.",
    icon: SearchLineIcon,
  },
  {
    header: "Book Appointments or Download with Ease",
    text: "Easily book appointments or access digital products and media through the provider’s links on their profile.",
    icon: CalendarCheckIcon,
  },
  {
    header: "Stay Connected to Wellness",
    text: "Engage with your provider, follow our blog, listen to our podcasts and access wellness tools anytime.",
    icon: WifiIcon,
  },
];

export const platformGuideData = [
  {
    title: "Platform Guide",
    accordionItems: [
      {
        icon: play.src,
        question: "What is TeleWellness Hub?",
        answer:
          "TeleWellness Hub is a platform that redefines access to mental health and wellness by connecting individuals with trusted, visionary providers, offering a comprehensive, free multichannel approach to well-being through services and products.",
      },
      {
        icon: comment.src,
        question: "How is TeleWellness Hub free for clients?",
        answer:
          "TeleWellness Hub provides free access to a range of mental health and wellness resources, services, and products, ensuring that individuals can instantly access the care they need without financial barriers.",
      },
      {
        icon: calendar.src,
        question: "What types of providers are on TeleWellness Hub?",
        answer:
          "TeleWellness Hub connects individuals with a variety of providers from 11 fields (mental health, coach, consultant, nutrition provider, medical provider, dental provider, urgent care, fitness provider, yoga provider, pharmacy provider, and other wellness provider) ",
      },
    ],
  },
  {
    title: "Appointment Booking FAQs",
    accordionItems: [
      {
        icon: play.src,
        question: "Do providers have control over their services and pricing?",
        answer:
          "Yes! Providers on TeleWellness Hub have full control over their services, pricing, schedules, content, and how they engage with clients, allowing them to run their practice on their terms.",
      },
      {
        icon: play.src,
        question: "How do I become a provider on TeleWellness Hub?",
        answer:
          "Providers can join TeleWellness Hub by creating a profile, showcasing their credentials and services, and connecting with potential clients through the platform",
      },
      {
        icon: play.src,
        question: "Is TeleWellness Hub secure and private? ",
        answer:
          "Yes, TeleWellness Hub is committed to maintaining the privacy and confidentiality of all users, ensuring that your information and sessions are secure.",
      },
    ],
  },
  {
    title: "Therapy Session Information",
    accordionItems: [
      {
        icon: play.src,
        question: "Can I access TeleWellness Hub if I am outside the U.S.?",
        answer:
          "TeleWellness Hub allows providers to connect with clients across state and even country borders, where licensing allows, expanding the reach of services beyond local areas.",
      },
      {
        icon: play.src,
        question: "How does TeleWellness Hub support providers?",
        answer:
          "TeleWellness Hub helps providers grow their practices by offering them visibility across multiple channels, the ability to set their own rates and schedules, and opportunities to earn passive income through digital products andservices.",
      },
      {
        icon: play.src,
        question: "Can I access the platform from anywhere?",
        answer:
          "Yes! TeleWellness Hub is accessible online, allowing you to connect with providers and access resources wherever you are, as long as you have internet access or through your mobile provider on your phone.",
      },
      {
        icon: play.src,
        question:
          "What services and products are available on TeleWellness Hub?",
        answer:
          "Providers offer a wide range of services, including one-on-one sessions, group workshops, courses, and digital products such as e-books, journals, and wellness tools—all designed to help you take control of your well-being.",
      },
      {
        icon: play.src,
        question: "How do I connect with a provider on TeleWellness Hub?",
        answer:
          "You can easily connect with a provider through the directory, where you can browse profiles, choose services, and schedule appointments directly through the provider’s integrated tools and links",
      },
    ],
  },
];

export const specialties = [
  {
    title: "Anxiety Disorders",
    icon: mentalhealth1.src,
    value: "1",
    label: "anxiety_disorders",
  },
  {
    title: "Mood Disorders",
    icon: mentalhealth1.src,
    value: "2",
    label: "mood_disorders",
  },
  {
    title: "Personality Disorders",
    icon: mentalhealth2.src,
    value: "3",
    label: "personality_disorders",
  },
  {
    title: "Eating Disorders",
    icon: headache.src,
    value: "4",
    label: "eating_disorders",
  },
  {
    title: "ADHD",
    icon: drugaddiction.src,
    value: "5",
    label: "adhd",
  },
  {
    title: "Anxiety Disorders",
    icon: mentalhealth1.src,
    value: "6",
    label: "anxiety_disorders_2",
  },
  {
    title: "Mood Disorders",
    icon: mentalhealth1.src,
    value: "7",
    label: "mood_disorders_2",
  },
  {
    title: "Personality Disorders",
    icon: mentalhealth2.src,
    value: "8",
    label: "personality_disorders_2",
  },
];

export const articles = [
  {
    title: "Optimizing Health Through Metabolic Typing with Martin Pytella",
    date: "July 23, 2024",
    description:
      "Condimentu Nostru Consect Voluptate Phasel nunc Libero Ullamco",
    imageUrl: peopleMedical.src,
  },
  {
    title: "Exercitati Nullam Loborti Voluptate Dolore saep MollisMaximus",
    date: "August 12, 2024",
    description:
      "Reprehende Congue Sapient Exercitat Blandi sint Faucib Quisqua",
    imageUrl: decoriveBouquet.src,
  },
  {
    title: "Condimentu Egesta Interdu Voluptate Faucib tota Egesta Ullamco",
    date: "September 10, 2024",
    description:
      "Adipisicin Labore Tincidu Ullamcorp Dolore mihi Libero Ametdosedtem",
    imageUrl: kelly.src,
  },
  {
    title: "Pellentesq Placea Laborum Adipisici Fuisse tota FaucibPariatu",
    date: "October 15, 2024",
    description:
      "Pellentesq Fuisse Eiusmod FermentumAliqua vita Placea Sedtemporeiu",
    imageUrl: devAsangbam.src,
  },
  {
    title: "Optimizing Health Through Metabolic Typing with Martin Pytella",
    date: "July 23, 2024",
    description:
      "Condimentu Nostru Consect Voluptate Phasel nunc Libero Ullamco",
    imageUrl: peopleMedical.src,
  },
  {
    title: "Exercitati Nullam Loborti Voluptate Dolore saep MollisMaximus",
    date: "August 12, 2024",
    description:
      "Reprehende Congue Sapient Exercitat Blandi sint Faucib Quisqua",
    imageUrl: decoriveBouquet.src,
  },
  {
    title: "Condimentu Egesta Interdu Voluptate Faucib tota Egesta Ullamco",
    date: "September 10, 2024",
    description:
      "Adipisicin Labore Tincidu Ullamcorp Dolore mihi Libero Ametdosedtem",
    imageUrl: kelly.src,
  },
  {
    title: "Pellentesq Placea Laborum Adipisici Fuisse tota FaucibPariatu",
    date: "October 15, 2024",
    description:
      "Pellentesq Fuisse Eiusmod FermentumAliqua vita Placea Sedtemporeiu",
    imageUrl: devAsangbam.src,
  },
];

export const informationBoxes = [
  {
    header: "24/7",
    subHeader: "Resource Availability",
    content: "On-demand access to provider content",
  },
  {
    header: "17",
    subHeader: "Provider Services",
    content: "From counseling to retreats, products to consulting",
  },
  {
    header: "Nationwide",
    subHeader: "Geographic Reach",
    content: "Connecting providers with clients across the country",
  },
  {
    header: "5K+",
    subHeader: "Media Views",
    content: "Growing audience on Podcast & YouTube",
  },
];

export const aboutInformationBoxes = [
  {
    header: "+4000",
    content: "Verified Therapists",
  },
  {
    header: "+10,000",
    content: "Successful Appointments",
  },
  {
    header: "+35",
    content: "Countries Served",
  },
  {
    header: "98%",
    content: "Satisfaction Rate",
  },
];

export const offersHub = [
  {
    title: "Freedom to Run Your Practice, Your Way",
    icon: CalendarEditIcon,
    question: "Set Your Own Rates and Schedule:",
    answer:
      "You’re the boss. Not our contractor. Not our employee. Not a number to a big tech company. Decide your services and fees, set your hours, and create a practice that is uniquely yours.",
    question2: "Your Voice Matters Here:",
    answer2:
      "As part of our Partners Hub (coming soon!) you’ll help shape the future of TeleWellness Hub. Share your insights and help guide the future of TeleWellness Hub to better serve you and your clients.",
  },
  {
    title: "Flexibility to Offer What You Love",
    icon: HexagonUserIcon,
    question: "Customize Your Services and Focus Areas:",
    answer:
      "Whether you’re a mental health provider, coach, medical provider, or one of our other four provider types, TeleWellness Hub lets you showcase your strengths and passions. Design a profile that’s as unique as you are.",
    question2: "Choose How You Want to Serve:",
    answer2:
      "From one-on-one sessions to group workshops, courses, and digital products, you decide how you want to make an impact. TeleWellness Hub gives you the freedom to share what you love, on your terms.",
  },
  {
    title: "Get Discovered EveryWhere",
    icon: EyeIcon,
    question: "Multi-Channel Visibility Beyond a Directory:",
    answer:
      "Reach clients across multiple channels. From our YouTube channel and podcasts on 18 platforms to social media and your links to your products, you’ll connect with clients where they’re already looking for wellness content. This is visibility on a whole new level!",
  },
  {
    title: "Build a Practice with Passive Income",
    icon: FileBookIcon,
    question: "Earn While You Sleep (Yes, Really):",
    answer:
      "Sell digital products like e-books, journals, and courses directly from the “Resources” section of your profile. Let your content work for you—even when you’re off the clock – on our credible professional platform.",
    question2: "Host Events and Workshops:",
    answer2:
      "Go beyond one-on-one sessions! Offer retreats, speaking engagements, or workshops. With TeleWellness Hub, your opportunities to earn and engage are endless.",
  },
  {
    title: "Make Connecting with Clients Easy",
    icon: ChatBubbleIcon,
    question: "Instant Booking and Messaging:",
    answer:
      "Clients can book sessions and message you directly through your profile—no hoops to jump through. It’s never been simpler to connect.",
    question2: "Free Access for Clients, No Registration Required:",
    answer2:
      "Your profile, resources, and content are open to clients without any hassle, registration, or upfront fees. More eyes on your profile, more opportunities for engagement!",
  },
  {
    title: "Connect Beyond Borders",
    icon: NetworkIcon,
    question: "Reach Clients Across State Lines (where licensing allows):",
    answer:
      "eleWellness Hub isn’t just local—it’s wherever you are licensed. Grow your practice and connect with clients beyond your immediate area.",
  },
];

export const mounthlyPlans = [
  {
    key: "mounthlyStarterPlan",
    title: "Starter Plan",
    icon: StarterPlanIcon,
    price: "$29/mth",
    description: "Monthly (Free 14-Day Trial!)",
    features: [
      {
        label: "Profile in Provider Directory",
        tooltip: "Customizable profile in our provider directory hub.",
      },
      {
        label: "Digital Product Sales",
        tooltip: "Boost revenue- sell directly from your profile.",
      },
      {
        label: "Appointment Scheduling Link",
        tooltip: "Instant booking, seamless scheduling link button.",
      },
      {
        label: "Customizeable Profile with Media Content",
        tooltip:
          "Unlimited freedom to link ALL of your media resources URLs (videos, podcasts, website, blogs)",
      },
      {
        label: "Social Media Integration",
        tooltip:
          "Freedom to link your LinkedIn, Instagram,Facebook, and YouTube handles directly on your profile.",
      },
      {
        label: "Provider Resource Hub Access",
        tooltip:
          "Gain access to a growing comprehensive library of tools, organizations, and guides designed to support your work directly from your provider dashboard.",
      },
      {
        label: "Instant communication with potential clients",
        tooltip:
          "Connect with potential clients in real-time through our seamless communication options- Clients can message, email, call, and even follow. Respond to inquiries quickly, build trust, and turn leads into loyal clients with ease.",
      },
      {
        label: "State-to-Nation Coverage",
        tooltip:
          "Expand your reach- list statewide, multiple states,or nationwide coverage.",
      },
      {
        label: "Profile share feature",
        tooltip:
          "Easily share your professional profile with potential clients and collaborators through a unique, customizable link. Simplify networking and expand your reach with just one click.",
      },
      {
        label: "Personalized Shareable Profile Link",
        tooltip:
          "Your personalized, easy-to-remember link works like a mini-website—perfect for showcasing your services and effortlessly sharing with clients.",
      },
    ],
  },
  {
    key: "mounthlyPremiumPlan",
    title: "Premium Plan",
    icon: PremiumPlanIcon,
    price: "$59/mth",
    description: "Monthly (Free 14-Day Trial!)",
    features: [
      {
        label: "Profile in Provider Directory",
        tooltip: "Customizable profile in our provider directory hub.",
      },
      {
        label: "Digital Product Sales",
        tooltip: "Boost revenue- sell directly from your profile.",
      },
      {
        label: "Appointment Scheduling Link",
        tooltip: "Instant booking, seamless scheduling link button.",
      },
      {
        label: "Customizeable Profile with Media Content",
        tooltip:
          "Unlimited freedom to link ALL of your media resources URLs (videos, podcasts, website, blogs)",
      },
      {
        label: "Social Media Integration",
        tooltip:
          "Freedom to link your LinkedIn, Instagram,Facebook, and YouTube handles directly on your profile.",
      },
      {
        label: "Provider Resource Hub Access",
        tooltip:
          "Gain access to a growing comprehensive library of tools, organizations, and guides designed to support your work directly from your provider dashboard.",
      },
      {
        label: "Instant communication with potential clients",
        tooltip:
          "Connect with potential clients in real-time through our seamless communication options- Clients can message, email, call, and even follow. Respond to inquiries quickly, build trust, and turn leads into loyal clients with ease.",
      },
      {
        label: "State-to-Nation Coverage",
        tooltip:
          "Expand your reach- list statewide, multiple states,or nationwide coverage.",
      },
      {
        label: "Profile share feature",
        tooltip:
          "Easily share your professional profile with potential clients and collaborators through a unique, customizable link. Simplify networking and expand your reach with just one click.",
      },
      {
        label: "Personalized Shareable Profile Link",
        tooltip:
          "Your personalized, easy-to-remember link works like a mini-website—perfect for showcasing your services and effortlessly sharing with clients.",
      },
      {
        label: "Custom SEO Backlinking",
        tooltip:
          "Boost your online visibility with expert custom SEO backlinking, driving more traffic to your profile.",
      },
      {
        label: "Email Campaign Inclusion",
        tooltip:
          "Get featured in targeted email campaigns, reaching a wider audience and promoting your services directly to potential clients in a personalized, impactful way.",
      },
      {
        label: "Dedicated Podcast Episode",
        tooltip:
          "Showcase your expertise with a personalized podcast episode, published across 18 major podcast platforms to reach a wider audience and menhance your credibility and visibility.",
      },
      {
        label: "YouTube Podcast Episode",
        tooltip:
          "Have your podcast episode professionally published on YouTube, expanding your reach andvisibility to a global audience.",
      },
      {
        label: "Homepage & Premium Spotlight",
        tooltip:
          "Get featured on our homepage and partner section, increasing your visibility and credibility to abroader audience.",
      },
      {
        label: "Priority Directory Placement",
        tooltip:
          "Stand out with priority placement in directory searches, ensuring your profile gets noticed first by potential clients.",
      },
      {
        label: "Blog Article Submission",
        tooltip:
          "Submit your articles or interviews for publication and feature them on our blog, increasing your exposure and engagement with our community.",
      },
      {
        label: "Featured Provider Status",
        tooltip:
          "Gain exclusive Featured Provider status with a verified checkmark, boosting your credibility and making your profile stand out to potential clients.",
      },
    ],
  },
];

export const annualPlans = [
  {
    key: "annualStarterPlan",
    title: "Starter Plan",
    icon: StarterPlanIcon,
    price: "$338/yr",
    description: "Monthly (Free 14-Day Trial!)",
    features: [
      {
        label: "Profile in Provider Directory",
        tooltip: "Customizable profile in our provider directory hub.",
      },
      {
        label: "Digital Product Sales",
        tooltip: "Boost revenue- sell directly from your profile.",
      },
      {
        label: "Appointment Scheduling Link",
        tooltip: "Instant booking, seamless scheduling link button.",
      },
      {
        label: "Customizeable Profile with Media Content",
        tooltip:
          "Unlimited freedom to link ALL of your media resources URLs (videos, podcasts, website, blogs)",
      },
      {
        label: "Social Media Integration",
        tooltip:
          "Freedom to link your LinkedIn, Instagram,Facebook, and YouTube handles directly on your profile.",
      },
      {
        label: "Provider Resource Hub Access",
        tooltip:
          "Gain access to a growing comprehensive library of tools, organizations, and guides designed to support your work directly from your provider dashboard.",
      },
      {
        label: "Instant communication with potential clients",
        tooltip:
          "Connect with potential clients in real-time through our seamless communication options- Clients can message, email, call, and even follow. Respond to inquiries quickly, build trust, and turn leads into loyal clients with ease.",
      },
      {
        label: "State-to-Nation Coverage",
        tooltip:
          "Expand your reach- list statewide, multiple states,or nationwide coverage.",
      },
      {
        label: "Profile share feature",
        tooltip:
          "Easily share your professional profile with potential clients and collaborators through a unique, customizable link. Simplify networking and expand your reach with just one click.",
      },
      {
        label: "Personalized Shareable Profile Link",
        tooltip:
          "Your personalized, easy-to-remember link works like a mini-website—perfect for showcasing your services and effortlessly sharing with clients.",
      },
    ],
  },
  {
    key: "annualPremiumPlan",
    title: "Premium Plan",
    icon: PremiumPlanIcon,
    price: "$690/yr",
    description: "Monthly (Free 14-Day Trial!)",
    features: [
      {
        label: "Profile in Provider Directory",
        tooltip: "Customizable profile in our provider directory hub.",
      },
      {
        label: "Digital Product Sales",
        tooltip: "Boost revenue- sell directly from your profile.",
      },
      {
        label: "Appointment Scheduling Link",
        tooltip: "Instant booking, seamless scheduling link button.",
      },
      {
        label: "Customizeable Profile with Media Content",
        tooltip:
          "Unlimited freedom to link ALL of your media resources URLs (videos, podcasts, website, blogs)",
      },
      {
        label: "Social Media Integration",
        tooltip:
          "Freedom to link your LinkedIn, Instagram,Facebook, and YouTube handles directly on your profile.",
      },
      {
        label: "Provider Resource Hub Access",
        tooltip:
          "Gain access to a growing comprehensive library of tools, organizations, and guides designed to support your work directly from your provider dashboard.",
      },
      {
        label: "Instant communication with potential clients",
        tooltip:
          "Connect with potential clients in real-time through our seamless communication options- Clients can message, email, call, and even follow. Respond to inquiries quickly, build trust, and turn leads into loyal clients with ease.",
      },
      {
        label: "State-to-Nation Coverage",
        tooltip:
          "Expand your reach- list statewide, multiple states,or nationwide coverage.",
      },
      {
        label: "Profile share feature",
        tooltip:
          "Easily share your professional profile with potential clients and collaborators through a unique, customizable link. Simplify networking and expand your reach with just one click.",
      },
      {
        label: "Personalized Shareable Profile Link",
        tooltip:
          "Your personalized, easy-to-remember link works like a mini-website—perfect for showcasing your services and effortlessly sharing with clients.",
      },
      {
        label: "Custom SEO Backlinking",
        tooltip:
          "Boost your online visibility with expert custom SEO backlinking, driving more traffic to your profile.",
      },
      {
        label: "Email Campaign Inclusion",
        tooltip:
          "Get featured in targeted email campaigns, reaching a wider audience and promoting your services directly to potential clients in a personalized, impactful way.",
      },
      {
        label: "Dedicated Podcast Episode",
        tooltip:
          "Showcase your expertise with a personalized podcast episode, published across 18 major podcast platforms to reach a wider audience and menhance your credibility and visibility.",
      },
      {
        label: "YouTube Podcast Episode",
        tooltip:
          "Have your podcast episode professionally published on YouTube, expanding your reach andvisibility to a global audience.",
      },
      {
        label: "Homepage & Premium Spotlight",
        tooltip:
          "Get featured on our homepage and partner section, increasing your visibility and credibility to abroader audience.",
      },
      {
        label: "Priority Directory Placement",
        tooltip:
          "Stand out with priority placement in directory searches, ensuring your profile gets noticed first by potential clients.",
      },
      {
        label: "Blog Article Submission",
        tooltip:
          "Submit your articles or interviews for publication and feature them on our blog, increasing your exposure and engagement with our community.",
      },
      {
        label: "Featured Provider Status",
        tooltip:
          "Gain exclusive Featured Provider status with a verified checkmark, boosting your credibility and making your profile stand out to potential clients.",
      },
    ],
  },
];

export const clientFeatures = [
  {
    title: "Free to Listen",
    description: "No subscriptions, no fees. Just click, listen, and learn.",
  },
  {
    title: "Find Your Perfect Match",
    description:
      "Learn about providers’ specialties and discover services that meet your needs.",
  },
  {
    title: "On-Demand Wellness",
    description:
      "Dive into topics you care about – on your schedule to fit your needs – from stress management to holistic health.",
  },
];

export const aboutValuesStatement = [
  {
    title: "Accessibility",
    description:
      "We believe that everyone should have easy, free access to mental and physical health resources, providers, and support, regardless of location or socioeconomic status.",
  },
  {
    title: "Empowerment",
    description:
      "We support both clients and providers, empowering clients to find their ideal care and providers to expand their reach and income.",
  },
  {
    title: "Inclusivity",
    description:
      "We are committed to serving diverse communities and ensuring that resources are culturally and contextually appropriate, bridging language and accessibility gaps.",
  },
  {
    title: "Integrity",
    description:
      "We uphold trust and transparency, ensuring that our platform and content are designed with the utmost respect for providers' autonomy and clients' needs.",
  },
  {
    title: "Innovation",
    description:
      "We leverage technology to offer multi-channel access to providers and their services, expanding beyond traditional one-to-one appointments and into real-time access to media, products, and more.",
  },
  {
    title: "Collaboration",
    description:
      "We foster strong partnerships and connections within the wellnes community to create an ecosystem where everyone—clients and providers alike—thrives.",
  },
];

export const providersFeatures = [
  {
    title: "Spotlight Your Expertise",
    description:
      "Share your story, approach, and offerings with a wide audience.",
  },
  {
    title: "Increase Your Online Presence",
    description:
      "Each episode is promoted across platforms, bringing more eyes to your work.",
  },
  {
    title: "Valuable Backlinks",
    description:
      "Boost your SEO with a professional backlink from our website to yours.",
  },
  {
    title: "Extend Your Reach",
    description:
      "Be heard on 18 platforms, with an featured episode that potential clients can always revisit, giving you the exposure you deserve.",
  },
];

export const topbarLinks = [
  { key: "about", path: "/about", label: "About" },
  {
    key: "findCare",
    label: "Find Care",
    subMenuLinks: [
      {
        key: "findBySpeciality",
        path: `${directoryUrl}`,
        icon: BookClosedIcon,
        label: "Find by Speciality",
        description: "The latest industry news, updates and info.",
      },
      {
        key: "findByState",
        path: `${directoryUrl}`,
        icon: StarsIcon,
        label: "Find by State",
        description: "Learn how our customers are making big changes.",
      },
      {
        key: "findByTherapist",
        path: `${directoryUrl}`,
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
        path: "/blog",
        icon: BookClosedIcon,
        label: "Our Blogs",
        description: "The latest industry news, updates and info.",
      },
      {
        key: "podcasts",
        path: "/podcast",
        icon: StarsIcon,
        label: "Podcasts",
        description: "Learn how our customers are making big changes.",
      },
    ],
  },
  { key: "forPartners", path: "/for-partners", label: "For Partners" },
  {
    key: "forProvider",
    label: "For Providers",
    subMenuLinks: [
      {
        key: "providerBenefits",
        path: "/provider-benefits",
        icon: BookClosedIcon,
        label: "Provider Benefits",
        description: "The latest industry news, updates and info.",
      },
      {
        key: "payWhatYouCan",
        path: "/provider-benefits#pay-what-you-can",
        icon: StarsIcon,
        label: "Pay What You Can",
        description: "Learn how our customers are making big changes.",
      },
      {
        key: "marketHub",
        path: "/",
        icon: PlayIcon,
        label: "Market Hub",
        description: "Get up and running on new features and techniques.",
      },
    ],
  },
];

export const topbarMobileLinks = [
  { key: "home", path: "/", label: "Home" },
  { key: "about", path: "/about", label: "About" },
  {
    key: "findCare",
    label: "Find Care",
    subMenuLinks: [
      {
        key: "findBySpeciality",
        path: `${directoryUrl}`,
        label: "Find by Speciality",
      },
      {
        key: "findByState",
        path: `${directoryUrl}`,
        label: "Find by State",
      },
      {
        key: "findByTherapist",
        path: `${directoryUrl}`,
        label: "Find by Therapist",
      },
    ],
  },
  {
    key: "resources",
    label: "Resources",
    subMenuLinks: [
      {
        key: "ourBlogs",
        path: "/blog",
        label: "Our Blogs",
      },
      {
        key: "podcasts",
        path: "/podcast",
        label: "Podcasts",
      },
    ],
  },
  { key: "forPartners", path: "/for-partners", label: "For Partners" },
  {
    key: "forProvider",
    label: "For Providers",
    subMenuLinks: [
      {
        key: "providerBenefits",
        path: "/provider-benefits",
        label: "Provider Benefits",
      },
      {
        key: "payWhatYouCan",
        path: "/provider-benefits#pay-what-you-can",
        label: "Pay What You Can",
      },
      {
        key: "marketHub",
        path: "/",
        label: "Market Hub",
      },
    ],
  },
];

export const blogItems = [
  {
    id: 1,
    category: "Design",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations your colleagues and impress your managers?",
    bannerImage: peopleMedical.src,
    peopleImage: peopleMedical.src,
    fullName: "Olivia Rhye",
    date: "20 Jan 2024",
  },
  {
    id: 2,
    category: "Product",
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking.",
    bannerImage: peopleMedical.src,
    peopleImage: peopleMedical.src,
    fullName: "Phoenix Baker",
    date: "19 Jan 2024",
  },
  {
    id: 3,
    category: "Software Engineering",
    title: "Building your API stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    bannerImage: peopleMedical.src,
    peopleImage: peopleMedical.src,
    fullName: "Lana Steiner",
    date: "18 Jan 2024",
  },
  {
    id: 4,
    category: "Design",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations your colleagues and impress your managers?",
    bannerImage: peopleMedical.src,
    peopleImage: peopleMedical.src,
    fullName: "Olivia Rhye",
    date: "20 Jan 2024",
  },
  {
    id: 5,
    category: "Product",
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking.",
    bannerImage: peopleMedical.src,
    peopleImage: peopleMedical.src,
    fullName: "Phoenix Baker",
    date: "19 Jan 2024",
  },
  {
    id: 6,
    category: "Software Engineering",
    title: "Building your API stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    bannerImage: peopleMedical.src,
    peopleImage: peopleMedical.src,
    fullName: "Lana Steiner",
    date: "18 Jan 2024",
  },
];

export const providerPanelMenu = [
  {
    key: "dashboard",
    path: "/provider-panel/dashboard",
    label: "Dashboard",
    icon: providerPanelDashboard.src as string,
  },
  {
    key: "profile_management",
    path: "/provider-panel/profile-management",
    label: "Profile Management",
    icon: providerPanelProfileManagement.src as string,
  },
  {
    key: "appointments",
    path: "/provider-panel/appointments",
    label: "Appointments",
    icon: providerPanelAppointments.src as string,
  },
  {
    key: "notifications",
    path: "/provider-panel/notifications",
    label: "Notifications",
    icon: providerPanelNotifications.src as string,
  },
  {
    key: "analytics",
    path: "/provider-panel/analytics",
    label: "Analytics",
    icon: providerPanelAnalytics.src as string,
  },
  // {
  //   key: "Subscroptions & Billing",
  //   path: "/provider-panel/subscriptions-and-billing",
  //   label: "Subscriptions & Billing",
  //   icon: providerBilling.src as string,
  // },
  {
    key: "subscription",
    path: "/",
    label: "Subscription:",
    icon: providerBilling.src as string,
  },
  {
    key: "View profile",
    path: "/provider-details/:providerId",
    label: "View profile",
    icon: providerPanelProfileManagement.src as string,
  },
  {
    key: "Switch to Homepage",
    path: "/",
    label: "Switch to Homepage",
    icon: providerPanelHomePage.src as string,
  },
  {
    key: "Log Out",
    label: "Log Out",
    icon: providerLogout.src as string,
    isLogout: true,
  },
];

export const adminPanelMenu = [
  {
    key: "dashboard",
    path: "/dashboard",
    label: "Dashboard",
    icon: providerPanelDashboard.src as string,
  },
  {
    key: "blog",
    path: "",
    label: "Blog",
    icon: providerPanelDashboard.src as string,
    subMenu: [
      {
        key: "createBlog",
        path: "/blog/create-blog",
        label: "Create",
        icon: providerPanelDashboard.src as string,
      },
      {
        key: "blogList",
        path: "/blog/blog-list",
        label: "Blog List",
        icon: providerPanelDashboard.src as string,
      },
    ],
  },
  {
    key: "client_list",
    path: "/client-list",
    label: "Client List",
    icon: providerPanelDashboard.src as string,
  },
  {
    key: "provider_list",
    path: "/provider-list",
    label: "Provider List",
    icon: providerPanelDashboard.src as string,
  },
  {
    key: "specializations",
    path: "/specializations",
    label: "Specializations",
    icon: providerPanelDashboard.src as string,
  },
  {
    key: "insurances",
    path: "/insurances",
    label: "Insurances",
    icon: providerPanelDashboard.src as string,
  },
  // {
  //   key: "profile_management",
  //   path: "/provider-panel/profile-management",
  //   label: "Profile Management",
  //   icon: providerPanelProfileManagement.src as string,
  // },
  // {
  //   key: "appointments",
  //   path: "/provider-panel/appointments",
  //   label: "Appointments",
  //   icon: providerPanelAppointments.src as string,
  // },
  // {
  //   key: "notifications",
  //   path: "/provider-panel/notifications",
  //   label: "Notifications",
  //   icon: providerPanelNotifications.src as string,
  // },
  // {
  //   key: "analytics",
  //   path: "/provider-panel/analytics",
  //   label: "Analytics",
  //   icon: providerPanelAnalytics.src as string,
  // },
  // {
  //   key: "Subscroptions & Billing",
  //   path: "/provider-panel/subscriptions-and-billing",
  //   label: "Subscriptions & Billing",
  //   icon: providerBilling.src as string,
  // },
  // {
  //   key: "subscription",
  //   path: "/",
  //   label: "Subscription:",
  //   icon: providerBilling.src as string,
  // },
  // {
  //   key: "View profile",
  //   path: "/provider-details/:providerId",
  //   label: "View profile",
  //   icon: providerPanelProfileManagement.src as string,
  // },
  {
    key: "Switch to Homepage",
    path: "/",
    label: "Switch to Homepage",
    icon: providerPanelHomePage.src as string,
  },
  {
    key: "Log Out",
    label: "Log Out",
    icon: providerLogout.src as string,
    isLogout: true,
  },
];

export const clientPanelMenu = [
  // {
  //   key: "dashboard",
  //   path: "/client-panel/dashboard",
  //   label: "Dashboard",
  //   icon: providerPanelDashboard.src as string,
  // },
  {
    key: "profile_management",
    path: "/client-panel/profile-management",
    label: "Profile Management",
    icon: providerPanelProfileManagement.src as string,
  },
  // {
  //   key: "appointments",
  //   path: "/client-panel/appointments",
  //   label: "Appointments",
  //   icon: providerPanelAppointments.src as string,
  // },
  // {
  //   key: "notifications",
  //   path: "/client-panel/notifications",
  //   label: "Notifications",
  //   icon: providerPanelNotifications.src as string,
  // },
  // {
  //   key: "analytics",
  //   path: "/client-panel/analytics",
  //   label: "Analytics",
  //   icon: providerPanelAnalytics.src as string,
  // },
  // {
  //   key: "Subscroptions & Billing",
  //   path: "/client-panel/subscriptions-and-billing",
  //   label: "Subscriptions & Billing",
  //   icon: providerPanelBilling.src as string,
  // },
  {
    key: "Switch to Homepage",
    path: "/",
    label: "Switch to Homepage",
    icon: providerPanelHomePage.src as string,
  },
  {
    key: "Log Out",
    label: "Log Out",
    icon: providerLogout.src as string,
    isLogout: true,
  },
];

export const blogItems2 = [
  {
    id: 1,
    category: "Design",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations your colleagues and impress your managers?",
    bannerImage: peopleMedical.src,
    peopleImage: peopleMedical.src,
    fullName: "Olivia Rhye",
    date: "20 Jan 2024",
  },
  {
    id: 2,
    category: "Product",
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking.",
    bannerImage: peopleMedical.src,
    peopleImage: peopleMedical.src,
    fullName: "Phoenix Baker",
    date: "19 Jan 2024",
  },
  {
    id: 3,
    category: "Software Engineering",
    title: "Building your API stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    bannerImage: peopleMedical.src,
    peopleImage: peopleMedical.src,
    fullName: "Lana Steiner",
    date: "18 Jan 2024",
  },
];

export const hoursOption = [
  { value: "12:00 AM", label: "12:00 AM" },
  { value: "12:30 AM", label: "12:30 AM" },
  { value: "1:00 AM", label: "1:00 AM" },
  { value: "1:30 AM", label: "1:30 AM" },
  { value: "2:00 AM", label: "2:00 AM" },
  { value: "2:30 AM", label: "2:30 AM" },
  { value: "3:00 AM", label: "3:00 AM" },
  { value: "3:30 AM", label: "3:30 AM" },
  { value: "4:00 AM", label: "4:00 AM" },
  { value: "4:30 AM", label: "4:30 AM" },
  { value: "5:00 AM", label: "5:00 AM" },
  { value: "5:30 AM", label: "5:30 AM" },
  { value: "6:00 AM", label: "6:00 AM" },
  { value: "6:30 AM", label: "6:30 AM" },
  { value: "7:00 AM", label: "7:00 AM" },
  { value: "7:30 AM", label: "7:30 AM" },
  { value: "8:00 AM", label: "8:00 AM" },
  { value: "8:30 AM", label: "8:30 AM" },
  { value: "9:00 AM", label: "9:00 AM" },
  { value: "9:30 AM", label: "9:30 AM" },
  { value: "10:00 AM", label: "10:00 AM" },
  { value: "10:30 AM", label: "10:30 AM" },
  { value: "11:00 AM", label: "11:00 AM" },
  { value: "11:30 AM", label: "11:30 AM" },
  { value: "12:00 PM", label: "12:00 PM" },
  { value: "12:30 PM", label: "12:30 PM" },
  { value: "1:00 PM", label: "1:00 PM" },
  { value: "1:30 PM", label: "1:30 PM" },
  { value: "2:00 PM", label: "2:00 PM" },
  { value: "2:30 PM", label: "2:30 PM" },
  { value: "3:00 PM", label: "3:00 PM" },
  { value: "3:30 PM", label: "3:30 PM" },
  { value: "4:00 PM", label: "4:00 PM" },
  { value: "4:30 PM", label: "4:30 PM" },
  { value: "5:00 PM", label: "5:00 PM" },
  { value: "5:30 PM", label: "5:30 PM" },
  { value: "6:00 PM", label: "6:00 PM" },
  { value: "6:30 PM", label: "6:30 PM" },
  { value: "7:00 PM", label: "7:00 PM" },
  { value: "7:30 PM", label: "7:30 PM" },
  { value: "8:00 PM", label: "8:00 PM" },
  { value: "8:30 PM", label: "8:30 PM" },
  { value: "9:00 PM", label: "9:00 PM" },
  { value: "9:30 PM", label: "9:30 PM" },
  { value: "10:00 PM", label: "10:00 PM" },
  { value: "10:30 PM", label: "10:30 PM" },
  { value: "11:00 PM", label: "11:00 PM" },
  { value: "11:30 PM", label: "11:30 PM" },
];

export const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

export const keyBenefitsOfPartnering = [
  {
    header: "Enhanced Visibility",
    text: "Reach thousands of licensed providers actively seeking solutions to grow and streamline their practices.",
    icon: AnalyticsIcon,
  },
  {
    header: "Targeted Outreach",
    text: "Connect directly with decision-makers in the mental health and wellness space through our curated digital channels.",
    icon: HtmlTagIcon,
  },
  {
    header: "Collaborative Growth",
    text: "Co-create initiatives, events, and digital campaigns that drive real change in mental health support.",
    icon: NetworkStatsIcon,
  },
  {
    header: "Credibility & Trust",
    text: "Align your brand with a trusted platform built by mental health professionals and a passionate community.",
    icon: GuardCheckIcon,
  },
];

export const howItWorksForPartners = [
  {
    header: "Reach Out & Connect",
    text: "Fill out our brief partnership form or contact our team directly to express your interest.",
    icon: PhoneCheckIcon,
  },
  {
    header: "Discovery & Alignment",
    text: "We’ll schedule a conversation to explore how your offerings align with our provider needs.",
    icon: WindowPlusIcon,
  },
  {
    header: "Onboarding & Integration",
    text: "Work with our technical and marketing teams to integrate your solution into our ecosystem seamlessly.",
    icon: TagFileIcon,
  },
  {
    header: "Grow & Succeed Together",
    text: "Launch your services on TeleWellness Hub and enjoy ongoing support, promotion, and collaboration opportunities.",
    icon: LineStatsIcon,
  },
];

export const partnersInImpact = [
  {
    name: "Dr. Sarah M.",
    branch: "JCEO of MindCare Solutions",
    description:
      "Partnering with TeleWellness Hub has allowed us to reach a highly engaged audience of wellness professionals. Our collaborative campaigns have driven significant growth in both our platform’s adoption and our brand’s credibility.",
    imageUrl: peopleMedical.src,
  },
  {
    name: "Sarah Thompson",
    branch: "Founder of Serenity Health",
    description:
      "Partnering with TeleWellness Hub has been a game-changer for us. Their platform helped us connect with a community of dedicated mental health professionals, and our joint initiatives have strengthened both our impact and our market presence.",
    imageUrl: peopleMedical.src,
  },
  {
    name: "John Davis",
    branch: "CEO of MindCare Solutions",
    description:
      "Our partnership with TeleWellness Hub has been invaluable. Through their curated digital campaigns, we’ve seen remarkable growth in our client base and enhanced our brand’s credibility among top-tier wellness providers.",
    imageUrl: peopleMedical.src,
  },
  {
    name: "Emily Johnson",
    branch: "Founder of Serenity Health",
    description:
      "Our partnership with TeleWellness Hub has been invaluable. Through their curated digital campaigns, we’ve seen remarkable growth in our client base and enhanced our brand’s credibility among top-tier wellness providers.",
    imageUrl: peopleMedical.src,
  },
];

export const aboutMeetOurTeam = [
  {
    name: "Lindsay Pfeiffer",
    professionalTitle: "Creative Director, Strategy & Design Lead",
    shortBio:
      "Lindsay brings a thoughtful, purpose-driven approach to branding and digital strategy at TeleWellness Hub.",
    description:
      "Lindsay plays a key role in shaping the platform’s identity and guiding its growth. With a background in design, brand development, creative marketing, web presence, and business operations, she brings a thoughtful, purpose-driven lens to every project. As the founder of Bay Laurel Solutions, a design and strategy studio, she helps small businesses and nonprofits grow online through clear branding, user-friendly web design, and accessible digital strategy. Inspired by a desire to break down tech barriers for mission-driven entrepreneurs, Lindsay brings that same spirit of empowerment to her work with TeleWellness Hub. Grounded in empathy and strategic insight, her focus is on supporting sustainable, mission-aligned growth—helping the platform stay accessible and visually cohesive as it scales.",
    imageUrl: pp1.src,
    instagramUrl: "https://www.instagram.com/baylaurelsolutions",
    linkedinUrl: "https://www.linkedin.com/in/lindsay-dawn-pfeiffer",
    websiteUrl: "https://baylaurelsolutions.com",
  },
  {
    name: "Marta Gomez Hamilton",
    professionalTitle: "Founder, Executive Director",
    shortBio:
      "Marta founded TeleWellness Hub to make mental wellness more compassionate, accessible, and human-centered.",
    description:
      "Marta founded TeleWellness Hub with a deep belief in the power of connection and compassion. With over a decade of experience as a licensed mental health professional and entrepreneur, she understands the unique challenges of owning and managing a practice, as well as the struggles faced by solopreneurs in the mental health field. Having been a therapy client herself, Marta knows firsthand how hard it can be to navigate the system—even as a provider. Inspired by her dual perspective and driven to break down barriers in the mental health and wellness space, she created TeleWellness Hub.",
    imageUrl: pp2.src,
    instagramUrl: "https://www.instagram.com/telewellness_hub",
    linkedinUrl: "https://www.linkedin.com/company/telewellnesshub",
    youtubeUrl: "https://www.youtube.com/channel/UCbU2J7FvLiY57dxlOx7Cmlg",
    buzzsproutUrl: "https://telewellnesshub.buzzsprout.com/share",
  },
];

export const termsConditionsData: TermsSection[] = [
  {
    id: "terms-conditions",
    title: "Terms and conditions",
    href: "#terms-conditions",
    content: [
      {
        question: "Intellectual Property Rights",
        answer:
          "This Directory contains original information belonging to Company, as well as wellness professionals and experts who have created profiles within Directory. This collection of work is considered intellectual property created and owned by either Company or the wellness professional, and is protected under Federal Intellectual Property Laws, which prevents unauthorized use of our materials. These materials may include, but are not limited to: trademarked and copyrighted material, as well as any and all original works on our Directory and within the content provided, including but not limited to website design, layout, photographs, graphics, words, content, information, documents, data, our logo, artwork, color scheme, branding and/or placement of same on Directory, to the extent protectable, and any and all other information accessible through this Directory, which constitutes proprietary information. This protection also includes any and all content that appears on the Directory, including blog posts, wellness information, and all other text whether or not authored by us. All proprietary information and content hereinafter identified as (“Content”). Your ability to view Content on our Directory grants you a limited, revocable, non-transferrable license to use the information available to you for your personal, non-commercial use only, and limited to educational purposes, and purposes of contacting a wellness expert located within Directory. You understand and acknowledge you will likely be in violation of these Intellectual Property laws should you copy, repost, alter, publish, sell, assist others in selling, manipulate, distribute, or in any way exploit any of the content or intellectual property on the Directory, including that which has been posted by a third party, without our express written consent. You also agree you will not hold any of our Content out to be your own, or use any portion of our Directory, including all Content, information, and purchased materials, in any commercial manner such that you make, may make, or intend to make a profit from it. If such behavior is discovered or suspected, we reserve the right to immediately revoke your access to our Directory, as well as any program or materials you may have purchased, without refund, and reserve the right to prosecute any actionable infringement or misuse to the full extent of the law. Any requests for written permission to use any content posted on our Directory shall be made before you wish to use any such content, and may be made by sending an email with your written request to marta@telewellnesshub.comTestimonials. Directory may feature testimonials from clients, customers, or members to provide visitors with comments, feedback, and information from others’ experiences with our services, Directory and products. While all information, photos, and quotes used are from actual clients, sharing their real, honest opinions of Directory and services, these testimonials are not to be considered as a guarantee that current or future clients will experience the same results, or a guarantee that all clients will have the same experience. You understand and agree that by reading a featured testimonial on our Directory you do not expect the same results, and understand this information is not a guarantee. You also understand and agree that the individuals featured may have different medical history and health status, and what worked for them may not work for you; you agree to use common sense and consult your personal medical provider before beginning any program or signing up to work with a wellness expert located on the Directory.",
      },
      {
        question: "Your Conduct",
        answer:
          "Should you choose to post anything on our Directory, social media pages, webinars, or otherwise, you are hereby agreeing and acknowledging you will not post anything that could harm us or another user, or include anything defamatory, harmful, hurtful, or otherwise upsetting. You understand that if you make the decision to post content that constitutes cyber bulling, your comments will be removed immediately, and we reserve our right to take action against you to the full extent of applicable laws.You may use our Directory for lawful purposes only, and agree you will not post, comment, or otherwise transmit any content which infringes the rights of another, and agree to hold us harmless should you do so. You also agree and understand you are not to post any content or send any messages to wellness experts which would constitute a criminal offense, use the Directory or content for fraudulent or unlawful purposes, create civil liability, is repugnant, constitutes a violation of another’s intellectual property rights, is vulgar or obscene in any way, or is otherwise objectionable. You agree that we are the sole decider in whether content you post is objectionable and have the unilateral right to remove any content you post, without explanation or ramifications. You also understand that we may be obligated to take further legal action, based upon information you post or action you take, and reserve our right to do so. Should a third party choose to take legal action against you, as a result of something you posted on our Directory, you agree to hold us harmless and fully indemnify us of any legal ramifications or actions. ",
      },
      {
        question: "Use of Free Materials or Content",
        answer:
          "At times you may be offered a free download or printable, as a gift or opt-in offer, in exchange for your name and email address. Should you choose to download or print this material, you understand this is to be used for your personal, non-commercial use only, and is not to be copied, edited, distributed, or otherwise shared in any way other than in its original form. Should you choose to share the material, you agree and understand that you will provide us with credit, will not hold the material to be your own, or otherwise attempt to make any sort of gain (financial or otherwise), from our materials.",
      },
      {
        question: "Disclaimer",
        answer:
          "The purpose of this Directory is to provide educational information to those wishing to view it, as well as a place to find wellness experts in various fields and expertise levels, and an opportunity to select one, if desired, based upon what the wellness expert discloses in his/her directory entry. Any Content on this Directory, or Content you receive because of your decision to opt-in to our email list has been created solely for educational and informational purposes, and/or by third party Directory members who do not clear materials with us prior to posting. We cannot and do not guarantee any type of specific results, outcomes, changes, or gains through use of our Directory, nor can we make any guarantees regarding success with any wellness expert selected herein. Any decision to contact, communicate with, or work with a wellness expert found on the Directory is solely yours. We are not to have any involvement, liability, or responsibility with respect to communications between you and a wellness expert. You understand and agree to this and acknowledge that your use of any information contained herein is purely voluntary. You also understand nothing on Directory is intended as medical advice or as a substitute for mental health treatment. Any decision you make to implement or follow information found on Directory, or to purchase a product or service, is purely voluntary and of your own volition. We recommend you consult with your personal physician or other applicable medical professional prior to implementing any content found herein, and/or prior to beginning any program or service we offer; nothing contained on this Directory or within any product or service found herein is intended to take the place of a consultation with any such professional.Directory and the Content produced are not to be relied upon in any way as medical, legal, financial, or business advice, nor are we to be held responsible for anything posted within Directory by a wellness expert. Nothing on this Directory is intended to take the place of professional advice received via a consultation with a doctor, nurse, lawyer, accountant, therapist, financial advisor, business consultant, or other expert regarding the details of yours or a minor’s life. You are encouraged to consult with your own professionals for any questions you may have regarding your particular business or situation regarding legal, business, medical, or financial questions, or any similar professional that may address your own individual situation. Your decision to visit our Directory, use information contained herein, and reach out to one or more wellness experts we have within the Directory is purely voluntary, and you understand we are not responsible or liable for any harm or damage to you or your business resulting from direct or indirect use of materials or content contained in our Directory. You agree to hold TeleWellness Hub LLC harmless from any damages directly or indirectly resulting from your use of Directory, your contact with a wellness expert, or via our Website or distributed through email, and agree you will not make any claims against us or the company herein.",
      },
      {
        question: "Technology Disclaimer",
        answer:
          "By using our Website, you understand and agree that TeleWellness Hub makes no guarantees or warranties regarding the condition of Directory including functionality, existence of viruses or other components that may harm users’ computers, uninterrupted use, constant access and availability, and the like.We will make every effort to make our Directory available to you at all times; however, from time to time the Website may be down for maintenance, repairs, as a result of “crashing” or overuse, or any other reason, known or unknown to you, and you agree and understand that this may occur without explanation. Should this occur, you understand, agree, and acknowledge we are not liable for any damages, losses, interruption in your health and wellness journey, or other inconvenience sustained by you as a direct or indirect result of the unavailability of our Directory. We do not owe you an explanation, refund, or any reimbursement, nor do we have any obligation to you to continue running our Directory, and you agree to simply check our Directory at a later date to confirm when it has been relaunched. We may also make the unilateral decision to change or discontinue all or part of our Directory, remove wellness experts, their Content, or any portion thereof without notice before or after, and such Content may thereafter be unavailable. The Directory and any and all content and products made available are offered on an “as is” basis, with no additional attachment or warranties therein. You understand and agree we are not obligated to you to continue running all or part of our Directory or any content therein, or any particular wellness experts’ contact information, nor shall we be liable for any harm to your business or personal self as a direct or indirect result of a decision to alter, remove, or change Content without notice.",
      },
      {
        question: "Information You Provide ",
        answer:
          "In order to gain access to our email list, you may be required to provide information about yourself, including your name, email address, and other personal information. In order to purchase products or services, you will also be required to submit payment information and a billing address, and may be asked to create a username and password to gain access to your purchased materials. Please note you are responsible for keeping track of your username and password, and understand that you bear the consequences should you choose to share this confidential information with anyone. If you are under 18, please obtain permission from a parent or guardian, and have your parent or guardian enter their personal information on your behalf. Please review our Privacy Policy available HERE (https://telewellnesshub.com/privacy-policy/) for all other information relating to data collection. You acknowledge and understand that any information provided to us is done so on a purely voluntary basis. By choosing to provide us with this information, you agree and represent that any information provided to us through the Directory or a third-party payment processor will be accurate and current, and belong to you. You understand you may not hold yourself out as someone else or use anyone else’s information, and agree to bear the consequences should you use anyone else’s information as your own. You also agree that you are to remain financially responsible for any purchases made by you, or by another person acting on your behalf, regardless of the information provided at checkout. Should information become available at a later date confirming you performed unauthorized use of a credit card or other payment information belonging to someone other than yourself, you understand and agree that you alone remain financially responsible for purchases made through our Website.",
      },
      {
        question: "Online Purchases",
        answer:
          "Limitations of Liability: We will take reasonable precautions and measures to keep this information private. While we will attempt to monitor and resist any third party hacking or third party ability to gain access to confidential information held by us, you agree and understand we are not liable for any unauthorized access to or use of your information or property, regardless of negligence, failures, tort, breach of implied or express contract, or any other causes of action or legal theories of liability, even if such theories could have been foreseeable or preventable, or if we were made aware of such a possibility. Our limitations of liability extend to the fullest possible extent permitted by law, and in no event shall total liability exceed $500 to any one person or collective plaintiffs.",
      },
      {
        question: "Indemnification",
        answer:
          "You agree at all times to defend, fully indemnify and hold TeleWellness LLC and any affiliates, agents, team members or other party associated with us from any causes of action, damages, losses, costs, expenses incurred as a result of your use of our Directory or any products or services contained therein, as well as any third-party claims of any kind (including attorney’s fees) arising from your actions in relation to our Directory or any breach by you of any such conditions outlined herein. Should we be required to defend ourselves in any action directly or indirectly involving you, or an action where we decide your participation or assistance would benefit our defense, you agree to participate and provide any evidence, documents, testimony, or other information deemed useful by us, free of charge. We will attempt to monitor any comments and posts made by third parties and users as often as possible. Should you, as a user of our Directory, see anything objectionable or offensive posted by a third party, you agree to (1) notify us of the material, and (2) agree not to take any action against us based upon the content posted by the third party. You understand we cannot be responsible for material posted by a user without our control, and agree to release us of any and all claims arising therefrom. Should you choose to utilize information offered on our website, whether free or for purchase, you understand that we are not liable to any party, for any damages – whether direct, indirect, consequential, foreseeable, incidental, or otherwise – stemming or perceived to stem from use of or reliance upon any information contained or found on our Directory, or from products or services purchased therefrom from wellness experts. You also understand and agree that we are not liable for any damages incurring as a result of your reliance or use of information on our Directory written by a third party, whether endorsed or not by us, and you agree to release us from any and all claims stemming from, or perceived to stem from, reliance on information contained on our Directory.",
      },
      {
        question: "Limitation of Liability",
        answer:
          "You understand and agree that the information offered via Directory is general information about various experts and practitioners that may not be suitable for all persons, businesses, locations, countries, or persons in specific situations. Your decision to use any information or contact a wellness expert from the Directory is purely voluntary. You agree and understand you will hold us harmless from any direct or indirect, perceived or actual damages or harm to your person or business as a result of choosing to utilize information found on or purchased from our Directory. We are not responsible for any result stemming from your decision to use information provided by us, nor are we responsible for your mental or physical health, income, finances, earnings, business, clientele, client base, or any other result, and you agree we are not liable for any such damages or losses incurring therefrom. You understand and agree that we are not to be held liable for any type of direct or indirect damages arising out of your use of our Directory, any information contained herein, any injuries sustained or medical ailments that arose as a direct or indirect cause of implementing information found on Directory, or any products or services purchased therefrom, including but not limited to general, specific, incidental, consequential, punitive, or special damages. You also agree that we are not liable or responsible in any way for any loss incurred by you or your business, including revenues, clients, business, goodwill, income, anticipated income, predicted income, sales numbers, loss of a sale, data, nor any computer failure, computer virus obtained by use of our Directory, technical glitch or failure, defect or delay, or any other similar issue. You agree that your decision to use our Directory is wholly at your own risk and voluntarily chosen by you, and any ramifications resulting therefrom are yours alone. You also understand and agree that we make no warranties, express or implied, and hereby renounce any such warranties, guarantees, or representations with respect to any portion of our Directory, the content herein, content distributed through email lists, social media, or via webinars. By using the Directory, you agree and understand that use of content and information found herein is to be used at your own risk, with no guarantees, representations, or warranties regarding fitness for particular purpose, accuracy, or otherwise.",
      },
      {
        question: "Release of Claims",
        answer:
          "You also agree that under no circumstances will we be liable to any party for any type of damages resulting or claiming to result from any use of or reliance on our Website or any information or Content found therein, including any injuries sustained as a direct or indirect result of use of our programs or implementation of any information contained on our Directory, and you hereby release us from any and all claims whether known now or discovered in the future.",
      },
      {
        question: "Termination",
        answer:
          "You agree and understand we have the right to refuse or immediately terminate your access to our Directory at any time, for any reason, with or without notice. Should this occur, we do not owe you an explanation, nor is this decision subject to any appeals or legal action. If you made any purchases and we determine you are entitled to receive or allowed continued use of the purchased information, we will make this information available to you in a way we see fit, which you agree will be satisfactory to you.",
      },
      {
        question: "Dispute Resolution ",
        answer:
          "These Terms and Conditions shall be governed by the laws of the state of Texas. Should any dispute arise, you agree to resolve any claim or controversy arising out of or relating to these Terms and Conditions by Arbitration and/or a suitable Alternative Dispute Resolution in El Paso, Texas regardless of your location, and agree to be bound by the decision(s) of the selected Mediator. You also agree to participate in good faith in the mediation process, with failure to do so creating our right to pursue any other available legal remedies, including but not limited to alternate forms of dispute resolution or litigation. Should an arbitrator determine any portion of these Terms and Conditions is invalid or otherwise unenforceable, you agree all remaining portions of these Terms and Conditions shall remain valid and unaffected by the removal of any portion of these Terms and Conditions. These Terms and Conditions constitute the entire agreement between us with respect to your use of our Website, content, and products, and supersedes any other agreement, with the exception of any separate agreements, including Terms of Use, entered into by virtue of your decision to purchase any products available on our Website. Nothing on our Website nor any communications between us is to be construed as a waiver of any of the above, nor shall we have waived any portion of these Terms and Conditions absent express, written information by us expressly stating otherwise.   Should you have any questions with respect to any of the foregoing, please contact us at marta@telewellnesshub.com",
      },
    ],
  },
  {
    id: "directory-terms-of-use",
    title: "Directory Terms of Use",
    href: "directory-terms-of-use",
    content: [
      {
        question: "Scope of Use ",
        answer:
          "Member may elect to join Directory at one of several tiers (free and paid), depending on the extent of marketing and exposure desired. Member agrees to review the sales pages for TeleWellness Hub prior to purchase, to confirm the tier of Membership he/she/they would like to purchase, as well as corresponding price and exposure offered for the selected tier. Tiers and available services within each tier are subject to change by Company, and Company may make updates or changes to the services at any time, including but not limited to adding tiers, updating pricing, and/or amending specific deliverables available at each membership tier. Member acknowledges that he/she has read this agreement in full, reviewed all information regarding the available Membership levels and pricing, and conducted any additional research necessary to feel he/she understands what is being provided in each tier of the Directory as well as the limitations of each tier. Member agrees to be bound by the terms and conditions outlined herein, as well as the general policies and procedures that can be found in this Agreement and on Company’s website.  To access or use the Directory, Member must agree to these terms, create an account, and provide Company with all necessary credentials and contact information needed in order to create Member’s profile on the Directory. Member agrees he/she/they will not create an account if previously banned or removed from the Directory, nor will Member create an account for any third party or share his/her/their account login credentials with any third party. Member agrees to provide accurate, updated, and complete information, and to keep the account updated as information changes. Member will not create an account to impersonate another, that includes a username or credentials of another individual without proper authorization, or include any profanity or offensive language in a username. Member understands and agrees he/she/they are solely responsible for maintaining the security of the account, and any actions taken in connection with or by Member’s account. If Company terminates Member’s account for any reason, Member may not create another account unless approved to do so in writing by Company. Company must be immediately notified of any unauthorized activity on Member’s account – Company will not be liable for any acts or omissions by Member, including damages of any kind incurred as a result of any such actions or omissions. Company reserves the right to deny access and/or use of Directory to anyone at any time, for any reason, in its sole and absolute discretion. Directory may also be unavailable from time to time, due to routine maintenance updates, unforeseen interruptions to the Directory and/or Member access to same due to circumstances within or outside Company’s control. ",
      },
      {
        question: "Confidentiality",
        answer:
          "Once signed in as a free or paying member of Directory, Member will have gained access to various trade secrets and proprietary information belonging to Company. While there may be some graphics, information, and content designed to be shared by Member to promote Company and/or Directory, Member understands and acknowledges that any confidential content is not to be openly shared with others who have not purchased access to Directory, as a wellness expert or user. Member agrees not to share, copy, or distribute any information from inside Directory to others for their own commercial use, and that all content within Directory is for Member’s use only. Should Member breach this provision and disclose confidential or proprietary information belonging to Company or another participating in the Directory, Member understands additional action may be taken by Company up to and including legal action.  By joining Directory, you as the Member understand the information you choose to share with Directory and Company will be made available to the public, and will be searchable via the online Directory. Member understands he/she/they have no right to privacy with respect to the information they elect to share with Directory for the purpose of allowing users to find and contact them for wellness services.",
      },
      {
        question: "Testimonials ",
        answer:
          "Company may request Member provide a testimonial to be published on Company’s website, or on various sales materials for this or another Program created by Company. Member understands that he or she is not required to give any testimony, and understands that the choice to do so is freely up to Member. There will be no ramifications or change in relationship between Company and Member if Member refuses testimonial. If Member accepts and provides Company with a testimonial, Member understands the material, along with a photo of Member, will likely be published on Company’s website or otherwise. Should Member agree to provide a testimonial, Member will agree to review and sign an additional Release, confirming same, and confirming Company’s rights to use Member’s testimonial. No payment or additional services will be provided in return for Testimonial, and Member understands he or she is granting Company an unlimited, irrevocable license in perpetuity to use, publish, distribute, or repurpose any information provided to Company as part of a Testimonial.",
      },
      {
        question: "Payment and Payment Plans",
        answer:
          "Member understands the cost to be included within the Directory is dependent upon which tier is selected: Member may select the “free” tier, at no cost, or any of the paid tiers to gain access to additional exposure and marketing services within Directory. All tiers and pricing options are available for full review on Company’s website, with prices subject to change at the discretion of Company. Member may join via a “free,” “partner,” or “premium” plan. If Member elects to join via the “Premium” or “Partner” plan, Member will be billed $29 or $99 per month, respectively, and understands his/her/their credit card will be charged on a recurring basis each month in accordance with the Auto-Renewal Terms outlined below in paragraph five (5). Member understands he/she is responsible for the full payment each billing cycle (whether monthly, quarterly, or annually), and agrees to pay the sum requested electronically, via Company’s website or a designated third-party payment processor of Company’s choosing, in full. All fees due and payable under the Terms herein must be paid in full in accordance with the plan selected, and Member’s subscription will automatically renew at the end of each term unless or until properly cancelled by Member as set forth below. Company reserves the right to cancel Member’s access to Directory should he/she fail to make additional payments in accordance with the Auto-Renewal Terms as outlined below. Should this occur, Member understands she is not entitled to a refund of funds already issued to Company for access to Directory. If Member wishes to rejoin Directory, he/she may do so at the current pricing and will lose access to any previous discounts or coupons applied throughout the previous membership. ",
      },
      {
        question: "Auto-Renewal Agreement (for Paid Directory Members Only)",
        answer:
          "Member understands and agrees that continued access to any of the paid tiers within Directory requires recurring payments that will be automatically charged to Member’s card each month, on the same day of the month in which Member initially joined Directory. By purchasing exposure on Directory and agreeing to these Terms of Use, Member understands he/she will be automatically charged each month via the default card Company has on file at the time payment is due. This process will repeat unless and until Member properly cancels his or her membership to Directory. CANCELATION POLICY: If Member wishes to cancel his or her paid membership, Member must do so more than 24 hours before the charge is scheduled to withdraw. Any requests for cancelation made less than 24 hours before the automatic renewal is scheduled to charge Member’s card, or made subsequent to the charge, will take effect the following term.HOW TO CANCEL: In order to cancel a membership, Member may cancel inside the membership portal inside the billing section, or Member must send an e-mail to marta@telewellnesshub.com with the subject line DIRECTORY CANCELATION, including the Member’s name, email address, and confirmation of request to terminate his or her membership. Member will be notified upon Company’s receipt of email, and his or her membership will subsequently be canceled prior to the following billing period, assuming it is more than 24 hours away. As outlined above, if Member cancels his or her membership less than 24 hours before the automatic renewal is scheduled to charge Member’s card, Member acknowledges and agrees he or she will be charged for the next month and the cancellation will take effect the following month. Should this occur, Member will have access to Directory and all paid services for the term in which Member paid, with membership terminating thereafter. If Member wishes to contest a Membership charge on the grounds that he/she canceled the membership within the appropriate time period, Member must have proof of cancelation in order to obtain a refund of any membership charges. If no proof can be shown, Member’s last charge will stand, and his/her membership will terminate as of the following month. If Member purchased access to Directory during a period in which a free month(s), or trial period was granted, Member understands he or she will be automatically charged the full amount following the end of the trial period. Member may not be given any additional notice regarding the end of the trial period if on a monthly subscription basis and understands his/her card will automatically be charged the following month. By checking the box on the purchase page confirming agreement to these Terms, Member also confirms he/she/they are giving their unequivocal, clear, affirmative consent and agreement with these automatic renewal terms, the cancelation policy, and that Member understands how to cancel Directory if desired. ",
      },
      {
        question: "Refund Policy ",
        answer:
          "Company is not able to offer refunds once Member has purchased access to a paid tier of Directory. If Member is dissatisfied with his or her membership, he or she may elect to Cancel via the CANCELATION POLICY outlined above in paragraph five (5), and will not be charged for the subsequent term. Member further agrees and understands that changing his/her mind about the Directory, failing to follow through or understand the details of the Directory, not experiencing the results he/she expected or desired, or experiencing any other similar situations does not entitle Member to a refund.",
      },
      {
        question: "Technology",
        answer:
          "Company is not responsible for any specific technology Member may need in order to adequately view and utilize Directory. Member’s inability to access Directory due to a technology issue or lack of access to Canva or other design programs does not qualify Member for a refund, nor does it alleviate Member of his or her responsibility to make payments, unless or until Member’s membership is properly canceled in accordance with the cancelation policy in paragraph five (5). Company may also link to third party websites throughout Directory. Member understands these third-party sites are not affiliated with nor controlled by Company. Please review any third-party website’s terms and privacy policy prior to continuing to such website. Company is to have no liability or responsibility for Member’s independent decision to click on or utilize a third-party website linked within Directory, or any subsequent purchases made therefrom.",
      },
      {
        question: "Voluntary Participation",
        answer:
          "Member understands and agrees that he/she is voluntarily choosing to purchase exposure and additional services through Directory, and is solely responsible for any outcomes or results. While Company believes in its services and that Directory is able to help many people, Member acknowledges and agrees that Company is not responsible nor liable to Member should Member incur harm or encounter any negative ramifications due directly or indirectly to Directory or the content thereupon. ",
      },
      {
        question: "Disclaimer /No Guarantees",
        answer:
          "Company cannot guarantee results or additional exposure stemming from Directory and cannot make any representations or guarantees regarding individual results. Member will hold Company harmless if he or she does not experience the desired results, including but not limited to increased social media following, increased traffic, increase in client inquiries and/or purchases, and business and revenue growth.  Member understands that all services provided by Company in connection with the Directory are provided on an “as is” basis, meaning it is without any guarantees, representations, or warranties, including but not limited to warranties relating to quality, non-infringement, fitness for a particular purpose, merchantability, or expectation or course of performance. Member is choosing to purchase exposure and marketing via Directory and work with Company on a purely voluntary basis and does not hold Company responsible should Member become dissatisfied with any portion of the Directory, or should Member encounter any negative response or reaction from his/her following, social media accounts directly, or otherwise. Member agrees that he/she does not have a cause of action, legal remedy, and is not entitled to a refund should he/she not achieve the results desired following a certain amount of time on Directory, as long as Company delivers the Directory services as described in the Addendum below.",
      },
      {
        question: "Assumption of the Risk",
        answer:
          "Directory functions as a platform allowing Member to advertise, post information about his/her business, and offer additional ways to be contacted for Directory users to obtain additional information about Members’ offerings and services. As with any online platform, Member understands there is a risk to posting information online, including contact information. Member hereby assumes that risk and has independently concluded that any such risks are outweighed by the benefits of membership and marketing his/her business on Directory. While Company will do everything reasonably possible to prevent any issues, harassment, or bot responses on Directory, Member will not hold Company responsible or liable in any way for any negative experiences stemming from Directory users contacting member or misusing the platform.  ",
      },
      {
        question: "Intellectual Property ",
        answer:
          "Company offers a strategic wellness Directory designed for licensed, experienced, and/or qualified wellness experts and professionals to advertise their services and tell potential clients/patients about their business.  Member agrees nothing in this Agreement shall constitute a transfer of ownership of any Intellectual Property from Company to Member, nor grant any license to use the information, other than that which is expressly provided herein.  Member agrees and understands he/she is not to sell, assist others in selling, distribute, or in any way exploit any of the content or intellectual property provided by Company or obtained through the Directory without Company’s express written consent. If such behavior is discovered or suspected, Company reserves the right to immediately end Member’s participation in the Directory without refund and reserve the right to prosecute any actionable infringement or misuse to the full extent of the law.  License to Company. Member grants Company an irrevocable, worldwide, perpetual, royalty free, assignable, sublicensable, transferable license to use, edit, share, modify, distribute, prepare derivative works of, display, publish, and share any Member Content created and/or posted in connection with Directory. Member understands Member Content, once posted, may not be immediately withdrawn.",
      },
      {
        question: "Member Content and Information",
        answer:
          "Member represents and warrants that any and all content and/or information provided to Company or posted on the Directory (“Member Content”) shall be true, accurate, and complete, shall not be misleading, and will be regularly maintained to ensure it is properly updated. Member will hold Company harmless from any claims made by Director users who learn of Member posting false, outdated, or misleading information about him/herself on Directory with respect to wellness services offered. Company shall have no responsibility or liability for Member Content, including but not limited to the deletion thereof, accuracy, security, privacy, protection thereof, or any other expectations Member may have had regarding Member Content on the Directory. Assignment of all Rights to Company. If Member provides any feedback to Company, Member confirms he/she/they will have any and all intellectual property rights to that feedback, and that such feedback is not violating the rights of any third party. Member hereby fully and completely assigns any and all intellectual property rights to Company in connection with any feedback, suggestions, ideas, or other content Member may provide to Company throughout its membership. While Company has no obligation to use any such feedback, and Company cannot guarantee it will implement suggestions or feedback given, Member confirms any such feedback or suggestion given shall include a permanent and irrevocable assignment to Company of any and all intellectual property rights therein. Content Provided by Company or Others. Directory will include content from Company, other Members, and other third-party collaborators from time to time, including information about products, packages, and services, and ways to contact other members. Member assumes all risks associated with the decision to contact or purchase from another member, including reliance or assumption of quality, accuracy, or reliability. Company does not control all content that is put out into Directory, and disclaims all liability for same. It is the Member’s responsibility to independently decide whether to contact anyone from Directory and/or purchase a product or service from them based upon the information posted in Directory.   ",
      },
      {
        question: "Indemnification",
        answer:
          "Member agrees at all times to defend, fully indemnify and hold Company and any affiliates, agents, team members or other party associated with Company harmless from any causes of action, damages, losses, costs, expenses incurred as a result of Member’s use of Directory, as well as any third-party claims of any kind (including attorney’s fees) arising from his/her actions as a direct or indirect result of Member’s participation in Directory. Should Company be required to defend itself in any action directly or indirectly involving Member, or an action where they decide Member’s participation or assistance would benefit Company’s defense, Member agrees to participate and provide any evidence, documents, testimony, or other information deemed useful by Company, free of charge. ",
      },
      {
        question: "Waiver",
        answer:
          "Member hereby forever discharges and releases Company, its affiliates and each their subsidiaries and their respective employees, contractors, directors, suppliers and representatives from, and hereby waive and relinquish, each and every past, present and future dispute, claim, controversy, demand, right, obligation, liability, action and cause of action of every kind and nature (including personal injuries, death, and property damage), that has arisen or arises directly or indirectly out of, and/or that relates directly or indirectly to: (i) the Directory (ii) any inaccurate, incomplete, unreliable, illegal or infringing content posted within the Directory, whether caused by Company or any collaborator or user of the Directory, or by any of the equipment or programming associated with or utilized within Directory; (iii) the conduct, whether online or offline, of any user; (iv) any injury, loss or damage caused by another member or Member Content posted on the Directory; and (v) any error, omission, interruption, deletion, defect, delay in operation and/or transmission, communications line failure, theft and/or destruction and/or unauthorized access to, and/or alteration of, the Members’ communications. ",
      },
      {
        question: "Term; Termination",
        answer:
          "Following Member’s agreement to these Terms of Use, it is to remain in full force and effect throughout the duration Member’s membership, unless or until terminated by either party as outlined below, with the exception of all provisions intended to survive termination of the agreement, which shall remain intact following termination. Termination: Termination by Company: Company may terminate this Agreement at any time, for any reason, within its sole and exclusive discretion, due to Member account suspension, Member breach or abuse of services of any kind, or Company’s determination that it is not a fit for Member to continue with Company. Termination by Member: Member may elect to terminate this Agreement at any time by canceling his/her membership in the manner outlined above. This Agreement shall remain in full force and effect until Member’s membership has ended, following notice of termination.",
      },
      {
        question: "Dispute Resolution ",
        answer:
          "Should a dispute arise between Company and Member, the parties agree to attempt to resolve by good-faith negotiations and discussions. (Member agrees that failure to see results is not a basis for a “dispute” and agrees he or she does not hold Company responsible for any specific results, or those results which have been achieved by other Members of Directory.) If unable to reach a resolution informally, Member and Company agree that all disputes will be submitted for Arbitration by the American Arbitration Association, to be completed in El Paso, Texas within a reasonable amount of time. Member and Company agree to participate in the arbitration process in good faith and in a manner that will effectively and efficiently resolve the dispute at hand, including the exchange of any materials, documents, or information. The decision made by the arbitrator is to be final and binding on both parties, and is not to be appealed or otherwise set aside. It is to be enforceable in any court of proper jurisdiction as a judgment of law or decree. The parties hereby waive their constitutional and statutory rights to go to court and have a trial in front of a judge or a jury, instead electing that all claims and disputes shall be resolved by arbitration. ",
      },
      {
        question: "Applicable Law",
        answer:
          "This Agreement shall be governed by and under control of the laws of Texas regardless of conflict of law principles, and regardless of location of Member. Member understands this and agrees that the laws of Texas are to be applicable here. ",
      },
      {
        question: "Force Majeure",
        answer:
          "Neither Company or Member will be liable for any failure or delay in the performance of responsibilities and obligations hereunder, other than payment obligations by the Member, caused directly by events or factors outside the parties’ control, including but not limited to illness, injury, attacks, shortages, riots, pandemics, fires, earthquakes, acts of God, war, strikes, terrorism, technology issues, and governmental action. ",
      },
      {
        question: "Changes to Terms ",
        answer:
          "Company may make changes to this Agreement from time to time, or other policies and procedures within Company. In the event of such a change, Company will post the updated terms, and notify all Members of the changes, and it will be Member’s responsibility to review the updated Terms prior to accessing Directory. Accessing and/or using the Directory after the updated Terms have been posted shall constitute full and complete acceptance of the updated Terms. If Member does not agree with some or all of the updates within this Agreement, Member is advised to cancel his/her/their membership immediately. All subsequent use of the Directory shall constitute acceptance to the Terms in their most updated version.  ",
      },
      {
        question: "Amendments",
        answer:
          "This agreement may be altered, amended, changed, extended, or updated depending on current laws, structure of Directory, or Company’s business. Member’s continued use of the Directory constitutes an agreement to the most updated version of this Agreement. ",
      },
      {
        question: "Survival",
        answer:
          "All provisions which, by their nature, should survive termination of this Agreement shall survive, including without limitation licenses, intellectual property rights, warranty disclaimers, indemnity and hold harmless provisions, limitations of liability, confidentiality, and non-disclosure. ",
      },
      {
        question: "Company Contact Information",
        answer:
          "MEMBER PODCAST RELEASE Should Member elect to purchase the tier of membership within Directory that includes a Podcast Interview, Member also agrees to the below Podcast Term and Release, in connection with his/her Podcast interview and distribution of same.Member understands and agrees to the following in connection with his/her Podcast Interview and Release:1. 	CompensationMember understands and agrees he/she will receive no monetary compensation for appearing on Podcast; however, he/she will be identified and tagged in all promotional materials and publicized to Company’s audience, and will be allowed to offer a free resource to Company’s audience that will be linked in Podcast show notes. Member acknowledges this to be a bargained-for exchange, and that Member is receiving something of significant value in such publicity and exposure to a new audience. Member makes no claim in any compensation or portion thereof should Company receive ad-based, or any other compensation in connection with Podcast.2. 	No Obligation to Publish EpisodeMember acknowledges, understands, and agrees that Company makes no guarantee the Episode featuring Member will be broadcast, mentioned, or featured in any way, including but not limited to releasing to the public as a Podcast episode. Member agrees to provide the interview for Episode and corresponding content having understood this provision and leaves it solely up to Company to publish or not publish the Episode. Company has no obligation to publish or distribute the Episode in any capacity or across any media, and does not owe Member any damages or comparable offer should Podcast Episode not be published. Should Episode remain unpublished, Company and Member will mutually agree upon another way to either release a new Episode, or promote Member in another equal way3. 	DistributionShould Company decide to publish the Episode, Member hereby consents to the recording, broadcasting, and distribution of the Episode in all forms of media and across all platforms deemed appropriate by Company. Member understands his or her name and likeness will also be used in connection with marketing, advertising, and on promotional material promoting the Episode and/or Member, and fully grants Company rights to distribute same.4. 	Marketing and PromotionMember grants Company a non-exclusive, irrevocable license to copy, publish, distribute, make derivative works of, and otherwise use Member’s name, title, biography, photograph, likeness, company logo, relevant intellectual property belonging to Member, and other applicable rights of publicity for the purpose of marketing Episode. Member will not have a claim against Company for use of clips, quotes, and other portions of Episode completed, and agrees Company is to have full creative authority in deciding how and when to use quotes, clips, thumbnail images, video recordings, and other media for the purpose of publishing, broadcasting, marketing, and/or distributing Podcast Episode.Company also grants Member a non-exclusive, revocable license to use Company’s name, logo, and other applicable images for the sole and exclusive purpose of publicizing and marketing Company’s Podcast and the Episode, in images and designs created by Company and provided by Company for Member use. Member understands this license is limited to reuse of images given to Member by Company, and does not give Member the right to create his/her own graphics and images using Company’s intellectual property, without prior written consent of Company.  5. 	Intellectual Property RightsMember represents and warrants that (1) it is the legal and original owner, or has an assignable, irrevocable license to use, any and all content it provides on the Episode or in relevant promotional and/or marketing materials, including but not limited to methods, programs, educational theories, or other things discussed in Episode, as well as those relating to photos, branding colors and trade dress, logos, taglines, and information contained within copy; (2) it has the legal right to sell, promote, and offer the products and services for which it is may discuss or promote on the Episode, including but not limited to all intellectual property rights, patent rights, and otherwise; (3) there are no known, currently pending legal issues against Member that would materially alter this Agreement or its reputation should such issues become public, and Company’s participation as a resultMember irrevocably grants Company, its employees, affiliates, agents, subsidiaries, successors, and assigns any and all intellectual property rights in the recorded Podcast Episode, including the rights to record, use, sell, stream, publish, and distribute – in whole or in part – the audio (and video, as applicable) collected during the Episode recording process. This right includes, but is not limited to, all rights of publicity, including name, photo, voice, and/or likeness, biography, the full recording of the Episode itself, and any supplemental information provided by Company at the time of the Episode.Member understands that Company may use the Episode recording, in whole or in part, as well as any video recordings, photographs, or transcripts, across any and all forms of media (digital or in print) in perpetuity, without obtaining permission from Member. Member understands he/she has no legal claim arising out of or in connection with any use of the Podcast, including but not limited to claims for invasion of privacy, defamation, right of publicity, as well as no claim for compensation or prior approval before Company uses such footage.This also includes Company’s right to pull full or partial quotations from Podcast Episode and repurpose for Company’s social media that feature Member’s Episode. Member acknowledges Company has full and complete rights to do this, and that Member does not have any rights to contest, oppose, or otherwise take any action against the use of such quotations from the Episode, as long as Company pulls an accurate quote which does not objectively misstate or misquote Member in a way that would negatively affect Member.6. 	Right to CorrectShould an inadvertent error occur during the recording or editing of Episode, or within any marketing materials made in connection with Episode, which is not caught or fixed prior to posting or distributing, Company has the right to correct such content by (1) removing the incorrect content as soon as the error(s) are realized, and (2) replacing the content with a corrected post or Episode, and calling attention to the fact that the prior content or Episode included an error, without penalty.  7. 	Limitation of LiabilityMember hereby fully releases Company, as well as Company’s employees, contractors, partners, agents, successors, heirs and assigns, and affiliates from any and all liability arising out of or in connection with any and all use of the Episode and corresponding materials therewith, including but not limited to the producing, processing, distributing, publishing, editing, reproducing, marketing, promoting or transmitting of the Episode – in whole or in part.8. 	DisclaimerEarnings Disclaimer: Company does not make any guarantees or assurances regarding a particular financial outcome of Member based on Episode, nor is Company responsible for Member’s earnings, or any increase or decrease in finances based upon Episode and Podcast promotion. Any information or experiences from past Members is individual, and Company makes no representations regarding increase in growth, product or service sales, social media following, or otherwise. Member agrees that he/she does not have a cause of action, legal remedy, and is not entitled to a refund should he/she not achieve the results desired following completion of EpisodeContent Disclaimer: Member confirms he/she is solely liable for any and all content spoken on Podcast Episode, and/or provided in any additional content provided to Company’s audience as a result of Podcast. Should any Podcast listeners take issue with anything Member says, discusses, claims, or provides in Episode or any free resources provided, Member understands he/she will handle completely, will be fully liable, and will fully indemnify, defend, and hold harmless Company and all owners, employees, affiliates, contractors, and otherwise. Any such legal action that may be taken against Company will be taken over by Member, as the sole and exclusive liable party. ",
      },
    ],
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    href: "privacy-policy",
    content: [
      {
        question: "What information do we collect?",
        answer:
          "Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.",
      },
      {
        question: "How do we use your information?",
        answer:
          "Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat auctor aliquam. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.",
      },
      {
        question: "Do we use cookies and other tracking technologies?",
        answer:
          "Pharetra morbi libero id aliquam elit massa integer tellus. Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit dictumst ut eget a, elementum eu. Maecenas est morbi mattis id in ac pellentesque ac.",
      },
      {
        question: "How long do we keep your information?",
        answer:
          "Pharetra morbi libero id aliquam elit massa integer tellus. Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit dictumst ut eget a, elementum eu. Maecenas est morbi mattis id in ac pellentesque ac.",
      },
      {
        question: "How do we keep your information safe?",
        answer:
          "Pharetra morbi libero id aliquam elit massa integer tellus. Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit dictumst ut eget a, elementum eu. Maecenas est morbi mattis id in ac pellentesque ac.",
      },
      {
        question: "What are your privacy rights?",
        answer:
          "Pharetra morbi libero id aliquam elit massa integer tellus. Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit dictumst ut eget a, elementum eu. Maecenas est morbi mattis id in ac pellentesque ac.",
      },
      {
        question: "How can you contact us about this policy?",
        answer:
          "Sagittis et eu at elementum, quis in. Proin praesent volutpat egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi ac. Auctor rutrum lacus malesuada massa ornare et. Vulputate consectetur ac ultrices at diam dui eget fringilla tincidunt. Arcu sit dignissim massa erat cursus vulputate gravida id. Sed quis auctor vulputate hac elementum gravida cursus dis.Lectus id duis vitae porttitor enim gravida morbi.Eu turpis posuere semper feugiat volutpat elit, ultrices suspendisse. Auctor vel in vitae placerat.Suspendisse maecenas ac donec scelerisque diam sed est duis purus.",
      },
    ],
  },
  {
    id: "disclaimer",
    title: "Disclaimer",
    href: "disclaimer",
    content: [
      {
        question: "Website Use",
        answer:
          "To access or use Website, you must be 18 years or older and have the required mental capacity to enter into and abide by this Disclaimer. By using Website, you represent that you are at least 18 years of age, and that you agree to the Disclaimer herein. Use of Website by anyone under 18 is not authorized or condoned by us. This Disclaimer may be subject to changes or updates, and Website may not provide notice of such changes or updates. We reserve our right to make changes or updates at any time, and the burden is on the user to routinely check Disclaimer for updates. By continuing to use Website and the content we produce, you agree to be bound by the most updated version of the Disclaimer, whether or not you have read it. If you are not in agreement with the Disclaimer as is, please do not use our Website or any of the content that appears thereon.",
      },
      {
        question: "Purpose",
        answer:
          "The purpose of Website is solely to provide educational information; any content on this website or provided as a result of your decision to opt-in to our email list has been created solely for the purpose of education and for informational purposes only. By visiting Website, you agree and understand that this content is made available to you as a self-help tool only. Nothing on this website or distributed via email is intended to take the place of a consultation with a physician, dietician, nutritionist, counselor, medical professional of any kind, lawyer, doctor, accountant, psychic, or other professional.I am not a doctor, lawyer, accountant, therapist, counselor, dietician, or other professional; User agrees he or she will consult with his or her personal doctor, lawyer, or other professional prior to or in addition to utilizing information found on this website, and such information will not substitute for any consultation with User’s own professional. The information contained on Website or via emails, or available through our products, programs, and services is not intended to be a substitute for any professional, personal advice, nor is anything contained herein designed to provide you with a medical diagnosis, treatment, or other medical services.",
      },
      {
        question: "Voluntary Participation",
        answer:
          "By choosing to visit this site and read the information provided, you understand and agree that you are voluntarily choosing to read, implement and/or participate in the use of Website and any information contained herein, and are solely responsible for any outcomes or results (positive or negative.) We cannot be responsible for any action you may choose to take regarding the information provided, and you acknowledge and agree that we are not responsible nor liable to you should you sustain any financial harm, physical injuries or any negative ramifications. The information contained on Website is intended as general information only; we cannot know your individual situation, and do not claim to know what may or may not work for your personal situation. As such, you agree that any decisions you make to implement or follow anything you find on Website are wholly your own. ",
      },
      {
        question: "Limitation of Liability",
        answer:
          "You understand and agree that your participation in using our website and/or adding yourself to our email list is wholly voluntary, and you are solely and personally responsible for your actions, choices, and any results therein. You understand there are sometimes unknown risks and circumstances that may arise during or following use of our Website or products, that cannot be foreseen or anticipated, but may influence or affect your business or you as an individual. You understand and agree that any suggestion or recommendation of a product, service, coach, or otherwise through our Website is purely information – any decision to act upon these suggestions is to be taken by you, at your own risk, without any liability on the part of TeleWellness Hub, LLC. You agree to accept all risks herein. Your use of this Website constitutes an agreement and acceptance that you will absolve TeleWellness Hub, LLC as well anyone acting as an agent, consultant, affiliate, guest blogger, joint venture partner, employee, staff, team member, or anyone affiliated with Us in any way of any liability for any loss, damage, injury, or litigation that you or any other person may incur from direct or indirect use of the information, content, or products found on our Website or via materials requested through email. You understand and agree that We are not to be held liable for any type of direct or indirect damages arising out of your use of our Website, any information contained herein, or any products or services purchased therefrom, including but not limited to general, specific, incidental, consequential, punitive, or special damages. You also agree that we are not liable or responsible in any way for any loss incurred by you or your business, including revenues, clients, business, goodwill, income, anticipated income, predicted income, sales numbers, loss of a sale, data, nor any computer failure, computer virus obtained by use of our Website, technical glitch or failure, defect or delay, or any other similar issue. You agree that your decision to use our Website is wholly at your own risk and voluntarily chosen by you, and any ramifications resulting therefrom are yours alone.",
      },
      {
        question: "Indemnification ",
        answer:
          "You agree at all times to defend, fully indemnify and hold harmless TeleWellness Hub, LLC and any affiliates, agents, team members or other party associated with it from any causes of action, damages, losses, costs, expenses incurred as a result of your use of our Website or any products or services contained therein, as well as any third party claims of any kind (including attorney’s fees) arising from your actions in relation to our Website or any breach by you of any such conditions outlined herein. Should we be required to defend ourselves in any action directly or indirectly involving you, or an action where we decide your participation or assistance would benefit our defense, you agree to participate and provide any evidence, documents, testimony, or other information deemed useful by us, free of charge. We will attempt to monitor comments and posts made by third parties and users as often as possible. Should you, as a user of our Website, see anything objectionable or offensive posted by a third party, you agree to (1) notify us of the material, and (2) agree not to take any action against us based upon the content posted by the third party. You understand we cannot be responsible for material posted by a user without our control, and agree to release us of any and all claims arising therefrom.Should you choose to utilize information offered on our website, whether free or for purchase, you understand that we are not liable to any party, for any damages – whether direct, indirect, consequential, foreseeable, incidental or otherwise – stemming or perceived to stem from use of or reliance upon any information contained or found on our Website, or from products or services purchased therefrom. You also understand and agree that we are not liable for any damages incurring as a result of your reliance or use of information on our Website written by a third party, whether endorsed or not by us, and you agree to release us from any and all claims stemming from, or perceived to stem from, reliance on information contained on our Website.",
      },
      {
        question: "Accuracy",
        answer:
          "Although we have spent considerable time and effort in creating the products on www.telewellnesshub.com and the content provided herein, you understand and acknowledge that we are not responsible nor liable for any errors, omissions, or liability as a result of any loss or damages incurred as a direct or indirect result of your use of Website content or our products. You also understand there may be inadvertent typographical errors or inaccuracies. By your use of this website, you acknowledge and understand this information, and agree you have chosen/will choose to utilize our Website and/or our products voluntarily. You agree that we are not responsible for the accuracy of our Website, or for any errors or omissions that may occur on the site or in our products. You understand your obligation to provide only authentic, accurate information to us, including your name, email address, and payment information, should you choose to purchase a product. You understand and agree that should any information provided prove inaccurate, and any issues or damages arise from your giving us false or inaccurate information, you may be liable for any subsequent damages that occur as a result.",
      },
      {
        question: "Testimonials",
        answer:
          "Website may feature testimonials from clients in order to provide readers with additional comments from others’ experiences with Website, TeleWellness Hub, LLC, and products or services offered. While all information, photos, and quotes used are from actual clients, sharing their real, honest opinions of our website and services, these testimonials are not to be considered as a guarantee that current or future clients will experience the same results, or a guarantee that all clients will have the same experience. You understand and agree that by reading a featured testimonial on our Website, you do not expect the same results, and understand this information is not a guarantee.",
      },
      {
        question: "Affiliates and Endorsements ",
        answer:
          "We may choose to partner with, promote, become an affiliate of, or otherwise engage in a joint venture with another individual or company whom we feel aligns with our products or services. You understand that should an affiliate or joint venture program be featured on our Website, we may receive financial compensation or other payment as a result. Please note we will only feature or promote coaches, businesses, or products that we whole heartedly agree with and believe in, and genuinely believe will help our audience. You understand and agree that you must use your own judgement with respect to determining whether any promotion of another product is right for you and your business. Our decision to promote, suggest, or reference another service indicates nothing more than an acknowledgement that we respect or appreciate the business, person, or service. Your decision to use or purchase from such a promotion is yours alone, and you understand we have no involvement in your decision, nor shall we have any liability should you purchase from a promoted product and become unsatisfied. You agree and understand we have no liability and you will hold us harmless should this occur. References to other coaches, information, events, services, products, opinions, or companies on our Website, blog, or emails is meant purely as a way to share information, not as an endorsement or suggestion that you purchase or use whatever is being mentioned. We are not responsible for any information, content, emails, products, programs, or services of any other person, business, or entity that may be referenced on our Website.",
      },
      {
        question: "Warranties",
        answer:
          "You understand and agree that we make no warranties, express or implied, and hereby renounce any such warranties, guarantees, or representations with respect to any portion of our Website, the content herein, content distributed through email lists, social media, via webinars, or that which is made available through purchase via our membership site. By use of the Website, you agree and understand that use of content and information found herein is to be taken “as is” and used at your own risk, with no guarantees, representations, or warranties regarding fitness for particular purpose, accuracy, or otherwise.",
      },
      {
        question: "Social Media",
        answer:
          "All content is intended as general education and information regarding the subjects addressed, and is not to be considered as medical advice, treatment, diagnoses, mental health treatment, nor is it to be used as a substitute for such treatment. Please consult your doctor prior to implementing any information learned here; TeleWellness Hub is not responsible nor liable for any adverse reactions to this content, should you choose to implement anything found herein.All content is intended as general education and information regarding the subjects addressed, and is not to be considered as medical advice, treatment, diagnoses, mental health treatment, nor is it to be used as a substitute for such treatment. Please consult your doctor prior to implementing any information learned here; TeleWellness Hub is not responsible nor liable for any adverse reactions to this content, should you choose to implement anything found herein.",
      },
    ],
  },
];

export const adminTopbarLinks = [
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

export const adminTopbarMobileLinks = [
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
