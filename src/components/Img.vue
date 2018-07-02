<template>
<div>
	<div class="img_area">
		<img :src ="img_dataurl" style="margin:0 auto" />
	</div> 
	<div class="submit_area">
		<a title="提交" href="javascript:;" class="submit_button" @click="save_img">保存</a>
	</div>
</div>
</template>
<script type="text/javascript">
export default{
	name: 'Img',
	data:function(){
		return {
			img_dataurl:""
		}
	},
	created:function(){
		this.img_dataurl = this.$route.query.img_src;
	},
	methods:{
		save_img:function(){
			let url = "http://9.73.158.6:8080/saveImg";
			let data= {
				"save_url":this.img_dataurl
			}
			var that = this;
			this.$http.post(url,data).then(function(res){
				alert("保存成功");
			},function(err){
				console.log(err);
			})
		}
	}
}
</script>
<style type="text/css" src="../css/Img.css"></style>
