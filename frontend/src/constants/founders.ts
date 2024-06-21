import images from "~/assets/images";

const founders: {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    avatar: any;
    twitter: string;
    linkedin: string;
    description: string;
    company?: string;
}[] = [
    {
        id: 1,
        firstName: "Tien",
        lastName: "Nguyen Anh",
        role: "Computer Science Experts",
        avatar: images.nguyenanhtien,
        twitter: "https://t.me/tiennguyenanh",
        linkedin: "https://www.linkedin.com/in/tienna/",
        description:
            "Founder of the VILAI stake pool, former Experts at HPE; Blockchain Support Engineer",
    },
    {
        id: 2,
        firstName: "Hieu",
        lastName: "Nguyen Van",
        role: "MSc. Electronics and Telecommunication",
        avatar: images.nguyenvanhieu,
        twitter: "https://t.me/nvhieu1978",
        linkedin: "https://www.linkedin.com/in/nguyen-van-hieu-b4410121b/",
        description:
            "Founder of HADA stake pool, member of Plutus Pioneer Program, Researcher at VAST.",
    },
];

const developers: {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    avatar: any;
    twitter: string;
    linkedin: string;
    description: string;
    company?: string;
}[] = [
    {
        id: 1,
        firstName: "Tien",
        lastName: "Nguyen Anh",
        role: "Computer Science Experts",
        avatar: images.nguyenanhtien,
        twitter: "https://t.me/tiennguyenanh",
        linkedin: "https://www.linkedin.com/in/tienna/",
        description:
            "Founder of the VILAI stake pool, former Experts at HPE; Blockchain Support Engineer",
    },
    {
        id: 2,
        firstName: "Hieu",
        lastName: "Nguyen Van",
        role: "MSc. Electronics and Telecommunication",
        avatar: images.nguyenvanhieu,
        twitter: "https://t.me/nvhieu1978",
        linkedin: "https://www.linkedin.com/in/nguyen-van-hieu-b4410121b/",
        description:
            "Founder of HADA stake pool, member of Plutus Pioneer Program, Researcher at VAST.",
    },
];

const advisors: {
    id: number;
    firstName: string;
    lastName: string;
    role: string;
    avatar: any;
    twitter: string;
    linkedin: string;
    description: string;
    company?: string;
}[] = [
    {
        id: 1,
        firstName: "Tien",
        lastName: "Nguyen Anh",
        role: "Computer Science Experts",
        avatar: images.nguyenanhtien,
        twitter: "https://t.me/tiennguyenanh",
        linkedin: "https://www.linkedin.com/in/tienna/",
        description:
            "Founder of the VILAI stake pool, former Experts at HPE; Blockchain Support Engineer",
    },
    {
        id: 2,
        firstName: "Hieu",
        lastName: "Nguyen Van",
        role: "MSc. Electronics and Telecommunication",
        avatar: images.nguyenvanhieu,
        twitter: "https://t.me/nvhieu1978",
        linkedin: "https://www.linkedin.com/in/nguyen-van-hieu-b4410121b/",
        description:
            "Founder of HADA stake pool, member of Plutus Pioneer Program, Researcher at VAST.",
    },
];

export { founders, developers, advisors };
