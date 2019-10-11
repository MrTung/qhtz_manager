<template>
  <div class="app-container">
    <!-- <el-form ref="form" :model="form">
      <el-form-item label="商品名称" class="form-item" prop="mobile" label-width="90px">
        <el-input placeholder="请输入商品名称" v-model="form.goodsname"></el-input>
      </el-form-item>

      <el-form-item class="form-item">
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>-->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="商品图片" align="center">
        <template slot-scope="scope">
          <img
            :src="scope.row.info.image"
            style="width:60px;height: 60px;border: #EBEEF5 solid 1px;"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.info.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="商品价格">
        <template slot-scope="scope">
          <span>{{ scope.row.info.price.toFixed(2) }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="商品价格" align="center">
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          />
        </template>
      </el-table-column>-->

      <!-- <el-table-column class-name="status-col" label="状态" align="center">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
        </template>
      </el-table-column>-->

      <el-table-column label="初级分销员折扣价(%)" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.discount.one" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.discount.one }}</span>
        </template>
      </el-table-column>
      <el-table-column label="中级分销员折扣价(%)" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.discount.two" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.discount.two }}</span>
        </template>
      </el-table-column>
      <el-table-column label="高级分销员折扣价(%)" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.discount.tree" class="edit-input" size="small" />
          </template>
          <span v-else>{{ row.discount.tree }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            class="cancel-btn"
            size="small"
            icon="el-icon-refresh"
            type="warning"
            @click="cancelEdit(row)"
          >取消</el-button>
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >确定</el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="float: right;height: 50px;padding-top: 10px;padding-right:50px;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Qs from "qs";
import { getTimeDate } from "@/utils/index.js";
export default {
  name: "InlineEditTable",
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      list: [],
      listLoading: true,
      currentPage: 1,
      pageSize: 10,
      total: 0,
      form: {
        // goodsname: "",
        _uiName_: "eleme"
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let page = { pageNumber: this.currentPage, pageSize: this.pageSize };

      this.form["_pagination"] = JSON.stringify(page);

      this.listLoading = true;
      this.axios
        .get(this.urls.onsalelist + "?" + Qs.stringify(this.form))
        .then(response => {
          this.list = response.data.map(v => {
            this.$set(v, "edit", false);
            v.discount.originalOne = v.discount.one;
            v.discount.originalTwo = v.discount.two;
            v.discount.originalTree = v.discount.tree;
            return v;
          });
          this.total = response.data.total;
          this.listLoading = false;
        });
    },
    cancelEdit(row) {
      row.discount.one = row.discount.originalOne;
      row.discount.two = row.discount.originalTwo;
      row.discount.tree = row.discount.originalTree;

      row.edit = false;
      this.$message({
        message: "取消编辑",
        type: "warning"
      });
    },
    confirmEdit(row) {
      row.edit = false;
      row.originalOne = row.discount.one;
      row.originalTwo = row.discount.two;
      row.originalTree = row.discount.tree;

      let param = {
        id: row.id,
        one: row.discount.one,
        two: row.discount.two,
        tree: row.discount.tree
      };

      this.axios
        .post(this.urls.discount + "?" + Qs.stringify(param))
        .then(response => {
          // this.getList();
          this.$message({
            message: "编辑成功",
            type: "success"
          });
        });
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    }
  }
};
</script>

<style scoped>
.edit-input {
  /* padding-right: 100px; */
}
.cancel-btn {
  /* position: absolute; */
  /* right: 15px;
  top: 10px; */
}

.form-item {
  display: inline-block;
  margin-right: 20px;
}
</style>
