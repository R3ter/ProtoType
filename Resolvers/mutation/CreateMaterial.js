import { checkToken } from "../../methods/Tokens.js"

const CreateMaterial=async(parent, {lookUp,education_level}, {req,prisma}, info)=>{
  checkToken({token:req.headers.token,Roles:["TEACHER"]})

  return await prisma.materials.create({
    data:{
      education_level:{
        connect:{
          education_level
        }
      },
      name:"",
      lookUp:{
        create:{
          eng:lookUp.eng,
          ar:lookUp.ar,
          fr:lookUp.fr
        }
      }
    }
  }).then((e)=>{
    if(e)
      return true
  })
}
export default CreateMaterial