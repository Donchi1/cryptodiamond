import React from 'react'
import useGetDocWithClause from '../../components/hooks/UseGetDocWithClause'



function ChatHeader() {
  const [admin] = useGetDocWithClause({colls:"users",q:{path:"isAdmin", condition:"==", value: true}})
 
  return (
    <div className='bg-primary2 h-[12vh] flex justify-center items-center shadow-xl'>
    <div className="w-[95%] mx-auto flex justify-between items-center">
      <div className="flex gap-2 justify-center items-center">

      <img className='w-[50px] rounded-full' src={admin[0]?.photo}/>
      <span className='primary-text text-[17px]'>{admin[0]?.firstname}{" "}{admin[0]?.lastname}</span>
      <span className='inline-block w-2 h-2 rounded-full bg-green-500'></span>
      </div>
      <div>

     <p className='text-white text-[17px] uppercase'>Support Center</p>
      </div>
    </div>
  </div>
  )
}

export default ChatHeader