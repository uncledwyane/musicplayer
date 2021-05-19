var LIGHT_THEME = {
    shortName: "L",
    background: '#fff',
    track_background: "#dee1e6",
    highlight_color: "#fd5833",
    text_hightlight: "#fff",
    song_name: "#000",
    song_artist: "#666"
}

var DARK_THEME = {
    shortName: "D",
    background: "#161619",
    track_background: "#1c1d1f",
    text_hightlight: "#fff",
    highlight_color: "#fd5833",
    song_name: "#fff",
    song_artist: "#999"
}

var CUSTOM_THEME = {
    background: "#161619",
    track_background: "#1c1d1f",
    text_hightlight: "#fff",
    highlight_color: "#fd5833",
    song_name: "#fff",
    song_artist: "#999"
}

var CUSTOM = {
    background: {
        desc: "背景色",
        key: "background",
        color: "#161619"
    },
    track_active: {
        desc: "正在播放专辑背景色",
        key: "track_active",
        color: "#1c1d1f"
    },
    highlight: {
        desc: "高亮色",
        key: "highlight",
        color: "#fd5833"
    },
    text_color: {
        desc: "普通文字颜色",
        key: "text_color",
        color: "#ffffff"
    },
    desc_color: {
        desc: "次要文字颜色",
        key: "desc_color",
        color: "#999999"
    },
    list_bg: {
        desc: "列表背景色",
        key: "list_bg",
        color: "#1c1d1f"
    },
    artist: {
        desc: "歌手颜色",
        key: "artist",
        color: "#ffffff"
    },
    placehoder: {
        desc: "占位色",
        key: "placehoder",
        color: "#282727"
    }
}

export default {
    LIGHT: LIGHT_THEME,
    DARK: DARK_THEME,
    CUSTOM: CUSTOM
}