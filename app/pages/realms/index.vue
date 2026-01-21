<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Realms</h1>
    <div class="mb-4">
      <NuxtLink to="/realms/new" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Create New Realm
      </NuxtLink>
    </div>
    <RealmList />
  </div>
</template>