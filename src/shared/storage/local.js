var storage = (function () {
	return {
		set: function (key, value, expireSeconds) {
			if (expireSeconds) {
				localStorage.setItem(key, JSON.stringify({
					value: value,
					expired: Date.now() + 1000 * expireSeconds
				}))
			} else {
				localStorage.setItem(key, JSON.stringify({
					value: value,
				}))
			}
		},
		get: function (key) {
			var item = localStorage.getItem(key);
			if (item) {
				var o = JSON.parse(item)
				if (!o.expired || Date.now() < o.expired) {
					return o.value
				} else {
					localStorage.removeItem(key)
				}
			}
			
		}
	}
})()

export default storage;
