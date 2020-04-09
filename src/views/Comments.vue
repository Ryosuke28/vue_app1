<template>
  <div>
    <h1>掲示板</h1>
    <div class="postform bg-white py-3">
      <h3 class="mb-2">掲示板に投稿する</h3>
      <div class="form-item">
        <label for="name">ニックネーム：</label>
        <input name="name" type="text" v-model="name" />
      </div>
      <div class="form-item">
        <label for="comment">コメント：</label>
        <textarea name="comment" id="comment" v-model="comment"></textarea>
      </div>
      <button @click="createComment">投稿する</button>
    </div>
    <div class="posts bg-white py-3">
      <h3 class="mb-2">掲示板</h3>
      <transition-group name="slide" tag="div" appear>
        <div v-for="(post, index) in posts" :class="'post post-' + index" :key="post.name">
          <div>名前：{{ post.fields.name.stringValue }}</div>
          <div>コメント：{{ post.fields.comment.stringValue }}</div>
          <br />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      comment: "",
      posts: []
    };
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    }
  },
  created() {
    axios
      .get("/comments", {
        headers: {
          Authorization: `Bearer ${this.idToken}`
        }
      })
      .then(response => {
        this.posts = response.data.documents;
      });
  },
  methods: {
    createComment() {
      axios
        .post(
          "/comments",
          {
            // Cloud Firestoreでの書き方
            fields: {
              name: {
                stringValue: this.name
              },
              comment: {
                stringValue: this.comment
              }
            }
          },
          {
            headers: {
              Authorization: `Bearer ${this.idToken}`
            }
          }
        )
        .then(() => {
          this.$router.go({
            path: this.$router.currentRoute.path,
            force: true
          });
        });
      this.name = "";
      this.comment = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@for $i from 0 through 10 {
  $enter-delay: 200ms;
  .slide-enter {
    opacity: 0;
  }
  .slide-enter-active {
    animation: slide-in 0.5s;
    transition: opacity 0.3s;
    &.post-#{$i} {
      animation-delay: #{$enter-delay * $i};
      transition-delay: #{$enter-delay * $i};
    }
  }
}

@keyframes slide-in {
  from {
    transform: translateY(-30px);
  }
  to {
    transform: translateY(0);
  }
}
</style>
