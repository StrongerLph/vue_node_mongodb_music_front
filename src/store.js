import Vue from 'vue'
import Vuex from 'vuex'
import Md5 from 'js-md5'

import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, logout, getUserInfo } from '@/api/default'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken(),
    userId: '',
    username: '',
    showPlayer: false,
    playList: []
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_USER_NAME: (state, username) => {
      state.username = username
    },
    CHANGE_SHOW_PLAYER: (state, showPlayer) => {
      state.showPlayer = showPlayer
    },
    SET_PLAY_LIST: (state, playList) => {
      state.playList.push(...playList)
    }
  },
  actions: {
    // user login
    login ({ commit }, loginForm) {
      console.log(loginForm)
      const { username, password } = loginForm
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: Md5(password) }).then(response => {
          const data = response.result
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    getUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const data = response.result

          if (!data) {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('Verification failed, please Login again.')
          }

          const userId = data.userId
          const username = data.loginName

          commit('SET_USER_NAME', username)
          commit('SET_USER_ID', userId)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          commit('SET_USER_NAME', '')
          commit('SET_USER_ID', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    showPlayer ({ commit }, showPlayer) {
      commit('CHANGE_SHOW_PLAYER', showPlayer)
    },

    setPlayList ({ commit, state }, songs) {
      return new Promise((resolve, reject) => {
        let playList = []
        if (state.playList.length) {
          playList = songs.filter(item => {
            const hasSong = state.playList.findIndex(it => {
              return item._id === it._id
            })
            return hasSong === -1
          })
        } else {
          playList = songs
        }
        if (!playList.length) {
          reject(new Error('歌曲已存在播放列表'))
        } else {
          commit('SET_PLAY_LIST', playList)
          resolve()
        }
      })
    }
  },
  getters: {
    showPlayer: state => state.showPlayer,
    token: state => state.token,
    playList: state => state.playList
  }
})
