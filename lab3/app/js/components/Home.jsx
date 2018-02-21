import React from 'react';
import Query from './Query.jsx';
import Results from './Results.jsx';
import madlibs from '../../madlib.js';



export default class Home extends React.Component {
  constructor(props) {
    super(props);
    const randLab = madlibs[parseInt(Math.random() * madlibs.length)];
    const dataArr = [];
    randLab.content.replace(/\[([^\])]*)\]/g, (mat,p1,off,str) => {
        dataArr.push({
            label: p1,
            content: '',
        })
    } );

    this.state = {
        dataArr: dataArr,
        curLab: randLab,
    }
  }

  handleInputData(v, idx) {

      this.state.dataArr[idx].content = v;
      this.setState({
          dataArr: this.state.dataArr,
      });
  }

  render() {

      return (
        <div>
           <b> Component Code Goes Here</b>
            <Query dataArr={this.state.dataArr} onInputData={this.handleInputData.bind(this)}/>
            <Results dataArr={this.state.dataArr} curLab={this.state.curLab}/>
        </div>
    );
  }
}
