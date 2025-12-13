import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
    state: () => ({
        isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
        email: localStorage.getItem("email") || ""
    }),
    actions: {
        login(email) {
            this.isLoggedIn = true
            this.email = email
            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("email", email)
        },
        logout() {
            this.isLoggedIn = false
            this.email = ""
            localStorage.removeItem("isLoggedIn")
            localStorage.removeItem("email")
        }
    }
})