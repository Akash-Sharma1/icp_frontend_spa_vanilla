"use strict";

import Router       from './Utlis/Router.js'

import Error404     from './views/Error404.js'
import Interviews       from './views/Interviews.js'
import ShowInterview       from './views/ShowInterview.js'
import NewInterview       from './views/NewInterview.js'
import EditInterview       from './views/EditInterview.js'

import Users       from './views/Users.js'
import ShowUser       from './views/ShowUser.js'
import NewUser       from './views/NewUser.js'


Router.addRoute( '/notfound'             , Error404 )
// Router.addRoute( '/'                     , Interviews )
Router.addRoute( '/interviews'           , Interviews )
Router.addRoute( '/new_interview'      , NewInterview )
Router.addRoute( '/interviews/:id'       , ShowInterview )
Router.addRoute( '/edit_interview/:id' , EditInterview )
Router.addRoute( '/users'               , Users )
Router.addRoute( '/users/:id'        , ShowUser )
Router.addRoute( '/new_users'        , NewUser )
// Router.addRoute( '/users/:id/edit'       , EditUser )

window.addEventListener('hashchange', Router.renderpage);
window.addEventListener('load', Router.renderpage);
