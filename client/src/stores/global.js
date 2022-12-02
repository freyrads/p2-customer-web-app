"use strict";

// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import Swal from 'sweetalert2';

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
      food: [],
      categories: [],
    };
  },
  actions: {
    //
    handleError(err) {
      console.error(err);
      // swal
      if (typeof err.response?.data.error === "string") {
	Swal.fire({
	  position: 'top-end',
	  icon: 'error',
	  title: err.response.data.error,
	  showConfirmButton: false,
	  timer: 5000,
	  timerProgressBar: true,
	});
      }

      if (typeof err.response?.data.errors?.[0] === "string") {
	Swal.fire({
	  position: 'top-end',
	  icon: 'error',
	  title: err.response?.data.errors?.[0],
	  showConfirmButton: false,
	  timer: 5000,
	  timerProgressBar: true,
	});
      }

      if (err.response?.status === 401) {
	return this.logout();
      }

      if (err.response?.data.error === "This menu is already in your favorite list") {
	return "/favorites";
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
	// console.log(response.data);

	this.setCredentials(response.data);
	return "/";
      } catch (err) {
	return this.handleError(err);
      }
    }, // login
    async signup() {
      try {
	const response = await ax.post("/register", this.signupForm);
	// console.log(response.data);

	this.setCredentials(response.data);
	return "/";
      } catch (err) {
	return this.handleError(err);
      }
    }, // signup
    logout() {
      this.clearCredentials();
      return 'login';
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
    async fetchFood(filter) {
      try {
	// request and refetch favorite food
	const response = await ax.get("/food", {
	  headers: {
	    access_token: this.getAccessToken(),
	  },
	  params: {
	    search: filter?.name,
	    cat: filter?.category,
	  }
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
	// console.log(response.data);

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
	return "/favorites";
      } catch (err) {
	return this.handleError(err);
      }
    }, // addFavoriteFood
  },
  getters: {
    //
  },
});
