<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat round icon="newspaper" />
        <q-toolbar-title> My DPS Maps </q-toolbar-title>

        <!-- Dark Mode Toggle -->
        <q-btn
          flat
          round
          dense
          :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'"
          @click="toggleDarkMode"
          class="q-mr-sm"
        />

        <q-btn flat round icon="account_circle" @click="goUser" />
      </q-toolbar>
    </q-header>

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Bottom Navigation -->
    <q-footer bordered :class="$q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-white text-dark'">
      <q-tabs
        v-model="tab"
        dense
        align="justify"
        :class="$q.dark.isActive ? 'text-white' : 'text-primary'"
        indicator-color="transparent"
      >
        <q-tab name="news" icon="article" label="News" @click="goTo('/news')" />
        <q-tab name="people" icon="group" label="Links" @click="goTo('/links')" />
        <q-tab name="search" icon="search" label="Search" @click="goTo('/search')" />
        <q-tab name="saved" icon="bookmark" label="Saved" @click="goTo('/saved')" />
        <q-tab name="user" icon="person" label="User" @click="goTo('/user')" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const tab = ref('news')
const router = useRouter()
const $q = useQuasar()

function goTo(path) {
  router.push(path)
}
function goUser() {
  router.push('/user')
}

// Dark Mode Toggle Function
function toggleDarkMode() {
  $q.dark.toggle()
  localStorage.setItem('darkMode', $q.dark.isActive)
}

// Apply saved dark mode on app start
onMounted(() => {
  const dark = localStorage.getItem('darkMode')
  $q.dark.set(dark === 'true')
})
</script>

<style scoped>
.q-footer {
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
.q-tab__label {
  font-size: 12px;
}
</style>
