"use strict";

import Router              from './Utlis/Router.js'

import Error404            from './views/Error404.js'
import Interviews          from './views/Interviews.js'
import ShowInterview       from './views/ShowInterview.js'
import NewInterview        from './views/NewInterview.js'
import EditInterview       from './views/EditInterview.js'

import Users               from './views/Users.js'
import ShowUser            from './views/ShowUser.js'
import NewUser             from './views/NewUser.js'
import EditUser            from './views/EditUser.js'

Router.addRoute( '/notfound'             , Error404          ,"Error404")
Router.addRoute( '/'                     , Interviews        ,"Interviews")
Router.addRoute( '/interviews'           , Interviews        ,"Interviews")
Router.addRoute( '/new_interview'        , NewInterview      ,"NewInterview")
Router.addRoute( '/interviews/:id'       , ShowInterview     ,"ShowInterview")
Router.addRoute( '/edit_interview/:id'   , EditInterview     ,"EditInterview")
Router.addRoute( '/users'                , Users             ,"Users")
Router.addRoute( '/users/:id'            , ShowUser          ,"ShowUser")
Router.addRoute( '/new_user'             , NewUser           ,"NewUser")
Router.addRoute( '/edit_user/:id'        , EditUser          ,"EditUser")

window.addEventListener('hashchange', Router.renderpage);
window.addEventListener('load', Router.renderpage);
