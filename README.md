# Whatever-rendering

This sample is showing a web application structure which mixes server-rendering and client-rendering.

It aims to bring fast rendering experience for Mobile Webapp.

## About Sample

The sample only has two pages: **/** and **/readme**. You could enter one of them in the browser and jump to anther. The first load is from server, and the future page loads will be done by client loading and rendering. Each page load would just load the dependencies for it, so it will be super fast.

## Techniques

### The general whole rendering process

```
↓ Server render
↓ Client re-render
	•	Init events but won't do DOM change
	•	Make view listen store changing

If you do page jump

↓ Load page resources if not loaded
↓ Client router change
↓ Client render

Client rendering cycle

```

Both of renderings share same React components, and business actions. The data/work flow is showing below:

### Express server render

```
Express routes => Route handler => Actions(fetch data) => Server render view
```

### Client render in Flux architecture

```
Client routes => Route handler => Actions(fetch data) => Store Change => Client view update
```

The data flow from routes to actions in both ways could follow the same reactive structure and reuse most of codes, such as actions.

For more information, please clone down and run.

Todos
* preboot module
