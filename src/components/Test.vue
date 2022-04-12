<template>
  <div class="text-white">
    <button class="button" @click="toggleShow()">Test</button>

    <div class="bg-[{{colorHere}}] w-1/2 h-96 m-4 text-white transform transition-all duration-1000" :class="{'translate-y-0': show, 'translate-y-full': !show}">
      <div class="h-full bg-[{{colorHere}}]">Sample View</div>
    </div>
  </div>
</template>

<script>
export default {
name: "Test",
  data(){
    return {
      show: true,
      colorHere: "#9e1e1e",
    }
  },
  methods: {
    toggleShow(){
      this.show = !this.show;
      this.colorHere = "#" + ((1<<24)*Math.random() | 0).toString(16);
    }
  }
}
</script>

<style scoped>

</style>