import type { Request, Response } from "express";
import { registerUser } from "../services/auth.service";


export function register(
  req: Request,
  res: Response
) {
  const {
    email,
    password
  } = req.body;


  const user = registerUser(
    email,
    password
  );


  res.status(201).json({
    id: user.id,
    email: user.email
  });
}