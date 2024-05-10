const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const articlesRouter =  require("./routers/courses");
const aboutUs = require("./routers/aboutUs");
const coursesInCat = require("./routers/coursesInCategory");

app.use(articlesRouter);
app.use(aboutUs);
app.use(coursesInCat);

const PORT = 3001;

app.listen(PORT, ()=> {
    console.log(`the server listening at ${PORT}`);
})
