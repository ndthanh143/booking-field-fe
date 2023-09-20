import { Link as LinkMui, LinkProps } from '@mui/material';
import { PropsWithChildren } from 'react';
import { Link as LinkRoute } from 'react-router-dom';

export type ILinkProps = PropsWithChildren<LinkProps>;

export const Link = ({ href = '/', ...props }: ILinkProps) => {
  return <LinkMui to={href} component={LinkRoute} {...props} />;
};
