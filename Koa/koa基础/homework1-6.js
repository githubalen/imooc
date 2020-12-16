const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body")

const Routers = new Router();
const app = new Koa();

Routers.prefix("/api");
Routers.post("/user",async (ctx)=>{
    let {body , header} = ctx.request;
    let role = header.role;
    if(role != "admin"){
        ctx.throw(401,"没权限");
    }else if(!body.name || !body.email){
        ctx.throw(404, "name与email不能为空");
    }else{
        ctx.body = {
            code : 200,
            data : body,
            msg : "success"
        }
    }
})

app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        ctx.status = err.status || err.statusCode
        ctx.body = {
            code: err.status,
            msg: err.message,
        }
    }
})       

app.use(koaBody());
app.use(Routers.routes()).use(Routers.allowedMethods());
app.listen(3000);