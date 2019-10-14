<template>
  <div style="height: 576px; overflow: scroll">
    <ul style="padding: 10px">
      <li
        v-for="(item, index) in songList"
        :key="index"
        @click="handlePlaySong(item)"
        style="height: 50px; display: flex; margin: 10px auto"
      >
        <span
          v-text="index + 1 + '.'"
          style="color: #fefefe; display: inline-block; line-height: 50px"
        ></span>
        <!-- <img src="" alt=""> -->
        <span
          v-text="item.name"
          style="color: #fefefe; line-height: 50px; display: inline-block; padding-left: 10px"
        ></span>
        <span
          v-text="' - - ' + item.singer"
          style="font-size: 12px; color: #fefefe; line-height: 50px; display: inline-block"
        ></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SongList",
  props: {
    songList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    handlePlaySong(song) {
      if (!song) {
        return;
      }
      this.$store
        .dispatch("setPlayList", [song])
        .then(() => {
          this.$emit('handlePlayItem', song._id)
        })
        .catch(err => {
          this.$emit('handlePlayItem', song._id)
        });
    }
  }
};
</script>

<style>
</style>