import type { Icon } from '@phosphor-icons/react'

export function Icon({ icon: IconComponent, ...props }: { icon: Icon } & React.ComponentProps<Icon>) {
  return <IconComponent weight="regular" size={18} aria-hidden="true" {...props} />
}
