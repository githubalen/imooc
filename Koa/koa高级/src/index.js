const koa = require("koa");
const app = new koa();
const helmet = require("koa-helmet");
const statics = require("koa-static");
const path = require("path")

const router = require("./routers/routers");
app.use(helmet());
app.use(statics(path.join(__dirname,"../public")));
app.use(router());

app.listen(3000);