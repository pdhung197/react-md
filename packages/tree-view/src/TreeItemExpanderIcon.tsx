import * as React from "react";
import { FontIcon, IconRotator, IIconRotatorBaseProps } from "@react-md/icon";

export interface ITreeItemExpanderIconProps extends IIconRotatorBaseProps {
  children?: React.ReactElement<any>;
}

export interface ITreeItemExpanderIconDefaultProps {
  to: number;
  from: number;
  rotated: boolean;
  children: React.ReactElement<any>;
}

export type TreeItemExpanderWithDefaultProps = ITreeItemExpanderIconProps & ITreeItemExpanderIconDefaultProps;

/**
 * The `TreeItemExpanderIcon` is a simple wrapper of the `IconRotator` prop to be used within a `TreeView`.
 */
const TreeItemExpanderIcon: React.SFC<ITreeItemExpanderIconProps> = providedProps => {
  const props = providedProps as ITreeItemExpanderIconDefaultProps;
  return <IconRotator {...props} />;
};

TreeItemExpanderIcon.defaultProps = {
  rotated: false,
  to: 0,
  from: 90,
  children: <FontIcon>keyboard_arrow_down</FontIcon>
} as ITreeItemExpanderIconDefaultProps;

export default TreeItemExpanderIcon;
