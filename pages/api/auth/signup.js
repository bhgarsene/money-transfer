import prisma from '../../../lib/prisma'
import bcrypt  from 'bcryptjs'

export default async (req,res)=>{
    const { name , email , password } = req.body
    console.log(req.body)
    const userExists = await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    if (userExists) {
        res.status(400).json({ status: 400, message: "Email already exists" });
        return;
    }else{
        try {
            console.log('trying')
            // save new user and create initial account for him/her
            const newUser = await prisma.user.create({
                data:{
                    name:name,
                    email:email,
                    password: await bcrypt.hash(password , 125),
                    
                }
            })
            console.log("data")
            if(newUser){
                res.status(200);
            }
            
        } catch (error) {
            res.status(500).json({
                error:error
            })
        }
    }

  }