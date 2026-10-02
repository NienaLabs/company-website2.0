import React from 'react';

export type TypographyVariant = 
  | 'display'
  | 'large-title'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'body1'
  | 'body2'
  | 'caption1';

export type TypographyColor = 
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'disabled'
  | 'inverted'
  | 'brand'
  | 'inherit';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  color?: TypographyColor;
  align?: 'left' | 'center' | 'right' | 'justify';
}

const variantMapping: Record<TypographyVariant, React.ElementType> = {
  'display': 'h1',
  'large-title': 'h2',
  'title1': 'h2',
  'title2': 'h3',
  'title3': 'h4',
  'body1': 'p',
  'body2': 'p',
  'caption1': 'span',
};

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body1',
  as,
  color = 'primary',
  align = 'left',
  className = '',
  style = {},
  children,
  ...props
}) => {
  const Component = as || variantMapping[variant];

  // Map our semantic color prop to the actual CSS custom property
  let colorToken = 'inherit';
  if (color === 'brand') colorToken = 'var(--color-brand)';
  else if (color !== 'inherit') colorToken = `var(--color-fg${color === 'primary' ? '' : '-' + color})`;

  const baseStyle: React.CSSProperties = {
    fontFamily: `var(--typography-${variant}-font)`,
    fontSize: `var(--typography-${variant}-size)`,
    fontWeight: `var(--typography-${variant}-weight)`,
    lineHeight: `var(--typography-${variant}-line-height)`,
    color: colorToken,
    textAlign: align,
    margin: 0,
    ...style,
  };

  return (
    <Component style={baseStyle} className={className} {...props}>
      {children}
    </Component>
  );
};
