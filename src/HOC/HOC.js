// hocs/withSubscription.js

import Vue from 'vue'
import CommentsList from '~/components/CommentsList.vue'

const withSubscription = (component) => {
  return Vue.component('withSubscription', {
    render(createElement) {
      return createElement(component)
    } 
  }
}
const CommentsListWithSubscription = withSubscription(CommentsList);



//hocs/withSubscription.js
import DataSource from '../store/source'
import Vue from 'vue'

const withSubscription = (component) => {
    return Vue.component('withSubscription', {
        render(createElement) {
            return createElement(component)
        },
        methods: {
            handleChange() {
            }
        },
        mounted() {
            DataSource.addChangeListener(this.handleChange)
        },
        beforeDestroy() {
            DataSource.removeChangeListener(this.handleChange)
        }
    })
}

export default withSubscription


//hocs/withSubscription.js
import DataSource from '../store/source'
import Vue from 'vue'


const BlogPostWithSubscription = withSubscription(BlogPost, (DataSource) => {
  return DataSource.getBlogPost()
})

const withSubscription = (component, selectData) => {
return Vue.component('withSubscription', {
        render(createElement, context) {
            return createElement(component, {
               props: {
                  content: this.fetchedData
               }
            })
        },
        data() {
            return {
                fetchedData: null
            }
        },
        methods: {
            handleChange() {
                this.fetchedData = selectData(DataSource)
            }
        },
        mounted() {
            DataSource.addChangeListener(this.handleChange)
        },
        beforeDestroy() {
            DataSource.removeChangeListener(this.handleChange)
        }
    })
}

export default withSubscription


//App.vue
<template>
  <div id="app">
    <blog-post/>
    <comments-list/>
  </div>
</template>

<script>
import CommentsList from './components/CommentsList'
import BlogPost from './components/BlogPost'
import withSubscription from './hocs/withSubscription'
const BlogPostWithSubscription = withSubscription(BlogPost, (DataSource) => {
  return DataSource.getBlogPost()
})
const CommentsListWithSubscription = withSubscription(CommentsList, (DataSource) => DataSource.getComments())

export default {
  name: 'app',
  components: {
    'blog-post': BlogPostWithSubscription,
    'comments-list': CommentsListWithSubscription
  }
}
</script>

