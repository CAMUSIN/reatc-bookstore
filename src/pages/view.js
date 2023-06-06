import { useParams } from "react-router-dom";
import Layout from "../components/layout";
import { useEffect, useState } from "react";
import { useAppContext } from "../store/store";

export default function View(){
    const [itemBook, setItemBook] = useState();
    const params = useParams();
    const store = useAppContext();

    useEffect(()=>{
        const book = store.getItem(params.bookId)
        setItemBook(book);
    },[]);

    const itemStyles = {
        container: {
            display: "flex",
            gap: "20px",
            color: "white",
            width: "800px",
            margin: "0 auto",
        }
    }

    if(!itemBook){
        return <div>Item not found.</div>
    }

    return (
        <Layout>
            <div style={itemStyles.container}>
                <div>
                    <div>{itemBook?.cover? <img src={itemBook.cover} width="400" /> : '' }</div>
                </div>
                <div>
                    <h2>{itemBook?.title}</h2>
                    <div>{itemBook?.author}</div>
                    <div>{itemBook?.intro}</div>
                    <div>{itemBook?.completed ? "Leido" : "Por terminar"}</div>
                    <div>{itemBook?.review}</div>
                </div>
            </div>
        </Layout>
    );
}