<!--
 * @Description: 简单的对话框表单组件，包含了常用的表单项，以及上传文件 图片
 * @Author: ZHang jia hui
 * @Date: 2023-02-02 18:07:03
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-25 19:21:33
-->
<script setup lang="ts">
import { defineComponent, ref, watch, defineProps, defineEmits } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

const props = defineProps({
  // 取消按钮文字
  cancelButtonName: {
    type: String,
    default: "取 消",
  },
  // 确定按钮文字
  submitButtonName: {
    type: String,
    default: "确 定",
  },
  visible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "新增/编辑",
  },
  form: {
    type: Object,
    default: () => {},
  },
  rules: {
    type: Object,
    default: () => {},
  },
  labelWidth: {
    type: String,
    default: "100px",
  },
  formItems: {
    type: Array,
    default: () => [],
  },
  hasUploadPhoto: {
    type: Boolean,
    default: true,
  },
  hasUploadFile: {
    type: Boolean,
    default: false,
  },
  dialogWidth: {
    type: String,
    default: "45%",
  },
  searchLoading: {
    type: Boolean,
    default: false,
  },
});
const $emits = defineEmits(["handleDialogCancel", "handleDialogSubmit"]);

// 对话框显示
const dialogVisible = ref(false);
// 当前表单对象
const addForm: any = ref({});
// 表单配置项
const addFormConfig = ref();
watch(
  () => props.visible,
  (val) => {
    console.log("visible", val);
    dialogVisible.value = val;
  }
);
watch(
  () => props.formItems,
  (val) => {
    console.log("addFormConfig", addFormConfig);
    addFormConfig.value = val;
  },
  { deep: true, immediate: true }
);
watch(
  () => props.form,
  (val) => {
    addForm.value = { ...val };
  }
);

