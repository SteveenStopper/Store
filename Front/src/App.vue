<script setup>
import Users from './components/Users.vue';
</script>

<template>
  <div class="container">
    <h1 class="text-2xl font-semibold text-gray-800 mb-6">Gestión de Usuarios</h1>
    
    <Users msg="Vite + Vue" />
  </div>
</template>

<style scoped>
/* Contenedor principal */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem;
  background-color: #f8f9fa;
  height: 100vh;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 1200px;
  margin: 0 auto;
}

/* Título de la página */
.page-title {
  font-size: 2rem;
  font-weight: 600;
  color: #343a40;
  text-align: center;
  margin-bottom: 3rem;
}

/* Estilo para el contenedor de la vista de usuario */
Users {
  width: 100%;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* Estilo general para los enlaces (eliminando los logos) */
a {
  display: block;
  color: #007bff;
  text-decoration: none;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
}

a:hover {
  text-decoration: underline;
  color: #0056b3;
}

h1 {
  color: #1f2937;
}
</style>
