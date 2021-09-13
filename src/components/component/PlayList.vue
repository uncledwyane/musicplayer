<template>
    <div class="playlist">
        <div class="playlist_item" v-for="playlist in playlists" :key="playlist.id">
            <div class="playlist_cover">
                <v-img
                    :src="playlist.coverImgUrl"
                    class="cover_img"
                    id="cover_img"
                    ref="coverImg"
                    @click="getTrackListById(playlist.id, playlist.name)"
                ></v-img>
            </div>
            <div class="playlist_info">
                <p class="playlist_name" :style="{color: customTheme.text_color.color}">{{ playlist.name }}</p>
                <p class="playlist_count" :style="{color: customTheme.desc_color.color}">{{ playlist.trackCount }}首</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import bus from '@/components/bus';

export default {
    props: ['playlists'],
    computed: mapState(["highQualityPlaylist", "customTheme"]),
    data(){
        return {

        }
    },
    methods: {
        getTrackListById(id, name) {
            bus.$emit('getPlayListById', {
                id,
                name
            })
        },
    }
}
</script>

<style lang="css" scoped>
.playlist{
    display: flex;
}

.playlist_item {
    width: 130px;
    height: 190px;
    margin-right: 50px;
}
.playlist_cover {
    width: 130px;
    height: 130px;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
.playlist_count {
    font-size: 12px;
}
.playlist_cover:hover {
    cursor: pointer;
}

.playlist_info {
    position: relative;
    height: 60px;
    padding-top: 5px;
}
.playlist_name {
    font-size: 12px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-bottom: 5px;
    color: #fff;
}
.cover_img {
    width: 130px;
    height: 130px;
    border-radius: 10px;
    transition: all ease .3s;
}
.cover_img:hover {
    cursor: pointer;
}
</style>