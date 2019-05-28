<template>
  <div v-html="content" @input="result" id="editor">
  </div>
</template>

<script>
  import E from 'wangeditor'
  export default {
    props: ['content', 'path'],
    data() {
      return {
        editor: ''
      }
    },
    mounted() {
      const editor = new E('editor')
      editor.config.uploadImgUrl = this.path
      editor.create()
      this.editor = editor
    },
    methods: {
      result() {
        this.$emit('input', this.editor.$txt.html())
      }
    }
  }
</script>
<style scoped>
  #editor {
    height: 440px;
  }

  .wangEditor-container {
    border-radius: 2px;
    overflow: hidden;
    border: 1px solid #CCC;
  }
</style>
