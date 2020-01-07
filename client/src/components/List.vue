<template>
  <div class="card list" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">{{listData.title}}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  props: ["listData"]
};
</script>

<style scoped>
</style>
