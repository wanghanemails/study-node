import $ from 'jquery';
import React from 'react';
import { render } from 'react-dom';

class HelloWorld extends React.Component {
    render() {
        return (
            <div>Hello World sss</div>
        );
    }
}

render(<HelloWorld />, $('#content')[0]);
