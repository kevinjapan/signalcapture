<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { usePackageStore } from '../stores/PackageStore'
import PackageRecord from '@/components/Packages/PackageRecord/PackageRecord.vue'



// PackageView - view a single package

const item = ref<Package | null>(null)
const is_loading = ref<boolean>(true)

const route = useRoute()
const PackageStore = usePackageStore()
PackageStore.load_single_package(parseInt(route.params.id as string))

onMounted(() => {
   window.scroll(0,0)
})

watchEffect(() => {
   if(PackageStore.single_package) is_loading.value = false
   item.value = PackageStore.single_package
})


</script>


<template>

   <div v-if="is_loading" class="loading_spin"></div>
   <section class="mt_5">
      <PackageRecord
         v-if="item"
         :item="item"
      />
   </section>


</template>


<style scoped>
section.record_card{
   display:grid;
   grid-template-columns:1fr 2fr;
   gap:.75rem;
   margin:5rem 3rem;
   max-width:600px;
   background:white;
   padding:1rem;
   border-radius:.5rem;
}

</style>