//imports
import { Router, Request, Response} from 'express';
import db from '../db/db';

// create router
const loginRouter = Router();

//create responses
// loginRouter.post('/', async (req: Request, res: Response) => {
//     const flag = await db.loginUser()
// })

export default loginRouter;
// module.exports = loginRouter;// exporting the loginRouter