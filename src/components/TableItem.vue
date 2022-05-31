<template>
  <div class="row">
    <div class="inline">
      <div class="cell cell_name">{{ user.name }}</div>
      <div class="cell">{{ user.phone }}</div>
    </div>
    <template v-if="user.subordinates && user.subordinates.length">
      <Item v-for="(subordinate, subIndex) in user.subordinates"
            :key="subordinate.id"
            :index="subIndex"
            v-bind:user="subordinate"
            :parent-item="user"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    user: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    parentItem: {
      required: false
    }
  }
}
</script>

<style></style>
