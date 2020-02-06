import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const baseUrl = 'http://localhost:8085/'


export default new Vuex.Store({
  state: {
    themes : [],
    comments: [],
    users: [],
    theme: '',
    user: ''
  },
  mutations: {

    set_users: function (state, users) {
      state.users = users
    },
    set_themes: function (state, themes) {
      state.themes = themes
    },
    set_comments: function (state, comments) {
      state.comments = comments;
    },
    set_user: function (state, user) {
      state.user = user;
    },
    set_theme: function (state, theme){
      state.theme = theme
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
      for (let p = 0; p < state.comments.length; p++) {
        if (state.comments[p].id === parseInt(payload.id)) {
          state.comments[p].content = payload.text

          break;
        }
      }
    }
  },
  actions: {

    load_themes: function ({ commit }) {
      fetch(  baseUrl+'theme', { method: 'get'
        , headers:{
            'auth': localStorage.getItem('auth')

        }}).then((response) => {
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


      fetch(baseUrl + `auth/log`, {
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

        localStorage.setItem('auth', jsonData.token)
        localStorage.setItem('user', jsonData.username)
        localStorage.setItem('user_id', jsonData.id)
        localStorage.setItem('pic', jsonData.picture)
        localStorage.setItem('role', jsonData.role)
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

    load_theme ({ commit }, id) {

      fetch(  baseUrl  + `theme/${id}`, { method: 'get'
        , headers:{
          'auth': localStorage.getItem('auth')

        }}).then((response) => {
        if (!response.ok)


          alert(response.clone().json().title)
        return response.json()
      }).then((jsonData) => {

        commit('set_theme', jsonData)
      }).catch((error) => {
        alert('a')
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {

            alert(errorMessage);
          });
        else{
          alert('b')
          alert(error);
        }

      });


    },

    load_comments: function ({ commit }, id) {
      fetch(  baseUrl  + `comment/${id}`, { method: 'get'
        , headers:{
          'auth': localStorage.getItem('auth')

        }}).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('set_comments', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    load_comment: function ({ commit }, id) {
      fetch(  baseUrl  + `comment/id/${id}`, { method: 'get'
        , headers:{
          'auth': localStorage.getItem('auth')

        }}).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
        commit('set_comments', jsonData)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    load_users: function ({ commit }) {
      fetch(  baseUrl  + `user`, { method: 'get'
        , headers:{
          'auth': localStorage.getItem('auth')

        }}).then((response) => {
        if (!response.ok)
          throw response;

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
    load_user: function ({ commit },id) {
      fetch(  baseUrl  + `user/${id}`, { method: 'get'
        , headers:{
          'auth': localStorage.getItem('auth')

        }}).then((response) => {
        if (!response.ok)
          throw response;

        return response.json()
      }).then((jsonData) => {
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
    new_comment: function({ commit }, post) {
      fetch(baseUrl + `comment`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'auth': localStorage.getItem('auth')
        },
        body: post
      }).then((response) => {
        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {

        commit('add_comment', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    delete_comment: function({ commit }, id) {
      fetch(  baseUrl  + `comment/${id}`, { method: 'delete'
        , headers:{
          'auth': localStorage.getItem('auth')

        }}).then((jsonData) => {
        commit('remove_comment', jsonData.id)
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    change_comment: function({ commit }, payload) {

      window.console.log(payload)
      fetch(baseUrl + `comment/${payload.id}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'auth': localStorage.getItem('auth')
        },
        body: payload.content
      }).then((response) => {

        if (!response.ok)
          throw response;

        return response.json();
      }).then((jsonData) => {
        commit('update_comment', {id: payload.id, content: jsonData});
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },
    new_theme: function({ commit }, post) {
      fetch(baseUrl + `theme/`, {
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

        commit('add_comment', jsonData);
      }).catch((error) => {
        if (typeof error.text === 'function')
          error.text().then((errorMessage) => {
            alert(errorMessage);
          });
        else
          alert(error);
      });
    },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
