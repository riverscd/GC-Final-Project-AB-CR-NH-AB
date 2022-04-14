import { Link, useNavigate } from "react-router-dom";


export function GeneralMessageBoard() {
    const navigate = useNavigate();

    function handleClick(){
        navigate("/message")
    }

    return (
        <div>
            <h1>General Message Board</h1>

            <button>Create Post</button>

            <div className="message">
            <Link to ="/message" > Message Title: </Link>
                <p> Username of Author: </p>
                <p> Date Posted: </p>
                <p> Message Body: PUT THIS ON MESSAGE PAGE NOT MAIN BOARD </p>
                <p># of replies </p>
                <button onClick= {handleClick}>reply</button>  
            </div>


            <div className="message">
            <Link to ="/message" > Message Title: </Link>
                <p> Username of Author: </p>
                <p> Date Posted: </p>
                <p> Message Body: </p>
                <p># of replies </p>
                <button>reply</button> 
            </div>

         
            <div className="message">
            <Link to ="/message" > Message Title: </Link>
                <p> Username of Author: </p>
                <p> Date Posted: </p>
                <p> Message Body: </p>
                <p># of replies </p>
                <button>reply</button> 
            </div>

            <div className="message">
            <Link to ="/message" > Message Title: </Link>
                <p> Username of Author: </p>
                <p> Date Posted: </p>
                <p> Message Body: </p>
                <p># of replies </p>
                <button>reply</button>
            </div>

           



            <Link to="/sitenav">Home</Link>
        </div>
    )
}