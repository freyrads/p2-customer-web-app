"use strict";
import { defineStore } from "pinia";

export const useFilterStore = defineStore("filter", {
  state() {
    return {
      filter: {
	category: [],
	name: "",
	page: 1,
      },
    };
  },
  actions: {},
  getters: {},
});
