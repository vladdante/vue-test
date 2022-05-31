<template>
  <div id="app">
    <Table/>
    <Modal v-if="$store.getters['SHOW_MODAL']"/>
  </div>
</template>

<script>
  import Table from "./components/Table"
  import Modal from "./components/Modal"

  export default {
    name: "App",
    components: { Modal,  Table },
    created() { this.$store.dispatch("getUsers") }
  }
</script>

<style lang="sass">
  #app
    display: flex
    justify-content: space-around
    padding-top: 100px
  .inline
    display: inline-flex
  .cell
    border: solid 1px black
    width: 200px
    padding: 10px 0 10px 20px
    margin: -1px -1px 0 0
  .row
    .row
      margin-left: 35px
      .cell_name
        width: 165px
</style>
