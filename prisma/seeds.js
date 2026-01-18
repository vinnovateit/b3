const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// For testing team creation
async function main() {
  await prisma.vITStudent.createMany({
    data: [
      {
        userId: "66c3a9f0b8e4a2d9c1f4e7a1",
        name: "A",
        regNo: "24BCE1234",
        year: 24,
        phone: "1234567890",
        accommodation: "hostel",
      },
      {
        userId: "66c3a9f0b8e4a2d9c1f4e7a2",
        name: "B",
        regNo: "24BCE2345",
        year: 24,
        phone: "2345567899",
        accommodation: "hostel",
      },
    ],
  });

  console.log("Seeded students");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
