import React from 'react';

const AppContext = React.createContext({
    users: [],
    setUsers : () => { }
    /* actualizar: () => { } */
});

export default AppContext;