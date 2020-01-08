<template>
  <div class="task">
    <h1>{{ taskData.description }}</h1>
  </div>
</template>

<script>
export default {
  name: "task",

  props: ["taskData"]
};
</script>

<style></style>
