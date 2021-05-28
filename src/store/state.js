
var state = {
    version: '1.0.0',
    customTheme: null,
    currTheme: 'LIGHT',
    isLogin: false,
    highQualityPlaylist: null,
    trackList: null,
    trackListIds: null,
    songIsPlaying: {
        id: '',
        name: '',
        coverImg: '',
        state: 'pause',
        drtime: 0,
        playUrl: '',
        artists: '',
        playState: false
    },
    isShowLogin:false
}

export default state