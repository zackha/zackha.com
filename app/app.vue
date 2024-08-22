<script setup>
const currentTime = ref('');

const updateTime = () => {
  currentTime.value = new Date().toLocaleTimeString();
};

onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000);
});

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    { rel: 'icon', href: '/favicon.png' },
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  ],
  meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }],
});
useSeoMeta({
  title: 'Sefa Bulak',
  description:
    'As a frontend engineer and designer specializing in modern web technologies, especially Vue (for web), Expo (for mobile), and GraphQL with headless computing, I deliver innovative, high-performing digital solutions.',
  ogTitle: 'Sefa Bulak',
  ogDescription:
    'As a frontend engineer and designer specializing in modern web technologies, especially Vue (for web), Expo (for mobile), and GraphQL with headless computing, I deliver innovative, high-performing digital solutions.',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <div class="content">
    <div class="main">
      <div class="time">{{ currentTime }}</div>
      <div class="page">
        <NuxtPage />
      </div>
      <div class="contact">
        <NuxtLink activeClass="active-link" to="/" class="link">me</NuxtLink>
        <a target="_blank" href="https://www.github.com/zackha" class="link">github</a>
        <a target="_blank" href="mailto:zckhtln@icloud.com?subject=I want you" class="link">email</a>
        <NuxtLink activeClass="active-link" to="/projects" class="link">projects</NuxtLink>
        <a target="_blank" href="https://github.com/sponsors/zackha" class="link">sponsor</a>
        <a target="_blank" href="https://pr.nuxt.dev" class="link">prs</a>
      </div>
    </div>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: ease-in-out 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
html,
body {
  font-size: 11px;
  margin: 0;
  font-family: Courier New, Courier, Monaco;
  font-size: 11px;
  background-color: #f2f2f2;
}
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.main {
  max-width: 400px;
  max-height: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.time {
  font-size: 12px;
  text-align: center;
  margin: auto auto 3.5rem auto;
}
.time small {
  font-size: 8px;
}
.page {
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  align-content: center;
  padding: 0 15px;
}
.contact {
  text-align: center;
  margin: 3.5rem auto auto auto;
}
.contact .link {
  padding: 1px 3px;
  margin: 0 2px 0px 2px;
  border-radius: 3px;
  font-weight: 400;
}
.link {
  text-decoration: none;
  color: #000;
  font-weight: bold;
  transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.15s;
}
.link:hover {
  background-color: red;
  color: #fff;
}
.active-link {
  background-color: white !important;
}
.active-link:hover {
  background-color: white !important;
  color: #000;
}
</style>
