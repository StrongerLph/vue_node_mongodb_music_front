<template>
  <div style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 999;">
    <img
      src="../../assets/images/background-img.jpg"
      style="width: 100%; height: 100%; position: absolute; z-index: -1; filter: blur(2px)"
    />
    <div style="width: 100%; height: 100%; background: rgba(0, 0, 0, 0.5)">
      <Navbar>
        <template v-slot:navLeft>
          <i
            class="el-icon-arrow-left"
            style="font-size: 24px; color: #fefefe"
            @click="handleShowPlayer"
          ></i>
        </template>
        <template v-slot:navCenter>
          <div style="display: flex; flex-direction: column; text-align: center; color: #fefefe">
            <span style="font-size: 14px">歌曲名</span>
            <span style="font-size: 12px">歌手名</span>
          </div>
        </template>
        <template v-slot:navRight>
          <i
            class="el-icon-s-operation"
            style="font-size: 24px; text-align: center; color: #fefefe"
            @click="isShowPlayList = true"
          ></i>
        </template>
      </Navbar>
      <!-- 专辑图片 碟 -->
      <div v-if="!showLyrics" style="height: 520px" @click="handleShowLyrics">
        <Disc :isPlay="isPlay" :img="'#'"></Disc>
      </div>
      <!-- 歌词 -->
      <div v-else style="height: 520px; overflow: hidden" @click="handleShowLyrics">
        <ul style="padding: 20px auto; text-align: center; font-style: 16px; color: #ccc">
          <li v-for="(item, index) in 10" :key="index" style="padding: 5px 0">
            <p>歌词</p>
          </li>
        </ul>
      </div>
      <!-- 进度条 -->
      <div
        style="display: flex; justify-content: space-around; margin: 5px 0;font-size: 12px; color: #E5E3E5"
      >
        <span v-text="currentTimeTxt"></span>
        <div style="width: 75%; display: flex; flex-direction: column; justify-content: center">
          <div
            style="display: inline-block; width: 100%; height: 1px; background: rgba(255, 255, 255, 0.2)"
          >
            <div
              ref="progressEle"
              style="width: 100%; height: 1px; background: rgba(255, 255, 255, 0.5); position: relative"
            >
              <div
                :style="`width: 5px; height: 5px; position: absolute; top: -2px; left: ${progress}px; border-radius: 50%; background: #fff`"
              ></div>
            </div>
          </div>
        </div>
        <span v-text="totalTimeTxt"></span>
      </div>
      <Audio
        ref="audioCpm"
        :playList="playList"
        @handleShowPlayList="handleShowPlayList"
        @handleChangeDisc="handleChangeDisc"
        @getCurrentSongTime="getCurrentSongTime"
        @getCurrentPlayTime="getCurrentPlayTime"
      />
      <div v-if="isShowPlayList" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; z-index: 99" @click.self="isShowPlayList = false">
        <div style="width: 100%; position: absolute; left: 0; bottom: 0">
          <div style="text-align: center; background: rgb(39, 177, 32); color: #fefefe">播放列表</div>
          <ul v-if="playList.length" style="max-height: 240px; overflow: scroll; background: #fff">
            <li v-for="(item, index) in playList" :key="index" :style="activeColor(index)" @click="handlePlayTheSong(index)">
              <span style="line-height: 40px" v-text="index + 1 + '. '"></span>
              <span style="line-height: 40px" v-text="item.name"></span>
              <span style="line-height: 40px; font-size: 12px" v-text="' - - ' + item.singer"></span>
            </li>
          </ul>
          <div
            v-else
            style="text-align: center; line-height: 100px; background: #fff; color: #0f0f0f">你还没有添加歌曲哦~~</div>
          <div
            style="line-height: 50px; text-align: center; background: rgb(39, 177, 32); color: #fefefe"
            @click="isShowPlayList = false"
          >关 闭</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Moment from 'moment'

// import Aplayer from 'vue-aplayer'
import Navbar from "@/components/Navbar/Navbar";
import Disc from "./Disc";
import Audio from "./Audio";

export default {
  name: "Player",
  components: {
    Navbar,
    Disc,
    Audio
  },
  data() {
    return {
      showLyrics: false,
      isPlay: false,
      isShowPlayList: false,
      totalTimeTxt: '00:00',
      currentTimeTxt: '00:00',
      totalTime: 0,
      currentTime: 0,
      currentIndex: null
    };
  },
  computed: {
    ...mapGetters(["playList"]),
    progress() {
      return 280 / this.totalTime * this.currentTime
    }
  },
  mounted() {
    console.log(this.playList);
  },
  methods: {
    handleShowPlayer() {
      this.$store.dispatch("showPlayer", false);
      this.isShowPlayList = false;
    },
    handleShowLyrics() {
      this.showLyrics = !this.showLyrics;
    },
    handleShowPlayList(isShowPlayList) {
      this.isShowPlayList = isShowPlayList;
    },
    handleChangeDisc(isPlay) {
      this.isPlay = isPlay
    },
    getCurrentSongTime(time, currentIndex) {
      this.currentIndex = currentIndex
      this.totalTime = time
      this.totalTimeTxt = Moment(time * 1000).format('mm:ss')
    },
    getCurrentPlayTime(time) {
      this.currentTime = time
      this.currentTimeTxt = Moment(time * 1000).format('mm:ss')
    },
    activeColor(index) {
      if (this.currentIndex === index && this.isPlay) {
        return 'padding-top: 10px; background: rgb(185, 240, 182)'
      } else {
        return 'padding-top: 10px; background: #fff'
      }
    },
    handlePlayTheSong(index) {
      this.$refs.audioCpm.changeSongWithIndex(index)
    }
  }
};
</script>

<style>
</style>