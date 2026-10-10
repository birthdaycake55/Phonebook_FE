function Notification({message,setting}){
    if (message===null){
        return null
    }
    
    return(
        <div className={setting}>
            {message}
        </div>
    )
}

export default Notification