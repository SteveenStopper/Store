<script setup>
import { ref, onMounted } from "vue";
import { getUsers, createUser } from "../service/users";

const users = ref([]);
const newUser = ref({
  username: "",
  email: "",
  password: "",
  role: "user",
});

const fetchUsers = async () => {
  try {
    users.value = await getUsers();
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
  }
};

const addUser = async () => {
  try {
    if (!newUser.value.username || !newUser.value.email || !newUser.value.password) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    if (newUser.value.password.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    // Crear usuario
    await createUser(newUser.value);
    alert("Usuario añadido exitosamente.");
    // Resetear formulario
    newUser.value = { username: "", email: "", password: "", role: "user" };
    await fetchUsers();  // Actualizar la lista de usuarios
  } catch (error) {
    console.error("Error al añadir usuario:", error);
    alert("Hubo un error al añadir el usuario.");
  }
};

onMounted(fetchUsers);
</script>

<template>
  <div class="container mx-auto p-6 bg-white shadow-lg rounded-lg">

    <!-- Formulario de Usuario -->
    <form @submit.prevent="addUser" class="mb-8 space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Input de nombre de usuario -->
        <input type="text" v-model="newUser.username" placeholder="Nombre de usuario"
          class="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          required />

        <!-- Input de correo electrónico -->
        <input type="email" v-model="newUser.email" placeholder="Correo electrónico"
          class="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          required />

        <!-- Input de contraseña -->
        <input type="password" v-model="newUser.password" placeholder="Contraseña (mínimo 8 caracteres)"
          class="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          required />

        <!-- Select de rol de usuario -->
        <select v-model="newUser.role"
          class="border border-gray-300 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300">
          <option value="user">Usuario</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <!-- Botón de envío -->
      <button type="submit"
        class="w-full md:w-auto bg-blue-600 text-white rounded-lg px-8 py-4 hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Añadir Usuario
      </button>
    </form>


    <!-- Tabla de Usuarios -->
    <table class="table-auto w-full border-collapse border border-gray-200 rounded-lg shadow-sm">
      <thead class="bg-blue-100">
        <tr>
          <th class="border px-6 py-4 text-left">ID</th>
          <th class="border px-6 py-4 text-left">Nombres</th>
          <th class="border px-6 py-4 text-left">Correo</th>
          <th class="border px-6 py-4 text-left">Fecha de creación</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.user_id" class="hover:bg-gray-50">
          <td class="border px-6 py-4">{{ user.user_id }}</td>
          <td class="border px-6 py-4">{{ user.username }}</td>
          <td class="border px-6 py-4">{{ user.email }}</td>
          <td class="border px-6 py-4">{{ user.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  background-color: #f9fafb;
}

h1 {
  font-size: 1.875rem;
  color: #1f2937;
}

input,
select,
button {
  font-size: 1rem;
  transition: all 0.3s ease-in-out;
}

button {
  font-weight: 600;
  cursor: pointer;
}

button:hover {
  background-color: #2563eb;
}

table {
  border-spacing: 0;
  width: 100%;
}

thead {
  background-color: #e0f2fe;
}

th,
td {
  text-align: left;
  padding: 12px;
}

th {
  font-weight: 600;
  color: #1f2937;
}

td {
  color: #4b5563;
}

tr:hover {
  background-color: #f1f5f9;
}
</style>
