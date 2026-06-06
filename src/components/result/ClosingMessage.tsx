interface ClosingMessageProps {
  message: string
}

export function ClosingMessage({ message }: ClosingMessageProps) {
  return (
    <div className="bg-gradient-to-r from-[#378ADD] to-[#5B9EE1] rounded-2xl px-5 py-5 text-white text-center shadow-sm">
      <p className="text-2xl mb-2" aria-hidden="true">🧭</p>
      <p className="text-sm leading-relaxed opacity-95">{message}</p>
    </div>
  )
}
