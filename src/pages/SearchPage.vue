<template>
  <q-page :class="$q.dark.isActive ? 'bg-dark' : 'bg-grey-1'" class="q-pa-md">
    <div class="q-mb-md row items-center q-col-gutter-sm">
      <!-- Search Input -->
      <div class="col-8">
        <q-input
          outlined
          dense
          color="primary"
          v-model="searchStore.searchQuery"
          placeholder="Search..."
          clearable
          :class="$q.dark.isActive ? 'bg-grey-10 text-white' : ''"
        >
          <template #append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <!-- Filter Dropdown -->
      <div class="col-4">
        <q-select
          outlined
          dense
          v-model="searchStore.filterType"
          :options="filterOptions"
          emit-value
          map-options
          color="primary"
          :class="$q.dark.isActive ? 'bg-grey-10 text-white' : ''"
        />
      </div>
    </div>

    <!-- Results -->
    <q-list bordered separator :class="$q.dark.isActive ? 'bg-grey-10 text-white' : ''">
      <q-item
        v-for="item in searchStore.filteredItems"
        :key="item.id"
        clickable
        v-ripple
        @click="selectItem(item)"
        :class="$q.dark.isActive ? 'bg-grey-10 text-white' : ''"
      >
        <q-item-section avatar>
          <q-avatar color="primary" text-color="white">
            {{ item.title.charAt(0).toUpperCase() }}
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-h6">{{ item.title }}</q-item-label>
          <q-item-label caption>{{ item.category }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-icon name="chevron_right" color="grey" />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- No results -->
    <div
      v-if="!searchStore.filteredItems.length"
      class="text-center q-mt-lg"
      :class="$q.dark.isActive ? 'text-grey-4' : 'text-grey'"
    >
      <q-icon name="search_off" size="3rem" :color="$q.dark.isActive ? 'grey-4' : 'grey-5'" />
      <div class="text-subtitle1 q-mt-sm">No results found</div>
    </div>

    <!-- Dialog for item details -->
    <q-dialog v-model="showDialog">
      <q-card
        :class="$q.dark.isActive ? 'bg-grey-10 text-white' : ''"
        style="max-width: 400px; width: 90%"
      >
        <q-card-section>
          <div class="text-h6 text-primary">{{ selectedItem?.title }}</div>
          <div class="text-subtitle2 text-grey">{{ selectedItem?.category }}</div>
          <p class="q-mt-sm">{{ selectedItem?.description }}</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useSearchStore } from 'src/stores/searchStore'

const searchStore = useSearchStore()
const showDialog = ref(false)
const selectedItem = ref(null)

const filterOptions = [
  { label: 'All Fields', value: 'all' },
  { label: 'Title Only', value: 'title' },
  { label: 'Category Only', value: 'category' },
  { label: 'Description Only', value: 'description' },
]

const selectItem = (item) => {
  selectedItem.value = item
  showDialog.value = true
}
</script>
