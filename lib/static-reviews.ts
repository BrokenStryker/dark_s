export interface StaticReview {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  serviceType: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export const staticReviews: StaticReview[] = [
  {
    id: "1",
    customerName: "Karina G.",
    rating: 5,
    reviewText: "Amberrose is positively electric—she radiates talent, skill, and energy. It’s so rare to find a stylist so committed to delivering exactly what you ask for. She took my hair from a faded rose gold to a cool blonde in one session—this photo doesn’t even do it justice! She cared for my hair at every step and took absolutely no shortcuts (you could just tell). Every move was intentional to achieve my hair goals. Little old Fairbanks is so lucky to have Amberrose. Want big-city hair? Go to Amberrose!",
    serviceType: "Full Blonding",
    createdAt: "2024-11-15T10:30:00Z",
    updatedAt: "2024-11-15T10:30:00Z",
    image: "/reviewphoto1.jpg"
  },
  {
    id: "2",
    customerName: "Rebecca L.",
    rating: 5,
    reviewText: "I was a client of another stylist for about a year, she was the only person I trusted to take my black-brown hair to a beautiful, dimensional blonde. After my stylist moved I went searching for someone else, after seeing Amberrose’s work, I knew I was in good hands. She added gorgeous lowlights and dimension, giving my hair new life. She paid close attention to every detail and made me feel so welcomed as a first-time client.",
    serviceType: "Reverse Balayage",
    createdAt: "2024-11-10T14:20:00Z",
    updatedAt: "2024-11-10T14:20:00Z",
    image: "/reviewphoto2.jpeg"
  },
  {
    id: "3",
    customerName: "Leah B.",
    rating: 5,
    reviewText: "I’ve been seeing Amberrose for a while now, and I always leave feeling so confident. My hair looks amazing every time. She takes the time to make sure it’s perfect and exactly how you pictured it, and she’s just as thoughtful with the styling at the end. Not only is the color flawless, but the attention to detail is incredible—she even cleans up the dye around the hairline, which makes such a difference. You can 100% tell how thoughtful her work is. She’s also super personable and makes you feel comfortable throughout the appointment. I would recommend her every single time!",
    serviceType: "All Over Color",
    createdAt: "2024-11-08T16:45:00Z",
    updatedAt: "2024-11-08T16:45:00Z",
    image: "/reviewphoto3.jpeg"
  },
  {
    id: "4",
    customerName: "Amanda K.",
    rating: 5,
    reviewText: "I just love the cozy, friendly atmosphere of this place. The customer service and hair services are so refreshing. I’d 100% recommend it to anyone looking to transform their hair. I’ve seen Amber a couple of times now, and she’s been my holy grail for hair. I’d been looking for a go-to stylist for a while, and I’m so happy I found her. She delivers exactly what I’m looking for. I look forward to every appointment. I’d recommend her 100% and will keep seeing her as long as she’s here. She’s your girl for all your hair needs!",
    serviceType: "Vivid Pop of Color",
    createdAt: "2024-11-05T11:15:00Z",
    updatedAt: "2024-11-05T11:15:00Z",
    image: "/reviewphoto4.jpeg"
  },
  {
    id: "5",
    customerName: "Rachel T.",
    rating: 5,
    reviewText: "This salon is the best I’ve been to. Whether you’re coming for blonding, all-over color, or anything in between, you’ll be in great hands. The vibes are truly immaculate—you can tell how much she loves her salon and what they do. Amberrose is the absolute best. She truly listens and collaborates with you to create the perfect plan to keep your hair healthy and make sure you leave feeling like a queen. Her work is amazing—you won’t regret booking with her!",
    serviceType: "Full Blonding",
    createdAt: "2024-11-02T13:30:00Z",
    updatedAt: "2024-11-02T13:30:00Z",
    image: "/reviewphoto5.jpeg"
  },
  {
    id: "6",
    customerName: "Lisa H.",
    rating: 5,
    reviewText: "I love the cozy, welcoming vibe here—every visit feels like a treat. I always leave feeling confident and polished, with hair that sits just right and moves beautifully. The attention to detail is unreal: thoughtful sectioning, clean lines, and those soft, face-framing pieces that make all the difference. She really listens and refines the plan with you, so the shape grows out gracefully and still looks amazing weeks later. It’s the kind of care where you can tell nothing’s rushed and every snip has a purpose. If you want that effortless, lived-in look that still feels intentional and chic, this is the place. I’d recommend her 100%—you’ll walk out feeling like the best version of yourself.",
    serviceType: "Medium/Long Haircut",
    createdAt: "2024-10-28T09:20:00Z",
    updatedAt: "2024-10-28T09:20:00Z",
    image: "/reviewphoto6.jpeg"
  },
];