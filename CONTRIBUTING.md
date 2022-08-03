# Contributing to this project

Honestly just pr whatever you want. Your files must use the logger provided by me tho.
Here's an example of the logger in use.

<span style="color:red">Keep in mind the second argument in the function should always be `__filename`</span>.

```javascript
const Logger = require('../../utils/logger')
const c = new Logger()

// your code

c.info('<info message>', __filename)
c.error('<error message>', __filename)
c.debug('<debug message>', __filename)
c.warn('<warn message>', __filename)
c.raw('<anything not really related>', __filename)
```

Oh and also please keep the style of the project, I prefer not using semi-colons most of the time (pls dont kill me)
