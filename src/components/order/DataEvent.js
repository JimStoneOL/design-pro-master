import { useEffect } from "react"
import { useCallback } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useHttp } from "../../utils/hooks/http.hook"
import { AuthContext } from "../../utils/context/AuthContext"
import { useContext } from "react"
import { useState } from "react"
import { NavLink } from "react-router-dom/cjs/react-router-dom"
import { serverUrl } from "../../utils/constants/serverUrl"

export const DataEvent=()=>{

    const eventId = useParams().id
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)
    const [eventDate, setEventDate]=useState([])
    const [form,setForm]=useState({})

    const getEventDateListByEventId= useCallback(async () => {
        try {
        
          const fetched = await request(`${serverUrl}/api/event/date/get/all/by/event/${eventId}`, 'GET', null, {
            Authorization: `Bearer ${token}`
          })
          setEventDate(fetched)
        } catch (e) {}
      },[token,request])
      
      useEffect(()=>{
        getEventDateListByEventId()
      } ,[getEventDateListByEventId])

      const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
      }

      const pressHandler=async event=>{
          form.eventId=eventId
          try {
             const fetched = await request(`${serverUrl}/api/event/date/create`, 'POST', {...form}, {
              Authorization: `Bearer ${token}`
            })
            getEventDateListByEventId()
          } catch (e) {}
      }

    return(<>
       <div className='lg:flex'>
    <div
      class="min-h-screen flex flex-col items-center justify-center"
    >
      <div
        class="
          flex flex-col
          bg-indigo-400
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-50
          max-w-md
        "
      >

        <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Дата
        </div>

        <div class="mt-10">
      
            <div class="flex flex-col mb-5">
              <label
                for="localDate"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >Дата:</label
              >
              <div class="relative">
                <div
                  class="
                    inline-flex
                    items-center
                    justify-center
                    absolute
                    left-0
                    top-0
                    h-full
                    w-10
                    text-gray-400
                  "
                >
                  <i class="fas fa-at text-blue-500"></i>
                </div>
                <input
                required
                autoComplete='off'
                  id="localDate"
                  type="date"
                  name="localDate"
                  onChange={changeHandler}
                  value={form.localDate}
                  class="
                    text-sm
                    placeholder-gray-500
                    pl-10
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Укажите дату"
                />
              </div>
            </div>
   
            <div class="flex w-full">
              <button
                onClick={pressHandler}
                class="
                  flex
                  mt-2
                  items-center
                  justify-center
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-rose-900
                  hover:bg-rose-700
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in
                "
              >
                <span class="mr-2 uppercase">Отправить</span>
                <span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              </button>
            </div>
       
        </div>
      </div>
    </div>   
    <div class="my-12 mx-auto px-4 md:px-12">
    <div class="items-center -mx-1 lg:-mx-4">
    <div className='grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4'>
   {eventDate.map(item=>{
    return(
      <div
      class="block">
      <div class="p-6">
        <h5
          class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {item.localDate}
        </h5>
      </div>
   
<NavLink to={`/time/${item.id}`}>
  Посмотреть
</NavLink>
    </div>
    )
   })}
   </div>
   </div>
      </div>
      </div>
    </>)
}

