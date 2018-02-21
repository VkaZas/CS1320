import React from 'react';

export default class Results extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        let counter = 0;
        let original = this.props.curLab.content;
        let flag = false;
        let replaced_madlib = this.props.curLab.content.replace(/\[([^\])]*)\]/g, (mat,p1,off,str) => {
            let res = this.props.dataArr[counter].content === '' ? `[${this.props.dataArr[counter].label}]` : this.props.dataArr[counter].content;
            if (this.props.dataArr[counter].content === '') flag = true;
            counter++;
            return res;
        } );


        return (
            <div>
                {flag?original:replaced_madlib}
            </div>
        )
    }
}