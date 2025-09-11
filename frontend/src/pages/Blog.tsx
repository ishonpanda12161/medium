import { useParams } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { useBlog } from "../hooks";
import { FullBlog } from "../components/FullBlog";


export const Blog = () => {
    const { id } = useParams();

    const {loading,blog} = useBlog({
        id: id || "",
    });

    if (loading) {
        return (
          <div>
            <Appbar />
            <div className="flex justify-center">
              <div className="max-w-2xl w-full flex flex-col space-y-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    role="status"
                    className="animate-pulse space-y-4 p-4 border-b border-gray-200"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div className="h-3 bg-gray-200 rounded-full w-24"></div>
                      <div className="h-2 w-2 bg-gray-300 rounded-full"></div>
                      <div className="h-3 bg-gray-200 rounded-full w-20"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-full"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded-full w-16"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }


      return (
        <div>
          {blog ? <FullBlog blog={blog} /> : <div>Blog not found</div>}
        </div>
      );
      

};
