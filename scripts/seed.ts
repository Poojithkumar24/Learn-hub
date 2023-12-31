const {PrismaClient} = require("@prisma/client");
const database = new PrismaClient();

async function main(){
    try{
        await database.category.createMany({
            data:[
                {name: "Computer Science"},
                {name: "machine learning"},
                {name: "music"},
                {name: "Health"},
                {name: "Data Science"},
                {name: "Digital Marketing"},
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