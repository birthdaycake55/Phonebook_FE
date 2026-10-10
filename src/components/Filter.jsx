function Filter(props){  
    return(  
    <div>
        filter shown with <input value={props.value} onChange={props.function} />
      </div>
    )}

export default Filter