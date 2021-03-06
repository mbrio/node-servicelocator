/**
 * Creates an instance of `Locator`.
 *
 * @constructor
 * @api public
 */
function Locator() {
  this._registry = {};
}

/**
 * Get a service registered with `name`.
 *
 * @param {String} name
 * @return {Object} Previously registered service.
 * @api public
 */
Locator.prototype.get = function(name) {
  var svc = this._registry[name];
  if (!svc) { throw new Error('No service registered with name: ' + name); }

  if ('function' === typeof svc) { return svc(); }
  else { return svc; }
};

/**
 * Determine if a service is registered with `name`.
 *
 * @param {String} name
 * @return {Boolean} True if the service is registered.
 * @api public
 */
Locator.prototype.isRegistered = function(name) {
  var svc = this._registry[name];
  return !!svc;
};

/**
 * Register a service with `name`.
 *
 * @param {String} name
 * @param {Object} svc
 * @return {Locator} for chaining
 * @api public
 */
Locator.prototype.register = function(name, svc) {
  var existing = this._registry[name];
  if (existing) { throw new Error('Service already registered with name: ' + name); }
  this._registry[name] = svc;
  return this;
};

/**
 * Unegister a service with `name`.
 *
 * @param {String} name
 * @return {Locator} for chaining
 * @api public
 */
Locator.prototype.unregister = function(name) {
  delete this._registry[name];
  return this;
};

/**
 * Remove all registered services.
 *
 * @return {Locator} for chaining
 * @api public
 */
Locator.prototype.reset = function() {
  this._registry = {};
  return this;
};


/**
 * Expose `Locator`.
 */
module.exports = Locator;
