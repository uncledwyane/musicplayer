<template>
    <div id="playPreview">
        <div class="upInfo">
            <div class="trackCover">
                <img :src="trackInfo.al.picUrl" class="cover" />
            </div>
            <div class="playControl">
                <div class="trackInfo">
                    <p class="trackName">{{ trackInfo.name }}</p>
                    <p class="trackArtists">
                        {{ trackInfo.al.artists | getArtist(trackInfo.al.artists) }}
                    </p>
                </div>
                <div class="controlItem">
                    <div class="actionWrap">
                        <div class="previous controlButton"></div>
                        <div
                            class="playAndPause controlButton"
                            :class="
                                playingSong.isPlaying
                                    ? 'control_playing'
                                    : 'control_paused'
                            "
                            @click="
                                playingSong.isPlaying
                                    ? pauseOrPlay('pause')
                                    : pauseOrPlay('play')
                            "
                        ></div>
                        <div class="next controlButton"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="playProcess">
            <mu-linear-progress
                color="red"
                mode="determinate"
                :value="30"
                v-show="isHideProgressBar"
            ></mu-linear-progress>
        </div>
    </div>
</template>

<script>
import bus from "@/components/bus";
export default {
    props: ["isHideProgressBar", "playingSong"],
    data() {
        return {
            trackInfo: {
                name: "Test Track Name",
                al: {
                    picUrl: "",
                    artists: "Test Name, Person 2",
                },
            },
        };
    },
    filters: {
        getArtist(arrtistArr) {
            var artist = [];
            for (var i = 0; i < arrtistArr.length; i++) {
                artist.push(arrtistArr[i].name);
            }
            return artist.toString();
        },
    },
    created() {
        var self = this;
        bus.$on("pushTrackInfo", function (track) {
            self.trackInfo.al.picUrl = track.al.picUrl;
            self.trackInfo.al.artists = track.ar;
            self.trackInfo.name = track.name;
        });
    },
    methods: {
        pauseOrPlay(value) {
            var self = this;
            var songPlaying = self.playingSong;
            var songId = songPlaying.songId;
            if (value == "pause") {
                bus.$emit("pauseOrPlay", "pause");
            } else if (value == "play") {
                bus.$emit("pauseOrPlay", "play");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#playPreview {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 5px 5px 0 5px;
    .upInfo {
        width: 100%;
        height: 80%;
        display: flex;
        border-radius: 6px 6px 0 0;
        overflow: hidden;
        .trackCover {
            width: 20%;
            display: flex;
            align-items: center;
            justify-content: center;
            .cover {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
        .playControl {
            width: 80%;
            display: flex;
            .trackInfo {
                width: 60%;
                height: 100%;
                position: relative;
                padding: 5px;
                overflow: hidden;
                text-overflow: ellipsis;
                .trackName {
                    margin: 0;
                    font-size: 14px;
                }
                .trackArtists {
                    color: grey;
                    margin: 0;
                    font-size: 12px;
                    display: inline;
                }
            }
            .controlItem {
                width: 40%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .actionWrap {
                    width: 92px;
                    height: 30px;
                    .controlButton {
                        width: 30px;
                        height: 30px;
                        float: left;
                    }
                }
            }
        }
    }
    .playProcess {
        width: 100%;
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
.previous {
    background: url("../../../assets/img/Previoustrack.png") no-repeat center center;
}
.playAndPause {
    background: url("../../../assets/img/pause.png") no-repeat center center;
}
.control_paused {
    background: url("../../../assets/img/Play.png") no-repeat center center;
}
.next {
    background: url("../../../assets/img/Nexttrack.png") no-repeat center center;
}
.previous,
.playAndPause,
.next {
    background-size: 30px;
}
.mu-linear-progress {
    width: 95%;
}
</style>
