const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const uniqueSlug = require("./utils/uniqueSlug");

const users = [
  {
    email: "john.doe@example.com",
    name: "John Doe",
    password: "Password1!",
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    password: "SecurePass2@",
  },
  {
    email: "alice.johnson@example.com",
    name: "Alice Johnson",
    password: "MyPassword3#",
  },
  {
    email: "bob.brown@example.com",
    name: "Bob Brown",
    password: "AnotherPass4$",
  },
  {
    email: "carol.davis@example.com",
    name: "Carol Davis",
    password: "CarolPass5%",
  },
  {
    email: "david.evans@example.com",
    name: "David Evans",
    password: "DavidPass6^",
  },
  {
    email: "emma.foster@example.com",
    name: "Emma Foster",
    password: "EmmaPass7&",
  },
  {
    email: "frank.green@example.com",
    name: "Frank Green",
    password: "FrankPass8*",
  },
  {
    email: "grace.harris@example.com",
    name: "Grace Harris",
    password: "GracePass9(",
  },
  {
    email: "henry.ivan@example.com",
    name: "Henry Ivan",
    password: "HenryPass0)",
  },
];

const categories = [
  {
    name: "Technology",
  },
  {
    name: "Health",
  },
  {
    name: "Lifestyle",
  },
  {
    name: "Finance",
  },
  {
    name: "Education",
  },
  {
    name: "Travel",
  },
  {
    name: "Food",
  },
  {
    name: "Sports",
  },
  {
    name: "Entertainment",
  },
  {
    name: "Science",
  },
];

const tags = [
  {
    name: "JavaScript",
  },
  {
    name: "React",
  },
  {
    name: "Node.js",
  },
  {
    name: "Health",
  },
  {
    name: "Fitness",
  },
  {
    name: "Finance",
  },
  {
    name: "Investment",
  },
  {
    name: "Education",
  },
  {
    name: "E-learning",
  },
  {
    name: "Travel",
  },
  {
    name: "Adventure",
  },
  {
    name: "Cooking",
  },
  {
    name: "Recipes",
  },
  {
    name: "Football",
  },
  {
    name: "Movies",
  },
  {
    name: "Science",
  },
  {
    name: "Space",
  },
  {
    name: "Programming",
  },
  {
    name: "AI",
  },
  {
    name: "Machine Learning",
  },
];

const posts = [
  {
    title: "Exploring JavaScript in 2024",
    content:
      "JavaScript continues to evolve in 2024 with new features and improvements...",
    image: "https://example.com/images/js2024.png",
    published: true,
    categoryId: 26, // Assumendo che l'ID della categoria 'Travel' sia 6
    userId: 27, // Assumendo che l'ID dell'utente 'Emma Foster' sia 7
    tags: [46, 53, 54, 63, 65], // Assumendo che questi siano gli ID dei tag corrispondenti
  },
  {
    title: "The Future of AI in Healthcare",
    content:
      "Artificial Intelligence is revolutionizing healthcare by providing better diagnostics...",
    image: "https://example.com/images/ai-healthcare.png",
    published: true,
    categoryId: 27, // Assumendo che l'ID della categoria 'Science' sia 7
    userId: 28, // Assumendo che l'ID dell'utente 'Frank Green' sia 8
    tags: [49, 53, 61, 65], // Assumendo che questi siano gli ID dei tag corrispondenti
  },
  {
    title: "Top Travel Destinations for 2024",
    content:
      "Discover the top travel destinations for 2024, from exotic beaches to bustling cities...",
    image: "https://example.com/images/travel2024.png",
    published: false,
    categoryId: 31, // Assumendo che l'ID della categoria 'Food' sia 11
    userId: 29, // Assumendo che l'ID dell'utente 'Grace Harris' sia 9
    tags: [55, 56], // Assumendo che questi siano gli ID dei tag corrispondenti
  },
  {
    title: "Healthy Eating: Tips and Recipes",
    content:
      "Learn about healthy eating habits and try out some delicious and nutritious recipes...",
    image: "https://example.com/images/healthy-eating.png",
    published: true,
    categoryId: 32, // Assumendo che l'ID della categoria 'Sports' sia 12
    userId: 30, // Assumendo che l'ID dell'utente 'Henry Ivan' sia 10
    tags: [50, 57, 58], // Assumendo che questi siano gli ID dei tag corrispondenti
  },
  {
    title: "Investing in 2024: Trends and Strategies",
    content:
      "Stay ahead of the game with the latest trends and strategies for investing in 2024...",
    image: "https://example.com/images/investing2024.png",
    published: false,
    categoryId: 29, // Assumendo che l'ID della categoria 'Finance' sia 9
    userId: 31, // Assumendo che l'ID dell'utente 'John Doe' sia 11
    tags: [52], // Assumendo che questi siano gli ID dei tag corrispondenti
  },
];

const seed = async () => {
  //   await prisma.post.deleteMany({});
  //   await prisma.category.deleteMany({});
  //   await prisma.tag.deleteMany({});
  //   await prisma.user.deleteMany({});

  //   for (const user of users) {
  //     await prisma.user.create({
  //       data: user,
  //     });
  //   }

  //   for (const category of categories) {
  //     await prisma.category.create({
  //       data: category,
  //     });
  //   }

  //   for (const tag of tags) {
  //     await prisma.tag.create({
  //       data: tag,
  //     });
  //   }

  for (const post of posts) {
    const data = {
      title: post.title,
      slug: await uniqueSlug(post.title),
      content: post.content,
      image: post.image,
      published: post.published,
      category: {
        connect: { id: post.categoryId },
      },
      tags: {
        connect: post.tags.map((t) => ({ id: t })),
      },
      user: {
        connect: { id: post.userId },
      },
    };
    await prisma.post.create({
      data,
    });
  }
};

seed();
