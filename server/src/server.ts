//import zone
import express from "express";
import { MongoClient } from "mongodb";
import { login } from "./controller/LoginController";
import { signup } from "./controller/SignUpController";
import { postbook } from "./controller/admin/PostBookcontroller";
import { config } from "./lib/config";
import bodyparser from "body-parser";
import multer from "multer";
import { changePassword } from "./controller/changePasswordController";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getalluser } from "./controller/admin/GetalluserController";
import { searchbook } from "./controller/SearchController";
import { getDataUserByID } from "./controller/admin/GetdataUserById";
import { checkToken } from "./controller/CheckTokenController";
import { getallBooks } from "./controller/admin/GetAllBooks";
import { deleteBookByID } from "./controller/admin/DeletBookByID";
import { deleteUserByID } from "./controller/admin/DeleteUserById";
import { logout } from "./controller/logoutController";
import { AaddAuthor } from "./controller/admin/AddAuthor";
import { AaddPublisher } from "./controller/admin/AddPublisher";
import { GetWriter } from "./controller/admin/GetWriter";
import { DeleteWritter } from "./controller/admin/DeleteWritter";
import {  AddCategory } from "./controller/admin/AddCategory";
import { getBookByID } from "./controller/GetBookByID";
import { AddtoCart } from "./controller/admin/AddtoCart";
import { getBookinCart } from "./controller/GetBookinCart";
import { getNewReleases } from "./controller/NewReleasesController";
import { DeleteBookinCart } from "./controller/DeleteBookinCart";
import { CheckoutController } from "./controller/CheckOutController";

//define zone
const port = config.port;
const uri = config.mongoURI;
const app = express();
app.use(bodyparser.json());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173" || config.origin,
    credentials: true,
  })
);

export const client = new MongoClient(uri);
export const secret = "HS256";
export const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to DB");
  } catch (e) {
    console.log("Error", e);
  }
};

const multerMid = multer({
  storage: multer.memoryStorage(),
});

app.use(multerMid.array("file"));

//rounter
app.get("/api/checkToken", checkToken);
app.get("/api/getallbooks", getallBooks);
// user router
app.post("/api/login", login);
app.post("/api/signup", signup);
app.put("/api/changepassword", changePassword);
app.get("/api/searchbook", searchbook);
app.get("/api/logout",logout);
app.get("/api/getBookByID/:id",getBookByID);
app.post("/api/addToCart",AddtoCart);
app.get("/api/getBookinCart",getBookinCart);
app.get("/api/getNewReleases",getNewReleases);
app.delete("/api/deleteBookinCart",DeleteBookinCart);
app.post("/api/checkout",CheckoutController);


//admin router
app.delete("/api/deleteWriter/:type/:id",DeleteWritter);
app.get("/api/getWriterBy/:writer",GetWriter);
app.delete("/api/deletebook/:id", deleteBookByID);
app.delete("/api/deleteuser/:id", deleteUserByID);
app.get("/api/getalluser", getalluser);
app.post("/api/postbook", postbook);
app.post("/api/addAuthor",AaddAuthor);
app.post("/api/addPublisher",AaddPublisher);
app.post("/api/addCatagory",AddCategory);
app.get("/api/getDataUserByID", getDataUserByID);


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
