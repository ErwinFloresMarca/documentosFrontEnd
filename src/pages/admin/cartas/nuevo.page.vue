<template>
  <div>
    <el-card shadow="hover" :body-style="{ padding: '10px' }">
      <template #header>
        <div class="card-header">
          <span class="font-bold uppercase">{{ !carta ? 'NUEVA CARTA' : 'ASIGNAR AREAS' }}</span>
          <el-button v-if="!carta" type="primary" size="default" :icon="ArrowLeftBold" @click="$router.go(-1)"
            >Atrás</el-button
          >
        </div>
      </template>
      <nuevo-form-vue v-if="!carta" @success="onSuccessSave" />
      <asignar-areas v-else :carta-id="carta.id" @save="onSaveAsignacion" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftBold } from '@element-plus/icons-vue';
import NuevoFormVue from '@/views/cartas/nuevo.form.vue';
import AsignarAreas from '@/views/cartas/asignar-areas.vue';
// import PhFloppyDisk from '~icons/ph/floppy-disk';
// import PhBuildings from '~icons/ph/buildings';
const router = useRouter();

// const activeStep = ref(0);
const carta = ref();
const onSuccessSave = (data) => {
  carta.value = data;
};

const onSaveAsignacion = () => {
  router.push({
    name: 'CartasList',
  });
};
</script>
<script lang="ts">
export default {
  name: 'NuevaCartaPage',
};
</script>
<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
