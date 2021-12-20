const { PrismaClient } = require('@prisma/client')
const { initialUsers } = require ('./seeds/users')
const bcrypt = require('bcrypt');

const prisma = new PrismaClient()

async function main(){
   await prisma.user.create({
      data: {
            names:'Steph Curry',
            email:'stepg@gmail.com',
            password: await bcrypt.hash("password" , 8),
            accounts :{
                create:[{
                    amount:1000,
                    currency:"USD"
                },{
                    amount:0,
                    currency:"NGN"
                },{
                  amount:0,
                  currency:"EUR"
                }],
            },
        },
   })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });