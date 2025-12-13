<script setup>
import { ref, onMounted } from 'vue'
import { useBankStore } from '../stores/bank'
import { useUserStore } from '../stores/user'
import MainLayout from '../layouts/MainLayout.vue'
import { Modal } from 'bootstrap'

const bankStore = useBankStore()
const userStore = useUserStore()

const editModalRef = ref(null)
const deleteModalRef = ref(null)
let editModalInstance = null 
let deleteModalInstance = null

const editingItem = ref({ id: null, amount: 0, date: '', type: '' })
const deletingItem = ref({ id: null, amount: 0, date: '', type: '' })

onMounted(() => {
    editModalInstance = new Modal(editModalRef.value)
    deleteModalInstance = new Modal(deleteModalRef.value)
})


const openEditModal = (item) => {
    editingItem.value = { ...item } 
    editModalInstance.show()
}

const saveEdit = () => {
    const val = Number(editingItem.value.amount)
    if (val <= 0 || val > 100000) {
        alert('จำนวนเงินต้องอยู่ระหว่าง 1 - 100,000 บาท')
        return
    }
    
    bankStore.editTransaction(editingItem.value.id, val)
    editModalInstance.hide()
}

const openDeleteModal = (item) => {
    deletingItem.value = { ...item }
    deleteModalInstance.show()
}

const confirmDelete = () => {
    bankStore.deleteTransaction(deletingItem.value.id)
    deleteModalInstance.hide()
}

</script>

<template>
    <MainLayout>
        <div class="container py-4">
            <h2 class="fw-bold mb-4">Transaction History</h2>

            <div class="card shadow-sm border-0" style="border-radius: 15px;">
                <div class="card-body">
                    
                    <div class="table-responsive">
                        <table class="table table-hover align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th>Date-Time</th>
                                    <th>Email</th> <th>Type</th>
                                    <th class="text-end">Amount</th>
                                    <th class="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in bankStore.transactions" :key="item.id">
                                    <td class="text-muted small">{{ item.date }}</td>
                                    <td>{{ userStore.email }}</td>
                                    <td>
                                        <span 
                                            class="badge rounded-pill" 
                                            :class="item.type === 'deposit' ? 'bg-success' : 'bg-danger'"
                                        >
                                            {{ item.type.toUpperCase() }}
                                        </span>
                                    </td>
                                    <td class="text-end fw-bold">
                                        {{ item.amount.toLocaleString() }}
                                    </td>
                                    <td class="text-center">
                                        <button 
                                            @click="openEditModal(item)" 
                                            class="btn btn-sm btn-outline-warning me-2"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            @click="openDeleteModal(item)" 
                                            class="btn btn-sm btn-outline-danger"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                
                                <tr v-if="bankStore.transactions.length === 0">
                                    <td colspan="5" class="text-center py-4 text-muted">
                                        ยังไม่มีรายการเดินบัญชี
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" ref="editModalRef" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Transaction</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>แก้ไขรายการของวันที่: <strong>{{ editingItem.date }}</strong></p>
                        <label class="form-label">จำนวนเงินใหม่</label>
                        <input 
                            v-model="editingItem.amount" 
                            type="number" 
                            class="form-control"
                        >
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="saveEdit">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" ref="deleteModalRef" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title text-danger">Confirm Delete</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>คุณต้องการลบรายการนี้ใช่หรือไม่?</p>
                        <ul class="list-group list-group-flush bg-light rounded">
                            <li class="list-group-item bg-transparent">วันที่: <strong>{{ deletingItem.date }}</strong></li>
                            <li class="list-group-item bg-transparent">ประเภท: <strong>{{ deletingItem.type }}</strong></li>
                            <li class="list-group-item bg-transparent">จำนวนเงิน: <strong>{{ deletingItem.amount.toLocaleString() }}</strong></li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" @click="confirmDelete">Confirm Delete</button>
                    </div>
                </div>
            </div>
        </div>

    </MainLayout>
</template>