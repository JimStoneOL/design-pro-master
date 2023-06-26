import { useMessage } from '../../utils/hooks/message.hook';
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { useHttp } from '../../utils/hooks/http.hook';
import { Loader } from '../../utils/component/Loader';
import logo from '../../utils/img/logo.jpg'
import { NavLink } from 'react-router-dom'
import Select from 'react-select';
import { Alert } from '../../utils/component/Alert';
import { serverUrl } from '../../utils/constants/serverUrl';

export const Home=()=>{

    const message = useMessage()
    const {token} = useContext(AuthContext)
    const { request, error, clearError,loading} = useHttp()
    const [form,setForm]=useState({})
    const [events,setEvents]=useState([])
    const [select,setSelect]=useState(null)
    const [alert,setAlert]=useState(null)
    const [selectedOptions, setSelectedOptions] = useState();
    const [selectedOptionsData, setSelectedOptionsData] = useState();
    const [selectedOptionsTime, setSelectedOptionsTime] = useState();
    const [eventData,setEventData]=useState([])
    const [eventTime,setEventTime]=useState([])
    const [bookingMessage,setBookingMessage]=useState(null)
    const [firstnameAlert,setFirstnameAlert]=useState(null)
    const [lastnameAlert,setLastnameAlert]=useState(null)
    const [middleNameAlert,setMiddleNameAlert]=useState(null)
    const [positionAlert,setPositionAlert]=useState(null)
    const [divisionAlert,setDivisionAlert]=useState(null)
    const [emailAlert,setEmailAlert]=useState(null)
    const [bookingAlert,setBookingAlert]=useState(null)
    const [timeAlert,setTimeAlert]=useState(null)

    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
  
    const hasWhiteSpace=(s)=>{
      return s.indexOf(' ') >= 0;
    }

    const getAllEvents = useCallback(async () => {

      try {
        const fetched = await request(`${serverUrl}/api/event/get/all`, 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        let selectEvents = fetched.map(event => ({
          value: event.id,
          label: event.name
      }));
        setEvents(selectEvents)
      } catch (e) {}
    }, [token, request])
    
    useEffect(() => {
      getAllEvents()
    }, [getAllEvents])


    const getAllEventData = useCallback(async (id) => {

      try {
        const fetched = await request(`${serverUrl}/api/event/date/get/all/by/event/${id}`, 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        let selectEventsData = fetched.map(eventData => ({
          value: eventData.id,
          label: eventData.localDate
      }));
      setEventData(selectEventsData)
      } catch (e) {}
    }, [token, request])
  

    const getAllEventTime = useCallback(async (id) => {

      try {
        const fetched = await request(`${serverUrl}/api/event/time/get/all/by/event/date/${id}`, 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        let selectEventsTime = fetched.map(eventTime => ({
          value: eventTime.id,
          label: eventTime.localTime
      }));
      setEventTime(selectEventsTime)
      } catch (e) {}
    }, [token, request])


    const getDetail = useCallback(async (id) => {

      try {
        const fetched = await request(`${serverUrl}/api/event/time/get/detail/${id}`, 'GET', null, {
          Authorization: `Bearer ${token}`
        })
        setBookingMessage(fetched)
      } catch (e) {}
    }, [token, request])
  
  
    useEffect(() => {
      message(error)
      clearError()
    }, [error, message, clearError])

    
    const handleSelect=(data)=>{
      setSelectedOptions(data);
      setBookingMessage(null)
      setEventData([])
      setSelectedOptionsData(null)
      setEventTime([])
      setSelectedOptionsTime(null)
      getAllEventData(data.value)
    }

    const handleSelectData=(data)=>{
      setEventTime([])
      setBookingMessage(null)
      setSelectedOptionsTime(null)
      setSelectedOptionsData(data);
      getAllEventTime(data.value)
    }

    const handleSelectTime=(data)=>{
      setBookingMessage(null)
      setSelectedOptionsTime(data);
      getDetail(data.value)
    }
  
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }
  
  const pressHandler=async event=>{
    form.eventTimeId=selectedOptionsTime.value
    if(checkHandler()){
    }
    try {
      const data = await request(`${serverUrl}/api/form/create`, 'POST', {...form},{
        Authorization: `Bearer ${token}`
      })
      setAlert(data)
    }catch(e){}
  }

  const checkHandler=()=>{
    
    let firstnameError=""
    if(form.firstname==null || form.firstname==""){
      firstnameError+=" обязательное поле"
    }else{    
      form.firstname=form.firstname.trim()  
      if(form.firstname.replace(/\s/g, '').length<1){
        firstnameError+=" не меньше 1 символа"
      }
    }
    setFirstnameAlert(firstnameError)


    let lastnameError=""
    if(form.lastname==null || form.lastname==""){
      lastnameError+=" обязательное поле"
    }else{    
      form.lastname=form.lastname.trim() 
      if(form.lastname.replace(/\s/g, '').length<1){
        lastnameError+=" не меньше 1 символа"
      } 
    }
    setLastnameAlert(lastnameError)


    let middleNameError=""
    if(form.middleName==null || form.middleName==""){
      middleNameError+=" обязательное поле"
    }else{    
      form.middleName=form.middleName.trim()  
      if(form.middleName.replace(/\s/g, '').length<1){
        middleNameError+=" не меньше 1 символа"
      }
    }
    setMiddleNameAlert(middleNameError)


    let positionError=""
    if(form.position==null || form.position==""){
      positionError+=" обязательное поле"
    }else{    
      form.position=form.position.trim()  
      if(form.position.replace(/\s/g, '').length<1){
        positionError+=" не меньше 1 символа"
      }
    }
    setPositionAlert(positionError)


    let divisionError=""
    if(form.division==null || form.division==""){
      divisionError+=" обязательное поле"
    }else{    
      form.division=form.division.trim()  
      if(form.division.replace(/\s/g, '').length<1){
        divisionError+=" не меньше 1 символа"
      }
    }
    setDivisionAlert(divisionError)


    let emailError=""
    if(form.email==null || form.email==""){
      emailError+=" обязательное поле"
    }else
    if(hasWhiteSpace(form.email)){
      emailError+=" Без пробелов"
    }
    else{
      if(!validateEmail(form.email)){
        emailError+=" email согласно образцу"
      }
      if(form.email.length>400){
        emailError+=" не больше 400 символов"
      }
    }
    setEmailAlert(emailError)


    let bookingError=""
    if(form.booking==null || form.booking==""){
      bookingError+=" обязательное поле"
    }else{
      form.booking=form.booking.trim()
      let x=Number(form.booking)
      if(isNaN(x)){
        bookingError+=" не число"
      }else{
        if(!(x<=4)){
          bookingError+=" число больше 4"
        }
        if(!(x>0)){
          bookingError+=" число меньше 1"
        }
      }
    }
        setBookingAlert(bookingError)

        let timeError=""
        if(selectedOptionsTime==null){
          timeError+=" не выбрана дата"
        }
        setTimeAlert(timeError)

        if(bookingAlert=="" && firstnameAlert=="" && lastnameAlert=="" && middleNameAlert=="" && emailAlert=="" && positionAlert=="" && divisionAlert=="" && timeAlert==""){
          return true
        }
        return false
  }

  
    
    if (loading) {
      return <Loader/>
    }
      return(<>

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
          Анкета
        </div>

        <div class="mt-10">

        <Select
            options={events}
            placeholder="Выберите мероприятие"
            value={selectedOptions}
            onChange={handleSelect}
            isSearchable={true}
          />

          {eventData.length>0 && 
              <Select
              options={eventData}
              placeholder="Выберите дату"
              value={selectedOptionsData}
              onChange={handleSelectData}
              isSearchable={true}
            />
          }

          {eventTime.length>0 && 
              <Select
              options={eventTime}
              placeholder="Выберите время"
              value={selectedOptionsTime}
              onChange={handleSelectTime}
              isSearchable={true}
            />
          }
          {bookingMessage && <div>
            {bookingMessage.message}
            </div>}
            {timeAlert && <Alert message={timeAlert}/>}
            <div class="flex flex-col mb-5">
              <label
                for="firstname"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >Имя:</label
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
                  id="firstname"
                  type="text"
                  name="firstname"
                  onChange={changeHandler}
                  value={form.firstname}
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
                  placeholder="Введите имя"
                />
              </div>
            </div>
            {firstnameAlert && <Alert message={firstnameAlert}/>}
            <div class="flex flex-col mb-5">
              <label
                for="lastname"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >Фамилия:</label
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
                  id="lastname"
                  type="text"
                  name="lastname"
                  onChange={changeHandler}
                  value={form.lastname}
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
                  placeholder="Введите фамилию"
                />
              </div>
            </div>
            {lastnameAlert && <Alert message={lastnameAlert}/>}
            <div class="flex flex-col mb-5">
              <label
                for="middleName"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >Отчество:</label
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
                  id="middleName"
                  type="text"
                  name="middleName"
                  onChange={changeHandler}
                  value={form.middleName}
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
                  placeholder="Введите отчество"
                />
              </div>
            </div>
            {middleNameAlert && <Alert message={middleNameAlert}/>}
            <div class="flex flex-col mb-5">
              <label
                for="position"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >Должность:</label
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
                  id="position"
                  type="text"
                  name="position"
                  onChange={changeHandler}
                  value={form.position}
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
                  placeholder="Введите должность"
                />
              </div>
            </div>
            {positionAlert && <Alert message={positionAlert}/>}
            <div class="flex flex-col mb-5">
              <label
                for="division"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >Подразделение:</label
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
                  id="division"
                  type="text"
                  name="division"
                  onChange={changeHandler}
                  value={form.division}
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
                  placeholder="Введите подразделение"
                />
              </div>
            </div>
            {divisionAlert && <Alert message={divisionAlert}/>}
            <div class="flex flex-col mb-5">
              <label
                for="email"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >Почта:</label
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
                  id="email"
                  type="email"
                  name="email"
                  onChange={changeHandler}
                  value={form.email}
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
                  placeholder="Введите email"
                />
              </div>
            </div>
            {emailAlert && <Alert message={emailAlert}/>}
            <div class="flex flex-col mb-5">
              <label
                for="booking"
                class="mb-1 text-xs tracking-wide text-gray-600"
                >Сколько забронировать:</label
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
                  id="booking"
                  type="text"
                  max={4}
                  name="booking"
                  onChange={changeHandler}
                  value={form.booking}
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
                  placeholder="Введите количество билетов"
                />
              </div>
            </div>
            {bookingAlert && <Alert message={bookingAlert}/>}

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
            {alert && <div class="bg-indigo-900 text-center py-4 mt-2 lg:px-4">
  <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
    <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">{alert.message}</span>
    <span class="font-semibold mr-2 text-left flex-auto"></span>
  </div>
</div>}
        </div>
      </div>
    </div>   
         
              
      </>)    
}