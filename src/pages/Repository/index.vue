<template>
  <header :class="$style.header">
    <img src='../../assets/logo.svg' />

    <router-link to="/">
      <ChevronLeftIcon  size="20" class="custom-class" />
      voltar
    </router-link>
  </header>

  <section v-if={repository} :class="$style.repositoryInfo">
    <header>
      <img :src="repository.owner.avatar_url" :alt="repository.owner.login"/>
      <div>
        <strong>{{repository.full_name}}</strong>
        <p>{{repository.description}}</p>
      </div>  
    </header>
    <ul>
      <li>
        <strong>{{repository.stargazers_count}}</strong>
        <span>Stars</span>
      </li>
      <li>
        <strong>{{repository.forks_count}}</strong>
        <span>Forks</span>
      </li>
      <li>
        <strong>{{repository.open_issues_count}}</strong>
        <span>Issues abertas</span>
      </li>
    </ul>  
  </section> 

  <div :class="$style.issues">
    <a v-for="issue in issues" :key="issue.id" :href="issue.html_url">
      <div>
        <strong>{{issue.title}}</strong>
        <p>{{issue.user.login}}</p>
      </div>
       <ChevronRightIcon size="20" class="custom-class" />
    </a>  
  </div>   

</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from '@zhuowenli/vue-feather-icons';
import api from '../../services/api.js';

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon
  },
  data: () => ({
    repository: {},
    issues: []
  }),
  created () {
    const repositoryName = this.$route.params.repository.toString('/').replace(/,/ ,"/");

     api.get(`repos/${repositoryName}`).then((response) => {
      this.repository = response.data;
    });
     api.get(`repos/${repositoryName}/issues`).then((response) => {
      this.issues = response.data;
    });
  }
};
</script>

<style module lang="scss">
  @import './styles.scss';
</style>
