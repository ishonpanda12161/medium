import z from "zod";

//variables my backend will need ! 
export const signupInput = z.object({
    email: z.string(),
    password: z.string().min(5),
    name: z.string().optional(),
})

export const signinInput = z.object({
    email: z.string(),
    password: z.string().min(5),
    name: z.string().optional(),
})

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
});

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id:z.number(),
});


//type inferencing (my frontend will need)
export type SignupInput = z.infer<typeof signupInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type SigninInput = z.infer<typeof signinInput>;

