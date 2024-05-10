const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const coursesRouter =  require("./routers/courses");
const aboutUs = require("./routers/aboutUs");
const coursesInCat = require("./routers/coursesInCategory");
const summaries = require("./routers/summaries");
const articles = require("./routers/articles");

app.use(coursesRouter);
app.use(aboutUs);
app.use(coursesInCat);
app.use(summaries);
app.use(articles);

const PORT = 3001;

app.listen(PORT, ()=> {
    console.log(`the server listening at ${PORT}`);
})
