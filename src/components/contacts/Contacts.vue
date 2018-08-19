<template>
 <div id="contacts">
   <el-card class="box-card">
     <div slot="header" class="clearfix">
    <span style="color:#409EFF;font-size:20px;font-weight:800">External Contacts</span>
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
       width="150">
     </el-table-column>
     <el-table-column
       property="name"
       label="Name"
       width="150">
     </el-table-column>
     <el-table-column
       property="title"
       label="Title"
       width="150">
     </el-table-column>
     <el-table-column
       property="phone"
       label="Phone"
       width="150">
     </el-table-column>
     <el-table-column
       property="ext"
       label="Ext."
       width="150">
     </el-table-column>
     <el-table-column
       property="fax"
       label="Fax"
       width="150">
     </el-table-column>
     <el-table-column
       property="email"
       label="Email"
       show-overflow-tooltip>
     </el-table-column>
   </el-table>
   <div style="margin-top: 20px">
     <el-button @click="toggleSelection()">Clear selection</el-button>
   </div>
 </el-card>
 </div>
</template>

<script>
import { HTTP } from '@/request'

export default {
  data() {
       return {
         contacts: [],
         multipleSelection: []
       }
     },
 created() {
   HTTP.get('/contacts')
     .then(response => {
       console.log(response)
       this.contacts = response.data
     })
 },
 methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row)
          });
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      }
    }
}
</script>
