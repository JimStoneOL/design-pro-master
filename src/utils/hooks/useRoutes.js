import { Redirect, Route, Switch } from "react-router-dom"
import { AuthPage } from "../../components/auth/screen/AuthPage"
import { RegisterPage } from "../../components/auth/screen/RegisterPage"
import { AdminPage } from "../../components/order/AdminPage"
import { Home } from "../../components/order/Home"
import { DataEvent } from "../../components/order/DataEvent"
import { TimeEvent } from "../../components/order/TimeEvent"
import { FormEvent } from "../../components/order/FormEvent"



export const useRoutes=(isAuthenticated,role)=>{
   
    //Admin
  if(isAuthenticated && role==='ROLE_ADMIN'){
    return(
            <Switch>
            <Route path="/" exact>
            <AdminPage/>
        </Route>
        <Route path="/data/:id">
                <DataEvent/>
            </Route>
        <Route path="/time/:id">
                <TimeEvent/>
          </Route>
          <Route path="/form/:id">
                <FormEvent/>
          </Route>
        <Redirect to="/" />
        </Switch>
    )
    }
   
    else{
        return(
            <Switch>
            <Route path="/" exact>
              <Home/>  
            </Route>
            <Route path="/9bbfe027-4683-4cc3-9111-2d2ba579e2b3/login" exact>
              <AuthPage/>  
            </Route>
            <Route path="/9bbfe027-4683-4cc3-9111-2d2ba579e2b3/register" exact>
                <RegisterPage/>
            </Route>
            <Redirect to="/" />
        </Switch>
        )
}
}