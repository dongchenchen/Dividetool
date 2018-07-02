export default{
	name: 'Home',
	data:function(){
		return{
			select_models:["model1","model2","model3"],
			imgs:[],
			model_list:[],
			paste_urls:"",
			imgData:{
				accept:'image/gif,image/jpeg, image/png, image/jpg'
			},
			submit_files:[],
			multiples:2,
			multiple_list:[1,2,3,4],
			return_list:[],
			default_imgs:[],
			is_get_common:true,
			is_get_words:true,
			article_link:""
		}
	},

	beforeCreate:function(){
		let filepath = '../../static/model_config.txt';
		let _this = this;
		this.$http.get(filepath).then(res=>{
			let text = res.bodyText;
			_this.model_list = text.split(",");
			_this.select_models  = _this.model_list;
		})
		
		
	},


	

	methods:{
		get_default_imgs:function(type){
           	let url = "http://9.73.158.6:8080/getDefaultImgs";
           	let data= {
				"type":type
			}	
			var that = this;
			this.$http.post(url,data).then(function(res){
				let results = res.body.imgs_list;
				results.forEach((item)=>{
				    item.url = "data:image/png;base64,"+item.url;
					that.default_imgs.push(item);
				})
			    if(type === 0){
			    	that.is_get_common = false;
			    }
			    else
			    {
			    	that.is_get_words = false;
			    }
			},function(err){
				console.log(err);
			})
			
		},
		del_default_imgs:function(type){
			this.default_imgs = this.default_imgs.filter(function(item){
				return item.type != type;
			})
			if(type === 0){
		    	this.is_get_common = true;
		    }
		    else
		    {
		    	this.is_get_words = true;
		    }
		},
		file_click:function(event){
			if(event.target.files[0].size == 0) return;
			this.deal_files(event.target);
			event.target.value = '';		
		},

		deal_files:function(urls){
			let files = urls.files;
			for(let i=0; i<files.length; i++){
				if(files[i].type !=''){
					this.add_img(files[i]);
				}else{
					this.deal_with_folder(files[i]);
				}
			}
		},

		

		add_img:function(file) {
	        
	        let type = file.type;
			if(this.imgData.accept.indexOf(type) == -1){  
	            alert(file.name+'不是支持的图片格式！');  
	            return false;  
		    } 
	          let reader = new FileReader();
	          let image = new Image();
	          let _this=this;
	          reader.readAsDataURL(file);
	          reader.onload = function () {
	            file.src = this.result;
	            image.onload=function(){
	              let width = image.width;
	              let height = image.height;
	              file.width=width;
	              file.height=height;
	              _this.imgs.push({
	                file
	              });
	              console.log( _this.imgs);
	            };
	            image.src= file.src;
	          }
	        
      	},

      	deal_with_folder:function(files){
      		let _this = this;
	        if (files.kind) {
	          files = files.webkitGetAsEntry();
	        }
	        files.createReader().readEntries(function (file) {
	          for (let i = 0; i < file.length; i++) {
	            if (file[i].isFile) {
	              _this.add_floder(file[i]);
	            } else {
	              _this.deal_with_folder(file[i]);
	            }
	          }
	        })
      	},

      	add_floder:function(files){
      		let _this = this;
      		files.file(function(image){
      			_this.add_img(image);
      		})
      	},

      	delete_img:function(index){
      		this.imgs.splice(index,1);
      	},
      	delete_default:function(index){
      		this.default_imgs.splice(index,1);
      	},

      	getBase64Image:function(img) {
		    var canvas = document.createElement("canvas");
		    canvas.width = img.width;
		    canvas.height = img.height;

		    var ctx = canvas.getContext("2d");
		    ctx.drawImage(img, 0, 0, img.width, img.height);
		    var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
		    var dataURL = canvas.toDataURL("image/"+ext);
		    return dataURL;
		},
      	
      	submit_url(){
      		let url = "http://9.73.158.6:8080/dealArticleUrl";
           	let data= {
				"url":this.article_link
			}	
			var that = this;
			this.$http.post(url,data).then(function(res){
				let results = res.body.urls_list;
				results.forEach((item)=>{
				    let url = item+",\n";
				   	this.paste_urls += url;
				})
			},function(err){
				console.log(err);
			})
      	},

      	deal_with_urls:function(urls){	
      		this.turn_to_effect();	
      	},

		submit_data:function(event){
			let urls = this.paste_urls;			
			this.deal_with_urls(urls);
			 
		},
			
		turn_to_effect:function(){
			var img_list = [];
			this.imgs.forEach((item)=>{
				img_list.push(item.file.src);
			})
			var that = this;
			this.default_imgs.forEach((item)=>{
				img_list.push(item.url);
			})
			let model_list = this.select_models;
			let multiples = this.multiples;
			window.localStorage.setItem("img_list",JSON.stringify(img_list));
			window.localStorage.setItem("urls",this.paste_urls);
			window.localStorage.setItem("model_list",JSON.stringify(model_list));
			window.localStorage.setItem("multiples",multiples);
			this.$router.push({
				name:'EffectDetail',
				params:{
					select_models:this.select_models
				}
			});
		}
		
	}
}