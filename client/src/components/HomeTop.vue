<template>
  <div class="top row bg-dark">
    <div class="col-6">
      <h1 class="text-white">The Boards</h1>
    </div>
    <div class="col-6">
      <form @submit.prevent="addBoard">
        <!-- <input type="text" placeholder="title" v-model="newBoard.title" required /> -->
        <!-- <input type="text" placeholder="description" v-model="newBoard.description" required /> -->
        <button class="btn btn-outline-light btn-lg" type="submit">
          Create Board
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      newBoard: {
        title: "",
        description: "",
      },
    };
  },
  methods: {
    addBoard() {
      this.$store.dispatch("addBoard", this.newBoard);
      this.newBoard = { title: "", description: "" };
    },
    const{ value: formValues } = await Swal.fire({
  title: 'Multiple inputs',
  html:
    '<input id="swal-input1" class="swal2-input">' +
    '<input id="swal-input2" class="swal2-input">',
  focusConfirm: false,
  preConfirm: () => {
    return [
      document.getElementById('swal-input1').value,
      document.getElementById('swal-input2').value
    ]
  }
})

if (formValues) {
  Swal.fire(JSON.stringify(formValues))
}
  },
};
</script>

<style></style>
