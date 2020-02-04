import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const baseUrl = 'http://localhost:8085/'


export default new Vuex.Store({
  state: {
    themes : [],
    comments: [],
    user: ''
  },
  mutations: {

    set_themes: function (state, themes) {
      state.themes = themes
    },
    set_comments: function (state, comments) {
      state.comments = comments;
    },
    set_user: function (state, user) {
      state.user = user;
    },

    add_theme: function (state, theme) {
      state.themes.push(theme);
    },
    add_comment: function (state, comment) {
      state.comments.push(comment);
    },

    remove_theme: function (state, id) {
      for (let u = 0; u < state.themes.length; u++) {
        if (state.themes[u].id === id) {
          state.themes.splice(u, 1);
          break;
        }
      }
    },
    remove_comment: function (state, id) {
      for (let p = 0; p < state.comments.length; p++) {
        if (state.comments[p].id === parseInt(id)) {
          state.comments.splice(p, 1);
          break;
        }
      }
    },

    update_theme: function (state, payload) {
      for (let u = 0; u < state.users.length; u++) {
        if (state.themes[u].id === parseInt(payload.id)) {
          state.themes[u].username = payload.msg.username;
          state.themes[u].password = payload.msg.password;
          state.themes[u].picture = payload.msg.picture;
          break;
        }
      }
    },
    update_comment: function (state, payload) {
      for (let p = 0; p < state.posts.length; p++) {
        if (state.comments[p].id === parseInt(payload.id)) {
          state.comments[p].header = payload.msg.header;
          state.comments[p].content = payload.msg.content;
          break;
        }
      }
    }
  },
  actions: {

    load_themes: function ({ commit }) {
      fetch(  baseUrl+'theme', { method: 'get' }).then((response) => {
        if (!response.ok)
          alert( response.error().text());

        return response.json()
      }).then((jsonData) => {
        commit('set_themes', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    log_user: function ({commit}, user){

      alert(user)
      fetch(baseUrl + `auth/log`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'auth' : 'tok',
          'user' : 'aaa'
        },
        body: user
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        alert(jsonData.token)
        localStorage.setItem('auth', jsonData.token)
        localStorage.setItem('user', jsonData.username)
        localStorage.setItem('user_id', jsonData.id)
        commit('set_user', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });


    },

    load_users ({ commit }) {




      fetch(  '/wel/users', { method: 'get' }).then((response) => {
        if (!response.ok)
          alert( response.error().text());

        return response.json()
      }).then((jsonData) => {
        commit('set_users', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });


    },
    load_posts: function ({ commit }) {
      fetch(  '/home/posts', { method: 'get' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('set_posts', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

    delete_post: function({ commit }, id) {
      fetch(`/profile/${id}`, { method: 'delete' }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('remove_post', jsonData.id)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    new_post: function({ commit }, post) {
      fetch(`/profile`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: post
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('add_post', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    new_user: function({ commit }, user) {
      fetch(`/auth/reg`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: user
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('add_user', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    change_post: function({ commit }, payload) {
      fetch(`/profile/post/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json'
        },
        body: payload.post
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('update_post', {id: payload.id, post:jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    }

  }
})
