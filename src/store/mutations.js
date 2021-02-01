import { setHighQualityPlaylist } from "./actions";

const mutations = {
    setTheme(state, theme){
        state.theme = theme;
    },
    setHighQualityPlaylist(state, playlist){
        state.highQualityPlaylist = playlist;  
    }
}

export default mutations