const handleCancel = () => {
  dialogVisible.value = false;
  // $emits("update:visible", false);
  $emits("handleDialogCancel");
};
const addFormRef = ref<FormInstance>();
const handleSubmit = () => {
  addFormRef.value?.validate((val) => {
    if (val) {
      $emits("handleDialogSubmit", addForm);
    } else {
      ElMessage.warning("请按照要求输入所有选项");
      return false;
    }
  });
};
//文件/图片移除
const handleRemove = (file: File, fileList: Array<File>, propName: string) => {
  console.log(file, fileList);
  addForm[propName] = fileList;
};
//文件
const handleFileChange = (
  file: File,
  fileList: Array<File>,
  propName: string
) => {
  console.log(file, fileList);
  //10Mb 10485760
  if (file.size > 10485760) {
    ElMessage.error("选择的文件大小不能超过10MB");
    fileList.splice(-1, 1); //将其删除
    return false;
  } else {
    addForm[propName] = fileList;
  }
};
</script>
<template>
  <div class="common_dialog">
    <el-dialog
      :title="title"
      v-model="dialogVisible"
      :width="dialogWidth"
      @close="handleCancel"
    >
      <el-form
        ref="addFormRef"
        :model="addForm"
        :rules="rules"
        :label-width="labelWidth"
        class="add_form"
      >
        <!-- 对于普通的表单项 -->
        <template
          v-for="(item, index) in addFormConfig"
          :key="item.prop + index"
        >
          <el-form-item
            :prop="item.prop"
            :label="item.label"
            :class="item.singleRow ? 'single_row' : ''"
          >
            <!-- 普通输入框 -->
            <el-input
              v-if="item.type === 'input'"
              v-model="addForm[item.prop]"
              :disabled="item.disabled"
              :placeholder="item.placeholder || '请输入'"
              :show-password="item.showPassword"
              clearable
            />
            <!-- 数字输入框 -->
            <el-input-number
              v-else-if="item.type == 'number'"
              v-model="addForm[item.prop]"
              :min="0"
              :disabled="item.disabled"
            />
            <!-- 文本域 -->
            <el-input
              v-else-if="item.type == 'textarea'"
              v-model="addForm[item.prop]"
              type="textarea"
              :placeholder="item.placeholder || '请输入'"
              :disabled="item.disabled"
              clearable
            />
            <!-- 远程搜索 -->
            <!-- <el-select
              v-if="item.type == 'remoteSelect'"
              value-key="id"
              v-model="addForm[item.prop]"
              filterable
              clearable
              remote
              :disabled="item.disabled"
              :remote-method="(name:string) => handleRemoteSearch(name, item.prop)"
              :loading="searchLoading"
              :placeholder="item.placeholder || '请输入'"
              @change="(val:any) => multiBind(val, item.prop, item)"
            >
              <el-option
                v-for="item2 in item.options"
                :key="item2.id"
                :label="
                  item.showId
                    ? item2.label + '：' + item2.cardValue
                    : item2.label
                "
                :value="item2"
              />
            </el-select> -->
            <!-- 常规下拉列表 -->
            <el-select
              v-if="item.type == 'select'"
              v-model="addForm[item.prop]"
              :multiple="item.multiple"
              :placeholder="item.placeholder || '请选择'"
              :disabled="item.disabled"
              :filterable="item.filterable"
              clearable
            >
              <el-option
                v-for="item1 in item.options"
                :key="item.unique ? item1[item.unique.key] : item1.id"
                :label="item.unique ? item1[item.unique.label] : item1.label"
                :value="
                  item.unique
                    ? item.uniqueValue
                      ? item1[item.unique.value] +
                        '$_' +
                        item1[item.unique.label]
                      : item1[item.unique.value]
                    : item1.value
                "
              />
            </el-select>
            <!-- 级联选择器 -->
            <!-- <el-cascader
              v-else-if="item.type == 'cascader'"
              v-model="addForm[item.prop]"
              :props="{
                checkStrictly: item.hasOwnProperty('checkStrictly')
                  ? item.checkStrictly
                  : true,
                emitPath: false,
              }"
              :show-all-levels="true"
              :options="
                item.options instanceof Array && item.options.length > 0
                  ? item.options
                  : regionData
              "
              filterable
              :multiple="false"
              clearable
            ></el-cascader> -->
            <!-- 日期选择框 -->
            <el-date-picker
              v-else-if="item.type == 'picker'"
              v-model="addForm[item.prop]"
              :format="item.format"
              :value-format="item.valueFormat"
              :type="item.dateType"
              range-separator="至"
              :start-placeholder="item.startPlaceholder"
              :end-placeholder="item.endPlaceholder"
              :placeholder="item.placeholder"
              clearable
            />
            <!-- 单选框 -->
            <el-radio-group
              v-else-if="item.type == 'checkboxgroup'"
              v-model="addForm[item.prop]"
              :disabled="item.disabled"
            >
              <el-radio label="Y">是</el-radio>
              <el-radio label="N">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </template>
        <!-- 针对图片上传 -->
        <!-- 针对图片上传 -->
        <el-form-item
          v-if="props.hasUploadPhoto"
          label="上传照片"
          prop="photo"
          class="single_row upload_box"
        >
          <el-upload
            list-type="picture-card"
            :file-list="addForm.photo"
            :auto-upload="false"
            action="#"
            accept=".jpg, .png, .jpeg"
            :on-remove="(file:File, fileList:Array<File>) => handleRemove(file, fileList, 'photo')"
            :on-change="(file:File, fileList:Array<File>) => handleFileChange(file, fileList, 'photo')"
          >
            <i class="el-icon-plus" />
          </el-upload>
        </el-form-item>
        <!-- 文件上传 -->
        <el-form-item
          v-if="props.hasUploadFile"
          label="附件"
          prop="fileList"
          class="single_row"
        >
          <el-upload
            :file-list="addForm.fileList"
            :auto-upload="false"
            multiple
            action="#"
            :on-remove="(file:File, fileList:Array<File>) => handleRemove(file, fileList, 'fileList')"
            :on-change="
              (file:File, fileList:Array<File>) => handleFileChange(file, fileList, 'fileList')
            "
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <!-- 其他 复杂处理逻辑 -->
        <slot name="other"></slot>
      </el-form>
      <!-- 底部 按钮 -->
      <div slot="footer">
        <el-button @click="handleCancel">
          {{ cancelButtonName }}
        </el-button>
        <el-button type="primary" @click="handleSubmit">{{
          submitButtonName
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
@import "@/styles/dialog.scss";
.common_dialog {
  :deep(.el-dialog) {
    min-width: 500px; //防止窗口过小 表单变形
  }
  :deep(.el-dialog__body) {
    padding-top: 10px;
  }
}

.add_form {
  > div {
    display: flex;
    flex-wrap: wrap;
  }
  .el-form-item {
    width: 50%;
  }
  // 对于独立一行的formItem
  .single_row {
    width: 100%;
    padding-right: 0;
    &:nth-of-type(2n + 1) {
      padding-right: 0px;
    }
    :v-deep(.el-upload--picture-card) {
      width: 120px;
      height: 120px;
      line-height: 124px;
    }
    :v-deep(.el-upload-list--picture-card) {
      .el-upload-list__item {
        width: 120px;
        height: 120px;
      }
    }
  }
}
</style>
