import { FC } from 'react'
import {
  FaSnapchatGhost,
  FaGoogle,
  FaApple,
  FaFacebook,
  FaEnvelope,
  FaLock,
} from 'react-icons/fa'

import { 
    SiDiscord, 
    SiX, 
    SiTiktok 
} from 'react-icons/si'

import { 
    MdHealthAndSafety 
} from "react-icons/md"

export interface SocialIconProps {
  /** size in pixels (width & height) */
  size?: number
  /** fill color */
  color?: string
  /** additional class names */
  className?: string
}

/** Logo */
export const Logo: FC<SocialIconProps> = ({
  size = 24,
  color = '#9CA3AF',
  className,
}) => <MdHealthAndSafety size={size} color={color} className={className} />

/** Snapchat ghost (yellow) */
export const SnapchatIcon: FC<SocialIconProps> = ({
  size = 24,
  color = '#FFE400',
  className,
}) => <FaSnapchatGhost size={size} color={color} className={className} />

/** Google “G” */
export const GoogleIcon: FC<SocialIconProps> = ({
  size = 24,
  color = '#4285F4',
  className,
}) => <FaGoogle size={size} color={color} className={className} />

/** Apple logo */
export const AppleIcon: FC<SocialIconProps> = ({
  size = 24,
  color = '#FFFFFF',
  className,
}) => <FaApple size={size} color={color} className={className} />

/** Facebook “f” */
export const FacebookIcon: FC<SocialIconProps> = ({
  size = 24,
  color = '#1877F2',
  className,
}) => <FaFacebook size={size} color={color} className={className} />

/** Discord logo */
export const DiscordIcon: FC<SocialIconProps> = ({
  size = 24,
  color = '#7289DA',
  className,
}) => <SiDiscord size={size} color={color} className={className} />

/** X (formerly Twitter) logo */
export const XIcon: FC<SocialIconProps> = ({
  size = 24,
  color = '#FFFFFF',
  className,
}) => <SiX size={size} color={color} className={className} />

/** TikTok logo */
export const TikTokIcon: FC<SocialIconProps> = ({
  size = 24,
  color = '#FFFFFF',
  className,
}) => <SiTiktok size={size} color={color} className={className} />

/** Envelope (email) icon */
export const EmailIcon: FC<SocialIconProps> = ({
  size = 24,
  color = '#9CA3AF',
  className,
}) => <FaEnvelope size={size} color={color} className={className} />

/** Lock (password) icon */
export const PasswordIcon: FC<SocialIconProps> = ({
  size = 24,
  color = '#9CA3AF',
  className,
}) => <FaLock size={size} color={color} className={className} />