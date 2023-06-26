import { useEffect } from "react"
import { useCallback } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useHttp } from "../../utils/hooks/http.hook"
import { AuthContext } from "../../utils/context/AuthContext"
import { useContext } from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom/cjs/react-router-dom"
import { serverUrl } from "../../utils/constants/serverUrl"

export const FormEvent=()=>{

    const eventTimeId = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [form, setForm]=useState([])
    

    const getFormListByEventTimeId= useCallback(async () => {
        try {
        
          const fetched = await request(`${serverUrl}/api/form/get/all/by/event/${eventTimeId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          setForm(fetched)
        } catch (e) {}
      },[token,request])
      
      useEffect(()=>{
        getFormListByEventTimeId()
      } ,[getFormListByEventTimeId])


      const acceptHandler=async(id)=>{
        
        try {
           await request(`${serverUrl}/api/form/accept/${id}`, 'POST', null, {
            Authorization: `Bearer ${token}`
          })
          getFormListByEventTimeId()
        } catch (e) {}
    }


    return(<>
       <div className='lg:flex'>  
    <div class="my-12 mx-auto px-4 md:px-12">
    <div class="items-center -mx-1 lg:-mx-4">
    <div className='grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4'>
   {form.map(item=>{
    return(
      <div
      class="block">
      <div class="p-6">
        <h5
          class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {item.lastname+ ' '+item.firstname+' '+item.middleName}
        </h5>
        <div className="mb-2 font-medium leading-tight text-neutral-800 dark:text-neutral-50">{item.position+' '+item.division}</div>
        <div className="mb-2 font-medium leading-tight text-neutral-800 dark:text-neutral-50">{item.email}</div>
        <div className="mb-2 font-medium leading-tight text-neutral-800 dark:text-neutral-50">Забронировано билетов: {item.booking}</div>
        <button onClick={()=>acceptHandler(item.id)} disabled={item.accepted} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
{item.accepted ? <div>Одобрено</div> : <div>Одобрить</div>}
</button> 
      </div>
    </div>
    )
   })}
   </div>
   </div>
      </div>
      </div>
    </>)
}
