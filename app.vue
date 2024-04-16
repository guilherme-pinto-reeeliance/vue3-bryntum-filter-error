<script setup>
import {onMounted, ref} from 'vue';
import {AjaxStore} from "@bryntum/grid";
import {BryntumGrid} from "@bryntum/grid-vue-3";

import '@bryntum/grid/grid.stockholm.css';

const server = "https://vue3-bryntum-filter-error-server-2.guilherme-pinto.workers.dev"
const gridConfig = ref({
  height: '100vh',
  store: new AjaxStore({
    httpMethods: {
      create: 'POST',
      read: "GET",
      update: "POST",
      delete: "DELETE"
    },
    autoLoad: true,
    useRestfulMethods: false,
    pageSize: 10,
    pageParamName: 'page',
    pageSizeParamName: 'limit',
    filterParamName: 'filter',
    createUrl: server + '/data',
    readUrl: server + '/data',
    updateUrl: server + '/data',
    deleteUrl: server + '/data',
  }),
  bbar: {
    type: "pagingtoolbar"
  },
  features: {
    filter: true,
    stripe: true,
  },
  columns: []
});

async function loadColumns() {
  try {
    const response = await fetch(server + '/columns');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    if (data.success && data.data) {
      const columns = data.data.map(colName => ({
        field: colName,
        text: colName.charAt(0).toUpperCase() + colName.slice(1),
        vue: true
      }));
      gridConfig.value.columns = columns;
    }
  } catch (error) {
    console.error('Failed to load columns:', error);
  }
}

// Carrega colunas quando o componente é montado
onMounted(() => {
  loadColumns();
});
</script>

<template>
  <bryntum-grid
      ref="grid"
      v-if="gridConfig.columns.length > 0"
      v-bind="gridConfig"
  />
</template>
