import { Request, Response } from "express";
import { User } from "../models/user.model";
import { userZodSchema } from "../lib/zod";
import { History } from "../models/history.model";

export const getAllusers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Error in get all users",
    });
  }
};

export const AddUser = async (req: Request, res: Response) => {
  //done
  const result = userZodSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      message: result.error.issues[0].message,
    });
    return;
  }
  try {
    const { email, name } = result.data;
    const existingUser = await User.findOne({
      email: email,
    });
    if (existingUser) {
      res.status(400).json({
        message: "Email address already exits ",
      });
      return;
    }
    const newUser = await User.create({
      name,
      email,
    });
    res.status(201).json(newUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal server error ",
    });
  }
};

export const claim = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const points = Math.floor(Math.random() * 10) + 1;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    user.points += points;
    await user.save();

    const history = await History.create({
      userId: userId,
      username: user.name,
      points: points,
    });

    res.json({ user, points });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error ",
    });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  try {
    const history = await History.find().sort({ claimedAt: -1 });
    res.status(201).json(history);
  } catch (error) {
    console.log("Error in get history" + error);
    res.status(500).json({ message: "Internal Server Error " });
  }
};
