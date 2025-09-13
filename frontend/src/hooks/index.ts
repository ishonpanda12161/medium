import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blogs {
            content: string,
            title: string,
            id: number,
            author: {
                name: string,
            }
}

export const useBlogs = () => {

    const [loading,setLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blogs[]>([]);

    useEffect(()=>{
        const controller = new AbortController();
        async function run(){
            try{
                const token = localStorage.getItem('token') || '';
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                    headers:{ Authorization: token },
                    signal: controller.signal
                });
                setBlogs(response.data.blogs);
            }catch(e:any){
                if(!axios.isCancel(e)){
                    if(e?.response?.status === 401 || e?.response?.status===403){
                        window.location.href = '/signin';
                    }
                    console.error('Failed to load blogs', e);
                }
            }finally{
                setLoading(false);
            }
        }
        run();
        return ()=> controller.abort();
    },[]);

    return {
        loading,
        blogs
    }

};

export const useBlog = ({id} : {id:string}) => {
    const [loading,setLoading] = useState(true);
    const [blog,setBlog] = useState<Blogs>();

    useEffect(()=>{
        const controller = new AbortController();
        async function run(){
            try{
                const token = localStorage.getItem('token') || '';
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
                    headers:{ Authorization: token },
                    signal: controller.signal
                });
                setBlog(response.data.blog);
            }catch(e:any){
                if(!axios.isCancel(e)){
                    if(e?.response?.status === 401 || e?.response?.status===403){
                        window.location.href = '/signin';
                    }
                    console.error('Failed to load blog', e);
                }
            }finally{
                setLoading(false);
            }
        }
        if(id) run();
        return ()=> controller.abort();
    },[id]);

    return {
        loading,
        blog
    }
};