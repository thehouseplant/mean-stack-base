"use strict";

import * as express  from 'express';

import { Home }      from "./home.controller";
import { Main }      from "./main.controller";



export function Routes ( app: express.Application ) {

    app.use( "/", Home );
    app.use( "/main", Main );

}
