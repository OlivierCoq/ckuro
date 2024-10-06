<template>
  <editor-content :editor="editor" />
</template>

<script>
  import { Editor, EditorContent } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'

  const props = defineProps({
    content: {
      type: String,
      required: true,
    },
  })

  export default {
    components: {
      EditorContent,
    },

    data() {
      return {
        editor: null,
      }
    },

    mounted() {
      this.editor = new Editor({
        content: props.content,
        extensions: [StarterKit],
      })
    },

    beforeUnmount() {
      this.editor.destroy()
    },
  }
</script>
