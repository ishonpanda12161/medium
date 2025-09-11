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
    //here , extract the author id , and pass it to the user for referencing 
    // in the foreign key for posting the posts 

    const token = c.req.header("Authorization") || "";

    try{
        const user = await verify(token,c.env.JWT_SECRET);

    c.set("userId",Number(user.id));
    await next();
    }catch(e)
    {
        c.status(403);
        return c.json({
            msg:"Not Logged in "
        })
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

