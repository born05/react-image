import React, { PureComponent, createRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import Observer from '@researchgate/react-intersection-observer';
import './styles.css';

import breakpoint, { minWidth } from './breakpoints';

class Image extends PureComponent {
  static propTypes = {
    innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
    className: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    url: PropTypes.string,
    urlSm: PropTypes.string,
    urlMd: PropTypes.string,
    urlLg: PropTypes.string,
    urlXl: PropTypes.string,

    focalPoint: PropTypes.shape({
      x: PropTypes.number,
      y: PropTypes.number,
    }),
    color: PropTypes.string,
    title: PropTypes.string,
    fluid: PropTypes.bool, // makes the height fluid
  };

  static defaultProps = {
    innerRef: null,
    className: '',

    width: '',
    height: '',
    url: '',
    urlSm: '',
    urlMd: '',
    urlLg: '',
    urlXl: '',
    color: '',
    title: '',
    focalPoint: {
      x: 0.5,
      y: 0.5,
    },
    fluid: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      loaded: false,
      ratio: 1,
    };

    this.imgRef = createRef();

    this.loadedHandler = this.loadedHandler.bind(this);
    this.intersectionHandler = this.intersectionHandler.bind(this);
  }

  static getDerivedStateFromProps(props) {
    if (props.height.length && props.width.length) {
      return {
        ratio: parseInt(props.height, 10) / parseInt(props.width, 10),
      };
    }

    return {
      ratio: 1,
    };
  }

  componentDidMount() {
    const { visible } = this.state;

    if (visible) {
      this.isLoaded();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { visible } = this.state;

    if (prevState.visible !== visible && visible) {
      this.isLoaded();
    }
  }

  getSrcSet() {
    const {
      url,
      urlSm,
      urlMd,
      urlLg,
      urlXl,
    } = this.props;

    const srcSet = [];

    srcSet.push(`${url} ${minWidth}w`);

    if (urlSm.length) {
      srcSet.push(`${urlSm} ${breakpoint.sm * 2}w`);
    }

    if (urlMd.length) {
      srcSet.push(`${urlMd} ${breakpoint.md * 2}w`);
    }

    if (urlLg.length) {
      srcSet.push(`${urlLg} ${breakpoint.lg * 2}w`);
    }

    if (urlXl.length) {
      srcSet.push(`${urlXl} ${breakpoint.xl * 2}w`);
    }

    return srcSet.join(', ');
  }

  isLoaded() {
    if (this.imgRef.current && this.imgRef.current.complete) this.loadedHandler();
  }

  loadedHandler() {
    const { visible } = this.state;

    if (!visible) return;
    this.setState({ loaded: true });
  }

  intersectionHandler({ isIntersecting }) {
    if (isIntersecting) {
      this.setState({
        visible: true,
      });
    }
  }

  render() {
    const {
      innerRef,
      className,
      url,
      title,
      focalPoint,
      fluid,
      color,
    } = this.props;
    const { visible, loaded, ratio } = this.state;

    const emptySrc = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

    const show = visible && loaded;

    return (
      <Observer onChange={this.intersectionHandler}>
        <div
          ref={innerRef}
          className={`react-image ${!fluid ? 'ratio' : ''} ${className}`}
          style={!fluid ? {
            backgroundColor: color.length ? color : '#000000', // Fallback color, which has a black fallback color.
            paddingBottom: `${ratio * 100}%`,
          } : null}
        >
          <img
            ref={this.imgRef}
            onLoad={this.loadedHandler}
            src={visible ? url : emptySrc}
            srcSet={visible ? this.getSrcSet() : `${emptySrc} 320w`}
            sizes="100vw"
            alt={title}
            style={{
              objectPosition: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`,
              opacity: show ? 1 : 0,
            }}
          />
        </div>
      </Observer>
    );
  }
}

export default forwardRef((props, ref) => <Image innerRef={ref} {...props} />);
