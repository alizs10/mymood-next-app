import React from 'react';

export default React.createContext({
    moods: [],
    setMoods: () => { },
    mood: "",
    setMood: () => {},
    moodEmoji: "0",
    setMoodEmoji: () => { }
})