import prisma from '../../../lib/prisma'
import bcrypt  from 'bcryptjs'

export default async (req,res)=>{
    const { name , email , password  } = req.body
    //check empty fields

    if(!name || !email ||!password){
        res.status(400).json({
            "message":"Please Fill All Fields"
        })
        return;
    }

    
    //check if email is hasn't ben used before
    const checkIfUserExists = await prisma.user.findFirst({
        where:{
            email:email
        }
    })
    if (checkIfUserExists) {
        res.status(400).json({ status: 400, message: "User with such email already exists" });
        return;
    }else{
        
        try {
            // save new user and create initial account for him/her
            const newUser = await prisma.user.create({
                data:{
                    name:name,
                    email:email,
                    password: await bcrypt.hash(password , 8),
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
                }
            })
            if(newUser){
                res.status(200).json({ status: 200, message: "User Created successfully" });
            }
            
        } catch (error) {
            res.status(500).json({
                error:error
            })
        }
    }

  }