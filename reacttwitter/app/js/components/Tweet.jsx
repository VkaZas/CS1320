import React from 'react';

export default class Tweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: {
                backgroundColor: 'white'
            }
        }
    }

    handleClick() {
        if (this.state.style.backgroundColor === 'white') {
            this.state.style.backgroundColor = 'whitesmoke';
        } else {
            this.state.style.backgroundColor = 'white';
        }
        this.setState(this.state);
    }


    render() {
        return (
            <li className='collection-item avatar' onClick={this.handleClick.bind(this)} style={this.state.style}>
                <img src={!!this.props.img ? this.props.img : 'img/no_photo.png'} className='circle'/>
                <span className='title'>{this.props.name}</span>
                <p>{this.props.text}</p>
            </li>
        )
    }
}