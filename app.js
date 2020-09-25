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
Router.addRoute( '/interviews/new'        , NewInterview      ,"NewInterview")
Router.addRoute( '/interviews/<int>:id'       , ShowInterview     ,"ShowInterview")
Router.addRoute( '/interviews/<int>:id/edit'   , EditInterview     ,"EditInterview")
Router.addRoute( '/users'                , Users             ,"Users")
Router.addRoute( '/users/<int>:id'            , ShowUser          ,"ShowUser")
Router.addRoute( '/users/new'             , NewUser           ,"NewUser")
Router.addRoute( '/users/<int>:id/edit'        , EditUser          ,"EditUser")

window.addEventListener('hashchange', Router.renderpage);
window.addEventListener('load', Router.renderpage);
