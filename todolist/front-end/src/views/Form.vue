<template>
  <div class="container mt-2">
    <b-form>
      <b-form-group
        label="Titulo"
        label-for="title"
      >
        <b-form-input
          id="title"
          v-model.trim="$v.form.title.$model"
          type="text"
          placeholder="Ex: lavar carro"
          required
          autocomplete="off"
          :state="getValidation"
          aria-describedby="title-feedback"
        >
        </b-form-input>
        <b-form-invalid-feedback id="title-feedback">Campo obrigatório</b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        label="Descrição"
        label-for="description"
      >
        <b-form-textarea
          id="description"
          v-model="form.description"
          type="text"
          placeholder="Ex: preciso levar o carro para lavar"
          required
          autocomplete="off"
        >
        </b-form-textarea>
      </b-form-group>

      <b-button type="submit" variant="outline-primary" @click.prevent="saveTask" :disabled="!getValidation"> Salvar </b-button>
    </b-form>
  </div>
</template>

<script>
  import { GetTask, CreateTask, UpdateTask  } from '@/services/Tasks'
  import toatMixin from '@/mixins/toatMixin.js'
  import { required, minLength } from 'vuelidate/lib/validators'

  export default {
    name: 'Form',
    mixins: [toatMixin],
    data() {
      return {
        form: {
          title: "",
          description: ""
        },
        methodSave: "new"
      }
    },
    validations: {
      form: {
        title: {
          required,
          minLength: minLength(2)
        }
      }
    },
    created() {
      if(this.$route.params.id === 0 || this.$route.params.id !== undefined) {
        this.methodSave = "update"
        GetTask(this.$route.params.id)
          .then((response) => {
            this.form = response.data
          })
          .catch(() => {
            this.showToast("danger", "Erro!", "Erro ao buscar tarefa!")
          })
      }
    },
    methods: {
      saveTask() {
        if(this.methodSave === "update") {
          UpdateTask(this.form.id, this.form)
            .then(() => {
              this.showToast("success", "Sucesso!", "Tarefa atualizada com sucesso!")
              this.$router.push("/");
            })
            .catch(() => {
              this.showToast("danger", "Erro!", "Erro ao atualizar tarefa!")
            })
        }
        else {
          CreateTask(this.form)
            .then(() => {
              this.showToast("success", "Sucesso!", "Tarefa criada com sucesso!")
              this.$router.push("/");
            })
            .catch(() => {
              this.showToast("danger", "Erro!", "Erro ao criar tarefa!")
            })

        }
      }
    },
    computed: {
      getValidation() {
        if(this.$v.form.title.$dirty === false) {
          return null
        }
        return !this.$v.form.title.$error
      }
    }
  }
</script>
