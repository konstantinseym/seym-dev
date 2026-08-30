type SendIconProps = {
  width: number
}

export default function SendIcon({ width }: SendIconProps) {
  return (
    <svg
      width={width}
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M23 0C35.7025 0 46 10.2975 46 23C46 35.7025 35.7025 46 23 46C10.2975 46 0 35.7025 0 23C0 10.2975 10.2975 0 23 0ZM23 4C12.5066 4 4 12.5066 4 23C4 33.4934 12.5066 42 23 42C33.4934 42 42 33.4934 42 23C42 12.5066 33.4934 4 23 4ZM38.3545 23L12.1416 36.1064L13.6074 32.4434L17.3848 23L13.6074 13.5566L12.1416 9.89355L38.3545 23ZM20.0156 21.5H23C23.8284 21.5 24.5 22.1716 24.5 23C24.5 23.8284 23.8284 24.5 23 24.5H20.0156L17.8574 29.8936L31.6455 23L17.8574 16.1055L20.0156 21.5Z"
        fill="currentColor"
      />
    </svg>
  )
}
