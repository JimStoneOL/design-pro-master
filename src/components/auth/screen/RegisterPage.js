import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../utils/context/AuthContext'
import { useAuth } from '../../../utils/hooks/auth.hook'
import { useHttp } from '../../../utils/hooks/http.hook'
import { useMessage } from '../../../utils/hooks/message.hook'
import logo from '../../../utils/img/logo.jpg'
import { serverUrl } from '../../../utils/constants/serverUrl'

export const RegisterPage=()=>{


  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, request, error, clearError} = useHttp()
  const [form, setForm] = useState({})
  const [alert,setAlert]=useState(null)


  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request(`${serverUrl}/api/auth/signup`, 'POST', {...form})
      setAlert(data)
    } catch (e) {}
  }
    return(
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
             <img src={logo}/>
        <div class="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Регистрация
        </div>

        <div class="mt-10">
      
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
            <div class="flex flex-col mb-6">
              <label
                for="password"
                class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >Пароль:</label
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
                  <span>
                    <i class="fas fa-lock text-blue-500"></i>
                  </span>
                </div>

                <input
                required
                autoComplete='off'
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
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
                  placeholder="Введите пароль"
                />
              </div>
            </div>
            <div class="flex flex-col mb-6">
              <label
                for="password"
                class="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >Подтвердите пароль:</label
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
                  <span>
                    <i class="fas fa-lock text-blue-500"></i>
                  </span>
                </div>

                <input
                required
                autoComplete='off'
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  onChange={changeHandler}
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
                  placeholder="Введите пароль ещё раз"
                />
              </div>
            </div>

            <div class="flex w-full">
              <button
                type="submit"
                onClick={registerHandler}
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
                <span class="mr-2 uppercase">Зарегистрироваться</span>
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
      <div class="flex justify-center items-center mt-6">
        <a
          href="#"
          target="_blank"
          class="
            inline-flex
            items-center
            text-gray-700
            font-medium
            text-xs text-center
          "
        >
          <span class="ml-2"
            >Есть аккаунт?
            <NavLink
              to="/9bbfe027-4683-4cc3-9111-2d2ba579e2b3/login"
              class="text-xs ml-2 text-blue-500 font-semibold"
              >тогда сюда</NavLink
            ></span
          >
        </a>
      </div>
      {alert && <div class="bg-indigo-900 text-center py-4 mt-2 lg:px-4">
  <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
    <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">{alert.message}</span>
    <span class="font-semibold mr-2 text-left flex-auto"></span>
  </div>
</div>}
    </div>
    )
}