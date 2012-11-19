function Map(config) {

	this._width = config._width ? config._width : 0;
	this._height = config._height ? config._height : 0;

	if (this._height > 0 && this._width > 0) {
		this._map = {};

	} else {
		this._map = {};
	}
}