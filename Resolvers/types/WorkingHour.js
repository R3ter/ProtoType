import { checkToken } from "../../methods/Tokens.js"
const WorkingHour={
    async userBooked(parent, args, {req}){
    const {id} = checkToken({token:req.headers.token})

        return parent.bookedStudentID===id
    }
}
export default WorkingHour