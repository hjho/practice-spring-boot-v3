const utils = {
	/**
	 * @description 빈 값 검증
	 * @example undefined, null, '', {}, [] : ture
	 * @param {Object} obj 값
	 * @returns Boolean 빈 값이면 true
	 */
	isEmpty: function(obj) {
		if(obj === undefined || obj === null 
			|| (typeof obj === 'string' && obj === "")
			|| (Array.isArray(obj) && obj.length === 0)
			|| (typeof obj === 'object' && Object.keys(obj).length === 0)
		) {
			return true;
		} else {
			return false;
		}
	},
	isNotEmpty: function(obj) {
		return !this.isEmpty(obj);
	},
	/**
	 * @description 기본값
	 * @example defaultString(null):'' / defaultString(null, '0'):'0'
	 * @param {String} str 값
	 * @param {String} def 기본값: default=""
	 * @returns String
	 */
	defaultString: function(str, def = "") {
		if(this.isEmpty(str)) {
			return def;
		} else {
			return str;
		}
	},
	/**
	 * @description 직렬화
	 * @example serialize({key="value", key2="value2"}): "key=value&key2=value2" 
	 * @param {Object} obj {}
	 * @returns String
	 */
	serialize: function(obj) {
		let queryString = "";
		if(this.isNotEmpty(obj) && typeof obj === 'object' && !Array.isArray(obj)) {
			Object.keys(obj).map(function(key, index, _) {//_:array
				queryString += (index === 0) ? "" : "&";
				queryString += key + "=" + encodeURIComponent(obj[key]);
			});
		} else {
			queryString = obj;
		}
		return queryString;
	},
	/**
	 * @description 랜덤 숫자 생성기
	 * @example randomNumber(2): 0 또는 1 / randomNumber(2, 1): 1 또는 2
	 * @param {Number} end 0부터 end미만의 랜덤 숫자 생성
	 * @param {Number} strt strt만큼 더해줌.
	 * @returns 랜덤 숫자
	 */
	random: function(end, strt = 0) {
	    let randomNum = 0;
	    if(typeof end === 'number') {
	        randomNum = Math.floor(Math.random() * end);
	        if(typeof strt === 'number') {
	            randomNum += strt;
	        }
	        return randomNum;
	    } else {
	        return 0;
	    }
	}
}

const format = {
	number: function(str, def = 0, max = 0) {
		str = String(str).replace(/[^\d]/g, '');
		if(utils.isNotEmpty(str)) {
			return (max > 0) ? str.substring(0, max) : str; 
		}
		return def;
	},
	integer: function(str, def = 0, max = 0) {
		str = this.number(str);
		if(utils.isNotEmpty(str)) {
			let num = String(Number(str));
			return (max > 0) ? num.substring(0, max) : num; 
		}
		return def;
	},
	english: function(str, def = '', max = 0) {
		str = String(str).replace(/[^a-zA-Z]/g, '');
		if(utils.isNotEmpty(str)) {
			return (max > 0) ? str.substring(0, max) : str; 
		}
		return def;
	},
	numEng: function(str, def = '', max = 0) {
		str = String(str).replace(/[\W|_]/g, '');
		if(utils.isNotEmpty(str)) {
			return (max > 0) ? str.substring(0, max) : str;
		}
		return def;
	},
	hpno: function(str) {
		str = String(str).replace(/[\D]/g, '');
		if(utils.isNotEmpty(str)) {
			let hpno = '';
			str = str.substring(0, 11);
			if(str.length > 7) {
				hpno = str.substr(0, 3) + '-' + str.substr(3, 4) + '-' + str.substr(7, 4);
				
			} else if(str.length > 3) {
				hpno = str.substr(0, 3) + '-' + str.substr(3, 4);
			} else {
				hpno = str;
			}
			return hpno;
		}
		return '';
	},
	money: function(str, def = 0, max = 0) {
		return this.integer(str, def, max).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
	},
	dollar: function(str, def = 0, maxN = 0, maxD = 0) {
		str = String(str).replace(/[^\d|.]/g, '');
		if(utils.isNotEmpty(str)) {
			let arr = str.split('.');
			let num = arr[0];
			let dec = arr[1];
			
			num = this.money(num, 0, maxN);
			
			dec = this.number(dec, '', maxD);
			
			dec = (str.indexOf('.') === -1) ? '' : '.' + dec;
			
			return num + dec;
		}
		return def;
	},
	datetime: function(str) {
		if(utils.isNotEmpty(str)) {
			let datetime = '';
			let date = '';
			let time = '';
			if(str.length === 14) {
				date = str.substring(0, 8);
				time = str.substring(8, 14);
			} else if(str.length === 8) {
				date = str;
			} else if(str.length === 6) {
				time = str;
			}
			
			if(utils.isNotEmpty(date)) {
				date = date.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, '$1-$2-$3');
				datetime = date;
			}
			if(utils.isNotEmpty(time)) {
				time = time.replace(/([0-9]{2})([0-9]{2})([0-9]{2})/, '$1:$2:$3');
				datetime += ' ' + time;
			}
			return datetime;
		}
		return "";
	}
}

const evnts = {
	formatNumEng: function(event, max) {
		event.target.value = format.numEng(event.target.value, '', max);
	},
	formatMoney: function(event, max) {
		event.target.value = format.money(event.target.value, 0, max);
	},
	formatDollar: function(event, maxN, maxF) {
		event.target.value = format.dollar(event.target.value, 0.0, maxN, maxF);
	},
	formatHpno: function(event) {
		event.target.value = format.hpno(event.target.value);
	},
	formatYn: function(event) {
		event.target.value = (event.target.checked) ? 'Y' : 'N';
	}
}
