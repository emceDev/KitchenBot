import express from "express";
import {
  getReceipeDetails,
  getReceipeList,
  receipeCreate,
  receipeUpdate,
  receipeConfigure,
} from "../controller/receipe";

export const receipeRouter = express.Router({ mergeParams: true });

receipeRouter.post("/create", receipeCreate);
receipeRouter.get("/list", getReceipeList);
receipeRouter.patch("/:r_id/update", receipeUpdate);
receipeRouter.patch("/:r_id/configure", receipeConfigure);
receipeRouter.get("/:r_id/", getReceipeDetails);
