<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const handleLogout = () => {
    userStore.logout()
    router.push('/login')
}
</script>

<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light border-end h-100">
        
        <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <span class="fs-4 fw-bold text-primary">Banking Web App</span>
        </a>
        <hr>
        
        <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <RouterLink 
                    to="/deposit" 
                    class="nav-link"
                    :class="route.path === '/deposit' ? 'active bg-dark' : 'link-dark'"
                >
                    Deposit / Withdraw
                </RouterLink>
            </li>
            <li>
                <RouterLink 
                    to="/transaction" 
                    class="nav-link"
                    :class="route.path === '/transaction' ? 'active bg-dark' : 'link-dark'"
                >
                    Transaction History
                </RouterLink>
            </li>
        </ul>
        
        <hr>
        
        <div class="dropdown">
            <div class="d-flex align-items-center justify-content-between px-2">
                <div class="small fw-bold text-truncate" style="max-width: 150px;">
                    {{ userStore.email }}
                </div>
                <button @click="handleLogout" class="btn btn-sm btn-outline-danger">
                    Logout
                </button>
            </div>
        </div>

    </div>
</template>

<style scoped>
.nav-link {
    margin-bottom: 5px;
}
</style>