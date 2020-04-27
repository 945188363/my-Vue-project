<template>
  <div>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>注册方式与负载</el-breadcrumb-item>
        <el-breadcrumb-item>负载均衡</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div  style="margin-top: 25px;margin-bottom: 20px">
      <div class="groupToolBar"
           style="margin-top: 5px;margin-bottom: 20px; justify-content: space-between; display: flex;"
      >
        <el-button type="primary" icon="el-icon-plus" size="small" @click="showCreateLoadBalanceDialog">新建负载方式</el-button>
        <div>
          <el-input
            placeholder="请输入负载方式名称，支持模糊搜索"
            v-model="searchLoadBalance"
            clearable style="width: 300px;">
          </el-input>
          <el-button type="primary" icon="el-icon-search" size="small">搜索</el-button>
        </div>
      </div>
      <el-table
        :data="LoadBalancesData"
        height="610"
        border
        stripe
        style="width: 100%">
        <el-table-column
          prop="name"
          label="负载名称"
          width="300">
        </el-table-column>
        <el-table-column
          prop="registryName"
          label="服务注册方式"
          width="340">
        </el-table-column>
        <el-table-column
          prop="loadBalanceType"
          label="负载方式"
          width="340">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button @click="showEditLoadBalanceDialog(scope.row.id)" type="primary"  icon="el-icon-edit" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-popconfirm
                title="确认删除吗？"
              >
                <el-button @click="showEditLoadBalanceDialog(scope)" type="danger" slot="reference" icon="el-icon-delete" circle></el-button>
              </el-popconfirm>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--弹窗-->
    <el-dialog title="创建新的服务负载方式" :visible.sync="createLoadBalanceDialogFormVisible">
      <el-form :model="loadBalanceCreateForm">
        <el-form-item label="负载名称" :label-width="formLabelWidth">
          <el-input v-model="loadBalanceCreateForm.name" style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务注册方式" :label-width="formLabelWidth">
          <el-select style="width: 300px;" clearable v-model="loadBalanceCreateForm.registryName" placeholder="请选择">
            <el-option
              v-for="item in registrysData"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负载均衡方式" :label-width="formLabelWidth">
          <el-select style="width: 300px;" clearable v-model="loadBalanceCreateForm.loadBalanceType" placeholder="请选择">
            <el-option
              v-for="item in loadBalanceTypesData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务" :label-width="formLabelWidth">
          <el-input v-model="loadBalanceCreateForm.service" style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="createLoadBalanceDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="CreateLoadBalance">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑服务负载方式" :visible.sync="editLoadBalanceDialogFormVisible">
      <el-form :model="loadBalanceEditForm">
        <el-form-item label="负载名称" :label-width="formLabelWidth">
          <el-input v-model="loadBalanceEditForm.name" disabled style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="服务注册方式" :label-width="formLabelWidth">
          <el-select style="width: 300px;" clearable  v-model="loadBalanceEditForm.registryName" placeholder="请选择">
            <el-option
              v-for="item in registrysData"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负载均衡方式" :label-width="formLabelWidth">
          <el-select style="width: 300px;" clearable v-model="loadBalanceEditForm.loadBalanceType" placeholder="请选择">
            <el-option
              v-for="item in loadBalanceTypesData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="服务" :label-width="formLabelWidth">
          <el-input v-model="loadBalanceEditForm.service" style="width: 300px" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editLoadBalanceDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="EditLoadBalance">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'LoadBalancer',
  data: function () {
    return {
      LoadBalancesData: [
        {
          id: 1,
          name: '负载一',
          registryName: 'consul注册方式',
          loadBalanceType: '轮询',
          service: 'ip1:1111 ; ip2:2222 10'
        },
        {
          id: 2,
          name: '负载二',
          registryName: 'etcd注册方式',
          loadBalanceType: '随机',
          service: 'ip1:1111 ; ip2:2222 10'
        }
      ],
      loadBalanceCreateForm: {
        id: 2,
        name: '负载二',
        registryName: 'etcd注册方式',
        loadBalanceType: '随机',
        service: 'ip1:1111 ; ip2:2222 10'
      },
      loadBalanceEditForm: {
        id: 2,
        name: '负载二',
        registryName: 'etcd注册方式',
        loadBalanceType: '随机',
        service: 'ip1:1111 ; ip2:2222 10'
      },
      registrysData: [{
        id: 1,
        name: 'consul注册方式'
      },
      {
        id: 2,
        name: 'etcd注册方式'
      }
      ],
      registryCenter: '',
      loadBalanceTypesData: [
        {
          value: 'random',
          label: '随机'
        },
        {
          value: 'roundRobin',
          label: '轮询'
        },
        {
          value: 'hash',
          label: '哈希'
        },
        {
          value: 'weightedRandom',
          label: '加权随机'
        },
        {
          value: 'weightedRoundRobin',
          label: '加权轮询'
        }
      ],
      createLoadBalanceDialogFormVisible: false,
      editLoadBalanceDialogFormVisible: false,
      searchLoadBalance: '',
      formLabelWidth: '180px'
    }
  },
  // 存放 方法
  methods: {
    showCreateLoadBalanceDialog () {
      this.createLoadBalanceDialogFormVisible = true
    },
    CreateLoadBalance () {
      this.createLoadBalanceDialogFormVisible = false
    },
    showEditLoadBalanceDialog (id) {
      this.editLoadBalanceDialogFormVisible = true
      this.registryEditForm = this.RegistrysData[id - 1]
    },
    EditLoadBalance () {
      this.editLoadBalanceDialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
