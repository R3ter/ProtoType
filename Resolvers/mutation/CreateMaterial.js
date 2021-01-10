const CreateMaterial=(parent, {lookUp}, {req,prisma}, info)=>{
    return prisma.materials.create({
      data:{
        name:"",
        lookUp:{
          create:{
            eng:lookUp.eng,
            ar:lookUp.ar,
            fr:lookUp.fr
          }
        }
      }
    })
}
export default CreateMaterial