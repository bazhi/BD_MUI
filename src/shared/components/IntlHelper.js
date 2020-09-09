import intlUniversal from 'react-intl-universal';

const IntlHelper = {}

IntlHelper.get = function (key)
{
	var msg = intlUniversal.get(key);
	if(msg == null){
		return "#"+key;
	}else{
		return msg;
	}
}

IntlHelper.get = function (key, variables)
{
	var msg = intlUniversal.get(key, variables);
	if(msg == null){
		return "#"+key;
	}else{
		return msg;
	}
}

IntlHelper.getHTML = function (key)
{
	var msg = intlUniversal.getHTML(key);
	if(msg == null){
		return "#"+key;
	}else{
		return msg;
	}
}

IntlHelper.getHTML = function (key, variables)
{
	var msg = intlUniversal.getHTML(key, variables);
	if(msg == null){
		return "#"+key;
	}else{
		return msg;
	}
}

IntlHelper.determineLocale = function (options)
{
	return intlUniversal.determineLocale(options);
}

IntlHelper.init = function (options)
{
	return intlUniversal.init(options);
}

IntlHelper.load = function (locales)
{
	return intlUniversal.load(locales);
}

export default IntlHelper;
