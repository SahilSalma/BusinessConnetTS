export const timeOptions = Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = (i % 2) * 30;
    return {
        _id: String(i),
        name: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`,
    }
});

export const formatDate = (createdAt: string | Date) => {
    const date = createdAt instanceof Date ? createdAt : new Date(createdAt);
    return date.toLocaleDateString('en-CA', { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric" });
};

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const websiteRegex = /^(http|https):\/\/[^ "]+$/;