'use client';

import React from 'react';
import { icons, type LucideProps } from 'lucide-react';

type IconName = keyof typeof icons;

interface DynamicIconProps extends LucideProps {
  name: IconName;
}

export const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const LucideIcon = icons[name];

  if (!LucideIcon) {
    return null;
  }

  return <LucideIcon {...props} />;
};
