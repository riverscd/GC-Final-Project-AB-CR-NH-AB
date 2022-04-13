import { Link } from "react-router-dom";


export function GeneralMessageBoard() {

    return (
        <div>
            <h1>General Message Board</h1>

            <button>Create Post</button>

            <div className="message">
                <p> Message Title: </p>
                <p> Username of Author: </p>
                <p> Date Posted </p>
                <p> Message Body: PUT THIS ON MESSAGE PAGE NOT MAIN BOARD </p>
                <p>Show Replies on Main Board like below
                    or show reply count and click Message to see Replies?</p>
                <button>reply</button> <button>way for creator to delete?</button>  <button>way to report?</button>
            </div>

            <div className="reply">
                <p> Username of Reply Author: </p>
                <p> Date Posted </p>
                <p> Reply Body: </p>
                <p>if allow replies to replies, indicate re: to somehow?</p>
                <button>reply?</button> <button>way for creator to delete</button> <button>way to report?</button>
            </div>

            <div className="reply">
            <p> Username of Reply Author: </p>
                <p> Date Posted </p>
                <p> Reply Body: </p>
                <button>reply?</button>  <button>way to report?</button>
            </div>

            <div className="message">
                <p> Message Title: </p>
                <p> Username of Author: </p>
                <p> Date Posted </p>
                <p> Message Body: </p>
                <button>reply</button> <button>way to report?</button>
            </div>

            <div className="reply">
            <p> Username of Reply Author: </p>
                <p> Date Posted </p>
                <p> Reply Body: </p>
                <button>reply?</button> <button>way to report?</button>
            </div>

            <div className="message">
                <p> Message Title: </p>
                <p> Username of Author: </p>
                <p> Date Posted </p>
                <p> Message Body: </p>
                <button>reply</button> <button>way to report?</button>
            </div>

            <div className="message">
                <p> Message Title: </p>
                <p> Username of Author: </p>
                <p> Date Posted </p>
                <p> Message Body: </p>
                <button>reply</button> <button>way to report?</button>
            </div>

            <div className="reply">
            <p> Username of Reply Author: </p>
                <p> Date Posted </p>
                <p> Reply Body: </p>
                <button>reply?</button> <button>way to report?</button>
            </div>

            <div className="reply">
            <p> Username of Reply Author: </p>
                <p> Date Posted </p>
                <p> Reply Body: </p>
                <button>reply?</button> <button>way to report?</button>
            </div>

            <div className="reply">
            <p> Username of Reply Author: </p>
                <p> Date Posted </p>
                <p> Reply Body: </p>
                <button>reply?</button> <button>way to report?</button>
            </div>



            <Link to="/sitenav">Home</Link>
        </div>
    )
}