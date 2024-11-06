import { v4 as uuidv4 } from 'uuid';

const initialReviews = [
    {
        _id: uuidv4(),
        title: "Fantastic Product!",
        content: "This product is amazing! It exceeded my expectations and the quality is top-notch.",
        images: [
            'https://via.placeholder.com/150', // Replace with actual image URLs if you have any
            'https://via.placeholder.com/150'
        ],
        rating: 5,
        avatar: 'https://via.placeholder.com/50', // Replace with actual avatar URL if you have any
        username: 'John Doe'
    },
    {
        _id: uuidv4(),
        title: "Decent Purchase",
        content: "Good product but the shipping took too long. Overall, satisfied with the purchase.",
        images: [],
        rating: 3,
        avatar: 'https://via.placeholder.com/50', // Replace with actual avatar URL if you have any
        username: 'John Doe'
    },
    {
        _id: uuidv4(),
        title: "Highly Recommend!",
        content: "I love the design and functionality. Highly recommend this to anyone looking for a high-quality product.",
        images: [
            'https://via.placeholder.com/150'
        ],
        rating: 4,
        avatar: 'https://via.placeholder.com/50', // Replace with actual avatar URL if you have any
        username: 'John Doe'
    }
];

export default initialReviews;
