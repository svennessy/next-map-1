import { useEffect, useRef } from "react"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const LocationDisplay: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/70 z-40" />

      {/* Modal content */}
      <div
        ref={modalRef}
        className="relative z-50  bg-neutral-900 rounded-lg shadow-xl p-6 w-full max-w-md flex flex-col items-center justify-center"
      >
        {children}
      </div>
    </div>
  )
}
