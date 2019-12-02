var liftit = require('liftit-common');

var Log = require('../../models/Log');

<max-fraction>
 <small><strong>{fraction || '?'}%</strong></small>
 <script>
    var self = this;

	var log = new Log(self.opts.log);

    self.effectiveMax = log.getEffectiveMax();

	function generateFraction() {
	  self.weightFractions.forEach(function(wf) {
		if(log.weight == wf.weight) {
		  self.fraction = wf.fraction;
		}
	  });
    }

	function calculateWeigthFractions() {
	  self.weightFractions = [];

	  for(var i=0.85;i<1;i+=0.05) {
		self.weightFractions.push({
		  weight: liftit.roundTo(self.effectiveMax[log.lift] * i, 5),
		  fraction: Math.floor(i * 100),
		});
	  }
	};

	calculateWeigthFractions();
	generateFraction();
 </script>
</max-fraction>
