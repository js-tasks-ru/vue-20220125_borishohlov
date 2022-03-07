<template>
  <div class="image-uploader">
    <label :class="{
      'image-uploader__preview-loading': status == 'uploading'
    }" class="image-uploader__preview" >
      <span class="image-uploader__text">{{ textStatus }}</span>
      <input ref="file" type="file" accept="image/*" class="image-uploader__input" v-bind="$attrs" @click="handleClick" @change="handleInput"/>
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  data: function() {
    return {
      status: this.preview ? 'image' : 'empty',
      file: null,
      inputDisabled: false,
      image: this.preview,
    }
  },

  props: {
    preview: String,
    uploader: Function
  },

  emits: ['select', 'upload', 'error', 'remove'],

  computed: {
    textStatus: function (){
      if (this.status == 'empty') {
        return 'Загрузить изображение'
      } else if (this.status == 'uploading') {
        return 'Загрузка...'
      } else {
        return 'Удалить изображение'
      }
    },

    bgImage: function () {
      return this.preview ? 'url('+ this.preview + ')' : 'var(--default-cover)';
    }
  },

  methods: {
    handleInput: function (event) {
      let file = this.$refs.file.files[0];
      this.$emit('select', file);
      if (!!this.uploader) {
        this.status = 'uploading';
        if (file) {
          this.uploader(this.$refs.file.files[0]).then((res) => {
            console.log(res)
            this.status = 'image';
            this.$emit('upload', res);
          })
            .catch((error) => {
              console.log('error')
              this.status = 'empty';
              this.$emit('error', error);
              this.$refs.file.value = ''
            })
        } else {
          this.$emit('error', 'Изображение не было выбрано');
          this.status = 'empty';
          this.$refs.file.value = ''
        }
      } else {
        this.status = 'image';
      }
    },
    handleClick: function (e) {
      if (this.status == 'image') {
        e.preventDefault();
        this.$emit('remove');
        this.status = 'empty';
        this.$refs.file.value = ''
      }
    }
  },

};
</script>

<style scoped>
root {

}

.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), v-bind(bgImage);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
