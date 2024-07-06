import { Request, Response } from 'express';

class HealthController {
  get() {
    return [
      (_req: Request, res: Response) => {
        res.sendStatus(200);
      },
    ];
  }
}

export default HealthController;
