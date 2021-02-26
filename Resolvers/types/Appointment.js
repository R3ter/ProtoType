import moment from 'moment'
const Appointment={
    time(parent, args, {req}){
        return {
            from:moment(parent.from).format("HH:mm a"),
            to:moment(parent.to).format("HH:mm a")
        }
    }
}
const Appointment_state={
    name(parent, args, {req}){
        return parent.name[req.headers.lang||"eng"]
    }
}
export default {Appointment,Appointment_state}