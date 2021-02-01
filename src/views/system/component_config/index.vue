<template>
  <div class="app-container">
    <GitlabServer />
    <JenkinsServer />
    <Ldap />
  </div>
</template>

<script>
import GitlabServer from './components/GitlabServer'
import JenkinsServer from './components/JenkinsServer'
import Ldap from './components/Ldap'

export default {
  name: 'ComponentConfig',
  components: { GitlabServer, JenkinsServer, Ldap }
}
</script>
