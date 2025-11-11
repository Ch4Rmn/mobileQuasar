<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-layout view="lHh Lpr lFf">
      <div class="q-pa-safe-top"></div>

      <!-- Header -->
      <q-header elevated class="bg-primary text-white safe-area-padding-top">
        <q-toolbar>
          <q-avatar square size="40px" class="q-m-sm">
            <img src="../assets/logo.png" alt="user" />
          </q-avatar>

          <q-toolbar-title>DPS MAP</q-toolbar-title>

          <!-- Marquee / Scrolling News -->
          <!-- <div class="marquee-wrapper">
          <div class="marquee">
            Breaking News: DPS Maps launches new features! &nbsp; | &nbsp; Dark mode is now
            available! &nbsp; | &nbsp; Visit dpsmap.com for more updates! &nbsp; | &nbsp; Download
            maps for offline use!
          </div>
        </div> -->
          <!--  -->

          <!-- Language Switch -->
          <q-select
            v-model="locale"
            :options="langs"
            dense
            outlined
            emit-value
            map-options
            style="width: 120px"
            @update:model-value="switchLang"
          />

          <!-- Dark Mode Toggle -->
          <q-btn
            flat
            round
            dense
            @click="toggleDarkMode"
            :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'"
            class="q-mr-sm"
          />

          <!-- User Avatar / Menu -->
          <q-btn flat round icon="account_circle" @click="goUser" />
        </q-toolbar>
      </q-header>

      <!-- <h4>{{ $t('success') }}</h4> -->

      <!-- Page Content -->
      <q-page-container>
        <router-view />
      </q-page-container>

      <!-- Bottom Navigation -->
      <q-footer bordered class="safe-area-padding-bottom">
        <q-tabs v-model="tab" dense align="justify" indicator-color="primary">
          <q-tab
            name="news"
            icon="article"
            :label="$t('news')"
            @click="goTo('/news')"
            :class="tab === 'news' ? 'active-tab' : ''"
          />
          <q-tab
            name="links"
            icon="group"
            :label="$t('links')"
            @click="goTo('/links')"
            :class="tab === 'links' ? 'active-tab' : ''"
          />
          <q-tab
            name="search"
            icon="search"
            :label="$t('search')"
            @click="goTo('/search')"
            :class="tab === 'search' ? 'active-tab' : ''"
          />
          <q-tab
            name="saved"
            icon="bookmark"
            :label="$t('saved')"
            @click="goTo('/saved')"
            :class="tab === 'saved' ? 'active-tab' : ''"
          />
          <q-tab
            name="user"
            icon="person"
            :label="$t('user')"
            @click="goTo('/user')"
            :class="tab === 'user' ? 'active-tab' : ''"
          />
        </q-tabs>
      </q-footer>
      <div class="q-pa-safe-bottom"></div>
    </q-layout>
  </q-pull-to-refresh>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const tab = ref('news')
const router = useRouter()
const route = useRoute()
const $q = useQuasar()

const langs = [
  { label: 'English', value: 'en-US' },
  { label: 'မြန်မာ', value: 'mm-MM' },
]

const switchLang = (lang) => {
  locale.value = lang
  localStorage.setItem('lang', lang)
}

// Load from storage if available
if (localStorage.getItem('lang')) {
  locale.value = localStorage.getItem('lang')
}
function goTo(path) {
  router.push(path)
}

function goUser() {
  router.push('/user')
}

// Dark Mode Toggle
function toggleDarkMode() {
  $q.dark.toggle()
  localStorage.setItem('darkMode', $q.dark.isActive)
}

// Apply saved dark mode
if (localStorage.getItem('darkMode') === 'true') $q.dark.set(true)
else $q.dark.set(false)

watch(
  () => route.path,
  (newPath) => {
    if (newPath.startsWith('/news')) tab.value = 'news'
    else if (newPath.startsWith('/links')) tab.value = 'links'
    else if (newPath.startsWith('/search')) tab.value = 'search'
    else if (newPath.startsWith('/saved')) tab.value = 'saved'
    else if (newPath.startsWith('/user')) tab.value = 'user'
  },
  { immediate: true },
)

function refresh(done) {
  setTimeout(() => {
    window.location.reload()
    done()
  }, 3000)
}
</script>

<style scoped>
.q-footer {
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}
.q-tab__label {
  font-size: 12px;
}
.active-tab {
  background-color: #000000;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
/* Marquee Styling */
.marquee-wrapper {
  width: 50%;
  overflow: hidden;
  background-color: #007bff;
  color: white;
  padding: 6px 0;
}

.dark .marquee-wrapper {
  background-color: #212121;
  color: #00bcd4;
}

.marquee {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 15s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
