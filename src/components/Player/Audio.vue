<template>
  <div>
    <audio
      ref="audio"
      controls
      :loop="isLoop"
      :autoplay="shouldAutoPlay"
      :src="musicUrl"
      @ended="handelEnd"
      @canplay="handleCanPlay"
      @timeupdate="handleProgress"
      style="display: none"
    ></audio>

    <!-- 播放控制 -->
    <div style="padding-top: 20px">
      <ul style="display: flex; justify-content: space-around; height: 40px; color: #E5E3E5">
        <!-- 播放模式 -->
        <li
          style="display: flex; flex-direction: column; justify-content: center"
          @click="handlePlayMode"
        >
          <i :class="playModeIcon" style="fontSize: 28px" />
        </li>
        <!-- 上一首 -->
        <li
          style="display: flex; flex-direction: column; justify-content: center"
          @click="handlePrev"
        >
          <i class="el-icon-refresh" style="fontSize: 28px" />
        </li>
        <!-- 播放暂停 -->
        <li
          style="display: flex; flex-direction: column; justify-content: center"
          @click="handlePlay"
        >
          <i class="el-icon-refresh" style="fontSize: 28px" />
        </li>
        <!-- 下一首 -->
        <li
          style="display: flex; flex-direction: column; justify-content: center"
          @click="handleNext"
        >
          <i class="el-icon-refresh" style="fontSize: 28px" />
        </li>
        <!-- 播放列表 -->
        <li
          style="display: flex; flex-direction: column; justify-content: center"
          @click="handleShowPlayList"
        >
          <i class="el-icon-refresh" style="fontSize: 28px" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { randomNum } from "@/utils/audio-utils";
export default {
  name: "Audio",
  props: {
    shouldAutoPlay: {
      type: Boolean,
      default: false
    },
    playList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      isPlay: false,
      currentIndex: 0,
      isLoop: false,
      isLoopList: true,
      isShuffle: false
    };
  },
  computed: {
    musicUrl() {
      return this.playList.length
        ? this.playList[this.currentIndex].songUrl
        : "";
    },
    playModeIcon() {
      let playModeIcon = "";
      if (this.isLoopList) {
        playModeIcon = "el-icon-refresh";
      } else if (this.isLoop) {
        playModeIcon = "el-icon-folder-add";
      } else if (this.isShuffle) {
        playModeIcon = "el-icon-folder-delete";
      }
      return playModeIcon;
    }
  },
  methods: {
    handleCanPlay() {
      this.$emit(
        "getCurrentSongTime",
        this.$refs.audio.duration,
        this.currentIndex
      );
    },
    handlePlay() {
      if (!this.isPlay) {
        this.$refs.audio
          .play()
          .then(res => {
            this.isPlay = true;
            this.$emit("handleChangeDisc", true);
          })
          .catch(err => {
            if (!this.playList.length) {
              this.$message({
                message: "歌单为空，无法播放。",
                type: "error"
              });
            } else {
              this.$message({
                message: "播放出错了~~",
                type: "error"
              });
              throw err;
            }
          });
      } else {
        this.$refs.audio.pause();
        this.isPlay = false;
        this.$emit("handleChangeDisc", false);
      }
    },
    handleProgress() {
      this.$emit("getCurrentPlayTime", this.$refs.audio.currentTime);
    },
    handlePrev() {
      if (!this.isShuffle) {
        if (!this.currentIndex) {
          this.currentIndex = this.playList.length - 1;
        } else {
          this.currentIndex = this.currentIndex - 1;
        }
      } else {
        this.currentIndex = randomNum(0, this.playList.length - 1);
      }
      if (!this.isPlay) {
        this.isPlay = true;
        this.$emit("handleChangeDisc", true);
      }
      this.$refs.audio.pause();
      this.$refs.audio.currentTime = 0;
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
    },
    handleNext() {
      if (!this.isShuffle) {
        if (this.currentIndex === this.playList.length - 1) {
          this.currentIndex = 0;
        } else {
          this.currentIndex = this.currentIndex + 1;
        }
      } else {
        this.currentIndex = randomNum(0, this.playList.length - 1);
      }
      if (!this.isPlay) {
        this.isPlay = true;
        this.$emit("handleChangeDisc", true);
      }
      this.$refs.audio.pause();
      this.$refs.audio.currentTime = 0;
      this.$nextTick(() => {
        this.$refs.audio.play();
      });
    },
    handelEnd() {
      if (this.isLoop) {
        return;
      } else {
        this.handleNext();
      }
    },
    handlePlayMode() {
      if (this.isLoopList) {
        this.isLoop = !this.isLoop;
        this.isLoopList = false;
      } else if (this.isShuffle) {
        this.isLoopList = !this.isLoopList;
        this.isShuffle = false;
      } else if (this.isLoop) {
        this.isShuffle = !this.isShuffle;
        this.isLoop = false;
      }
    },
    handleShowPlayList() {
      this.$emit("handleShowPlayList", true);
    },
    changeSongWithIndex(index) {
      if (this.currentIndex === index) {
        this.handlePlay();
        return;
      }
      this.$refs.audio.pause();
      this.$refs.audio.currentTime = 0;
      this.isPlay = false;
      this.currentIndex = index;
      this.$nextTick(() => {
        this.handlePlay();
      });
    },
    handlePlayItem(id) {
      const currentIndex = this.playList.findIndex(it => {
        return it._id === id;
      });
      if (currentIndex !== -1) {
        if (!this.isPlay) {
          this.handlePlay();
        } else if (this.currentIndex === currentIndex) {
          this.handlePlay();
        } else {
          this.$refs.audio.pause();
          this.isPlay = false;
          this.$emit("handleChangeDisc", false);
          this.$refs.audio.currentTime = 0;
          this.currentIndex = currentIndex;
          this.$nextTick(() => {
            this.$refs.audio.play();
            this.$emit("handleChangeDisc", true);
          });
        }
      }
    },
    handlePlayAll() {
      if (this.isPlay) {
        this.isPlay = false;
        this.$emit("handleChangeDisc", false);
        this.$refs.audio.pause();
        this.$refs.audio.currentTime = 0;
      }
      this.currentIndex = 0;
      this.$nextTick(() => {
        this.handlePlay();
      });
    }
  }
};
</script>

<style>
</style>