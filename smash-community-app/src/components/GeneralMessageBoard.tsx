import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Post, Posts } from "../models/posts";
import { GetAllPosts } from "../services/posts";


export function GeneralMessageBoard() {

    const [allPosts, setAllPosts] = useState<any>([]);
    const navigate = useNavigate();

    useEffect(() => {
       
        GetAllPosts().then((data: any) => {
          setAllPosts(data);
        });
      }, []);

    function handleClick(){
        navigate("/post")
    }

    return (
        <div>
            <h1>General Message Board</h1>

            <button>Create Post</button>

            {allPosts.map((post: Post) => (
          <div className="message">
            <ul>
              <li
                key={post.id}
              ><Link to ="/post" > {`post title: ${post.post_title}`}</Link></li>
              <li>{`post author: ${post.author_id}`}</li>
              <li>{`post message: ${post.post_message}`}</li>
              <li>{`post date: ${post.date_created}`}</li>
              <li># of replies</li>
              <button onClick= {handleClick}>reply</button>  
            </ul>
            </div>
        ))}

            {/* <div className="message">
            <Link to ="/post" > Title: </Link>
                <p> Username of Author: </p>
                <p> Date Posted: </p>
                <p> Message Body: PUT THIS ON MESSAGE PAGE NOT MAIN BOARD </p>
                <p># of replies </p>
                <button onClick= {handleClick}>reply</button>  
            </div>


            <div className="message">
            <Link to ="/post" > Message Title: </Link>
                <p> Username of Author: </p>
                <p> Date Posted: </p>
                <p> Message Body: </p>
                <p># of replies </p>
                <button>reply</button> 
            </div>

         
            <div className="message">
            <Link to ="/post" > Message Title: </Link>
                <p> Username of Author: </p>
                <p> Date Posted: </p>
                <p> Message Body: </p>
                <p># of replies </p>
                <button>reply</button> 
            </div>

            <div className="message">
            <Link to ="/post" > Message Title: </Link>
                <p> Username of Author: </p>
                <p> Date Posted: </p>
                <p> Message Body: </p>
                <p># of replies </p>
                <button>reply</button>
            </div> */}

           



            <Link to="/sitenav">Home</Link>
        </div>
    )
}