import express = require("express");
import * as dotenv from "dotenv";
import { Main } from "./main";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.listen(port || 3000, () =>
  console.log(`Server is Running on port ${port || 3000}`)
);

let mainService = new Main()

 mainService.jiraSchedule()
