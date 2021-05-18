
var state = {
    version: '1.0.0',
    theme: null,
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