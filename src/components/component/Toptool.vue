<template>
  <div>
      <div id="search_tool">
          <input type="text" name="search" id="search_com" placeholder="Search for song,artists etc...">
          <i class="fa fa-search searchicon"></i>
      </div>
      <div id="notice_and_setting">
          <span class="notice"><i class="fa fa-bell" style="color: #9ea8c4;"></i></span>
          <span class="setting"><i class="fa fa-cog" style="color: #9ea8c4;"></i></span>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
    #notice_and_setting{
        position: absolute;
        right: 20px;
    }
    .fa{
        font-size: 17px;
        transition: all ease .3s;
    }
    .fa:hover{
        cursor: pointer;
        color: rgb(107, 107, 255) !important;
    }
    #search_com{
        width: 400px;
        border: 1px solid#eff0f6;
        border-radius: 20px;
        padding: 5px 10px;
        background: rgba(255,255,255,.1);
        color: #d9e1f7;
        margin-left: 30px;
        height: 25px;

    }
    #search_com:focus{
        border-radius: 20px;
        color: #9ea8c4;
        outline-style: none;
        border: 1px solid#c4ccfa;
    }
    .searchicon{
        position: relative;
        right: 30px;
        color: #d9defc;
    }
    .notice{
        margin-right: 10px;
    }
</style>