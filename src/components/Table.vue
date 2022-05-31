<template>
  <div id="table">
    <div class="modal_btn">
      <button @click.prevent="$store.commit('toggleModal')">Добавить</button>
    </div>
    <div id="grid">
      <div class="inline">
        <div class="cell">Имя</div>
        <div class="cell">Телефон</div>
      </div>
      <Item v-for="(user, index) in $store.getters['USERS']"
            :key="user.id"
            :user="user"
            :index="index"
            v-bind:item="user"
      />
    </div>
  </div>
</template>

<script>
  import Item from "./TableItem"
  export default {
    name: "Table",
    components: { Item }
  }
</script>

<style lang="sass" scoped>
  table, th, td
    border: 1px solid black
    border-collapse: collapse
  td
    padding: 10px
  button
    float: inline-end
    height: 30px
    width: 100px
    border-radius: 12px
    border: solid 1px black
    cursor: pointer
    margin-bottom: 20px

</style>
