<script setup>
import Sidebar from '../components/MenuSidebar.vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const handleLogout = () => {
    userStore.logout()
    router.push('/login')
}
</script>

<template>
    <div class="d-flex w-100 vh-100 overflow-hidden flex-column flex-md-row">
        
        <div class="d-none d-md-block" style="width: 280px;">
            <Sidebar />
        </div>

        <nav class="navbar navbar-light bg-light border-bottom d-md-none px-3">
            <button class="btn btn-outline-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu">
                ☰
            </button>
            <span class="navbar-brand fw-bold text-primary ms-2">ClickNext</span>
            <button @click="handleLogout" class="btn btn-sm btn-danger">Logout</button>
        </nav>

        <div class="offcanvas offcanvas-start" tabindex="-1" id="mobileMenu">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title">Menu</h5>
                <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
            </div>
            <div class="offcanvas-body p-0">
                <Sidebar />
            </div>
        </div>

        <div class="flex-grow-1 bg-white d-flex flex-column" style="overflow-y: auto;">
            <div class="container-fluid p-4">
                <slot />
            </div>
        </div>

    </div>
</template>