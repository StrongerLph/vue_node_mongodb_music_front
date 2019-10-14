<template>
  <div style="height: 100%; background: rgba(0, 0, 0, 0.5)">
    <Navbar style="height: 30px">
      <template v-slot:navLeft>
        <el-upload
          action="https://upload-z2.qiniup.com"
          :show-file-list="false"
          :data="postData"
          :before-upload="handleBeforeUpload"
          :on-success="uploadMusic"
        >
          <i
            class="el-icon-upload"
            style="font-size: 24px; text-align: center; color: #fefefe"
            @click="handleClickUpload"
          ></i>
        </el-upload>
      </template>
      <template v-slot:navCenter>
        <input
          type="text"
          v-model="searhKey"
          style="display: block; margin: 0 auto; padding: 0 10px; width: 90%; border: 0; outline: none; border-radius: 25px; height: 100%; color: #fefefe; background: rgba(0, 0, 0, 0.2)"
          @keydown.enter="handleSearch"
        />
      </template>
      <template v-slot:navRight>
        <i
          class="el-icon-headset"
          style="font-size: 24px; text-align: center; color: #fefefe"
          @click="handleShowPlayer"
        ></i>
      </template>
    </Navbar>
    <div
      style="padding: 10px; text-align: center; background: rgba(54, 216, 92, 0.7)"
      @click="handlePlayAll"
    >播放全部</div>
    <SongList :songList="songList" @handlePlayItem="handlePlayItem"></SongList>
    <Player ref="player" v-show="showPlayer"></Player>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import { mapGetters } from "vuex";

import { getUploadToken, uploadMusic, getSongs } from "@/api/default";
import Navbar from "@/components/Navbar/Navbar";
import SongList from "@/components/SongList/SongList";
import Player from "@/components/Player/Player";

export default {
  name: "Search",
  components: {
    Navbar,
    SongList,
    Player
  },
  data() {
    return {
      searhKey: "",
      postData: null,
      songList: [],
      uploading: null
    };
  },
  computed: {
    ...mapGetters(["showPlayer"])
  },
  created() {
    this.handleSearch();
  },
  methods: {
    handleShowPlayer() {
      this.$store.dispatch("showPlayer", true);
    },
    handleSearch() {
      const params = {
        searchKey: encodeURIComponent(this.searhKey)
      };
      getSongs(params)
        .then(res => {
          this.songList = res.result.records;
        })
        .catch(err => {
          throw err;
        });
    },
    handleClickUpload() {
      getUploadToken()
        .then(res => {
          this.postData = {
            token: res.result.uploadToken
          };
        })
        .catch(err => {
          throw err;
        });
    },
    handleBeforeUpload() {
      this.uploading = Loading.service({background: 'rgba(255, 255, 255, 0.5)'})
    },
    uploadMusic(response, file, fileList) {
      const data = {
        ...file,
        songUrl: "http://pyc4bvfvw.bkt.clouddn.com/" + response.key
      };
      uploadMusic(data)
        .then(res => {
          if (res.success) {
            this.$nextTick(() => {
              // 以服务的方式调用的 Loading 需要异步关闭
              this.uploading.close()
            });
            this.$message({
              message: "歌曲上传成功！",
              type: "success"
            });
            this.handleSearch();
          }
        })
        .catch(err => {
          this.$nextTick(() => {
            // 以服务的方式调用的 Loading 需要异步关闭
            this.uploading.close()
          });
          throw err;
        });
    },
    handlePlayAll() {
      this.$store.dispatch('setPlayList', this.songList).then(() => {
        this.$refs.player.$refs.audioCpm.handlePlayAll()
      }).catch(err => {
        this.$refs.player.$refs.audioCpm.handlePlayAll()
      })
    },
    handlePlayItem(id) {
      this.$refs.player.$refs.audioCpm.handlePlayItem(id)
    }
  }
};
</script>

<style>
</style>