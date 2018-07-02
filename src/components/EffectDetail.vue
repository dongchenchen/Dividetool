<template>
	<div class="content">
		<top></top>
		<div class= "dt_body">
			<h3>效果展示</h3>
			<div class="show_div">
				<table>
					<tr v:if="model_list.length>0">	
						<th>原图</th>
						<th v-for='(item,index) in model_list'>
							{{item}}
						</th>
					</tr>

					<tr v:if="imgs_list.length>0&&model_list.length>0" v-for='(item,index) in imgs_list' @click="showImg">
						<td>
							<img v:if="item.original" :src="img_format+item.original" />
						</td>
						<td v-for='(value,key) in item' v-if="model_list&&model_list.indexOf(key) != -1">
							<img :src="img_format+value" />							
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import top from './Top'
	import EffectDetail from '../js/EffectDetail.js'
	export default{
		...EffectDetail,
		components:{
			top
		}		
	}
</script>
<style type="text/css" src="../css/Table.css">
</style>

