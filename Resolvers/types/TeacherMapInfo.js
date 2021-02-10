const getTeachersOnMap={
    async description(parent, args, {req}){
        return parent.description[req.headers.lang||"eng"]
    }
}
export default getTeachersOnMap