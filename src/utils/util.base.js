/**
 * 创建人：Harry Vin
 * 创建时间：2023/5/11 16:34
 * 说明：这个工具包含一些基础的工具，当你不知道你要写的工具不知道分类到那个文件的时候就往折里放，但是业务逻辑相关的工具别往里面放
 **/

/* js空值判断工具 */
export function Optional() {
	this.val = null;
}
Optional.of = function(value) {
	const op = new Optional();
	op.val = value;
	return op;
}

/**
 * 值是否有效
 * @return {boolean}
 */
Optional.prototype.isPresent = function() {
	if (this.val === 'null') {
		return false;
	} else if (typeof this.val === "number" && this.val === 0) {
		return true;
	}
	return !!this.val;
}

/**
 * 值如果是有效的就调用回调函数
 * @param callBack
 */
Optional.prototype.ifPresent = function(callBack) {
	if (this.isPresent()) {
		callBack && callBack();
	}
}

/**
 * 值如果是无效的就返回传入的值
 * @param val
 * @return {*|null}
 */
Optional.prototype.orElse = function(val) {
	if (this.isPresent()) {
		return this.val;
	}
	return val;
}
