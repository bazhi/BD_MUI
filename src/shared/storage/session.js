var storage = (function(){
	return {
		set: function(key, value, expireSeconds){
			if(expireSeconds){
				sessionStorage.setItem(key, JSON.stringify({
					value: value,
					expired: Date.now() + 1000*expireSeconds
				}))
			}else{
				sessionStorage.setItem(key, JSON.stringify({
					value: value,
				}))
			}
		},
		get: function(key){
			var item = sessionStorage.getItem(key);
			if(item){
				var o = JSON.parse(item)
				if(!o.expired || Date.now() < o.expired){
					return o.value
				}else{
					sessionStorage.removeItem(key)
				}
			}
			return;
		}
	}
})()

export default storage;