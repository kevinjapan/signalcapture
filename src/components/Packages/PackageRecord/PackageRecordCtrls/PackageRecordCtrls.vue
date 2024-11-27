<script lang="ts" setup>
import { useRouter } from 'vue-router'



const props = defineProps<{
    package_id: number
}>()


const router = useRouter()

const open_print_view = () => {
    router.push(`/packages/${props.package_id}/print`)
}
</script>


<template>

    <section class="flex justify_end pr_1">
        
        <img @click="open_print_view" src="@/assets/icons/printer.svg" alt="print package button" class="cursor_pointer"/>

    </section>

</template>