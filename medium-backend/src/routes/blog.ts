import { Hono } from "hono";
import { decode, sign, verify } from 'hono/jwt';
import { PrismaClient } from "../../prisma/generated/client/edge.js";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput , updateBlogInput} from "@ishonpanda/medium-common";
import { title } from "process";



export const blogRouter = new Hono<{
    Bindings:{
        DB_URL : string,
        JWT_SECRET : string,
    },
    Variables:{
        userId: number,
    }
}>();


//Middleware 
blogRouter.use('/*', async (c,next) => {
    // Extract token from Authorization header. Accept both raw token and 'Bearer <token>' formats.
    const authHeader = c.req.header("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.substring(7) : authHeader;
    if(!token){
        c.status(401);
        return c.json({ msg: "Missing authorization token" });
    }
    try{
        const user = await verify(token,c.env.JWT_SECRET);
        c.set("userId",Number((user as any).id));
        await next();
    }catch(e){
        c.status(403);
        return c.json({ msg:"Invalid or expired token" });
    }
});


blogRouter.post('/',async (c) => {

    const body = await c.req.json();

    const { success } = createBlogInput.safeParse(body);
    if(!success)
    {
        c.status(411);
        return c.json({
            msg:"Invalid Format"
        });
    }
    try{
        const prisma = new PrismaClient({ datasourceUrl: c.env.DB_URL }).$extends(withAccelerate());

        

        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: c.get("userId"),

            }
        });

        return c.json({
            id:blog.id,

        });
    }catch(e)
    {
        return c.text("ERROR in POSTING BLOG");
    }
});


blogRouter.put('/',async (c) => {
    const body = await c.req.json();

    const { success } = updateBlogInput.safeParse(body);
    if(!success)
    {
        c.status(411);
        return c.json({
            msg:"Invalid Format"
        });
    }


    try{
        const prisma = new PrismaClient({ datasourceUrl: c.env.DB_URL }).$extends(withAccelerate());
        const blog = await prisma.post.update({
            where: {
                id:body.id
            },
            data:{
                title: body.title,
                content: body.content
            }
        })

        return c.json({
            blogId :blog.id,
        });
    }catch(e)
    {
        return c.text("ERROR in Updating BLOG");
    }
});

//TODO: Add PAGINATION 
blogRouter.get('/bulk',async (c) => {
    try{
        const prisma = new PrismaClient({ datasourceUrl: c.env.DB_URL }).$extends(withAccelerate());


        const blogs = await prisma.post.findMany({
            select:{
                content: true,
                title: true,
                id:true,
                author:{
                    select:{
                        name: true
                    }
                }
            }
        });

        return c.json({
            blogs,
        });
    }
     catch(e)
     {
        return c.text("Error in getting Bulk ");
     }
});



blogRouter.get('/:id',async (c) => {
    const id = c.req.param("id");
    try{
        const prisma = new PrismaClient({ datasourceUrl: c.env.DB_URL }).$extends(withAccelerate());

        const blog = await prisma.post.findUnique({
            where: {
              id: Number(id),
            },
            select: {
              title: true,
              content: true,
              author: {
                select: {
                  name: true,
                }
              }
            }
          });
          
          return c.json({ blog });
          
    }catch(e)
    {
        return c.text("ERROR in finding Body of POST");
    }
});

