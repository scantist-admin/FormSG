import ddTrace from 'dd-trace'

const tracer = ddTrace.init()

// setup express to not track middlewares as spans
// see documentation: https://datadoghq.dev/dd-trace-js/interfaces/plugins.express.html
tracer.use('express', {
  middleware: false,
})
