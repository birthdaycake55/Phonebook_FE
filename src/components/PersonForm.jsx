function PersonForm(props){
    return(
        <form onSubmit={props.func}>
        <div>
          name: <input value={props.name} onChange={props.handlename} />
          <br/>
          number: <input value={props.number} onChange={props.handlenumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}    

export default PersonForm