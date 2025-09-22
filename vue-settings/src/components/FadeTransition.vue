<template>
  <Transition mode="out-in" name="fade">
    <slot></slot>
  </Transition>
</template>

<style>
/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
/* fade- comes from given name to Transition. If not given, then use v- */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>