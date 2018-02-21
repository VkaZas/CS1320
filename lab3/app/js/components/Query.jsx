import React from 'react';

export default class Query extends React.Component{
    constructor(props) {
        super(props);
    }

    handleInputChange(e, idx) {
        this.props.onInputData(e.target.value, idx);
    }

    render() {
        let inputBars = [];
        for (let i = 0; i < this.props.dataArr.length; i++) {
            const item = this.props.dataArr[i];
            inputBars.push(
                <div className="input-container">
                    <label htmlFor={'data-' + i}>{item.label}</label>
                    <input id={'data-' + i} onChange={(e) => {
                        this.handleInputChange(e, i)
                    }}/>
                </div>
            );
        }

        return(
            <div>
                {inputBars}
            </div>
        )
    }
}