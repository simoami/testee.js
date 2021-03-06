'use strict';

var httpProxy = require('http-proxy');
var proxy = new httpProxy.RoutingProxy();

/**
 * Returns a Middleware that sets up a HTTP routing proxy to
 * another Host. Also sets the domain name which is very important
 * for virtual hosts.
 *
 * @param {Object} settings The proxy settings
 * @return {Function} The proxy middleware
 */
module.exports = function (settings) {
	return function (req, res) {
		// If routing to a server on another domain, the hostname in the request must be changed.
		req.headers.host = settings.host;
		return proxy.proxyRequest(req, res, settings);
	}
}