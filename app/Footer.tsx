import Image from "next/image";
import footerImg from "@/public/tomoko-uji-jGHVjPJM_x0-unsplash.jpg";
import Link from "next/link";

export default function Footer() {
  const footerData = [
    {
      head: "Navigation",
      list: [
        { text: "Home", url: "/" },
        { text: "Job Listings", url: "/jobs" },
        { text: "About Japan", url: "/about" },
        { text: "Contact Us", url: "/contact" },
        { text: "Privacy Policy", url: "/privacy" },
        { text: "Terms of Use", url: "/terms" },
      ],
    },
    {
      head: "Social",
      list: [
        { text: "LinkedIn", url: "https://www.linkedin.com/yourprofile" },
        { text: "Twitter", url: "https://twitter.com/yourhandle" },
        { text: "Facebook", url: "https://www.facebook.com/yourpage" },
      ],
    },
    {
      head: "Contact",
      list: [
        { text: "info@yourwebsite.com", url: "mailto:info@yourwebsite.com" },
        { text: "+123-456-7890", url: "tel:+123-456-7890" },
        {
          text: "123 Main Street, City, Country",
          url: "#",
        },
      ],
    },
    // {
    //   head: "",
    //   list: [
    //     { language: "English", url: "/en" },
    //     { language: "日本語", url: "/jp" },
    //   ],
    // },
  ];

  return (
    <footer className="flex relative overflow-hidden p-5 mt-20">
      <Image
        src={footerImg}
        alt="Sakura Flowers"
        className="absolute inset-0 -z-10 blur-sm"
      />
      <div className="grid grid-cols-4 w-full">
        {footerData.map(({ head, list }) => (
          <div className="p-5" key={head}>
            <h4>{head}</h4>
            <ul>
              {list.map((li) => (
                <li key={li.text}>
                  <Link href={li.url}>{li.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
