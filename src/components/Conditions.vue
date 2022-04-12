<template>
  <div class="flex bg-accent rounded rounded-xl border-gray border my-1">
    <div class="rounded-lg py-1 flex justify-between relative items-center m-2" v-bind:class="{'bg-danger': deleting, 'bg-primary': !deleting, 'flex-1': fill}">
      <span class="pl-2 text-ellipsis w-16 overflow-ellipsis">{{conditions.filter(xx => xx.id === cond)[0] ? conditions.filter(xx => xx.id === cond)[0].name : 'NOT FOUND'}}</span>
      <button class="h-4 mx-2 icon"  @mouseover="deleting=true" @mouseleave="deleting=false" @click="deleteCondition">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="current" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="flex absolute w-full text-center" :class="{hidden: !adding}">
        <div class="flex-1 bg-gray" v-on:drop="addCondition(false)" ondragover="return false">OR</div>
        <div class="flex-1 bg-back" v-on:drop="addCondition()" ondragover="return false">AND</div>
      </div>

    </div>
    <div v-if="condition && Object.keys(condition).length>0">
      <Conditions v-for="(c, i) in condition" :cond="i" :condition="c" :conditions="conditions" :deleting="deleting" :filter="filter" :position="position+'.'+cond" :adding="adding"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Conditions",
  props: ['conditions', 'condition', 'cond', 'deleting', 'position', 'filter', 'adding', 'fill'],
  methods: {
    addCondition(and=true){
      if (!this.adding) return;
      let path = this.position;
      if (and) path += "." + this.cond + "." + this.adding
      else path += "." + this.adding
      this.FILTERS.doc(this.filter).update({[path]: null})
    },
    deleteCondition(){
      let path = this.position + "." + this.cond
      console.log(path)
      this.FILTERS.doc(this.filter).update({[path]: this.FIELD_VALUE.delete()})
    }
  }
}
</script>

<style scoped>

</style>