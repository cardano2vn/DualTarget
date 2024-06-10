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
        twitter: "#",
        linkedin: "#",
        description: "Founder of the VILAI stake pool, former Experts at HPE; Blockchain Support Engineer",
    },
    {
        id: 2,
        firstName: "Hieu",
        lastName: "Nguyen Van",
        role: "MSc. Electronics and Telecommunication",
        avatar: images.nguyenvanhieu,
        twitter: "#",
        linkedin: "#",
        description: "Founder of HADA stake pool, member of Plutus Pioneer Program, Researcher at VAST.",
    },
    {
        id: 3,
        firstName: "Khanh",
        lastName: "Pham Van",
        role: "Doctor of Mathematics",
        avatar: images.phanvankhanh,
        twitter: "#",
        linkedin: "#",
        description:
            "Researcher at the Institute of Information Technology - VAST; Lecturer at Hanoi National University on Artificial Intelligence, Deep Learning, Reinforcement Learning",
    },
];

export default founders;
