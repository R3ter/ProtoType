const Authentication={
    isActive(parent){
        if(parent.Role=="ADMIN"){
            return true
        }
        return parent.isActive
    },
  isInfoComplet(parent){
    if(parent.Role=="ADMIN"){
        return true
    }
    return parent.isInfoComplet
  },
  materialSet(parent){
    if(parent.Role=="ADMIN"){
        return true
    }
    return parent.materialSet
  }
}
export default Authentication