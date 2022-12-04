"use strict";

// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios";
import Swal from 'sweetalert2';

const ax = axios.create({
  baseURL: "http://localhost:3000/public",
});

let preloaderCounter = 0;

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
      detailFood: null,
      pageInfo: {
	currentPage: 0,
	totalItems: 0,
	itemsPerPage: 0,
      },
      qrcode: null,
    };
  },
  actions: {
    //
    loading() {
      preloaderCounter++;
      if (preloaderCounter === 0) return;
      document.getElementById("preloader").classList.add("active");
    },
    stopLoading() {
      preloaderCounter--;
      if (preloaderCounter === 0)
	document.getElementById("preloader").classList.remove("active");
    },
    handleError(err) {
      console.error(err);
      // swal
      if (typeof err.response?.data.error === "string") {
	Swal.fire({
	  icon: 'error',
	  title:  err.response.data.error === "Unauthorized" ? "Please login first" : err.response.data.error,
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

      if (err.response?.data.error === "Food not found") {
	return "/";
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
	this.loading();
	const response = await ax.post("/login", this.loginForm);
	// console.log(response.data);

	this.setCredentials(response.data);
	this.stopLoading();
	return "/";
      } catch (err) {
	this.stopLoading();
	return this.handleError(err);
      }
    }, // login
    async signup() {
      try {
	this.loading();
	const response = await ax.post("/register", this.signupForm);
	// console.log(response.data);

	this.setCredentials(response.data);
	this.stopLoading();
	return "/";
      } catch (err) {
	this.stopLoading();
	return this.handleError(err);
      }
    }, // signup
    logout() {
      this.clearCredentials();
      return '/login';
    }, // logout
    async fetchCategories() {
      try {
	// request and refetch favorite food
	this.loading();
	const response = await ax.get("/categories", {
	  headers: {
	    access_token: this.getAccessToken(),
	  },
	});

	this.stopLoading();
	this.categories = response.data;
      } catch (err) {
	this.stopLoading();
	return this.handleError(err);
      }
    }, // fetchCategories
    async fetchFood(filter) {
      try {
	// request and refetch favorite food
	this.loading();
	const response = await ax.get("/food", {
	  headers: {
	    access_token: this.getAccessToken(),
	  },
	  params: {
	    search: filter?.name,
	    cat: filter?.category,
	    page: filter?.page,
	  }
	});

	this.stopLoading();

	if ((response.data.pageInfo.totalItems <= response.data.pageInfo.itemsPerPage) && (response.data.pageInfo.currentPage > 1)) {
	  filter.page = 1;
	  return this.fetchFood(filter);
	}

	this.food = response.data.food;
	this.pageInfo = response.data.pageInfo;
      } catch (err) {
	this.stopLoading();
	return this.handleError(err);
      }
    }, // fetchFood
    async fetchFavoriteFood() {
      try {
	// request and refetch favorite food
	this.loading();
	const response = await ax.get("/favorites", {
	  headers: {
	    access_token: this.getAccessToken(),
	  },
	});
	// console.log(response.data);

	this.stopLoading();
	this.favorites = response.data;
      } catch (err) {
	this.stopLoading();
	return this.handleError(err);
      }
    }, // fetchFavoriteFood
    async removeFavoriteFood(id) {
      try {
	this.loading();
	// request and refetch favorite food
	const response = await ax.delete("/favorites/"+id, {
	  headers: {
	    access_token: this.getAccessToken(),
	  },
	});

	await this.fetchFavoriteFood();
	this.stopLoading();
      } catch (err) {
	this.stopLoading();
	return this.handleError(err);
      }
    }, // removeFavoriteFood
    async addFavoriteFood(id) {
      try {
	this.loading();
	// request and refetch favorite food
	const response = await ax.post("/favorites", {
	  id,
	}, {
	  headers: {
	    access_token: this.getAccessToken(),
	  },
	});

	await this.fetchFavoriteFood();
	this.stopLoading();
	return "/favorites";
      } catch (err) {
	this.stopLoading();
	return this.handleError(err);
      }
    }, // addFavoriteFood
    async fetchDetailFood(id) {
      try {
	this.loading();

	const response = await ax.get("/food/"+id, {
	  headers: {
	    access_token: this.getAccessToken(),
	  },
	});

	// console.log(response.data);
	this.detailFood = response.data;
	this.stopLoading();
      } catch (err) {
	this.stopLoading();
	return this.handleError(err);
      }
    }, // fetchDetailFood
    async googleLogin(data) {
      try {
	this.loading();
	const res = await ax.get("/auth/google-sign-in", {
	  headers: {
	    google_auth: data.credential,
	  }
	});

	this.setCredentials(res.data);
	this.user = true;

	this.stopLoading();
	return "/";
      } catch (err) {
	this.stopLoading();
	return this.handleError(err);
      }
    }, // googleLogin
    async fetchQRCode(str) {
      try {
	this.loading();

	const response = await ax.get(`/qrcode?code=${str}`, {
	  headers: {
	    access_token: this.getAccessToken(),
	  },
	});

	console.log(response.data);
	this.qrcode = response.data;
	this.stopLoading();
      } catch (err) {
	this.stopLoading();
	return this.handleError(err);
      }
    }, // fetchDetailFood
  },
  getters: {
    //
  },
});
