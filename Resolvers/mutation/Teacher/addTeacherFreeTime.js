import {checkToken} from './../../../methods/Tokens.js'
import moment from 'moment'
const addMyFreeTime=async(parent, {fromTo}, {req,prisma}, info)=>{
  
  const {id} = checkToken({Roles:"TEACHER",token:req.headers.token})
  fromTo.map((e)=>{
    if(moment(e.from).format('YYYY-MM-DD')!=moment(fromTo[0].from).format('YYYY-MM-DD')){
      throw new Error("date is not correct!")
    }
    if(moment(e.from).format('YYYY-MM-DD') !== moment(e.to).format('YYYY-MM-DD')){
      throw new Error("date is not correct!")
    }
    if(moment(e.from).format('mm')!="00" && moment(e.from).format('mm')!="30"){
      throw new Error("date is not correct!")
    }
    if(moment(e.to).format('mm')!="00" && moment(e.to).format('mm')!="30"){
      throw new Error("date is not correct!")
    }
  })
  fromTo.forEach((element,index) => {
    fromTo.forEach((e,index1)=>{
      if(index!=index1){
        if(moment(element.from).isBetween(e.from,e.to)||
        moment(element.to).isBetween(e.from,e.to)){
          throw new Error("times is duplicated")
        }
      }
    })
  })
  fromTo.sort((a, b)=>{
    return a.to - b.to
  })
  
  return await prisma.teacherProfile.update({
      where:{
        teacherId:id
      },
      data:{
          workingDays:{
          upsert:{
            where:{
              teacherIdAndDay:id+moment(fromTo[0].from).format('dddd').toLowerCase()
            },
            create:{
              teacherIdAndDay:id+moment(fromTo[0].from).format('dddd').toLowerCase(),
              day:moment(fromTo[0].from).format('dddd').toLowerCase(),
              hours:fromTo.map((e)=>e.from+"/-/"+e.to)                
            },
            update:{
              hours:fromTo.map((e)=>e.from+"/-/"+e.to)
            }
          }
        }
      }
    }).then((e)=>{
      return !!e
    }).catch((e)=>{
      return false})
}

export default addMyFreeTime 