import { Link } from "react-router-dom";



interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate : string,
    id:number,
};

//not yet implemented read time , so random func
export const BlogCard = ({authorName, title, content, publishedDate,id}: BlogCardProps) => {
    return (
      <Link to={`/blog/${id}`}>
      <div className="p-4 border-b-2 border-gray-200 pb-6 mb-6 transition-colors duration-200 hover:bg-gray-50 rounded-lg cursor-pointer">
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Avatar size={24} name={authorName} />
          <span className="ml-2 font-medium text-gray-900">{authorName}</span>
          <span className="mx-1 text-gray-400">·</span>
          <span className="text-gray-500">{publishedDate}</span>
        </div>

        <div className="text-xl font-semibold text-gray-900 leading-tight mb-2">
          {title}
        </div>

        <div className="text-sm text-gray-700 leading-relaxed mb-3">
          {content.slice(0, 100) + "..."}
        </div>
  
        <div className="text-xs text-gray-500">
          {`${Math.ceil(content.length / 100)} min read`}
        </div>
      </div>
      </Link>
    );
  };
  

  export function Avatar({ name, size = 48 }: { name: string; size?: number }) {
    const initial = name?.trim()?.[0]?.toUpperCase() || '?';
    return (
      <div
        style={{ width: size, height: size }}
        className="relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full dark:bg-gray-600"
        aria-label={`Avatar for ${name || 'unknown user'}`}
        title={name || 'Unknown user'}
      >
        <span className="text-xs font-thin text-gray-300">{initial}</span>
      </div>
    );
  }
  