import { createContext, useContext, useEffect, useState } from "react"

const AppConstext = createContext({
    items: [],
    createItem: (item) => {},
    getItem: (id) => {},
    updateItem: (item) => {},
});

export default function Store({ children }){
    const [items, setItems] = useState([]);

    function createItem(item){
        const temp = [...items];
        temp.push(item);

        setItems(temp);
    }

    function getItem(id){
        const item = items.find((item) => (item.id === id));
        return item;
    }

    function updateItem(item){
        const index = items.findIndex((i) => (i.id === item.id));
        const temp = [...items];

        temp[index] = { ...item };

        setItems(temp);
    }

    return (
        <AppConstext.Provider 
            value={{
                items,
                createItem,
                getItem,
                updateItem,
            }}>
            {children}
        </AppConstext.Provider>
    ); 
}

export function useAppContext(){
    return useContext(AppConstext);
}