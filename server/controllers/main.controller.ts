'use strict';

import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', status);

function status ( req: Request, res: Response ) {
    res.send('API is up and running');
}

export const Main: Router = router;