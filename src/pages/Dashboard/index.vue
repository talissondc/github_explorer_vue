<template>
  <img src='../../assets/logo.svg'/> 

  <h1 :class="$style.title">Explore repositorios no GitHub</h1>

  <form :class="$style.form" @submit.prevent="addRepository">
     <input :class="error ? $style.errorActive : ''" v-model="form.newRepository" placeholder="Digite o nome do repositório" />
     <button type="submit">Pesquisar</button>
  </form> 
  
  <span :class="$style.errorSpan"  v-if={error}>
     {{msgError}}
  </span>

  <div :class="$style.repositories">
    <router-link :to="`/repositories/${repository.full_name}`" v-for="repository in repositories" :key="repository.full_name"> 
       <img :src="repository.owner.avatar_url" :alt="repository.owner.login"/>
       <div>
          <strong>{{repository.full_name}}</strong>
          <p>{{repository.description}}</p>
       </div>
       <ChevronRightIcon size="20" class="custom-class" />
    </router-link>
  </div>   
</template>

<script>
import api from '../../services/api.js';
import { ChevronRightIcon } from '@zhuowenli/vue-feather-icons';

export default {
 name:'Dashboard',
 components: {
    ChevronRightIcon
 },
 data:() => ({
    form: {
       newRepository: '',
    },
    repositories: [],
    msgError: '',
    error: false
 }),
 methods: {
    async addRepository() {

       if(!this.form.newRepository) {
          this.msgError = 'Digite o autor/nome do repositório';
          this.error = true;
          return;
       }

      try {
         await api.get(`repos/${this.form.newRepository}`).then((response) => {
            this.repositories.push(response.data);
            localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(this.repositories));
            this.msgError = '';
            this.error = false;
         })
      } catch(e) {
         this.msgError = 'Erro na busca por esse repositório'
         this.error = true;
      }
    }
 },
 created () {
    const storage = localStorage.getItem('@GithubExplorer:repositories');
    if(storage) {
      this.repositories = JSON.parse(storage);
    }
 },
}
</script>

<style module lang="scss">
  @import './styles.scss';
</style>