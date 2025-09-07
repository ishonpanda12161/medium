import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt';
import { PrismaClient } from "../../prisma/generated/client/edge.js";
import { withAccelerate } from "@prisma/extension-accelerate";
import { signinInput,signupInput } from "@ishonpanda/medium-common";


export const userRouter = new Hono<{
    Bindings: {
      DB_URL: string,
      JWT_SECRET: string,
    }    
  }>();


//signup---------------------------------------------------------------------------------
userRouter.post('/signup', async (c) => {
    const body = await c.req.json();
  
    const { success } = signupInput.safeParse(body);
    if(!success)
    {
        c.status(411);
        return c.json({
            msg:"Invalid Format"
        });
    }
    try {
        const prisma = new PrismaClient({ datasourceUrl: c.env.DB_URL }).$extends(withAccelerate());

      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password,
          name: body.name,
        },
      });
  
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ token : "Bearer "+token });
    } catch (e) {
      console.error("Signup error:", e);
      return c.json({ msg: "Error", error: String(e) }, 403);
    }
  });
  //signin--------------------------------------------------------------------
  userRouter.post('/signin', async (c) => {
    const body = await c.req.json();

    const { success } = signinInput.safeParse(body);
    if(!success)
    {
        c.status(411);
        return c.json({
            msg:"Invalid Format"
        });
    }
    try {
        const prisma = new PrismaClient({ datasourceUrl: c.env.DB_URL }).$extends(withAccelerate());

  
      const user = await prisma.user.findUnique({
        where: { 
          email: body.email,
          password: body.password 
        },
      });
  
      if (!user) {
        c.status(403);
        return c.json({ error: "Invalid email or password" });
      }
  
      const token = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ msg: "Signed In!", token });
    } catch (e) {
      c.status(500);
      return c.json({ error: "Something went wrong"+e });
    }
  });