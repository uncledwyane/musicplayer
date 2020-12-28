<template>
    <div id="homeWrap">
        <mu-appbar style="width: 100%;" color="red">
            <mu-button icon slot="left">
                <mu-icon value="menu"></mu-icon>
            </mu-button>
            Welcome
            <mu-button flat slot="right"></mu-button>
        </mu-appbar>
        <profile id="profile"></profile>
        <mu-container id="bottom-navigation">
            <mu-bottom-nav color='red'>
                <mu-bottom-nav-item title="Recents" icon="restore"></mu-bottom-nav-item>
                <mu-bottom-nav-item title="Favorites" icon="favorite"></mu-bottom-nav-item>
                <mu-bottom-nav-item title="Nearby" icon="location_on"></mu-bottom-nav-item>
            </mu-bottom-nav>
        </mu-container>
    </div>
</template>

<script>
import Profile from './Profile.vue'
export default {
    data(){
        return {

        }
    },
    components: {
        Profile
    }
}
</script>

<style lang='scss' scoped>
    #homeWrap{
        #bottom-navigation{
            position: absolute;
            bottom: 0;
        }
        #profile{
            position: absolute;
            z-index: 100;
            .avatar{
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        }
    }
</style>