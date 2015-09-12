import React from 'react';
import Link from './link.react';

class Readme extends React.Component {
  render() {
    return (
      <article className="readme">
        <p>
          <Link className="back-link" path="/">&laquo; back to todos</Link>
        </p>
        <h1>Whatever-rendering</h1>
        <section>
          <p>
            This sample is showing a web application structure which mixes <b>server-rendering</b> and <b>client-rendering</b>.
          </p>
          <p>
            It aims to bring fast rendering experience for Mobile Webapp.
          </p>
          <h2>About Sample</h2>
          <p>
            The sample only has two pages: <b>/</b> and <b>/readme</b>. You could enter one of them in the browser and jump to anther.
            The first load is from server, and the future page loads will be done by client loading and rendering. Each page load would just load
            the dependencies for it, so it will be super fast.
          </p>
          <h2>Techniques</h2>
          <h3>
            The general whole rendering process
          </h3>
          <code>
            <div>
              <b>&darr; Server render</b>
            </div>
            <div>
              <b>&darr; Client re-render</b>
              <ul>
                <li>Init events but won't do DOM change</li>
                <li>Make view listen store changing</li>
              </ul>
            </div>
            <div>
              <br/>
            </div>
            <div>
              <i>If you do page jump</i>
            </div>
            <div>
              <br/>
            </div>
            <div>
              <b>&darr; Load page resources if not loaded</b>
            </div>
            <div>
              <b>&darr; Client router change</b>
            </div>
            <div>
              <b>&darr; Client render</b>
            </div>
            <div>
              <br/>
            </div>
            <div>
              <i>Client rendering cycle</i>
            </div>
          </code>
          <p>
            Both of renderings share same <b>React</b> components, and business actions. The data/work flow is showing below:
          </p>
          <h3>
            Express server render
          </h3>
          <code>
            <div>Express routes => Route handler => Actions(fetch data) => Server render view</div>
          </code>
          <h3>
            Client render in Flux architecture
          </h3>
          <code>
            <div>
            </div>
            <div>Client routes => Route handler => Actions(fetch data) => Store Change => Client view update</div>
          </code>
          <p>
            The data flow from <b>routes</b> to <b>actions</b> in both ways could follow the same reactive structure and reuse most of codes, such as actions.
          </p>
          <p>
            For more information, please clone down and run.
          </p>
          <h2>
            Todos
          </h2>
          <ul>
            <li>preboot module</li>
          </ul>
        </section>
      </article>
    );
  }
}

Readme.displayName = 'Readme';

export default Readme;
