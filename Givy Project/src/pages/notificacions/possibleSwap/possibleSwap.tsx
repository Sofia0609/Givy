import { useEffect, useState } from 'react'
import './possibleSwap.css'
import NavBar from '../../../components/navBar/navBar'
import Header from '../../../components/header/header'
import EntityCard from '../../../components/notifications/entityCard/entityCard'
import swapRequests from '../../../data/swapRequests.json'
import users from '../../../data/users.json'


function PossibleSwap() {
  const userLogged = "u5"

  const [filteredSwap, setSwapRequest] = useState([])
  const [filteredUser,setUser] = useState<any>({})

  useEffect(() => {
  // Setup: Code to run after render
  
  function getUserbyID(id){
    const user = users.find((user)=> user.id === id)
    setUser(user)
    console.log(user)

  }

  function getSwapbyUser(user){
    const swapUser = swapRequests.filter((request)=> request.toUserId === user)
    console.log(swapUser );
    
    setSwapRequest(swapUser)

  } 
  getUserbyID(userLogged);
  getSwapbyUser(userLogged);
}, []);




  return (
    <><div className='swapLayout'>
      <div>
          <NavBar></NavBar>
      </div>
      <div className='swapContent'>
          <Header title='Swap?'></Header>   

          <div className='swapSectionsContainer'>
            <div className='swap'>
                <h2 className='swapTitle'>Do you wanna Swap?</h2>
                { 
                    filteredSwap.map((swap,key)=>{
                        console.log(filteredUser.username);
                        
                      return(
                      <>
                      <EntityCard id={String(key)} photo={filteredUser.photo} name={filteredUser.username} content={swap.tagOffered} content2={swap.tagRequested} desicionButtons = {true}></EntityCard>
                      </>                    
                          )
                    } 
                )
                }
            </div>
            <div className='swap'>
                <h2 className='swapTitle'>Match Status</h2>
                <EntityCard photo='./src/assets/profile_picture.png' name="Carla Gonzales"  content='music' content2='desing'></EntityCard>
                <EntityCard photo='./src/assets/profile_picture.png' name="Sofia Velez"  content='teatre' content2='fotografy'></EntityCard>
                <EntityCard photo='./src/assets/profile_picture.png' name="Alejandro Arango"  content='writting' content2='singing'></EntityCard>
          </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default PossibleSwap