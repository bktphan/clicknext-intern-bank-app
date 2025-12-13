<script setup>
import { ref } from 'vue'
import { useBankStore } from '../stores/bank'
import MainLayout from '../layouts/MainLayout.vue'

const amount = ref('')
const bankStore = useBankStore()

const handleTransaction = (type) => {
    const value = Number(amount.value)
    
    if (!amount.value || value <= 0) {
        alert('กรุณากรอกจำนวนเงินให้ถูกต้อง')
        return
    }
    if (value > 100000) {
        alert('ทำรายการได้สูงสุดครั้งละ 100,000 บาท')
        return
    }
    if (type === 'withdraw' && value > bankStore.balance) {
        alert('ยอดเงินในบัญชีไม่เพียงพอสำหรับการถอน')
        return
    }

    bankStore.addTransaction({
        amount: value,
        type: type
    })

    const actionName = type === 'deposit' ? 'ฝาก' : 'ถอน'
    alert(`ทำรายการ ${actionName} จำนวน ${value.toLocaleString()} บาท เรียบร้อยแล้ว`)
    amount.value = ''
}
</script>

<template>
    <MainLayout>
        
        <div class="container py-4">
            <h2 class="fw-bold mb-4">Deposit / Withdraw</h2>

            <div class="card shadow-sm border-0" style="border-radius: 15px;">
                <div class="card-body p-5 text-center">
                    
                    <p class="text-muted mb-1 fs-5">จำนวนเงินคงเหลือ</p>
                    <h1 class="display-4 fw-bold text-primary mb-5">
                        {{ bankStore.balance.toLocaleString() }} 
                        <span class="fs-4 text-dark">THB</span>
                    </h1>

                    <div class="row justify-content-center">
                        <div class="col-md-8 col-lg-6">
                            
                            <div class="mb-4 text-start">
                                <label class="form-label fw-bold">จำนวนเงิน *</label>
                                <input 
                                    v-model="amount" 
                                    type="number" 
                                    class="form-control form-control-lg" 
                                    placeholder="กรอกจำนวนเงิน" 
                                >
                                <div class="form-text text-end">0 - 100,000 บาท</div>
                            </div>

                            <div class="row g-3">
                                <div class="col-6">
                                    <button 
                                        @click="handleTransaction('deposit')" 
                                        class="btn btn-success w-100 btn-lg py-2 fw-bold"
                                    >
                                        ฝาก
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button 
                                        @click="handleTransaction('withdraw')" 
                                        class="btn btn-danger w-100 btn-lg py-2 fw-bold"
                                    >
                                        ถอน
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    </MainLayout>
</template>

<style scoped>
.form-control-lg {
    padding: 1rem;
    font-size: 1.1rem;
}
</style>