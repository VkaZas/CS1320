import React from 'react';
import Tweet from "./Tweet.jsx";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        timerId: 0,
        updating: true,
        dupDic: {},
        nowData: [],
    };

    this.state.timerId = setInterval(this.getTweets.bind(this), 3000);
  }

  getTweets() {
      fetch('http://ec2-18-216-120-197.us-east-2.compute.amazonaws.com:3030/feed/start', {
          method: 'get',
      }).then((res) => {
          return res.json();
      }).then((data) => {
          let tData = this.clearDup(data);
          tData.sort((a,b) =>  b['timestamp_ms'] - a['timestamp_ms']);
          this.updateData(tData);
      }).catch((err) => {
          console.error('Fetch failed: ' + err);
      });
  }

    clearDup(data) {
        const res = [];
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (this.state.dupDic.hasOwnProperty(item.id)) continue;
            this.state.dupDic[item.id] = true;
            res.push(item);
        }
        return res;
    }

    updateData(nxtData) {
        let dupCnt = 0;
        for (let i = 0; i < this.state.nowData.length; i++) {
            for (let j = 0; j < nxtData.length; j++) {
                if (this.state.nowData[i].id === nxtData[j].id) {
                    dupCnt++;
                    break;
                }
            }
        }

        for (let i = 0; i < this.state.nowData.length + nxtData.length - 26; i++) this.state.nowData.pop();
        this.state.nowData = nxtData.concat(this.state.nowData);
        this.setState(this.state);
    }

    handleClick() {
        if (this.state.updating === true) {
            this.state.updating = false;
            clearInterval(this.state.timerId);
        } else {
            this.state.updating = true;
            this.state.timerId = setInterval(this.getTweets.bind(this), 3000);
        }
        this.setState(this.state);
    }

  render() {
      const tweets = this.state.nowData.map((item) => {
          return <Tweet text={item.text} name={item.user.name} img={item.user.profile_image_url} key={item.id}/>
      });
      return (
          <div className="container">
              <div className="row">
                  <ul className="collection" id="tweets-container">
                      {tweets}
                  </ul>
              </div>
              <a className="waves-effect waves-light btn" id="btn-switch" onClick={this.handleClick.bind(this)} style={{
                  position: 'absolute',
                  left: '0',
                  top: '50px'
              }}>{this.state.updating ? 'Stop' : 'Start'}</a>
          </div>
      );
  }
}
