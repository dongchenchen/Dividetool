export default{
		components:{
			top
		},

		data:function(){
			return {
				model_list:[],
				img_format:'data:image/png;base64,',
				// img_format:'',
				imgs_list:[]
			}
		},

		created:function(){			
			var img_list = JSON.parse(window.localStorage.getItem("img_list"));
			var urls = window.localStorage.getItem("urls");
			var model_list = JSON.parse(window.localStorage.getItem("model_list"));
			var multiples = window.localStorage.getItem("multiples");
			let url = "http://9.73.158.6:8080/process";
			let data= {
				"img_list":img_list,
				"urls":urls,
				"model_list":model_list,
				"multiples":multiples
			}
			var that = this;
			this.$http.post(url,data).then(function(res){
				let results = res.body.imgs_list;
				that.imgs_list = results;
				that.model_list = res.body.model_list;
			},function(err){
				console.log(err);
			})
			
		},

		methods:{
			showImg:function(e){
				let src = e.target.src;
				this.$router.push({
				name:'Img',
				query:{
					img_src:src
				}
			});
			}
		},
		beforeRouteLeave(to, from, next) {
	        // 设置下一个路由的 meta
	        if(to.name == "Img"){
	        	from.meta.keepAlive = true; 
	        }else if(to.name == "Home"){
	        	from.meta.keepAlive = false; 
	        }	        
	        next();
	    }
	}
	