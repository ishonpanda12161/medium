import { Blogs } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blogs }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center px-4 pt-16 gap-12">
 
        <div className="max-w-3xl w-full">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            {blog.title}
          </h1>
          <div className="flex items-center text-sm text-gray-500 mb-10">
            <span className="mx-2 text-gray-400">Posted on</span>
            <span>2nd December 2023</span>
          </div>
          <div className="prose prose-lg text-gray-800 leading-relaxed">
            {blog.content}
          </div>
        </div>

        <div className="col-span-4">
            <div className="text-slate-600 text-lg">
                Author
            </div>
            <div className="flex w-full">
                <div className="pr-4 flex flex-col justify-center">
                    <Avatar size={48} name={blog.author.name || "Anonymous"} />
                </div>
                <div>
                    <div className="text-xl font-bold">
                        {blog.author.name || "Anonymous"}
                    </div>
                    <div className="pt-2 text-slate-500">
                        {blog.author.name=="Ishon panda" ? "Hire Meeee!" : "Details about user"}
                    </div>
                </div>
            </div>  
        </div>
      </div>
    </div>
  );
};
