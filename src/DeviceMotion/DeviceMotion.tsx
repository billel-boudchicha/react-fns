import * as React from 'react';
import { SharedRenderProps } from '../types';
import { isEmptyChildren } from '../utils';

export interface DeviceMotionProps {
  acceleration: DeviceAcceleration;
  accelerationIncludingGravity: DeviceAcceleration;
  rotationRate: DeviceRotationRate;
  interval: number;
}

export class DeviceMotion extends React.Component<
  SharedRenderProps<{}>,
  DeviceMotionProps
> {
  state: DeviceMotionProps = {
    acceleration: {
      x: null,
      y: null,
      z: null,
    },
    accelerationIncludingGravity: {
      x: null,
      y: null,
      z: null,
    },
    rotationRate: {
      alpha: null,
      beta: null,
      gamma: null,
    },
    interval: 0,
  };

  handleDeviceMotion = (e: DeviceMotionEvent) => {
    this.setState({
      acceleration: e.acceleration,
      accelerationIncludingGravity: e.accelerationIncludingGravity,
      rotationRate: e.rotationRate,
      interval: e.interval,
    });
  };

  componentDidMount() {
    window.addEventListener('deviceMotion', this.handleDeviceMotion, true);
  }

  componentWillUnmount() {
    window.removeEventListener('deviceMotion', this.handleDeviceMotion);
  }

  render() {
    const { render, component, children, ...props } = this.props;
    return component
      ? React.createElement(component as any, props)
      : render
        ? (render as any)(props)
        : children // children come last, always called
          ? typeof children === 'function'
            ? children(this.state)
            : !isEmptyChildren(children) ? React.Children.only(children) : null
          : null;
  }
}
