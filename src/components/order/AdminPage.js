
import { useMessage } from '../../utils/hooks/message.hook';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { useHttp } from '../../utils/hooks/http.hook';
import { Loader } from '../../utils/component/Loader';
import { NavLink, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { JsonToExcel } from 'react-json-to-excel';
import { serverUrl } from '../../utils/constants/serverUrl';



export const AdminPage=()=>{

  const message = useMessage()
  const {token} = useContext(AuthContext)
  const { request, error, clearError,loading} = useHttp()
  const [form,setForm]=useState({})
 const auth = useContext(AuthContext)
 const history = useHistory()
 const [events,setEvents]=useState([])
const [excelData,setExcelData]=useState([])


 const logoutHandler = event => {
  auth.logout()
  history.push('/')
}


  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])


const changeHandler = event => {
  setForm({ ...form, [event.target.name]: event.target.value })
}

const getExcelData = useCallback(async () => {

  try {
    const fetched = await request(`${serverUrl}/api/excel/get`, 'GET', null, {
      Authorization: `Bearer ${token}`
    })
    setExcelData(fetched)
  } catch (e) {}
}, [token, request])

useEffect(() => {
  getExcelData()
}, [getExcelData])

const getAllEvents = useCallback(async () => {

  try {
    const fetched = await request(`${serverUrl}/api/event/get/all`, 'GET', null, {
      Authorization: `Bearer ${token}`
    })
    setEvents(fetched)
  } catch (e) {}
}, [token, request])

useEffect(() => {
  getAllEvents()
}, [getAllEvents])


const deleteHandler=async (id)=>{
  try {
    const data = await request(`${serverUrl}/api/event/delete/${id}`, 'POST', null,{
      Authorization: `Bearer ${token}`
    })

    getAllEvents()
  }catch(e){}
}


const pressHandler=async event=>{
 
  try {
    const data = await request(`${serverUrl}/api/event/create`, 'POST', {...form},{
      Authorization: `Bearer ${token}`
    })

    getAllEvents()
  }catch(e){}
  
}

  
  if (loading) {
    return <Loader/>
  }
    return(<>
    <JsonToExcel 
     title="Download as Excel"
     data={excelData}
     fileName="sample-file"
    />
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
          Представление
        </div>

        <div class="mt-10">
      
            <div class="flex flex-col mb-5">
              <label
                for="name"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >Название:</label
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
                  id="name"
                  type="text"
                  name="name"
                  onChange={changeHandler}
                  value={form.name}
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
                  placeholder="Введите название"
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
   {events.map(item=>{
    return(
      <div
      class="block">
      <div class="p-6">
        <h5
          class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {item.name}
        </h5>
      </div>
<NavLink to={`/data/${item.id}`}>
  Посмотреть
</NavLink>
    </div>
    )
   })}
   </div>
   </div>
      </div>
      </div>
      <div
      class="block mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        <button
                type="submit"
                onClick={logoutHandler}
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
                <span class="mr-2 uppercase">Выйти</span>
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
    </>)    
}

     {/* <button onClick={()=>deleteHandler(item.id)} class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
  Удалить
</button> */}