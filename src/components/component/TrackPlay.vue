<template>
    <div id="trackPlay">
        <div class="top" @click="hide">
            <div class="backButton">
                <button>《</button>
            </div>
            <div class="trackName">trackName</div>
            <div class="trackInfo">...</div>
        </div>
        <div class="coverInfo">
            <div class="coverImg">
                <img
                    src="https://p1.music.126.net/5uRGDj93JD23p4ejcPPQhA==/109951164151161218.jpg"
                    alt=""
                    class="cover"
                />
            </div>
            <div class="trackNameAndArtist">
                <p class="trackName">TrackName</p>
                <p class="trackArtist">trackArtist</p>
            </div>
            <!--TODO 歌词-->
        </div>
        <div class="bottomControl">
            <div class="trackProgress">
                <div class="trackTime">
                    <span class="playTime"></span>
                    <span class="totalTime"></span>
                </div>
            </div>
            <div class="playControl">
                <div class="previoursTrack"></div>
                <div class="pauseOrPlay"></div>
                <div class="nextTrack"></div>
            </div>
        </div>
    </div>
</template>

<script>
import bus from "@/components/bus";
export default {
    data() {
        return {
            coverUrl: "",
            trackName: "",
            trackArtist: "",
            trackTotalTime: "",
        };
    },
    methods: {
        hide() {
            bus.$emit("setTrackPlayStatus", false);
        },
    },
};
</script>

<style lang="scss" scoped>
#trackPlay {
    width: 100%;
    height: 100%;
    .top {
        width: 100%;
        height: 5%;
        background: lightblue;
    }
    .coverInfo {
        width: 100%;
        height: 55%;
        background: rgb(240, 241, 243);
    }
    .bottomControl {
        width: 100%;
        height: 45%;
        background: rgb(255, 255, 255);
        border-radius: 30px 30px 0 0;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        transform: translateY(-5%);
    }
}
</style>
