import React from 'react';
import RcSteps from 'rc-steps';
import Icon from '../icon/index.web';

export interface StepsProps {
  prefixCls?: string;
  iconPrefix?: string;
  direction?: string;
  labelPlacement?: string;
  children: any;
  status?: string;
  size?: string;
  current?: number;
}

function isString(str) {
  return typeof str === 'string';
}

export default class Steps extends React.Component<StepsProps, any> {
  static Step = (RcSteps as any).Step;

  static defaultProps = {
    prefixCls: 'am-steps',
    iconPrefix: 'ant',
    labelPlacement: 'vertical',
    current: 0,
    direction: 'vertical',
  };

  render() {
    const { current, direction } = this.props;
    return (
      <RcSteps {...this.props} direction={direction}>
        {
          this.props.children.map((item, index) => {
            let errorTail = -1;
            if (index < this.props.children.length - 1) {
              const status = this.props.children[index + 1].props.status;
              if (status === 'error') {
                errorTail = index;
              }
            }
            const errorTailCls = errorTail > -1 ? 'error-tail' : '';

            let iconName;
            let className;
            let iconDom;
            if (!!item.props.icon) {
              className = '';
              iconName = item.props.icon;
              if ( index > 0 && index <= current) {
                iconName = 'check-circle';
              } else if (item.props.status === 'error') {
                iconName = 'cross-circle';
              } else if(item.props.status === 'process') {
                iconName = 'check-circle';
              }
              iconDom = isString(iconName) ? <Icon type={iconName} /> : iconName;
            } else {
              className = index <= current ? '' : 'ellipsis-item';
              if (index <= current) {
                iconName = 'check-circle-o';
              } else if (item.props.status === 'error') {
                iconName = 'cross-circle-o';
              } else {
                iconName = 'ellipsis-circle';
              }
              iconDom = <Icon type={iconName} />;
            }

            className = `${errorTailCls} ${className}`;
            return React.cloneElement(
              item, {key: index, icon: iconDom, className: className}
            );
          })
        }
      </RcSteps>
    );
  }
}