<template>
    <div id="trackPlay">
        <div class="top" @click="hide">
            <span class="closeTrackPlay"></span>
        </div>
        <div class="coverInfo">
            <div class="coverImg">
                <img
                    :src="coverImgUrl"
                    alt=""
                    class="cover"
                />
            </div>
            <div class="trackNameAndArtist">
                <p class="trackName">{{trackName}}</p>
                <p class="trackArtist">{{trackArtist}}</p>
            </div>
            <!--TODO 歌词-->
        </div>
        <div class="bottomControl">
            <div class="trackProgress bottomFunction">
                <div class="progressBar">
                    <mu-linear-progress mode="determinate" :value="30" color='rgb(56, 80, 250)'></mu-linear-progress>
                </div>
                <div class="trackTime">
                    <span class="playTime">1:22</span>
                    <span class="totalTime" style="position: absolute; right: 0;">{{trackTotalTime}}</span>
                </div>
            </div>
            <div class="playControl bottomFunction">
                <div class="previoursTrack playControlAction">
                    <div class="previoursButton">
                        <span class="previoursIcon"></span>
                    </div>
                </div>
                <div class="pauseOrPlay playControlAction">
                    <div class="pauseOrPlayButton" :id="trackIsPlaying ? 'trackPlayingDiv' : 'trackPausedDiv'" @click="playOrPauseMusic">
                        <span class="pauseOrPlayIcon" :id="trackIsPlaying ? 'trackPlaying' : 'trackPaused'"></span>
                    </div>
                </div>
                <div class="nextTrack playControlAction">
                    <div class="nextButton">
                        <span class="nextIcon"></span>
                    </div>
                </div>
            </div>
            <div class="otherControl bottomFunction"></div>
        </div>
    </div>
</template>

<script>
import bus from "@/components/bus";
export default {
    data() {
        return {
            coverImgUrl: "https://p1.music.126.net/5uRGDj93JD23p4ejcPPQhA==/109951164151161218.jpg",
            trackName: "TEST TRACK NAME",
            trackArtist: "DWYANE WADE, LEBGRON",
            trackTotalTime: "5:22",
            trackIsPlaying: false
        };
    },
    methods: {
        hide() {
            bus.$emit("setTrackPlayStatus", false);
        },
        playOrPauseMusic(){
            var self = this;
            if(self.trackIsPlaying){
                self.trackIsPlaying = false;
            }
            else{
                self.trackIsPlaying = true;
            }
        }
    },
};
</script>

<style lang="scss" scoped>
#trackPlay {
    width: 100%;
    height: 85%;
    background: #fff;
    .top {
        width: 100%;
        height: 5%;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        .closeTrackPlay {
            width: 50px;
            height: 4px;
            border-radius: 4px;
            background: rgb(196, 196, 196);
        }
    }
    .top:hover .closeTrackPlay {
        background: #555;
    }
    .coverInfo {
        width: 100%;
        height: 55%;
        .coverImg {
            width: 100%;
            height: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            .cover {
                width: 250px;
                border-radius: 20px;
                box-shadow: 0 20px 20px rgba(0, 0, 0, 0.5);
            }
        }
        .trackNameAndArtist {
            width: 100%;
            height: 20%;
            text-align: center;
            .trackName {
                font-size: 20px;
            }
            .trackArtist {
                color: #666;
            }
            p {
                margin: 0;
            }
        }
    }
    .bottomControl {
        width: 100%;
        height: 45%;
        background: rgb(255, 255, 255);
        border-radius: 30px 30px 0 0;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        transform: translateY(-5%);
        .bottomFunction {
            display: flex;
            align-items: center;
        }
        .trackProgress {
            width: 100%;
            height: 30%;
            display: flex;
            flex-direction: column;
            padding: 10px 0;
            .trackTime, .progressBar{
                width: 90%;
                height: 50%;
                display: flex;
                align-items: center;
                position: relative;
                .playTime, .totalTime{
                    color: #999;
                }
            }
            .progressBar{
                align-items: flex-end;
            }
        }
        .playControl {
            width: 100%;
            height: 40%;

            .previoursTrack {
                justify-content: flex-end;
                .previoursButton {
                    transition: .3s ease all;
                    width: 45px;
                    height: 45px;
                    border-radius: 15px;
                    background: rgb(244, 242, 255);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .previoursIcon{
                        width: 30px;
                        height: 30px;
                        background: url('../../../assets/img/track_previours.png') no-repeat center center;
                        background-size: 25px;
                    }
                }
                 .previoursButton:hover{
                    cursor: pointer;
                    background: rgb(209, 206, 219);
                }
            }
            .pauseOrPlay {
                justify-content: center;
                .pauseOrPlayButton {
                    transition: .3s ease all;
                    width: 50px;
                    height: 50px;
                    background: rgb(56, 80, 250);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: .4s ease all;
                    .pauseOrPlayIcon{
                        width: 40px;
                        height: 40px;
                        display: block;
                    }
                }
                .pauseOrPlayButton:hover{
                    background: rgb(49, 68, 214);
                    cursor: pointer;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
                }
                
            }
            .nextTrack {
                justify-content: flex-start;
                .nextButton {
                    transition: .3s ease all;
                    width: 45px;
                    height: 45px;
                    border-radius: 15px;
                    background: rgb(244, 242, 255);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .nextIcon{
                        width: 30px;
                        height: 30px;
                        background: url('../../../assets/img/track_next.png') no-repeat center center;
                        background-size: 25px;
                    }
                }
                .nextButton:hover{
                    cursor: pointer;
                    background: rgb(209, 206, 219);
                }
            }
            .playControlAction {
                width: 33.3333%;
                height: 100%;
                display: flex;
                align-items: center;
            }
        }
        .otherControl {
            width: 100%;
            height: 30%;
        }
    }
}

#trackPaused{
    background: url('../../../assets/img/track_play.png') no-repeat center center;
    background-size: 30px;
}
#trackPlaying{
    background: url('../../../assets/img/track_pause.png') no-repeat center center;
    background-size: 30px;
}
#trackPausedDiv{
    border-radius: 17px;
}
#trackPlayingDiv{
    border-radius: 50%;
}
</style>
