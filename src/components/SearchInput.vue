<template>
<v-text-field class="search" outlined label="🔍 Поиск" placeholder="Введите поисковый запрос" v-model="text"/>
</template>

<script>
export default {
name: "SearchInput",
  data() {
    return {
      text: null
    }
  },
  watch: {
    text(newVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  margin: 10px 30px;
  flex: 0;
}
</style>