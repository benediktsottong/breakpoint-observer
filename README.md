# react-breakpoint-observer
A simple observer to recognize breakpoint changes by resize events.

## Table of Contents

- [Background](#background)
- [Install](#install)
- [Usage](#usage)
- [License](#license)

## Background
Sometimes you need to render different components for mobile, tablet or desktop breakpoints. This project will help you to identify breakpoints by observe the resize event and trigger your event if a given breakpoint is reached.

I used it to change the current breakpoint in redux and force a rerender of a specific breakpoint was changed. 

## Install
```sh
$ npm install --save breakpoint-observer
```

## Usage
Use the react livecycle to initialize the observer after your App is fully loaded.

ES6 import:
````js
   import { BreakpointObserver } from 'reakpoint-observer';

````

Example usage
```js
    import React, { PureComponent } from 'react'; 
    import { BreakpointObserver } from 'reakpoint-observer';
    
    class App extends PureComponent {
        componentDidMount() {
            BreakpointObserver.subscribe(['xs', 's', 'm', 'l', 'xl], this.breakpointHasChanged);
        }
        
        breakpointHasChanged(breakpoint, direcction) {
            /* dispatch your action or change a state */
            console.log(`Breakpoint ${breakpoint} was reached by ${direcction} the site.`);
        }
    }

```




## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
