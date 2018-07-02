<template>
	<div class="content">	
		<top>	</top>
		<div class="dt_body">
			<div class="choose_content">
				<h3>
					<p class="word">
					选择内容：
					</p>
				</h3>
				<div class="choose" id="upload_list">
					<div class="upload_area">
						<div class="dropdown">
							<a href="javascript:;" class="upload_button">								
								上传图片
								<input type="file" name="file_upload" id="file_input" class="upload_file" @change='file_click' multiple=""  />
							</a>
							<div class="dropdown_content">
								<a href="javascript:;" class="upload_button">上传文件
									<input type="file" name="file_upload" id="file_input" class="upload_file" @change='file_click' multiple=""  />
								</a>
								<a href="javascript:;" class="upload_button">上传文件夹
									<input type="file" name="file_upload" id="file_input" class="upload_file" @change='file_click' multiple="" webkitdirectory="" />
								</a>
							</div>
						</div>
						<div class="default_area">
							<div class="arrow"></div>
							<a title="获取默认图" href="javascript:;" class="small" @click="get_default_imgs(0)" v-if="is_get_common">获取通用图</a>
							<a title="删除默认图" href="javascript:;" class="small" @click="del_default_imgs(0)" v-else>删除通用图</a>
							<div class="arrow" style="margin-left:20px"></div>
							<a title="获取文字图图" href="javascript:;" class="small" @click="get_default_imgs(1)" v-if="is_get_words">获取文字图</a>				<a title="删除默认图" href="javascript:;" class="small" @click="del_default_imgs(1)" v-else>删除文字图</a>
						</div>
						<div class="upload_imgs" v-show="imgs.length>0 ||default_imgs.length >0">
							<div class="upload_imgs_div" v-for='(item,index) in imgs'>
								<div class="upload_imgs_div_top">
									<div class="upload_imgs_div_top_text">{{item.file.name}}</div>
									<img src="../assets/delete.png" class="upload_imgs_div_top_del" @click="delete_img(index)" />
								</div>
								<img :src="item.file.src">
							</div>						
							<div class="upload_imgs_div" v-for='(item,index) in default_imgs'>
								<div class="upload_imgs_div_top">
									<div class="upload_imgs_div_top_text">{{item.type == 0 ? '通用图' : '文字图'}}</div>
									<img src="../assets/delete.png" class="upload_imgs_div_top_del" @click="delete_default(index)" />
								</div>
								<img :src="item.url">
							</div>	
						</div>
					</div>
					
					<div class="paste_area">
						<div class="article_url">
							<input type="text" v-model="article_link" placeholder="输入文章链接，回车提交"  @keyup.enter="submit_url" /> 
						</div>
						<textarea cols="20" rows="10"  placeholder="粘贴URL，一行一个" v-model="paste_urls"></textarea>
					</div>
					<img src=""/>
				</div>		
			</div>
			<div class="model_param">
				<h3>
					<p class="word">
						选择模型及参数:
					</p>
				</h3>
				<div class="model">
					

					<div v-if="model_list.length>0" v-for='(item,index) in model_list' class="model_item_div">
						<input type= 'checkbox'  :id="index" name="model_name" :value="item"    v-model="select_models" checked/>
						<label :for="index" checked="checked">{{item}}</label>
					</div>
				</div>
				<div class="param">
					<h3>
						<p class="word">
							放大倍数：
							<select id="multiple_time" v-model="multiples">
							    <template v-for='(item,index) in multiple_list'>					        
							        <option>
							            {{ item }}
							        </option>
							    </template>
							</select>
						</p>
					</h3>
					
				</div>
			</div>
			<div class="submit_area">
				<a title="提交" href="javascript:;" class="submit_button" @click="submit_data">提交</a>
			</div>
		</div>
		
	</div>
</template>
<script type="text/javascript">
	import top from './Top';
	import Home from '../js/Home.js';
	export default{
		...Home,
		components:{
			top
		}
	}
</script>
<style type="text/css" src="../css/Home.css"></style>
