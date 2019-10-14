<template>
  <div
    style="background: #db392c; height: 100%; display: flex; flex-direction: column; align-items: center"
  >
    <img
      src="../../assets/images/logo_login.png"
      alt
      style="width: 50px; height: 50px; margin-top: 150px; margin-bottom: 200px"
    />
    <div class="pulseInside"></div>
    <div class="pulseOutside"></div>
    <button
      style="width: 70%; margin: 10px; padding: 10px; font-size: 20px; font-weight: 600; border: 0; border-radius: 25px; background: #fff; color: #db392c"
      @click="goLogin"
    >
      登 录
    </button>
    <button
      style="width: 70%; margin: 10px; padding: 10px; font-size: 20px; font-weight: 300; border: 1px solid #fff; border-radius: 25px; background: #db392c; color: #fff"
      @click="goSignIn"
    >
      注 册
    </button>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    goLogin() {
      this.$router.push('/login-password')
    },
    goSignIn() {
      this.$router.push('/sign-in')
    }
  }
};
</script>

<style>
@keyframes warn {
  0% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0;
  }

  25% {
    transform: scale(0.3);
    -webkit-transform: scale(0.3);
    opacity: 0.1;
  }

  50% {
    transform: scale(0.5);
    -webkit-transform: scale(0.5);
    opacity: 0.3;
  }

  75% {
    transform: scale(0.8);
    -webkit-transform: scale(0.8);
    opacity: 0.5;
  }

  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

/* 产生动画（向外扩散变大）的圆圈  */
.pulseInside {
  position: absolute;
  width: 300px;
  height: 300px;
  top: 22px;
  border: 1px solid rgb(255, 100, 100);
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  -webkit-animation: warn 3s ease-out 2s;
  -moz-animation: warn 3s ease-out 2s;
  animation: warn 3s ease-out 2s;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

.pulseOutside {
  position: absolute;
  width: 360px;
  height: 360px;
  top: -10px;
  border: 1px solid rgb(255, 100, 100);
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  -webkit-animation: warn 3s ease-out 1s;
  -moz-animation: warn 3s ease-out 1s;
  animation: warn 3s ease-out 1s;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
</style>