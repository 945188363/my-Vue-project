<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>注册方式与负载</el-breadcrumb-item>
        <el-breadcrumb-item>服务注册方式</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div  style="margin-top: 25px;margin-bottom: 20px">
      <div class="groupToolBar"
           style="margin-top: 5px;margin-bottom: 20px; justify-content: space-between; display: flex;"
      >
        <el-button type="primary" icon="el-icon-plus" size="small" @click="showCreateRegistryDialog">服务注册方式</el-button>
        <div>
          <el-input
            placeholder="请输入服务注册方式名称，支持模糊搜索"
            v-model="searchRegistry"
            clearable style="width: 300px;">
          </el-input>
          <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        </div>
      </div>
      <el-table
        :data="ApiGroupsDetailsData"
        height="610"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="服务注册方式名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="description"
          label="注册中心选择"
          width="560">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button @click="showEditApiGroupDetailDialog(scope.row.id)" type="primary"  icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-popconfirm
                title="该操作会删除组内所有api，确认删除吗？"
              >
                <el-button @click="showEditApiGroupDetailDialog(scope)" type="danger" slot="reference" icon="el-icon-delete" circle></el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--弹窗-->
    <el-dialog title="创建新的服务注册方式" :visible.sync="createRegistryDialogFormVisible">
      <el-form :model="registryCreateForm">
        <el-form-item label="服务注册方式名称" :label-width="formLabelWidth">
          <el-input v-model="registryCreateForm.name" style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="注册中心类型" :label-width="formLabelWidth">
          <el-select style="width: 300px;" clearable v-model="registryCreateForm.center" placeholder="请选择">
            <el-option
              v-for="item in registryCentersData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接入地址" :label-width="formLabelWidth">
          <el-input v-model="registryCreateForm.centerUrl" style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createRegistryDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="CreateRegistry">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: 'RegistryManager',
  data: function () {
    return {
      registryCreateForm: {
        name: 'consul注册方式',
        center: 'Consul',
        centerUrl: '192.168.1.1:8888'
      },
      registryCenter: '',
      registryCentersData: [
        {
          value: 'Eureka',
          label: 'Eureka'
        },
        {
          value: 'Consul',
          label: 'Consul'
        },
        {
          value: 'Zookeeper',
          label: 'Zookeeper'
        },
        {
          value: 'Etcd',
          label: 'Etcd'
        },
        {
          value: 'Nacos',
          label: 'Nacos'
        }
      ],
      createRegistryDialogFormVisible: false,
      searchRegistry: '',
      formLabelWidth: '180px'
    }
  },
  // 存放 方法
  methods: {
    showCreateRegistryDialog () {
      this.createRegistryDialogFormVisible = true
    },
    CreateRegistry () {
      this.createRegistryDialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
