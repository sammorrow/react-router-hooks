import React from 'react';
import { Route } from 'react-router';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class HookedRoute extends React.Component {
  constructor(props){
    super(props);
    this.state = {pending: false};
    this.replace = this.replace.bind(this);
    this.callback = this.callback.bind(this);
    this.arrityCheck = this.arrityCheck.bind(this);
  }

  arrityCheck(){
    let { onEnter, onChange } = this.props;
    return (
      onEnter && onEnter.length > 2 ||
      onChange && onChange.length > 3
    );
  }

  replace(url){
    this.props.history.push(url);
  }

  callback(){
    if (!this.state.pending) this.setState({pending: false})
  }

  runAsync(hookFunc){
    setTimeout(() => {
      hookFunc();
      this.callback();
    }, 0);
  }

  componentWillMount(){
    if (this.arrityCheck()) this.setState({pending: true})
  }

  componentDidMount(){
    let { onEnter } = this.props;
    if (onEnter) {
      if (onEnter.length > 2) {
        this.runAsync(onEnter(this.props, this.replace, this.callback))
      } else {
        onEnter(this.props, this.replace)
      }
    }
  }

  componentWillReceiveProps(nextProps){
    let { onChange, computedMatch } = this.props;
    if (
      onChange &&
      nextProps.computedMatch &&
      computedMatch &&
      JSON.stringify(nextProps.computedMatch.params) !== JSON.stringify(computedMatch.params)
    ){
      if (onChange.length > 3) {
        this.runAsync(onChange(this.props, nextProps, this.replace, this.callback))
      } else {
        onChange(this.props, nextProps, this.replace);
      }
    }
  }

  componentWillUnmount(){
    let { onLeave } = this.props;
    if (onLeave) onLeave(this.props);
  }


  render(){
    if (this.state.pending) return null
    else return <Route {...this.props} />
    }
}

HookedRoute.propTypes = {
  computedMatch: PropTypes.object,
  onEnter: PropTypes.func,
  onChange: PropTypes.func,
  onLeave: PropTypes.func,
}

export default withRouter(HookedRoute);
