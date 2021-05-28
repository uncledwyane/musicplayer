import { setHighQualityPlaylist } from "./actions";

const mutations = {
    setTheme(state, theme){
        state.customTheme = theme;
    },
    setCurrTheme(state, theme){
        state.currTheme = theme;
    },
    updateLocalStorageTheme(state, theme){
        localStorage.setItem('customTheme', JSON.stringify(theme))
    },
    setHighQualityPlaylist(state, playlist){
        state.highQualityPlaylist = playlist;  
    },
    setTrackList(state, list){
        state.trackList = list;
    },
    setTrackListIds(state, list){
        state.trackListIds = list;
    },
    setPlayingTrack(state, track){
        state.songIsPlaying = track;
    },
    updatePlayingTrack(state, obj){
        for(var i in obj){
            state.songIsPlaying[i] = obj[i]; 
        }
    },
    setLoginState(state, value){
        state.isLogin = value;
    },
    setLoginComState(state, value){
        state.isShowLogin = value;
    }
}

export default mutations