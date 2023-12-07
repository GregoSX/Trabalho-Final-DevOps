<template>
  <div class="container mt-2">
    <template v-if="isTasksEmpty">
      <div class="empty-data mt-4">
        <img src="../assets/images/empty-data.svg" class="empty-data-image">
        <b-button variant="outline-secondary" class="mt-4" size="lg" to="/form">Criar tarefa</b-button>
      </div>
    </template>
    <template v-else>
      <div v-for="(task, index) in tasks" :key="index">
        <b-card :title="task.title" class="mb-2">
          <b-card-text> {{ task.description }} </b-card-text>
          <b-button variant="outline-secondary" class="mr-2" @click="edit(task.id)"> Editar </b-button>
          <b-button variant="outline-danger" class="mr-2" @click="remove(task)"> Excluir </b-button>
        </b-card>
      </div>
    </template> 
    <b-modal ref="modalRemove" hide-footer title="Exclusão de tarefa">
      <div class="d-block text-center">
        Deseja realmente excluir a tarefa "{{ taskSelected.title }}" ? 
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <b-button variant="outline-secondary" class="mr-2" @click="hideModal()" > Cancelar </b-button>
        <b-button variant="outline-danger" class="mr-2" @click="confirmRemoveTask()"> Excluir </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import { GetTasks, DeleteTask } from '@/services/Tasks'
  import toatMixin from '@/mixins/toatMixin.js'

  export default {
    name: 'List',
    mixins: [toatMixin],
    data() {
      return {
        tasks: [],
        taskSelected: []
      }
    },
    created() {
      GetTasks()
        .then((response) => {
          this.tasks = response.data
        })
        .catch(() => {
          this.showToast("danger", "Erro!", "Erro ao buscar tarefas!")
        })
    },
    methods: {
      edit(id) {
        this.$router.push({ name: "form", params: { id } })
      },
      remove(task) {
        this.taskSelected = task
        this.$refs.modalRemove.show()
      },
      hideModal() {
        this.$refs.modalRemove.hide()
      },
      confirmRemoveTask() {
        DeleteTask(this.taskSelected.id)
          .then(() => {
            this.showToast("success", "Sucesso!", "Tarefa excluída com sucesso!")
          }).catch(() => {
            this.showToast("danger", "Erro!", "Erro ao excluir tarefa!")
          })
        this.hideModal()
        this.$router.go()
      }
    },
    computed: {
      isTasksEmpty() {
        return this.tasks.length === 0 
      }
    }
  }
</script>

<style scoped>
  .empty-data-image {
    width: 300px;
    height: 300px;
  }

  .empty-data {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
</style>