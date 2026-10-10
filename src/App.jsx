import { useState, useEffect } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PrintPersons from './components/PrintPersons'
import phonebook from './services/phonebook'
import Notification from './components/Notification'


function App(){
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notifMsg, setNotifMsg] = useState(null)
  const [notifSetting, setNotifSetting] = useState(null)

  useEffect(()=>{
    phonebook
    .getAll()
    .then(numbers=>{
      console.log(numbers)
      setPersons(numbers)
  })},[])

  function addNumber(event){
      event.preventDefault()//to prevent the default action when clicking submit
      const nameObject = {
        name: newName,
        number: newNumber
      }
      if(persons.some(person=>person.name===newName) === true){
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
          const findP = persons.find(p => p.name == newName)
          const newP = {...findP, number: newNumber}

          phonebook
          .update(findP.id, newP)
          .then(replacedP=>{
            setPersons(persons.map(p => p.name !== newName ? p : replacedP))
            setNotifMsg(`${replacedP.name} got updated`)
            setNotifSetting('success')
            setTimeout(()=>{
              setNotifMsg(null)
            },5000)
          })
          .catch(error=>{
            setNotifMsg(`Information of ${findP.name} has already been removed from server`)
            setNotifSetting('error')
            setTimeout(()=>{
              setNotifMsg(null)
            },5000)
          })

        }
      }
      else{
        phonebook
        .create(nameObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setNotifMsg(`Added ${newPerson.name}`)
          setNotifSetting('success')
          setTimeout(()=>{
            setNotifMsg(null)
          },5000)
        })
    }
  }

  function deleteNumber(id){
    const person = persons.find(n => n.id === id)

    if (window.confirm(`Delete ${person.name}?`)){
      phonebook
      .remove(person.id)
      .then(()=>{
        setPersons(persons.filter(n=>n.id !== id))
        setNotifMsg(`${person.name} is now deleted`)
        setNotifSetting('success')
        setTimeout(()=>{
          setNotifMsg(null)
        },5000)
      }
      )
    }
  }

  function handleNameChange(event){
    setNewName(event.target.value)
  }

  function handleNumberChange(event){
    setNewNumber(event.target.value)
  }

  function handleFilterChange(event){
    setNewFilter(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMsg} setting={notifSetting}/>
      <Filter value={newFilter} function={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm func={addNumber} name={newName} handlename={handleNameChange} number={newNumber} handlenumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <PrintPersons arr={persons} filter={newFilter} funct={deleteNumber}/>
    </div>
  )
}

export default App