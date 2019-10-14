<template>
  <div style="display: flex; padding: 10px">
        <div style="flex-grow: 2; display: flex; justify-content: center; align-items: center">
          <slot name="navLeft"></slot>
        </div>
        <div style="flex-grow: 6">
          <slot name="navCenter"></slot>
        </div>
        <div style="flex-grow: 2; display: flex; justify-content: center; align-items: center">
          <slot name="navRight"></slot>                    
        </div>
      </div>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style>

</style>