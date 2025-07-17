import express from "express";
import {
  AddUser,
  claim,
  getAllusers,
  getHistory,
} from "../controllers/user.controller";

const router = express.Router();

router.get("/getalluser", getAllusers);

router.post("/adduser", AddUser);

router.post("/claim", claim);

router.get("/history", getHistory);

export default router;
