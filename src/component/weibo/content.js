import React, { Component } from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { stopPro } from "../../utils/stopPro"
import { Control } from "react-keeper";
import { connect } from 'react-redux'
class Content extends Component {
  constructor(props, context) {
    super(props, context);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
    getEmotion(key) {
      const Emotion = this.props.emotion.emotion;
      const value = Emotion.find(function(item, index, arr) {
        return item.value === key;
      });
      if (!value) return;
      else return value.url;
    }
    handleNodes(text) {
      const pattern = /([^>]*)(<([a-z/][-a-z0-9_:.]*)[^>/]*(\/*)>)([^<]*)/g,
        nodes = [];
      let matchArr;
      while ((matchArr = pattern.exec(text))) {
        if (matchArr[1]) nodes.push(["text", matchArr[1]]);
        switch (matchArr[3]) {
          case "user":
            nodes.push(["user", matchArr[5]]);
            break;
          case "all":
            nodes.push(["all", matchArr[5]]);
            break;
          case "topic":
            nodes.push(["topic", matchArr[5]]);
            break;
          case "icon":
            nodes.push(["icon",matchArr[5], this.getEmotion(matchArr[5])]);
            break;
          case "url":
            nodes.push(["url", matchArr[5]]);
            break;
          default:
            nodes.push(["text", matchArr[5]]);
            break;
        }
      }
      return nodes;
    }
    render() {
      const content = this.handleNodes(this.props.con);
      return (
        <div className="Content">
          {content.map((item, index) => {
            return (
              <span key={index}>
                {item[0] === "user" ? (
                  <a>{item[1]}</a>
                ) : item[0] === "all" ? (
                  <a>{item[1]}</a>
                ) : item[0] === "icon" ? (
                 item[2] ? <img alt={item[1]} src={item[2]} style={{ width: 18, height: 18 }} /> : item[1]
                ) : item[0] === "text" ? (
                  item[1]
                ) : item[0] === "topic" ? (
                  <a>{item[1]}</a>
                ) : item[0] === "url" ? (
                  <a href={item[1]}> 查看原链接</a>
                ) : null}
              </span>
            );
          })}
        </div>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      emotion: state.emotion
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
    }
  }
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Content)