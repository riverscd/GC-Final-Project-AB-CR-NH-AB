import { Link } from "react-router-dom";

export function Message(){


    return (
        <div>
            <Link to="/generalmessageboard">Back to Message Board</Link>
          <div className="message">
                <p> Message Title: </p>
                <p> Username of Author: </p>
                <p> Date Posted: </p>
                <p> Message Body: </p>
                <button>reply</button> 
            </div>

            <div className="reply">
                <p> Username of Reply Author: </p>
                <p> Date Posted: </p>
                <p> Reply Body: </p>
                
                 
            </div>

            <div className="reply">
            <p> Username of Reply Author: </p>
                <p> Date Posted: </p>
                <p> Reply Body: </p>
                
            </div>
            <div className="reply">
            <p> Username of Reply Author: </p>
                <p> Date Posted: </p>
                <p> Reply Body: </p>
                  
            </div>


           
          
         
          


        </div>
    )
}