import { checkToken } from "../../methods/Tokens.js"

const CreateMaterial=(parent, {lookUp,education_level}, {req,prisma}, info)=>{
  checkToken(req.headers.token)
  return prisma.materials.create({
    data:{
      education_level,
      name:"",
      lookUp:{
        create:{
          eng:lookUp.eng,
          ar:lookUp.ar,
          fr:lookUp.fr
        }
      }
    }
    ,include:{
      lookUp:true
    }
  })
}
export default CreateMaterial