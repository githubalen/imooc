const Koa = require("koa");
const app = new Koa();

const middleware =  function async(ctx,next){
    console.log("middleware");
    console.log(ctx.request.path);
    next();
    console.log(0);
}

const middleware1 = function async(ctx,next){
    console.log("middleware1");
    next();
    console.log(1);
}

const middleware2 = function async(ctx,next){
    console.log("middleware2");
    next();
    console.log(2);
}

app.use(middleware1);
app.use(middleware);
app.use(middleware2);

app.listen(3000);