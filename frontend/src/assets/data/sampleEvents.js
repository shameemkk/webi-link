
const sampleEvents = [
  {
    title: "Introduction to Web Development",
    description: "Learn the basics of HTML, CSS, and JavaScript in this comprehensive webinar",
    category: "Webinar",
    event_type: "live",
    is_paid: false,
    price: 0.0,
    start_datetime: new Date('2024-02-15T10:00:00Z'),
    duration: 120, // 2 hours in minutes
    streaming_link: "https://zoom.us/j/example1",
    status: "upcoming"
  },
  {
    title: "Advanced React Workshop",
    description: "Deep dive into React hooks, context, and performance optimization",
    category: "Workshop",
    event_type: "live",
    is_paid: true,
    price: 49.99,
    start_datetime: new Date('2024-02-20T14:00:00Z'),
    duration: 240, // 4 hours in minutes
    streaming_link: "https://zoom.us/j/example2",
    status: "upcoming"
  },
  {
    title: "Tech Innovation Conference 2024",
    description: "Annual conference featuring industry leaders and cutting-edge technologies",
    category: "Conference",
    event_type: "live",
    is_paid: true,
    price: 299.99,
    start_datetime: new Date('2024-03-10T09:00:00Z'),
    duration: 480, // 8 hours in minutes
    streaming_link: "https://zoom.us/j/example3",
    status: "upcoming"
  },
  {
    title: "Python for Data Science",
    description: "Recorded session on Python fundamentals for data analysis",
    category: "Webinar",
    event_type: "recorded",
    is_paid: true,
    price: 29.99,
    start_datetime: new Date('2024-01-10T15:00:00Z'),
    duration: 180, // 3 hours in minutes
    video_url: "https://example.com/recordings/python-data-science",
    status: "completed"
  },
  {
    title: "UI/UX Design Principles",
    description: "Learn essential design principles and tools for modern web applications",
    category: "Workshop",
    event_type: "live",
    is_paid: true,
    price: 79.99,
    start_datetime: new Date('2024-02-28T13:00:00Z'),
    duration: 360, // 6 hours in minutes
    streaming_link: "https://zoom.us/j/example5",
    status: "upcoming"
  }
];

export default sampleEvents;