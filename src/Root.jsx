import { Outlet } from "react-router";
import Cards from "./Cards";
import UsersConnected from "./UsersConnected";
import { useEffect, useState } from "react";
import AppContext from "./Context/UsersContext";

export default function Root() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers([
            {
                username: 'whistler092',
                email: 'iamramiroo@gmail.com',
                effort: 1,
            },
            {
                username: 'Olena',
                email: 'email@epam.com',
                effort: 2,
            }
        ])
    }, []);

    return (
        <>
            <AppContext.Provider value={{ users, setUsers }} >
                <div id="header">
                    <h1>Poker Items</h1>
                </div>
                <div id="detail">
                    <UsersConnected />
                    <Cards />
                    <Outlet />
                </div>
            </AppContext.Provider>
        </>
    );
}