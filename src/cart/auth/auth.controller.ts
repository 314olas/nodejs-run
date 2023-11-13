import express, { Response, Request } from "express";
import { authService } from "./auth.service";
import { checkLoginReq, checkRegisterReq } from "../../middlewares/auth.validator";

const router = express.Router();

router.post('/login', checkRegisterReq, async (req: Request, res: Response) => {
    try {
        const token = await authService.login(req.body);

        if (token) {
            res.json({data: token, error: null});
            return;
        }
        res.status(401);
        res.send({data: null, error: 'User is not authorizes'});
    } catch (error) {
        res.status(500);
        res.send({data: null, error: 'something went wrong'});
    }

});

router.post('/register', checkLoginReq, async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);

        if (user) {
            res.json({data: user, error: null});
            return;
        }
        res.status(401);
        res.send({data: null, error: 'User is not authorizes'});
    } catch (error) {
        res.status(500);
        res.send({data: null, error: 'something went wrong'});
    }

});

export const authRouter = router;