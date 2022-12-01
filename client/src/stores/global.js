"use strict";

// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";

const ax = axios.create({
  baseURL: "http://localhost:3000/public",
});

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      user: null,
      loginForm: {
	email: "",
	password: "",
      },
      signupForm: {
	"username":"",
	"email":"",
	"password":"",
	"phoneNumber":"",
	"address":"",
      },
      favorites: [],
      filter: {
	category: [],
      },
      food: [],
      categories: [],
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

      console.error("[WARN] UNHANDLED ERROR");
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
    setCredentials(data) {
      this.user = data.user;
      this.setAccessToken(data);
    }, // setCredentials
    clearCredentials() {
      this.user = null;
      this.clearLocalStorage();
    }, // clearCredentials
    async login() {
      try {
	const response = await ax.post("/login", this.loginForm);

	this.setCredentials(response.data);
	return "/";
      } catch (err) {
	return this.handleError(err);
      }
    }, // login
    async signup() {
      try {
	const response = await ax.post("/register", this.signupForm);

	this.setCredentials(response.data);
	return "/";
      } catch (err) {
	return this.handleError(err);
      }
    }, // signup
    logout() {
      this.clearCredentials();
    }, // logout
    async fetchCategories() {
      try {
	// request and refetch favorite food
	const response = await ax.get("/categories", {
	  headers: {
	    access_token: this.getAccessToken(),
	  },
	});

	this.categories = response.data;
      } catch (err) {
	return this.handleError(err);
      }
    }, // fetchCategories
    async fetchFood() {
      try {
	// request and refetch favorite food
	const response = await ax.get("/food", {
	  headers: {
	    access_token: this.getAccessToken(),
	  },
	});

	this.food = response.data;
      } catch (err) {
	return this.handleError(err);
      }
    }, // fetchFood
    async fetchFavoriteFood() {
      try {
	// request and refetch favorite food
	const response = await ax.get("/favorites", {
	  headers: {
	    access_token: this.getAccessToken(),
	  },
	});

	this.favorites = response.data;
      } catch (err) {
	return this.handleError(err);
      }
    }, // fetchFavoriteFood
    async removeFavoriteFood(id) {
      try {
	// request and refetch favorite food
	const response = await ax.delete("/favorites/"+id, {
	  headers: {
	    access_token: this.getAccessToken(),
	  },
	});

	await this.fetchFavoriteFood();
      } catch (err) {
	return this.handleError(err);
      }
    }, // removeFavoriteFood
    async addFavoriteFood(id) {
      try {
	// request and refetch favorite food
	const response = await ax.post("/favorites", {
	  id,
	}, {
	  headers: {
	    access_token: this.getAccessToken(),
	  },
	});

	await this.fetchFavoriteFood();
      } catch (err) {
	return this.handleError(err);
      }
    }, // addFavoriteFood
  },
  getters: {
    //
  },
});
