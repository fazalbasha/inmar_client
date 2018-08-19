<template>
 <div id="contacts"  v-loading="loading">
   <div class="drawer-wrapper">
    <vue-drawer-layout @mask-click="$refs.formDrawer.toggle()" class="vue-drawer-layout-custom" ref="formDrawer" :backdrop-opacity-range="[0,0.6]" :backdrop="true" :animatable="true" :enable="false" :reverse="true" :drawer-width="480">
          <div class="drawer" slot="drawer">
            <!-- drawer-content -->
            <contact-form v-on:showIndex="showIndex" v-on:toggleDrawer="toggleDrawer"></contact-form>
          </div>
          <div slot="content">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
             <span style="color:#409EFF;font-size:20px;font-weight:800">External Contacts</span>
             <el-button icon="el-icon-edit" class="el-button el-button--primary is-plain" size="mini" style="float: right" @click="openForm()">Add Contact</el-button>
             <el-button @click="toggleSelection()" size="mini" style="float: right">Clear selection</el-button>
           </div>
            <el-table
              ref="multipleTable"
              :data="contacts"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                property="user_type"
                label="Type"
                width="160">
              </el-table-column>
              <el-table-column
                property="name"
                label="Name"
                width="160">
              </el-table-column>
              <el-table-column
                property="title"
                label="Title"
                width="160">
              </el-table-column>
              <el-table-column
                property="phone"
                label="Phone"
                width="160">
              </el-table-column>
              <el-table-column
                property="ext"
                label="Ext."
                width="160">
              </el-table-column>
              <el-table-column
                property="fax"
                label="Fax"
                width="160">
              </el-table-column>
              <el-table-column
                property="email"
                label="Email"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
              fixed="right"
              label=""
              width="80">
              <template slot-scope="scope">
                <el-dropdown>
                  <i class="el-icon-more-outline" style=""></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>View</el-dropdown-item>
                    <el-dropdown-item>Edit</el-dropdown-item>
                    <el-dropdown-item>Delete</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
            </el-table>
          </el-card>
          </div>
        </vue-drawer-layout>
     </div>
  </div>
</template>

<script>
import { HTTP } from '@/request'
import ContactForm from './ContactForm'

export default {
  name: "Contacts",
  components: {
    ContactForm
  },
  data() {
    return {
      contacts: [],
      multipleSelection: [],
      loading: false
    }
 },
 created() {
   this.fetchContacts()
 },
 methods: {
   fetchContacts: function() {
     this.loading = true
     console.log(this.loading);
     HTTP.get('/contacts')
       .then(response => {
         console.log(response)
         this.contacts = response.data
       })
     this.loading = false
   },
   toggleSelection: function(rows) {
     if (rows) {
       rows.forEach(row => {
         this.$refs.multipleTable.toggleRowSelection(row)
       });
     } else {
       this.$refs.multipleTable.clearSelection()
     }
   },
   handleSelectionChange: function(val) {
     this.multipleSelection = val
   },
   openForm: function() {
     this.toggleDrawer()
   },
   showIndex: function() {
     this.fetchContacts()
     this.toggleDrawer()
   },
   toggleDrawer: function() {
     this.$refs.formDrawer.toggle()
   }
 }
}
</script>
