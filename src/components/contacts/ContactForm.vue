<template>
  <div id="contact-form">
    <br>
  <el-form ref="form" :model="form" label-width="110px" class="field-width">
  <el-form-item label="Type" prop="user_type">
    <el-select v-model="form.user_type" placeholder="Select" style="width:290px">
    <el-option
      v-for="type in types"
      :key="type.value"
      :label="type.label"
      :value="type.value">
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item label="Name">
    <el-input v-model="form.name" placeholder="...."></el-input>
  </el-form-item>
  <el-form-item label="Email">
    <el-input v-model="form.email" placeholder="...."></el-input>
  </el-form-item>
  <el-form-item label="Title">
    <el-input v-model="form.title" placeholder="...."></el-input>
  </el-form-item>
  <el-form-item label="Phone">
    <el-input v-model="form.phone" placeholder="...."></el-input>
  </el-form-item>
  <el-form-item label="Ext.">
    <el-input v-model="form.ext" placeholder="...."></el-input>
  </el-form-item>
  <el-form-item label="Fax">
    <el-input v-model="form.fax" placeholder="...."></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="handleUpdate" :loading="loading" v-if="ContactData.id">update</el-button>
    <el-button type="primary" @click="handleCreate" :loading="loading" v-else>Create</el-button>
    <el-button @click="toggleDrawer">Cancel</el-button>
  </el-form-item>
</el-form>
</div>
</template>

<script>
import { HTTP } from '@/request'

export default {
  name: 'ContactForm',
  components: {
  },
  props: ['ContactData'],
  watch: {
    ContactData (newvalue, oldvalue) {
      if (this.ContactData.id !== undefined) {
        this.form = this.ContactData
      } else {
        this.form = {}
      }
    }
  },
  data () {
    return {
      form: {
        name: '',
        user_type: '',
        email: '',
        title: '',
        phone: '',
        ext: '',
        fax: ''
      },
      types: [],
      value: '',
      loading: false
    }
  },
  created () {
    var userTypes = ['Executive', 'Inmar AR', 'Daily', 'Other']
    var self = this
    userTypes.forEach(function (element) {
      self.types.push({value: element, label: element})
    })
  },
  methods: {
    handleCreate: function () {
      this.loading = true
      var params = { contact: this.$data.form }
      HTTP.post('/contacts', params).then(response => {
        this.afterResponse()
        this.alertMessage('Added')
      })
    },
    toggleDrawer: function () {
      this.$emit('toggleDrawer')
    },
    handleUpdate: function () {
      this.loading = true
      var params = { contact: this.$data.form }
      HTTP.put('/contacts/' + this.form.id, params).then(response => {
        this.afterResponse()
        this.alertMessage('Updated')
      })
    },
    afterResponse: function () {
      this.loading = false
      this.$emit('showIndex')
    },
    alertMessage: function (msg) {
      this.$message({
        message: 'Success! ' + msg + ' External Contact.',
        type: 'success'
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.field-width {
  width: 400px
}
</style>
