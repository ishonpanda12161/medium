import { Hono } from 'hono';
import { userRouter } from './routes/user.js';
import { blogRouter } from './routes/blog.js';


const app = new Hono<{
  Bindings: {
    DB_URL: string,
    JWT_SECRET: string,
  }    
}>();

app.route("/api/v1/user",userRouter);
app.route("/api/v1/blog",blogRouter);


//

export default app;
