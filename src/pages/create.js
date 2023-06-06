import { useState } from "react";
import { useAppContext } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layout";

export default function Create(){
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [cover, setCover] = useState("");
    const [intro, setIntro] = useState("");
    const [completed, setCompleted] = useState(false );
    const [review, setReview] = useState("");

    const store = useAppContext();
    const navigate = useNavigate();

    function hanldeChange(e){
        const name = e.target.name;
        const value = e.target.value;

        switch(name){
            case "title":
                setTitle(value);
                break;
            case "author":
                setAuthor(value)
                break;
            case "intro":
                setIntro(value);
                break;
            case "completed":
                setCompleted(e.target.checked);
                break;
            case "review":
                setReview(value);
                break;
            default:
        }
    }

    function hanldeOnChangeFile(e){
        const element = e.target;
        const file = element.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file); 

        reader.onloadend =  function(){
            setCover(reader.result.toString());
        }
    }

    function handleSubmit(e){
        e.preventDefault();

        const newBook = {
            id: crypto.randomUUID(),
            title,
            author,
            cover,
            intro,
            completed,
            review,
        }

        store.createItem(newBook);
        navigate("/")
    }

    const inputStyles = {
        formContainer: {
            width: "400px",
            margin: "0 auto",
        },
        container: {
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            margin: "15px 0",
        },
        title: {
            fontSize: "16px",
            textAlign: "left",
            color: "white",
        },
        input: {
            padding: "10px",
            borderRadius: "5px",
            fontSize: "16px",
        },
        inputChek: {
            padding: "10px",
            borderRadius: "5px",
            fontSize: "16px",
            color: "white"
        },
        buttonStyle:{
            padding: "15px 20px",
            minWidth: "200px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#1e9638",
            color: "white",
            fontWeigth: "bolder",
            fontSize: "18px"
        }
    };

    return ( 
    <Layout>
        <form style={inputStyles.formContainer} onSubmit={handleSubmit}>
            <div style={inputStyles.container} >
                <div style={inputStyles.title} >Title</div>
                <input style={inputStyles.input} type="text" name="title" onChange={hanldeChange} value={title}/>
            </div>
            <div style={inputStyles.container} >
                <div style={inputStyles.title} >Author</div>
                <input style={inputStyles.input} type="text" name="author" onChange={hanldeChange} value={author}/>
            </div>
            <div style={inputStyles.container} >
                <div style={inputStyles.title} >Cover</div>
                <input style={inputStyles.inputChek} type="file" name="cover" onChange={hanldeOnChangeFile}/>
                <div>{ !!cover ? <img src={cover} width="200" alt="preview"/> : ""}</div>
            </div>
            <div style={inputStyles.container} >
                <div style={inputStyles.title} >Intro</div>
                <input style={inputStyles.input} type="text" name="intro" onChange={hanldeChange} value={intro}/>
            </div>
            <div style={inputStyles.container} >
                <div style={inputStyles.title} >Completed</div>
                <input style={inputStyles.input} type="checkbox" name="completed" onChange={hanldeChange} value={completed}/>
            </div>
            <div style={inputStyles.container} >
                <div style={inputStyles.title} >Review</div>
                <input style={inputStyles.input} type="text" name="review" onChange={hanldeChange} value={review}/>
            </div>
            <input style={inputStyles.buttonStyle} type="submit" value="Register Book"/>
        </form>
    </Layout>
    );
}