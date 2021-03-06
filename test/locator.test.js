var Locator = require('../lib/locator');

describe('Locator', function() {
  
  describe('#isRegistered', function() {
    var locator = new Locator();
    locator.register('foo', { say: 'bar' });
    locator.register('undef');
    locator.register('null', null);
    
    it('should find registered service', function() {
      var isRegistered = locator.isRegistered('foo');
      expect(isRegistered).to.be.true;
    });

    it('should not find service if it is registered as undefined', function() {
      var isRegistered = locator.isRegistered('undef');
      expect(isRegistered).to.be.false;
    });

    it('should not find service if it is registered as null', function() {
      var isRegistered = locator.isRegistered('null');
      expect(isRegistered).to.be.false;
    });
  });

  describe('#register', function() {
    var locator = new Locator();
    var rv = locator.register('foo', { say: 'bar' });
    
    it('should register service', function() {
      var svc = locator.get('foo');
      expect(svc).to.be.an.object;
      expect(svc.say).to.equal('bar');
    });
    
    it('should return self for chaning', function() {
      expect(rv).to.equal(locator);
    });
    
    it('should not overwrite existing services', function() {
      expect(function() {
        locator.register('foo', { say: 'baz' })
      }).to.throw(Error, 'Service already registered with name: foo');
    });
  });
  
  describe('#unregister', function() {
    var locator = new Locator();
    locator.register('foo', { say: 'bar' });
    var rv = locator.unregister('foo');
    
    it('should unregister service', function() {
      expect(function() {
        locator.get('foo')
      }).to.throw(Error, 'No service registered with name: foo');
    });
    
    it('should return self for chaning', function() {
      expect(rv).to.equal(locator);
    });
  });
  
  describe('#reset', function() {
    var locator = new Locator();
    locator.register('qux', { say: 'foo' });
    locator.register('quux', { say: 'bar' });
    var rv = locator.reset();
    
    it('should reset registry', function() {
      expect(function() {
        locator.get('foo')
      }).to.throw(Error, 'No service registered with name: foo');
    });
    
    it('should return self for chaning', function() {
      expect(rv).to.equal(locator);
    });
  });
  
});
