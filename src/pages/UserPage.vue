<template>
  <q-page class="bg-grey-1 q-pa-md">
    <!-- Header Section -->
    <div class="column items-center q-mb-lg">
      <q-avatar size="80px" class="q-mb-sm">
        <img src="../assets/user.jpeg" alt="user" />
      </q-avatar>
      <div class="text-h6 text-primary">Lin Htut Kyaw</div>
      <div class="text-caption text-grey">linhtutkyaw@example.com</div>
    </div>

    <!-- Settings List -->
    <q-card flat bordered class="q-pa-none shadow-2 rounded-borders">
      <q-list separator>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="manage_accounts" color="primary" />
          </q-item-section>
          <q-item-section>Account</q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="lock" color="primary" />
          </q-item-section>
          <q-item-section>Privacy</q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="language" color="primary" />
          </q-item-section>
          <q-item-section>Language</q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="info" color="primary" />
          </q-item-section>
          <q-item-section>About Us</q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <h5 class="text-center">copyright by dpsmap</h5>
  </q-page>
</template>

<script setup>
// import { ref } from 'vue';

// const data = ref();
</script>
