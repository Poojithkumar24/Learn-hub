/*
//@ts-nocheck

const {PrismaClient} = require("@prisma/client");
const database = new PrismaClient();

async function main(){
    try{
        await database.category.createMany({
            data:[
                {name: "Computer Science"},
                {name: "Arificial Intelligence"},
                {name: "Electrical Engineering"},
                {name: "Civil Engineering"},
                {name: "Mechanical Engineering"},
                {name: "Instrumental Engineering"},
                {name:"Data Science"}
            ]
        })
    }
    catch(error){
        console.log("Error seeding the database categories");
    }finally{
        await database.$disconnect();
    }
    
}

main();
 */


//@ts-nocheck
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");

const database = new PrismaClient();

const categoriesToAdd = [
  "Computer Science",
  "Artificial Intelligence",
  "Mechanical Engineering",
  "Data Science",
  "Electrical Engineering",
  "Cyber Security",
  "Civil Engineering",
  "Instrumental Engineering"
];
const yearsToAdd = [
    "I",
    "II",
    "III",
    "IV",
  ];

async function categoryExists(name) {
  const category = await database.category.findUnique({
    where: { name }
  });
  return Boolean(category);
}

async function yearExists(name) {
    const year = await database.year.findUnique({
      where: { name }
    });
    return Boolean(year);
  }

async function addCategories() {
  for (const name of categoriesToAdd) {
    if (await categoryExists(name)) {
      console.log(`⚠️  ${name} already exists, skipping...`);
      continue;
    }

    try {
      await database.category.create({ data: { name } });
      

      console.log(`✅ ${name} added successfully.`);
    } catch (error) {
      console.log(`🔥 Error adding ${name}: ${error.message}`);
    }
  }
}

async function addYears() {
  for (const name of yearsToAdd) {
    if (await yearExists(name)) {
      console.log(`⚠️  ${name} already exists, skipping...`);
      continue;
    }

    try {
      await database.year.create({ data: { name } });
      

      console.log(`✅ ${name} added successfully.`);
    } catch (error) {
      console.log(`🔥 Error adding ${name}: ${error.message}`);
    }
  }
}



async function main() {
  try {
    await addCategories();
    
  } catch (error) {
    console.log("❌ Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

async function main1() {
    try {
      await addYears();
      
    } catch (error) {
      console.log("❌ Error seeding the database years", error);
    } finally {
      await database.$disconnect();
    }
  }

main();
main1();

