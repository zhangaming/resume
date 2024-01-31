---
title: 饿了么表单动态校验
tag:
 - vue
 - element
categories:
 - vue
 - element
keywords: "vue, 饿了么, element"
addrlink: dda8c81b
date: 2020-04-22 15:14:07
description:
top_img:
cover: "https://img.zhangaming.com/img/vue.png"
---

## 需求
需要动态添加列表 并且展示字段不同 而且要能够增删改查

## 代码

```html

  <el-form label-width="95px" :model="equityForm" :inline="true" size="small" ref="equityForm">
    <ul>
      <li v-for="(equityItem,index) in equityForm.equityArr" :key="index">
        <div class="sort">{{index+1}}</div>
        <div class="list_table_li">
          <el-col :span="6" v-show="equityItem.interestsType == 'ORDER_DISCOUNT'">
            <el-form-item label="来源平台:" class="flex_form_item" :prop="'equityArr[' + index + '].sourcePlatform'" :rules=" equityItem.interestsType == 'ORDER_DISCOUNT'?[{ required: true, message: '来源平台不能为空' }]:[{}]">
              <!-- sourcePlatform -->
              <el-select v-model="equityItem.sourcePlatform" placeholder="请选择来源平台" @change="platformChangeSelect('equity',equityItem.sourcePlatform,index)">
                <el-option v-for="(item,index) in sourcePlatform" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="equityItem.interestsType == 'ORDER_DISCOUNT'">
            <el-form-item label="折扣比例:" class="flex_form_item " :prop="'equityArr[' + index + '].interestsRatio'" :rules=" equityItem.interestsType == 'ORDER_DISCOUNT'?[{ required: true, message: '折扣比例不能为空' }]:[{}]">
              <el-col :span="20">

                <el-input v-model="equityItem.interestsRatio" v-only-number="{max:100,min:0,precision:2}" size="mini" placeholder="请输入订单折扣比例">
                  <!-- <template slot="append">%</template> -->
                </el-input>
              </el-col>
              <el-col class="line" :span="4">
                <span style="margin-left:2px;">%</span>
              </el-col>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="equityItem.interestsType == 'INVITE_NUM'">
            <el-form-item label="体系类别:" class="flex_form_item" :placeholder="systemCategory.length>0?`请选择体系类别`:`暂无数据`" :prop="'equityArr[' + index + '].inviteCategoryId'" :rules=" equityItem.interestsType == 'INVITE_NUM'?[{ required: true, message: '体系类别不能为空' }]:[{}]">
              <el-select v-model="equityItem.inviteCategoryId" placeholder="请选择体系类别" @change="equityChangeSelect(equityItem.inviteCategoryId,index)">
                <el-option v-for="(item,index) in systemCategory" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="equityItem.interestsType == 'INVITE_NUM'">
            <el-form-item label="层级阶梯:" class="flex_form_item" :prop="'equityArr[' + index + '].inviteLevelId'" :rules=" equityItem.interestsType == 'INVITE_NUM'?[{ required: true, message: '层级阶梯不能为空' }]:[{}]">
              <el-select v-model="equityItem.inviteLevelId" :disabled="!equityItem.inviteCategoryId" :placeholder="equityItem.inviteCategoryId?equityItem.hierarchyLadder.length>0?`请选择层级阶梯`:`暂无数据`:`请选择层级阶梯`">
                <el-option v-for="(item,index) in equityItem.hierarchyLadder" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-show="equityItem.interestsType == 'INVITE_NUM'">
            <el-form-item label="邀请数量:" class="flex_form_item slot" :prop="'equityArr[' + index + '].inviteNum'" :rules=" equityItem.interestsType == 'INVITE_NUM'?[{ required: true, message: '邀请数量不能为空' }]:[{}]">
              <el-input v-model="equityItem.inviteNum" :maxlength="9" @input="equityItem.inviteNum=equityItem.inviteNum.replace(/[^\d]/g,'')" placeholder="所选会员等级可邀请的数量,最长不超过9位数"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="备注说明:" class="flex_form_item">
              <el-input v-model="equityItem.remark" placeholder="最多输入50个字符"></el-input>
            </el-form-item>
          </el-col>
        </div>
        <i class="el-icon-circle-close list_table_li_close" v-if="!equityItem.closeHide" @click="equityDelItem(equityItem,index)"></i>
      </li>
    </ul>
  </el-form>

```

## 分析

首先 el-form 里的 model 必须的对象  object

所以下面要遍历 才会把 数组 放到 对象里面去

再来是 对应的属性 prop  :prop="'equityArr[' + index + '].sourcePlatform'"  因为是数组遍历 所以这样写

相对应的rules :rules=" equityItem.interestsType == 'ORDER_DISCOUNT'?[{ required: true, message: '来源平台不能为空' }]:[{}]">

这里之所以用三目运算符  是因为 我这里需要的提示语不一样  而且防止增删改查时 无缘无故报红

v-show="equityItem.interestsType == 'ORDER_DISCOUNT'"> 这个与rule一致  也是为了防止报红


## 结论 这块是踩了比较多的坑 才对应处理的 普通的动态检验网上都有 因为他们提示语一致 字段一致  我这边由于字段是不一致的 所以才用了比较多判断

## 分享

```html
<el-input v-if="type"
v-model="name"
v-bind="config"
class="item"></el-input>

config:{
  placeholder:'请输入名字',
  clearable:null,
  disabled:false,
  maxlength"null,
  minlength:null,
  autosize:false,
  autocomplete:false,
  size:'',
}
```
配置都写在config里