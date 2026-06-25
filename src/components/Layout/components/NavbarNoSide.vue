<template>
  <div class="navbar">
    <div class="pull-left">
      <div class="navbar-logo" style="display: flex">
        <img src="@/assets/pawms-logo.png" alt="logo" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 50px;
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid #eee;

  padding: 0 20px;

  .breadcrumb-container {
    float: left;
  }

  .right-menu-item {
    padding: 16px;
    font-size: 14px;
    color: #5a5e66;
    height: 60px;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;
      position: relative;
      top: 7px;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .right-menu {
    float: right;
    display: flex;
  }
}

.navbar-logo {
  width: 200px;
  height: 45px;
  padding: 8px;
  margin-top: 3px;
}
</style>
