// import db from "astro:db"
// async function seed() {
//     // Seed Users
//     const users = await db.User.insert([
//         {
//             username: "john_doe",
//             password: "password123",
//             email: "john@example.com",
//             displayname: "John Doe",
//             profilepic: "https://example.com/john.jpg",
//             karma: 10,
//         },
//         {
//             username: "jane_doe",
//             password: "password123",
//             email: "jane@example.com",
//             displayname: "Jane Doe",
//             profilepic: "https://example.com/jane.jpg",
//             karma: 20,
//         },
//     ]);

//     // Seed Tags
//     const tags = await db.Tag.insertMany([
//         { id: 1, name: "JavaScript" },
//         { id: 2, name: "Astro" },
//         { id: 3, name: "Web Development" },
//     ]);

//     // Seed Posts
//     const posts = await db.Post.insertMany([
//         {
//             id: 1,
//             title: "Understanding JavaScript Closures",
//             content: "A deep dive into closures in JavaScript...",
//             published: new Date(),
//             user: "john_doe",
//             upvotes: 10,
//             downvotes: 1,
//             tags: [1], // JavaScript
//         },
//         {
//             id: 2,
//             title: "Getting Started with Astro",
//             content: "Astro is a modern static site generator...",
//             published: new Date(),
//             user: "jane_doe",
//             upvotes: 20,
//             downvotes: 2,
//             tags: [2, 3], // Astro, Web Development
//         },
//     ]);

//     // Seed Comments
//     const comments = await db.Comment.insertMany([
//         {
//             id: 1,
//             user: "jane_doe",
//             content: "Great article on closures!",
//             published: new Date(),
//             upvotes: 5,
//             downvotes: 0,
//             postid: 1,
//         },
//         {
//             id: 2,
//             user: "john_doe",
//             content: "Thanks for the Astro guide!",
//             published: new Date(),
//             upvotes: 3,
//             downvotes: 0,
//             postid: 2,
//         },
//     ]);

//     console.log("Seeding completed!");
// }

// seed().catch((err) => {
//     console.error("Seeding failed:", err);
// }).finally(async () => {
//     await db.end(); // Close the database connection if necessary
// });
