import React, {useContext, createContext} from "react";

const WatchlistContext = createContext();

export const useWatchslist = () => useContext(WatchlistContext);

const WatchlistProvider = ({children}) => {
    return (
        <WatchlistContext.Provider value={{value:'yay'}}>
            {children}
        </WatchlistContext.Provider>
    );
};

export default WatchlistProvider;