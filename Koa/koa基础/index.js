const Koa = require("koa");
const Router = require("koa-router");
const cors = require("@koa/cors");
const koaBody = require("koa-body");
const json = require("koa-json");

const routers = new Router();
const app = new Koa();

routers.prefix("/api");

routers.get("/",ctx=>{
    console.log(ctx);
    console.log(ctx.request);
    ctx.body = "koa";
})

routers.get("/api",ctx=>{
    const params = ctx.request.query;
    ctx.body = params;
    console.log(params);
})

routers.get("/async", async ctx =>{
    let res = await new Promise(resolve=>{
        setTimeout(()=>{
            resolve("a few later");
        },2000)
    })
    ctx.body = res;
})

routers.post("/post",async(ctx)=>{
    let {body} = ctx.request;
    console.log(body);
    console.log(ctx.request);
    ctx.body = {
        ...body
    }
})

app.use(koaBody());
app.use(cors());
app.use(json({ pretty: false, param: 'pretty' }));
app.use(routers.routes()).use(routers.allowedMethods());

app.listen(3000);