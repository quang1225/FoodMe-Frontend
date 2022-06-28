import React from 'react';

import IcomoonReact from 'icomoon-react';
import iconSet from '../../public/dietaries-icon.json';

const Icon: React.FC<{
  color?: string;
  size: string | number;
  icon: string;
}> = props => {
  const { color, size = '100%', icon } = props;
  return (
    <IcomoonReact iconSet={iconSet} color={color} size={size} icon={icon} />
  );
};

export default Icon;
