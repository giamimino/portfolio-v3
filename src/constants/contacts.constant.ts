import { ContactItem } from "@/types/global";

export const ContactsSocial: ContactItem[] = [
  {
    icon: "akar-icons:github-fill",
    type: "redirect",
    provider: "GitHub",
    account: "@giamimino",
    redirectUrl: "https://github.com/giamimino/"
  },
  {
    icon: "mdi:linkedin",
    type: "redirect",
    provider: "LinkedIn",
    account: "Gia M",
    redirectUrl: "https://www.linkedin.com/in/gia-miminoshvili-2a89642aa/"
  },
  {
    icon: "ic:baseline-discord",
    type: "copy",
    provider: "Discord",
    account: "0_jade",
    copyValue: "0_jade"
  },
  {
    icon: "humbleicons:mail",
    type: "copy",
    provider: "Gmail",
    account: "miminoshvili2102@gmail.com",
    copyValue: "miminoshvili2102@gmail.com"
  },
];
