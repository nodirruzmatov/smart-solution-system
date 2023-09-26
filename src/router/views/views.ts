import { Router } from "express";
import users from "../../controller/users/users";
import views from "../../controller/views/views";

const ViewsRouter = Router();

export default ViewsRouter.get("/views", views.GetViews).post(
  "/create",
  views.AddView
);
