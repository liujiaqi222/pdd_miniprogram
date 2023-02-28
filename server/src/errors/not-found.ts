import { Request, Response } from 'express';

export const notFound = (req: Request, res: Response) => res.status(404).send('api not exist')
