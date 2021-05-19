
var state = {
    version: '1.0.0',
    customTheme: null,
    currTheme: 'DARK',
    isLogin: false,
    highQualityPlaylist: null,
    trackList: null,
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