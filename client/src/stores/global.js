"use strict";

// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

const ax = axios.create({
  baseUrl: "http://localhost:3000/public",
});

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      user: null,
    };
  },
  actions: {
    //
    handleError(err) {
      console.error(err);

      if (err.response?.status === 401) {
	this.logout();
	return 'login';
      }
    }, // handleError
    setAccessToken(data) {
      return localStorage.setItem("access_token", data.access_token);
    }, // setAccessToken
    getAccessToken() {
      return localStorage.getItem("access_token");
    }, // getAccessToken
    clearLocalStorage() {
      return localStorage.clear();
    }, // clearLocalStorage
    logout() {
	this.user = null;
	this.clearLocalStorage();
    }, // logout
    async removeFavoriteFood(id) {
      try {
	// request and refetch favorite food
	const response = await ax.get("/favorites", {
	  headers: {
	    access_token: this.getAccessToken(),
	  },
	});
      } catch (err) {
	return this.handleError(err);
      }
    }, // removeFavoriteFood
  },
  getters: {
    //
  },
});
