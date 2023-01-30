const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoute = require("./routes/User");
const examQuestionsRoute = require("./routes/ExamQuestions");
const userExamsRoute = require("./routes/UserExams");
const examRoute = require("./routes/Exam");
const Files = require("./routes/Files");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const morgan = require("morgan");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// MIDDLEWARE
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "100mb",
    extended: true,
  })
);
app.use(cookieParser());

app.use("/users", userRoute);
app.use("/examquestions", examQuestionsRoute);
app.use("/exam", examRoute);
app.use("/userexams", userExamsRoute);
app.use("/files", Files);
// app.use(express.static(path.join(__dirname, "..", "build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });
app.listen(5000, () => {
  console.log("Server started on 5000");
});
