const { PrismaClient } = require('@prisma/client');
import medicamentArray from "../src/modules/medicament/medicaments"

async function seed() {
  const prisma = new PrismaClient();
  try {
    for (const medicament of medicamentArray) {
      await prisma.medicament.create({
        data: medicament
      })
    }
    console.log('Seed data inserted successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

seed();