<template>
  <form @submit.prevent="$store.dispatch('createUser')">
    <div class="title">Добавление пользователя</div>
    <div class="close_btn">
      <button @click.prevent="$store.dispatch('closeModal')">x</button>
    </div>

    <label>Имя</label>
    <input v-model="user.name">

    <label>Телефон</label>
    <input v-model="user.phone">

    <label>Начальник</label>
    <select v-model="user.chief_id"
            :disabled="!$store.getters['USERS'].length"
    >
      <option v-for="chief in $store.getters['ALL_USERS']"
              :key="chief.id"
              :value="chief.id"
      >
        {{ chief.name }}
      </option>
    </select>

    <button class="submit_btn" type="submit">Сохранить</button>
  </form>
</template>

<script>
  import { mapState } from "vuex"
  export default {
    name: 'Modal',
    computed: mapState({ user: state => state.user }),
    created() { this.$store.dispatch("getUser") }
  }
</script>

<style lang="sass" scoped>
  form
    display: grid
    grid-template-columns: 100px 215px
    column-gap: 25px
    row-gap: 25px
    border: solid 1px black
    padding: 10px 20px 25px 20px
    width: 340px
  label
    line-height: 26px
  input
    height: 24px
    border: solid 1px black
  select
    height: 28px
    background: none
    border: solid 1px black
  .title
    white-space: nowrap
    margin-bottom: 3px
  .close_btn
    button
      background: none
      border: none
      height: 20px
      width: 14px
      float: inline-end
      font-size: 1em
      cursor: pointer
  .submit_btn
    height: 35px
    width: 170px
    border-radius: 10px
    border: solid 1px black
    margin: 3px 0
    text-align: left
    padding-left: 15px
    font-size: 1em
    cursor: pointer
</style>
