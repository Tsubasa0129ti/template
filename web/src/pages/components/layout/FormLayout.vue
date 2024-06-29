<template>
  <main class="main-container">
    <div class="form-header">
      <slot name="formHeader"></slot>
    </div>
    <div class="content-wrapper">
      <section class="form-content">
        <slot name="formContent"></slot>
      </section>
    </div>
    <div class="form-footer">
      <slot name="formFooter"></slot>
    </div>
  </main>
</template>

<style lang="scss">
.main-container {
  display: flex;
  padding: 80px 40px;
  justify-content: center; /* 左右中央寄せ */
  align-items: center; /* 上下中央寄せ */
  flex-direction: column; /* 子要素を縦並びにする */
  height: 100%;

  .form-header {
    h1 {
      text-align: center;
    }

    p {
      max-width: 420px;
      text-align: center;
    }
  }

  .content-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .form-content {
    min-width: 420px;
  }
}
</style>
