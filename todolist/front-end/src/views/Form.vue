<template>
  <div class="container mt-2">
    <b-form>
      <b-form-group
        label="Titulo"
        label-for="subject"
      >
        <b-form-input
          id="subject"
          v-model.trim="$v.form.subject.$model"
          type="text"
          placeholder="Ex: lavar carro"
          required
          autocomplete="off"
          :state="getValidation"
          aria-describedby="subject-feedback"
        >
        </b-form-input>
        <b-form-invalid-feedback id="subject-feedback">Campo obrigatório</b-form-invalid-feedback>
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

      <b-button type="submit" variant="outline-primary" @click="saveTask" :disabled="!getValidation"> Salvar </b-button>
    </b-form>
  </div>
</template>

<script>
  import toatMixin from '@/mixins/toatMixin.js'
  import { required, minLength } from 'vuelidate/lib/validators'

  export default {
    name: 'Form',
    mixins: [toatMixin],
    data() {
      return {
        form: {
          subject: "",
          description: ""
        },
        methodSave: "new"
      }
    },
    validations: {
      form: {
        subject: {
          required,
          minLength: minLength(2)
        }
      }
    },
    created() {
      if(this.$route.params.index === 0 || this.$route.params.index !== undefined) {
        this.methodSave = "update"
        let tasks = JSON.parse(localStorage.getItem("tasks"))
        this.form = tasks[this.$route.params.index]
      }
    },
    methods: {
      saveTask() {
        if(this.methodSave === "update") {
          var tasks = JSON.parse(localStorage.getItem("tasks"))
          tasks[this.$route.params.index] = this.form
          this.showToast("success", "Sucesso!", "Tarefa atualizada com sucesso!")
        }
        else {
          var tasks = (localStorage.getItem("tasks")) ? JSON.parse(localStorage.getItem("tasks")) : []
          tasks.push(this.form)
          this.showToast("success", "Sucesso!", "Tarefa criada com sucesso!")

        }

        localStorage.setItem("tasks", JSON.stringify(tasks))
        this.$router.push({ name: "list" })
      }
    },
    computed: {
      getValidation() {
        if(this.$v.form.subject.$dirty === false) {
          return null
        }
        return !this.$v.form.subject.$error
      }
    }
  }
</script>
