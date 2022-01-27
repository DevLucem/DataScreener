<template>

  <div class="text-white my-12 mx-8">

    <h1 class="text-4xl font-bold">Data Screener <span class="text-xl font-normal text-gray font-bold"> / Recent Updates</span> </h1>

    <div class="my-8 text-white overflow-x-auto">
      <table class="w-full max-w-full border-separate">
        <thead>
        <tr>
          <th class="bg-fore rounded m-4 p-4 rounded-xl" v-for="title in ['Symbol', 'Recent Update']">{{title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="d in data">
          <td v-for="v in ['symbol', 'last']">
            <div class="m-4 border border-gray p-4 rounded-2xl truncate">
              {{d[v]}}
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>

</template>

<script>
export default {
  name: "Updates",
  props: ['data']
}
</script>

<style scoped>

</style>