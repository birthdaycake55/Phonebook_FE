function PrintPersons(props){
    const numbersToShow = props.filter.length===0 ? props.arr : props.arr.filter(person=>person.name.toLowerCase().includes(props.filter.toLowerCase()))

    return(
        <>
        {numbersToShow.map(person=>
        <div key={person.name}>
        <p>{person.name } {person.number}</p>
        <button onClick={()=>props.funct(person.id)}>Delete {person.name}</button>
        </div>
        )}
        </>
    )
}

export default PrintPersons