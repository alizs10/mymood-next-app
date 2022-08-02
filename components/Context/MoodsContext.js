import React from 'react';


export const MoodsContext = React.createContext({
    loadingMore: false,
    setLoadingMore: () => {},
    moods: [],
    setMoods: () => {},
    lastId: "",
    setLastId: () => {},
    moodestPage: "",
    setMoodestPage: () => {},
    filter: "0",
    setFilter: () => {},
    moodsRef: null,
    getFilteredMoods: () => {},
    loadMoreMoods: () => {},
    serverTime: "",
    setServerTime: () => {},
    requestedUser: {},
    setRequestedUser: () => {}
});