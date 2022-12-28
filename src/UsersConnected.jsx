
import { useContext, useEffect, useState } from "react";
import "./Cards.scss"
import AppContext from "./Context/UsersContext";


export default function UsersConnected() {

    const { users, setUsers } = useContext(AppContext);

    useEffect(() => {
        
        const newUsers = [...users];
        newUsers.push({
            username: 'Another Users',
            email: '123@gmail.com',
            effort : 1,
        });

        setUsers(newUsers);
    }, [users.length > 0]);

    return (
        <>
            <div id="users">
                <ul>
                    {
                        useContext &&
                        users.map((user, index) => (
                            <li key={index} className="user">
                                <div >
                                    {user.username}
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}