import { setHighQualityPlaylist } from "./actions";

const mutations = {
    setTheme(state, theme){
        state.theme = theme;
    },
    setHighQualityPlaylist(state, playlist){
        state.highQualityPlaylist = playlist;  
    },
    setTrackList(state, list){
        state.trackList = list;
    },
    setPlayingTrack(state, track){
        state.songIsPlaying = track;
    }
}

export default mutations