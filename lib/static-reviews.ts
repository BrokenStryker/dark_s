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
    customerName: "Sarah M.",
    rating: 5,
    reviewText: "Absolutely amazing experience! The blonding service was exactly what I wanted. My hair has never looked better and feels so healthy. Will definitely be back!",
    serviceType: "Full Blonding",
    createdAt: "2024-11-15T10:30:00Z",
    updatedAt: "2024-11-15T10:30:00Z"
  },
  {
    id: "2",
    customerName: "Jessica L.",
    rating: 5,
    reviewText: "The best hair salon experience I've ever had! The attention to detail and the final result exceeded my expectations. Highly recommend!",
    serviceType: "Partial Blonding",
    createdAt: "2024-11-10T14:20:00Z",
    updatedAt: "2024-11-10T14:20:00Z"
  },
  {
    id: "3",
    customerName: "Emily R.",
    rating: 5,
    reviewText: "Perfect color match! The all over color service was flawless and the salon has such a relaxing atmosphere. Thank you for making me feel beautiful!",
    serviceType: "All Over Color",
    createdAt: "2024-11-08T16:45:00Z",
    updatedAt: "2024-11-08T16:45:00Z"
  },
  {
    id: "4",
    customerName: "Amanda K.",
    rating: 5,
    reviewText: "The Brazilian Blowout changed my life! My hair is so much more manageable now and looks salon-fresh every day. Worth every penny!",
    serviceType: "Brazilian Blowout",
    createdAt: "2024-11-05T11:15:00Z",
    updatedAt: "2024-11-05T11:15:00Z"
  },
  {
    id: "5",
    customerName: "Rachel T.",
    rating: 5,
    reviewText: "Amazing haircut! The stylist really listened to what I wanted and delivered perfectly. The salon is beautiful and the service is top-notch.",
    serviceType: "Medium/Long Haircut",
    createdAt: "2024-11-02T13:30:00Z",
    updatedAt: "2024-11-02T13:30:00Z"
  },
  {
    id: "6",
    customerName: "Lisa H.",
    rating: 5,
    reviewText: "The vivid pop of color was exactly what I needed! So vibrant and beautiful. The whole team is professional and talented.",
    serviceType: "Vivid Pop of Color",
    createdAt: "2024-10-28T09:20:00Z",
    updatedAt: "2024-10-28T09:20:00Z"
  },
  {
    id: "7",
    customerName: "Maria S.",
    rating: 5,
    reviewText: "Best blowout ever! My hair looked incredible and lasted for days. The styling was perfect and the atmosphere is so relaxing.",
    serviceType: "Blowout",
    createdAt: "2024-10-25T15:45:00Z",
    updatedAt: "2024-10-25T15:45:00Z"
  },
  {
    id: "8",
    customerName: "Jennifer C.",
    rating: 5,
    reviewText: "The conditioning mask treatment made my hair feel like silk! Such a luxurious experience and my hair has never been healthier.",
    serviceType: "Conditioning Mask",
    createdAt: "2024-10-20T12:10:00Z",
    updatedAt: "2024-10-20T12:10:00Z"
  }
];