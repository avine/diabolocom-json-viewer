
requirejs.config({
  "paths": {
    "jquery": "vendor/jquery.min",
    "app": "lib/app",
    "helper": "lib/helper"
  }
});

requirejs(['app']);
